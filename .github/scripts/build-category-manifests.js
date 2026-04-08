#!/usr/bin/env node

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");
const manifestsRoot = path.join(toolsRoot, "category-manifests");
const readmePath = path.join(repoRoot, "README.md");

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "utility";
}

function normalizePath(input) {
  return input.split(path.sep).join("/");
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return match ? match[1] : "";
}

function extractField(frontmatter, field) {
  if (!frontmatter) return "";
  const pattern = new RegExp(`^${field}:\\s*(.+)$`, "m");
  const match = frontmatter.match(pattern);
  return match ? stripQuotes(match[1]) : "";
}

function extractTitleFromHtml(content) {
  const match = content.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : "";
}

// 🚀 UPGRADE: Async Directory Walking
async function walkToolFilesAsync(dirPath) {
  const files = [];
  const entries = await fsPromises.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      if (entry.name === "category-manifests") continue;
      files.push(...(await walkToolFilesAsync(absolutePath)));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".html")) continue;
    files.push(absolutePath);
  }

  return files;
}

function ensureLeadingSlash(value) {
  if (!value) return "";
  return value.startsWith("/") ? value : `/${value}`;
}

function toProjectRelativeToolUrl(rawPath) {
  if (!rawPath) return "";
  const normalized = String(rawPath).trim().replace(/^\/+/, "");
  if (!normalized) return "";
  if (normalized.startsWith("tools/")) return normalized;
  return `tools/${normalized}`;
}

function inferUrlFromPath(filePath) {
  const relative = normalizePath(path.relative(toolsRoot, filePath));
  return `tools/${relative}`;
}

// 🚀 UPGRADE: Async Readme Updater
async function updateReadmeToolCountAsync(totalTools) {
  if (!fs.existsSync(readmePath)) return;

  const readme = await fsPromises.readFile(readmePath, "utf8");
  const exactLine = `A collection of ${Number(totalTools || 0).toLocaleString("en-US")} browser-based tools for developers, creators, and everyday tasks.`;
  const pattern = /^A collection of .* browser-based tools for developers, creators, and everyday tasks\.$/m;

  if (!pattern.test(readme)) return;

  const updated = readme.replace(pattern, exactLine);
  if (updated !== readme) {
    await fsPromises.writeFile(readmePath, updated, "utf8");
  }
}

async function buildIndex() {
  if (!fs.existsSync(toolsRoot)) {
    throw new Error(`Tools directory not found: ${toolsRoot}`);
  }

  console.log("Gathering files...");
  const toolFiles = await walkToolFilesAsync(toolsRoot);
  const categories = new Map();

  console.log(`Processing ${toolFiles.length} files...`);

  // 🚀 UPGRADE: Batch Processing to prevent Memory/CPU locks
  const BATCH_SIZE = 100;
  for (let i = 0; i < toolFiles.length; i += BATCH_SIZE) {
    const batch = toolFiles.slice(i, i + BATCH_SIZE);
    
    await Promise.all(batch.map(async (filePath) => {
      try {
        const content = await fsPromises.readFile(filePath, "utf8");
        const frontmatter = extractFrontmatter(content);

        const title = extractField(frontmatter, "title") || extractTitleFromHtml(content) || path.basename(filePath, ".html");
        const category = extractField(frontmatter, "category") || "Utility";
        const description = extractField(frontmatter, "description") || "Free online tool for daily tasks.";
        const permalink = ensureLeadingSlash(extractField(frontmatter, "permalink"));
        const url = toProjectRelativeToolUrl(permalink) || inferUrlFromPath(filePath);

        const slug = slugify(category);
        
        // Ensure category array exists
        if (!categories.has(slug)) {
          categories.set(slug, {
            name: category,
            slug,
            tools: [],
          });
        }

        categories.get(slug).tools.push({
          name: title,
          url,
          category,
          description,
        });
      } catch (err) {
        console.error(`Failed to process ${filePath}:`, err.message);
      }
    }));
  }

  fs.mkdirSync(manifestsRoot, { recursive: true });

  const existing = fs.readdirSync(manifestsRoot).filter((name) => name.endsWith(".json") && name !== "index.json" && name !== "all-tools.json");
  const activeFileNames = new Set();

  const sortedCategories = [...categories.values()].sort((a, b) => a.name.localeCompare(b.name));

  // 🚀 UPGRADE: Async file writing
  for (const category of sortedCategories) {
    category.tools.sort((a, b) => a.name.localeCompare(b.name));
    const fileName = `${category.slug}.json`;
    const absolute = path.join(manifestsRoot, fileName);
    await fsPromises.writeFile(absolute, JSON.stringify(category.tools, null, 2), "utf8");
    activeFileNames.add(fileName);
  }

  const allTools = sortedCategories.flatMap((category) => category.tools).sort((a, b) => a.name.localeCompare(b.name));
  await fsPromises.writeFile(path.join(manifestsRoot, "all-tools.json"), JSON.stringify(allTools, null, 2), "utf8");

  for (const fileName of existing) {
    if (activeFileNames.has(fileName)) continue;
    await fsPromises.unlink(path.join(manifestsRoot, fileName));
  }

  const indexPayload = {
    generatedAt: new Date().toISOString(),
    totalTools: toolFiles.length,
    allToolsManifest: "all-tools.json",
    categories: sortedCategories.map((category) => ({
      name: category.name,
      slug: category.slug,
      count: category.tools.length,
      manifest: `${category.slug}.json`,
    })),
  };

  await fsPromises.writeFile(path.join(manifestsRoot, "index.json"), JSON.stringify(indexPayload, null, 2), "utf8");
  await updateReadmeToolCountAsync(toolFiles.length);

  console.log(`Built ${sortedCategories.length} category manifests for ${toolFiles.length} tools.`);
}

buildIndex().catch(console.error);
