#!/usr/bin/env node

const fs = require("fs");
const fsPromises = require("fs/promises");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");
const outputFile = path.join(toolsRoot, "copilot-timeline.json");
const timelineDaysDir = path.join(toolsRoot, "copilot-timeline-days");
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

// 🚀 ANTI-HANG FIX: No Regex. Native string searching only.
function extractFrontmatter(content) {
  const trimmed = content.trimStart();
  if (!trimmed.startsWith("---")) return "";
  const endIndex = trimmed.indexOf("---", 3);
  if (endIndex === -1) return "";
  return trimmed.slice(3, endIndex);
}

// 🚀 ANTI-HANG FIX: Simple line-by-line parsing.
function extractField(frontmatter, field) {
  if (!frontmatter) return "";
  const lines = frontmatter.split('\n');
  const prefix = `${field}:`;
  for (const line of lines) {
    if (line.trim().startsWith(prefix)) {
      const value = line.substring(line.indexOf(':') + 1).trim();
      return stripQuotes(value);
    }
  }
  return "";
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

// 🚀 SPEED FIX: Async directory walking
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

function toIsoDate(stamp) {
  const raw = String(stamp || "").replace(/[^0-9]/g, "");
  if (raw.length !== 8) return "";
  const year = raw.slice(0, 4);
  const month = raw.slice(4, 6);
  const day = raw.slice(6, 8);
  return `${year}-${month}-${day}`;
}

async function buildTimeline() {
  if (!fs.existsSync(toolsRoot)) {
    throw new Error(`Tools directory not found: ${toolsRoot}`);
  }

  console.log("Gathering files for timeline...");
  const toolFiles = await walkToolFilesAsync(toolsRoot);
  const generatedTools = [];

  console.log(`Processing ${toolFiles.length} files in batches...`);

  // 🚀 SPEED FIX: Process 100 files at a time without blocking the CPU
  const BATCH_SIZE = 100;
  for (let i = 0; i < toolFiles.length; i += BATCH_SIZE) {
    const batch = toolFiles.slice(i, i + BATCH_SIZE);
    
    await Promise.all(batch.map(async (filePath) => {
      try {
        const baseName = path.basename(filePath);
        const match = baseName.match(generatedPattern);
        
        const content = await fsPromises.readFile(filePath, "utf8");
        const frontmatter = extractFrontmatter(content);
        const generatedBy = extractField(frontmatter, "generated_by").toLowerCase();
        const generatedDate = extractField(frontmatter, "generated_date");

        const generatedByPattern = Boolean(match);
        const generatedByMetadata = generatedBy.includes("copilot");
        if (!generatedByPattern && !generatedByMetadata) return;

        const stamp = generatedDate || (match ? match[1] : "");
        const date = toIsoDate(stamp);
        if (!date) return;

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
      } catch (err) {
        console.error(`Failed to process timeline for ${filePath}:`, err.message);
      }
    }));
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

  fs.mkdirSync(timelineDaysDir, { recursive: true });

  const activeDayFiles = new Set();
  
  // 🚀 SPEED FIX: Async file writing
  const timelineIndex = await Promise.all(timeline.map(async (day) => {
    const dayFileName = `${day.date}.json`;
    const dayFilePath = path.join(timelineDaysDir, dayFileName);
    const dayRelativePath = normalizePath(path.relative(toolsRoot, dayFilePath));
    activeDayFiles.add(dayFileName);

    const dayPayload = {
      date: day.date,
      count: day.count,
      tools: day.tools,
    };

    await fsPromises.writeFile(dayFilePath, JSON.stringify(dayPayload, null, 2), "utf8");

    return {
      date: day.date,
      count: day.count,
      file: `tools/${dayRelativePath}`,
    };
  }));

  const existingDayFiles = fs.readdirSync(timelineDaysDir).filter((name) => name.endsWith(".json"));

  for (const name of existingDayFiles) {
    if (activeDayFiles.has(name)) continue;
    await fsPromises.unlink(path.join(timelineDaysDir, name));
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "copilot-daily-generator",
    totalTools: generatedTools.length,
    totalDays: timelineIndex.length,
    timeline: timelineIndex,
  };

  await fsPromises.writeFile(outputFile, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Built Copilot timeline with ${payload.totalTools} tools across ${payload.totalDays} days.`);
}

buildTimeline().catch(console.error);
