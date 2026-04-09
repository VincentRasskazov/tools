#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsDir = path.join(repoRoot, "tools");

// Helper to parse CLI arguments
function parseArgValue(name, fallbackValue) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) return fallbackValue;
  return process.argv[index + 1];
}

function slugify(input) {
  return String(input).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "tool";
}

function toYamlString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function dateStampUtc(dateObj) {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

// Prevent duplicates by reading your existing tools
function getExistingToolNames() {
  const existingTitles = new Set();
  const allToolsPath = path.join(toolsDir, "category-manifests", "all-tools.json");
  if (fs.existsSync(allToolsPath)) {
    try {
      const allTools = JSON.parse(fs.readFileSync(allToolsPath, "utf8"));
      for (const tool of allTools) existingTitles.add(tool.name);
    } catch (err) {}
  }
  return Array.from(existingTitles);
}

// Clean AI output of markdown backticks
function cleanAiOutput(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```html")) cleaned = cleaned.replace(/^```html/i, "");
  if (cleaned.startsWith("```")) cleaned = cleaned.replace(/^```/i, "");
  if (cleaned.endsWith("```")) cleaned = cleaned.replace(/```$/i, "");
  return cleaned.trim();
}

async function askCopilotForLimitlessTool(attempt, existingTools, token) {
  const categories = ["Games", "Cybersecurity", "Productivity", "Developer", "Finance", "Data", "Health", "Writing", "Education", "Marketing"];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const avoidList = existingTools.sort(() => 0.5 - Math.random()).slice(0, 20).join(", ");

  const prompt = `You are an expert web developer. Invent a completely unique, highly interactive single-page browser tool for the category: ${category}.
It MUST NOT be a simple calculator. It should be an interactive mini-game, a cybersecurity string analyzer, a productivity timer, a visualizer, or a complex utility.
Do NOT invent anything similar to these existing tools: ${avoidList}.

You must reply EXACTLY in this format, with no other conversational text:
TITLE: [Catchy Tool Name]
DESCRIPTION: [One sentence describing what it does]
---
<style>
/* Modern, beautiful inline CSS */
</style>
<div id="tool-app">
</div>
<script>
// Interactive JavaScript logic here
</script>`;

  console.log(`[API] Inventing ${category} tool (Attempt ${attempt})...`);
  
  try {
    const response = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a senior frontend developer." },
          { role: "user", content: prompt }
        ],
        temperature: 0.8
      })
    });

    if (!response.ok) {
        console.log(`[API Error] ${response.status}: ${response.statusText}`);
        return null;
    }

    const data = await response.json();
    const rawOutput = data.choices[0].message.content;
    const cleanedOutput = cleanAiOutput(rawOutput);
    const parts = cleanedOutput.split("---");
    
    if (parts.length < 2) return null;

    const meta = parts[0];
    const toolBody = parts.slice(1).join("---").trim();
    const titleMatch = meta.match(/TITLE:\s*(.+)/i);
    const descMatch = meta.match(/DESCRIPTION:\s*(.+)/i);

    if (!titleMatch || !descMatch) return null;

    return {
      title: titleMatch[1].trim(),
      description: descMatch[1].trim(),
      category,
      slug: slugify(titleMatch[1].trim()),
      toolBody
    };
  } catch (error) {
    console.log(`[API Error] ${error.message}`);
    return null;
  }
}

function renderLimitlessTool(spec, model, stamp) {
  const title = escapeHtml(spec.title);
  const seoTitle = `${title} | Free Online Interactive Tool`;
  const seoDescription = `${escapeHtml(spec.description)} Use this free online utility directly in your browser. No signup required.`;
  const ogImage = "https://placehold.co/1200x630/2563eb/white?text=Vincent%27s+Tools+Hub";

  return `---
layout: null
title: ${toYamlString(spec.title)}
category: ${toYamlString(spec.category)}
description: ${toYamlString(spec.description)}
permalink: ${toYamlString(`/tools/${spec.fileName}`)}
generated_by: ${toYamlString("api-true-ai")}
generated_date: ${toYamlString(stamp)}
generated_model: ${toYamlString(model)}
---
<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${seoTitle}</title>
  <meta name="description" content="${seoDescription}">
  <meta property="og:title" content="${seoTitle}">
  <meta property="og:description" content="${seoDescription}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seoTitle}">
  <meta name="twitter:description" content="${seoDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <style>
    :root { --primary: #3b82f6; --bg: #f8fafc; --surface: #ffffff; --text: #0f172a; --border: #e2e8f0; }
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #f4f7f9 0%, #e2e8f0 100%); min-height: 100vh; color: var(--text); margin: 0; padding: 20px 20px 80px 20px; line-height: 1.5; }
    .tool-container { max-width: 800px; margin: 40px auto; background: var(--surface); padding: 40px; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.5); }
    h1 { text-align: center; color: var(--primary); margin: 0 0 10px 0; font-size: 2.2rem; font-weight: 800; }
    .seo-subtitle { text-align: center; color: #64748b; font-size: 1rem; margin-bottom: 30px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>${title}</h1>
    <p class="seo-subtitle">${escapeHtml(spec.description)}</p>
    ${spec.toolBody}
  </div>
  <a href="/tools/" style="position: fixed; bottom: 20px; right: 20px; background: var(--primary); color: #fff; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 800; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4); font-size: 1rem; z-index: 9999;">
    🏠 Return to tool chooser
  </a>
</body>
</html>
`;
}

function findUniqueFileInCategory(categorySlug, baseSlug) {
  let candidate = `${baseSlug}.html`;
  let suffix = 2;
  const categoryDir = path.join(toolsDir, categorySlug);
  while (fs.existsSync(path.join(categoryDir, candidate))) {
    candidate = `${baseSlug}-${suffix}.html`;
    suffix += 1;
  }
  return candidate;
}

function writeOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${String(value)}\n`, "utf8");
}

async function main() {
  if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });

  const count = Number(parseArgValue("--count", "5"));
  const stamp = parseArgValue("--date", dateStampUtc(new Date()));
  const model = String(parseArgValue("--model", "gpt-4.1"));
  const ghToken = process.env.GH_TOKEN;

  if (!ghToken) {
    console.error("FATAL: GH_TOKEN environment variable is missing.");
    process.exit(1);
  }

  const existingToolNames = getExistingToolNames();
  const createdFiles = [];
  let consecutiveFailures = 0;

  console.log(`Generating ${count} AI tools via API...`);

  while (createdFiles.length < count && consecutiveFailures < 5) {
    const spec = await askCopilotForLimitlessTool(createdFiles.length + 1, existingToolNames, ghToken);
    
    if (!spec) {
      consecutiveFailures++;
      continue;
    }
    
    consecutiveFailures = 0;
    const ordinal = String(createdFiles.length + 1).padStart(2, "0");
    const baseSlug = slugify(`daily-${stamp}-${ordinal}-${spec.slug}`);
    const categorySlug = slugify(spec.category);
    const categoryDir = path.join(toolsDir, categorySlug);
    
    spec.fileName = findUniqueFileInCategory(categorySlug, baseSlug);
    const relativePath = `${categorySlug}/${spec.fileName}`;

    if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir, { recursive: true });
    
    const content = renderLimitlessTool(spec, model, stamp);
    fs.writeFileSync(path.join(categoryDir, spec.fileName), content, "utf8");

    existingToolNames.push(spec.title);
    createdFiles.push(relativePath);
    console.log(`✅ ${spec.title} (${spec.category})`);
  }

  writeOutput("created_count", createdFiles.length);
  writeOutput("created_files", createdFiles.join(","));
  console.log(`\nFinished: ${createdFiles.length} tools created.`);
}

main().catch(console.error);
