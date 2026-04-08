#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");
const manifestsRoot = path.join(toolsRoot, "category-manifests");
const readmePath = path.join(repoRoot, "README.md");

function slugify(input) {
  return String(input).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "utility";
}

function stripQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
      return trimmed.slice(1, -1);
    }
  }
  return trimmed;
}

function extractFrontmatter(content) {
  const trimmed = content.trimStart();
  if (!trimmed.startsWith("---")) return "";
  const endIndex = trimmed.indexOf("---", 3);
  if (endIndex === -1) return ""; 
  return trimmed.slice(3, endIndex);
}

function extractField(frontmatter, field) {
  if (!frontmatter) return "";
  const lines = frontmatter.split('\n');
  const prefix = `${field}:`;
  for (const line of lines) {
    if (line.trim().startsWith(prefix)) {
      return stripQuotes(line.substring(line.indexOf(':') + 1).trim());
    }
  }
  return "";
}

function extractTitleFromHtml(content) {
  const match = content.match(/<title>([^<]+)<\/title>/i);
  return match ? match[1].trim() : "";
}

function ensureLeadingSlash(value) {
  return !value ? "" : value.startsWith("/") ? value : `/${value}`;
}

function toProjectRelativeToolUrl(rawPath) {
  if (!rawPath) return "";
  const normalized = String(rawPath).trim().replace(/^\/+/, "");
  return normalized.startsWith("tools/") ? normalized : `tools/${normalized}`;
}

function inferUrlFromPath(filePath) {
  return `tools/${filePath.split(path.sep).join("/")}`;
}

function updateReadmeToolCount(totalTools) {
  if (!fs.existsSync(readmePath)) return;
  const readme = fs.readFileSync(readmePath, "utf8");
  const exactLine = `A collection of ${Number(totalTools || 0).toLocaleString("en-US")} browser-based tools for developers, creators, and everyday tasks.`;
  const pattern = /^A collection of .* browser-based tools for developers, creators, and everyday tasks\.$/m;
  if (!pattern.test(readme)) return;
  const updated = readme.replace(pattern, exactLine);
  if (updated !== readme) fs.writeFileSync(readmePath, updated, "utf8");
}

function buildIndex() {
  const args = process.argv.slice(2);
  const filesArg = args.findIndex((a) => a === "--files");
  
  if (filesArg === -1 || !args[filesArg + 1]) {
    console.log("No new files provided. Skipping manifest generation.");
    return;
  }

  const newFiles = args[filesArg + 1].split(",").map(f => f.trim()).filter(Boolean);
  const allToolsPath = path.join(manifestsRoot, "all-tools.json");
  
  // 🚀 Load the existing master database in memory
  let allTools = [];
  if (fs.existsSync(allToolsPath)) {
    allTools = JSON.parse(fs.readFileSync(allToolsPath, "utf8"));
  }

  // 🚀 Append the 25 new tools
  for (const relativeFile of newFiles) {
    const filePath = path.join(toolsRoot, relativeFile);
    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, "utf8");
    const frontmatter = extractFrontmatter(content);

    const title = extractField(frontmatter, "title") || extractTitleFromHtml(content) || path.basename(filePath, ".html");
    const category = extractField(frontmatter, "category") || "Utility";
    const description = extractField(frontmatter, "description") || "Free online tool for daily tasks.";
    const permalink = ensureLeadingSlash(extractField(frontmatter, "permalink"));
    const url = toProjectRelativeToolUrl(permalink) || inferUrlFromPath(relativeFile);

    const newTool = { name: title, url, category, description };

    // Deduplicate just in case it ran twice
    allTools = allTools.filter((t) => t.url !== newTool.url);
    allTools.push(newTool);
  }

  allTools.sort((a, b) => a.name.localeCompare(b.name));

  // Regroup categories in memory
  const categoriesMap = new Map();
  for (const tool of allTools) {
    const slug = slugify(tool.category);
    if (!categoriesMap.has(slug)) {
      categoriesMap.set(slug, { name: tool.category, slug, tools: [] });
    }
    categoriesMap.get(slug).tools.push(tool);
  }

  fs.mkdirSync(manifestsRoot, { recursive: true });

  const sortedCategories = [...categoriesMap.values()].sort((a, b) => a.name.localeCompare(b.name));
  const activeFileNames = new Set(["index.json", "all-tools.json"]);

  // Write category files
  for (const category of sortedCategories) {
    const fileName = `${category.slug}.json`;
    activeFileNames.add(fileName);
    fs.writeFileSync(path.join(manifestsRoot, fileName), JSON.stringify(category.tools, null, 2), "utf8");
  }

  // Write master file
  fs.writeFileSync(allToolsPath, JSON.stringify(allTools, null, 2), "utf8");

  // Write index
  const indexPayload = {
    generatedAt: new Date().toISOString(),
    totalTools: allTools.length,
    allToolsManifest: "all-tools.json",
    categories: sortedCategories.map((c) => ({ name: c.name, slug: c.slug, count: c.tools.length, manifest: `${c.slug}.json` })),
  };
  fs.writeFileSync(path.join(manifestsRoot, "index.json"), JSON.stringify(indexPayload, null, 2), "utf8");
  
  updateReadmeToolCount(allTools.length);
  console.log(`Appended ${newFiles.length} new tools. Database now has ${allTools.length} total tools.`);
}

buildIndex();
