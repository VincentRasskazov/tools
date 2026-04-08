#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");
const outputFile = path.join(toolsRoot, "copilot-timeline.json");
const generatedPattern = /^daily-(\d{8})-(\d{2})-[a-z0-9-]+\.html$/i;

function normalizePath(input) {
  return input.split(path.sep).join("/");
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
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return match ? match[1] : "";
}

function extractField(frontmatter, field) {
  if (!frontmatter) return "";
  const pattern = new RegExp(`^${field}:\\s*(.+)$`, "m");
  const match = frontmatter.match(pattern);
  return match ? stripQuotes(match[1]) : "";
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

function walkToolFiles(dirPath) {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);

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

function toIsoDate(stamp) {
  const raw = String(stamp || "").replace(/[^0-9]/g, "");
  if (raw.length !== 8) return "";

  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);
  return `${year}-${month}-${day}`;
}

function buildTimeline() {
  if (!fs.existsSync(toolsRoot)) {
    throw new Error(`Tools directory not found: ${toolsRoot}`);
  }

  const toolFiles = walkToolFiles(toolsRoot);
  const generatedTools = [];

  for (const filePath of toolFiles) {
    const baseName = path.basename(filePath);
    const match = baseName.match(generatedPattern);
    const content = fs.readFileSync(filePath, "utf8");
    const frontmatter = extractFrontmatter(content);
    const generatedBy = extractField(frontmatter, "generated_by").toLowerCase();
    const generatedDate = extractField(frontmatter, "generated_date");

    const generatedByPattern = Boolean(match);
    const generatedByMetadata = generatedBy.includes("copilot");
    if (!generatedByPattern && !generatedByMetadata) continue;

    const stamp = generatedDate || (match ? match[1] : "");
    const date = toIsoDate(stamp);
    if (!date) continue;

    const sequence = match ? Number(match[2]) : 0;
    const title = extractField(frontmatter, "title") || path.basename(baseName, ".html");
    const category = extractField(frontmatter, "category") || "Utility";
    const permalink = ensureLeadingSlash(extractField(frontmatter, "permalink"));
    const url = toProjectRelativeToolUrl(permalink) || inferUrlFromPath(filePath);

    generatedTools.push({
      date,
      sequence,
      name: title,
      url,
      category,
      file: normalizePath(path.relative(toolsRoot, filePath)),
    });
  }

  generatedTools.sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return a.sequence - b.sequence;
  });

  const groupedMap = new Map();
  for (const item of generatedTools) {
    if (!groupedMap.has(item.date)) groupedMap.set(item.date, []);
    groupedMap.get(item.date).push(item);
  }

  const timeline = [...groupedMap.entries()].map(([date, tools]) => ({
    date,
    count: tools.length,
    tools,
  }));

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "copilot-daily-generator",
    totalTools: generatedTools.length,
    totalDays: timeline.length,
    timeline,
  };

  fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Built Copilot timeline with ${payload.totalTools} tools across ${payload.totalDays} days.`);
}

buildTimeline();