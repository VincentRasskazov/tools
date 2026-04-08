#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");

function writeOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${String(value)}\n`, "utf8");
}

function toNumber(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return null;

  const match = value.match(/-?\d+(?:\.\d+)?/);
  if (!match) return null;
  const num = Number(match[0]);
  return Number.isFinite(num) ? num : null;
}

function clampPercent(value) {
  if (!Number.isFinite(value)) return null;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
}

function runCommand(command) {
  try {
    const stdout = execSync(command, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 7000,
      env: process.env,
    }).trim();

    return stdout || null;
  } catch {
    return null;
  }
}

function extractPercentFromText(text) {
  if (!text) return null;

  const strongPatterns = [
    /premium[^\n\r]*?(?:remaining|left|available)[^\n\r]*?(\d+(?:\.\d+)?)\s*%/i,
    /(?:remaining|left|available)[^\n\r]*?premium[^\n\r]*?(\d+(?:\.\d+)?)\s*%/i,
    /premium[^\n\r]*?(\d+(?:\.\d+)?)\s*%[^\n\r]*?(?:remaining|left|available)/i,
  ];

  for (const pattern of strongPatterns) {
    const match = text.match(pattern);
    if (!match) continue;

    const num = toNumber(match[1]);
    if (num !== null) return clampPercent(num);
  }

  const weakMatch = text.match(/premium[^\n\r]*?(\d+(?:\.\d+)?)\s*%/i);
  if (weakMatch) {
    const num = toNumber(weakMatch[1]);
    if (num !== null) return clampPercent(num);
  }

  return null;
}

function extractPercentFromJson(jsonObj) {
  const candidates = [];

  function inspect(node, pathParts) {
    if (node === null || node === undefined) return;

    if (Array.isArray(node)) {
      node.forEach((child, idx) => inspect(child, [...pathParts, String(idx)]));
      return;
    }

    if (typeof node !== "object") return;

    const entries = Object.entries(node);
    const lowered = entries.map(([k]) => [k, k.toLowerCase()]);

    for (const [key, value] of entries) {
      const keyLower = key.toLowerCase();
      const pathLower = [...pathParts, keyLower].join(".");
      const num = toNumber(value);

      if (num === null) {
        inspect(value, [...pathParts, keyLower]);
        continue;
      }

      const looksLikePercent = /percent|percentage|pct/.test(pathLower);
      const looksLikeRemaining = /remaining|left|available/.test(pathLower);
      const looksLikePremium = /premium/.test(pathLower);

      if (looksLikePercent && (looksLikeRemaining || looksLikePremium)) {
        candidates.push(clampPercent(num));
      }
    }

    const numberByPattern = (pattern) => {
      for (const [key, keyLower] of lowered) {
        if (!pattern.test(keyLower)) continue;
        const num = toNumber(node[key]);
        if (num !== null) return num;
      }
      return null;
    };

    const remaining = numberByPattern(/remaining|left|available/);
    const total = numberByPattern(/total|limit|quota|max|maximum/);
    const used = numberByPattern(/used|consumed|spent/);

    if (remaining !== null && total !== null && total > 0) {
      candidates.push(clampPercent((remaining / total) * 100));
    }

    if (used !== null && total !== null && total > 0) {
      candidates.push(clampPercent(((total - used) / total) * 100));
    }

    entries.forEach(([key, value]) => inspect(value, [...pathParts, key.toLowerCase()]));
  }

  inspect(jsonObj, []);

  const valid = candidates.filter((value) => value !== null);
  return valid.length > 0 ? valid[0] : null;
}

function parseUsageFromCommandOutput(output) {
  if (!output) return null;

  try {
    const parsed = JSON.parse(output);
    const jsonPercent = extractPercentFromJson(parsed);
    if (jsonPercent !== null) return jsonPercent;
  } catch {
    // Not JSON, parse as plain text.
  }

  return extractPercentFromText(output);
}

function parseUsageFromEnv() {
  const directPercent = toNumber(process.env.COPILOT_PREMIUM_PERCENT_LEFT);
  if (directPercent !== null) {
    return {
      percentLeft: clampPercent(directPercent),
      source: "env:COPILOT_PREMIUM_PERCENT_LEFT",
    };
  }

  const remaining = toNumber(process.env.COPILOT_PREMIUM_REMAINING);
  const limit = toNumber(process.env.COPILOT_PREMIUM_LIMIT);

  if (remaining !== null && limit !== null && limit > 0) {
    return {
      percentLeft: clampPercent((remaining / limit) * 100),
      source: "env:COPILOT_PREMIUM_REMAINING/COPILOT_PREMIUM_LIMIT",
    };
  }

  return null;
}

const commands = [
  "gh copilot usage --json",
  "gh copilot status --json",
  "gh copilot usage",
  "gh copilot status",
];

let percentLeft = null;
let source = "unknown";

for (const command of commands) {
  const output = runCommand(command);
  if (!output) continue;

  const parsedPercent = parseUsageFromCommandOutput(output);
  if (parsedPercent === null) continue;

  percentLeft = parsedPercent;
  source = `command:${command}`;
  break;
}

if (percentLeft === null) {
  const envResult = parseUsageFromEnv();
  if (envResult) {
    percentLeft = envResult.percentLeft;
    source = envResult.source;
  }
}

const threshold = toNumber(process.env.COPILOT_PREMIUM_THRESHOLD) ?? 50;
const premiumKnown = percentLeft !== null;
const premiumPercentLeft = premiumKnown ? percentLeft : 0;

const highModel = process.env.COPILOT_HIGH_MODEL || "gpt-5.3-codex";
const lowModel = process.env.COPILOT_LOW_MODEL || "gpt-4.1";
const highReasoning = process.env.COPILOT_HIGH_REASONING || "high";
const lowReasoning = process.env.COPILOT_LOW_REASONING || "standard";

const useHighTier = premiumKnown && premiumPercentLeft > threshold;

const selectedModel = useHighTier ? highModel : lowModel;
const selectedReasoning = useHighTier ? highReasoning : lowReasoning;

console.log(`Premium requests left: ${premiumKnown ? premiumPercentLeft.toFixed(2) + "%" : "unknown"}`);
console.log(`Usage source: ${source}`);
console.log(`Selected model: ${selectedModel}`);
console.log(`Selected reasoning: ${selectedReasoning}`);

writeOutput("premium_known", premiumKnown);
writeOutput("premium_percent_left", premiumPercentLeft.toFixed(2));
writeOutput("premium_source", source);
writeOutput("selected_model", selectedModel);
writeOutput("selected_reasoning", selectedReasoning);
