#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsRoot = path.join(repoRoot, "tools");
const outputFile = path.join(toolsRoot, "copilot-timeline.json");
const timelineDaysDir = path.join(toolsRoot, "copilot-timeline-days");
const generatedPattern = /^daily-(\d{8})-(\d{2})-[a-z0-9-]+\.html$/i;

function stripQuotes(value) {
  const trimmed = value.trim();
  if (trimmed.length >= 2) {
    if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) return trimmed.slice(1, -1);
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
    if (line.trim().startsWith(prefix)) return stripQuotes(line.substring(line.indexOf(':') + 1).trim());
  }
  return "";
}

function toProjectRelativeToolUrl(rawPath) {
  if (!rawPath) return "";
  const normalized = String(rawPath).trim().replace(/^\/+/, "");
  return normalized.startsWith("tools/") ? normalized : `tools/${normalized}`;
}

function toIsoDate(stamp) {
  const raw = String(stamp || "").replace(/[^0-9]/g, "");
  if (raw.length !== 8) return "";
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

function buildTimeline() {
  const args = process.argv.slice(2);
  const filesArg = args.findIndex((a) => a === "--files");
  
  if (filesArg === -1 || !args[filesArg + 1]) {
    console.log("No new files provided. Skipping timeline.");
    return;
  }

  const newFiles = args[filesArg + 1].split(",").map(f => f.trim()).filter(Boolean);
  
  // 🚀 Load master timeline
  let mainTimeline = [];
  if (fs.existsSync(outputFile)) {
    mainTimeline = JSON.parse(fs.readFileSync(outputFile, "utf8")).timeline || [];
  }

  const newToolsByDate = new Map();

  for (const relativeFile of newFiles) {
    const filePath = path.join(toolsRoot, relativeFile);
    if (!fs.existsSync(filePath)) continue;

    const baseName = path.basename(filePath);
    const match = baseName.match(generatedPattern);
    const content = fs.readFileSync(filePath, "utf8");
    const frontmatter = extractFrontmatter(content);
    
    const generatedBy = extractField(frontmatter, "generated_by").toLowerCase();
    const generatedDate = extractField(frontmatter, "generated_date");

    if (!match && !generatedBy.includes("copilot")) continue;

    const date = toIsoDate(generatedDate || (match ? match[1] : ""));
    if (!date) continue;

    const tool = {
      date,
      sequence: match ? Number(match[2]) : 0,
      name: extractField(frontmatter, "title") || path.basename(baseName, ".html"),
      url: toProjectRelativeToolUrl(extractField(frontmatter, "permalink")) || `tools/${relativeFile.split(path.sep).join("/")}`,
      category: extractField(frontmatter, "category") || "Utility",
      file: relativeFile.split(path.sep).join("/"),
    };

    if (!newToolsByDate.has(date)) newToolsByDate.set(date, []);
    newToolsByDate.get(date).push(tool);
  }

  fs.mkdirSync(timelineDaysDir, { recursive: true });

  for (const [date, tools] of newToolsByDate.entries()) {
    const dayFileName = `${date}.json`;
    const dayFilePath = path.join(timelineDaysDir, dayFileName);
    
    // 🚀 Load the specific day's existing JSON
    let dayTools = [];
    if (fs.existsSync(dayFilePath)) {
      dayTools = JSON.parse(fs.readFileSync(dayFilePath, "utf8")).tools || [];
    }

    // Append and deduplicate
    for (const nt of tools) {
      dayTools = dayTools.filter((t) => t.url !== nt.url);
      dayTools.push(nt);
    }
    
    dayTools.sort((a, b) => a.sequence - b.sequence);
    fs.writeFileSync(dayFilePath, JSON.stringify({ date, count: dayTools.length, tools: dayTools }, null, 2), "utf8");

    // Update main timeline record
    const existingDayIndex = mainTimeline.findIndex((d) => d.date === date);
    const dayEntry = { date, count: dayTools.length, file: `tools/copilot-timeline-days/${dayFileName}` };
    
    if (existingDayIndex > -1) mainTimeline[existingDayIndex] = dayEntry;
    else mainTimeline.push(dayEntry);
  }

  mainTimeline.sort((a, b) => b.date.localeCompare(a.date));
  const totalTools = mainTimeline.reduce((sum, d) => sum + d.count, 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "copilot-daily-generator",
    totalTools,
    totalDays: mainTimeline.length,
    timeline: mainTimeline,
  };

  fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Timeline updated. Total Copilot tools: ${totalTools}.`);
}

buildTimeline();
