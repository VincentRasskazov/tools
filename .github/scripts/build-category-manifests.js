#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");
const manifestsRoot = path.join(toolsRoot, "category-manifests");

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

function walkToolFiles(dirPath) {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    const relativePath = normalizePath(path.relative(toolsRoot, absolutePath));

    if (entry.isDirectory()) {
      if (entry.name === "category-manifests") continue;
      files.push(...walkToolFiles(absolutePath));
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

  if (normalized.startsWith("tools/")) {
    return normalized;
  }

  return `tools/${normalized}`;
}

function inferUrlFromPath(filePath) {
  const relative = normalizePath(path.relative(toolsRoot, filePath));
  return `tools/${relative}`;
}

function buildIndex() {
  if (!fs.existsSync(toolsRoot)) {
    throw new Error(`Tools directory not found: ${toolsRoot}`);
  }

  const toolFiles = walkToolFiles(toolsRoot);
  const categories = new Map();

  for (const filePath of toolFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const frontmatter = extractFrontmatter(content);

    const title = extractField(frontmatter, "title") || extractTitleFromHtml(content) || path.basename(filePath, ".html");
    const category = extractField(frontmatter, "category") || "Utility";
    const description = extractField(frontmatter, "description") || "Free online tool for daily tasks.";
    const permalink = ensureLeadingSlash(extractField(frontmatter, "permalink"));
    const url = toProjectRelativeToolUrl(permalink) || inferUrlFromPath(filePath);

    const slug = slugify(category);
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
  }

  fs.mkdirSync(manifestsRoot, { recursive: true });

  const existing = fs.readdirSync(manifestsRoot).filter((name) => name.endsWith(".json") && name !== "index.json" && name !== "all-tools.json");
  const activeFileNames = new Set();

  const sortedCategories = [...categories.values()].sort((a, b) => a.name.localeCompare(b.name));

  for (const category of sortedCategories) {
    category.tools.sort((a, b) => a.name.localeCompare(b.name));

    const fileName = `${category.slug}.json`;
    const absolute = path.join(manifestsRoot, fileName);
    fs.writeFileSync(absolute, JSON.stringify(category.tools, null, 2), "utf8");
    activeFileNames.add(fileName);
  }

  const allTools = sortedCategories.flatMap((category) => category.tools).sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(path.join(manifestsRoot, "all-tools.json"), JSON.stringify(allTools, null, 2), "utf8");

  for (const fileName of existing) {
    if (activeFileNames.has(fileName)) continue;
    fs.unlinkSync(path.join(manifestsRoot, fileName));
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

  fs.writeFileSync(path.join(manifestsRoot, "index.json"), JSON.stringify(indexPayload, null, 2), "utf8");

  console.log(`Built ${sortedCategories.length} category manifests for ${toolFiles.length} tools.`);
}

buildIndex();
