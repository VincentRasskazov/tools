#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "utility";
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

function extractCategory(content) {
  const frontmatter = extractFrontmatter(content);
  if (!frontmatter) return "Utility";

  const match = frontmatter.match(/^category:\s*(.+)$/m);
  return match ? stripQuotes(match[1]) : "Utility";
}

function normalizePath(input) {
  return input.split(path.sep).join("/");
}

function uniqueTargetPath(targetDir, fileName) {
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);

  let candidate = path.join(targetDir, fileName);
  let suffix = 2;

  while (fs.existsSync(candidate)) {
    candidate = path.join(targetDir, `${base}-${suffix}${ext}`);
    suffix += 1;
  }

  return candidate;
}

function reorganize() {
  if (!fs.existsSync(toolsRoot)) {
    throw new Error(`Tools directory not found: ${toolsRoot}`);
  }

  const entries = fs.readdirSync(toolsRoot, { withFileTypes: true });
  const rootHtmlFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith(".html"));

  let movedCount = 0;
  const movedPreview = [];

  for (const fileEntry of rootHtmlFiles) {
    const source = path.join(toolsRoot, fileEntry.name);
    const content = fs.readFileSync(source, "utf8");
    const category = extractCategory(content);
    const categorySlug = slugify(category);
    const targetDir = path.join(toolsRoot, categorySlug);

    fs.mkdirSync(targetDir, { recursive: true });

    const target = uniqueTargetPath(targetDir, fileEntry.name);
    fs.renameSync(source, target);
    movedCount += 1;

    if (movedPreview.length < 20) {
      movedPreview.push(`${fileEntry.name} -> ${normalizePath(path.relative(toolsRoot, target))}`);
    }
  }

  console.log(`Moved ${movedCount} root-level tools into category folders.`);
  if (movedPreview.length > 0) {
    console.log("Examples:");
    movedPreview.forEach((line) => console.log(` - ${line}`));
  }
}

reorganize();
