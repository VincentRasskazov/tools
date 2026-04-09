#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const repoRoot = process.cwd();
const toolsDir = path.join(repoRoot, "tools");

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

// 🚀 ENTERPRISE FIX: Read the master JSON to prevent duplicates
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

// 🚀 REAL AI: Ask Copilot CLI for JSON Tool Specifications
function askCopilotForToolSpec(attempt, existingTools) {
  const categories = ["Games", "Security", "Productivity", "Developer", "Finance", "Data", "Health", "Writing", "Education", "Marketing", "Math", "Science"];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  // Sample 20 random existing tools to tell the AI what to avoid
  const avoidList = existingTools.sort(() => 0.5 - Math.random()).slice(0, 20).join(", ");

  const prompt = `You are an expert web tool designer. Invent a completely unique, highly useful, single-input calculator or estimator for the category: ${category}.
Do NOT invent anything similar to these existing tools: ${avoidList}.
Return ONLY a valid JSON object. No markdown, no conversational text. Use exactly this format:
{
  "title": "Short Catchy Name",
  "description": "One sentence describing what it calculates.",
  "inputLabel": "What the user enters (e.g. 'Word Count', 'Base Damage')",
  "outputLabel": "What is calculated",
  "expression": "A valid JavaScript math expression using 'x' as the input variable (e.g. 'x * 1.5' or 'Math.max(0, x / 2)')",
  "outputUnit": "Unit of the result (e.g. '%', 'minutes', 'points', leave empty if none)",
  "resultPrefix": "Prefix (e.g. '$', leave empty if none)"
}`;

  console.log(`[Copilot CLI] Asking AI to invent a ${category} tool... (Attempt ${attempt})`);
  
  try {
    const rawOutput = execSync(`gh copilot suggest -t general "${prompt}"`, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    
    // Extract JSON from potential markdown wrapper
    const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const spec = JSON.parse(jsonMatch[0]);
    spec.category = category;
    spec.slug = slugify(spec.title);
    return spec;
  } catch (error) {
    console.log(`[Copilot CLI] AI generation failed or returned invalid JSON.`);
    return null;
  }
}

// 🚀 PERFECT SEO & UI TEMPLATE
function renderTool(spec, model, reasoning, stamp) {
  const title = escapeHtml(spec.title || "AI Tool");
  const seoTitle = `${title} | Free Online Calculator & Tool`;
  
  const description = escapeHtml(spec.description || "A free online tool.");
  const seoDescription = `${description} Use this free online utility to calculate your results instantly in the browser. No signup required.`;
  
  const category = escapeHtml(spec.category);
  const inputLabel = escapeHtml(spec.inputLabel || "Input");
  const outputLabel = escapeHtml(spec.outputLabel || "Result");
  const resultPrefix = escapeHtml(spec.resultPrefix || "");
  const outputUnit = escapeHtml(spec.outputUnit || "");
  const expression = spec.expression || "x"; // Fallback if AI hallucinates
  const ogImage = "https://placehold.co/1200x630/2563eb/white?text=Vincent%27s+Tools+Hub";

  return `---
layout: null
title: ${toYamlString(title)}
category: ${toYamlString(category)}
description: ${toYamlString(description)}
permalink: ${toYamlString(`/tools/${spec.fileName}`)}
generated_by: ${toYamlString("copilot-cli-true-ai")}
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
    :root { --primary: #3b82f6; --primary-hover: #2563eb; --bg: #f8fafc; --surface: #ffffff; --text: #0f172a; --border: #e2e8f0; --success: #10b981; --danger: #ef4444; --warning: #f59e0b; }
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #f4f7f9 0%, #e2e8f0 100%); min-height: 100vh; color: var(--text); margin: 0; padding: 20px 20px 80px 20px; line-height: 1.5; }
    .tool-container { max-width: 680px; margin: 40px auto; background: var(--surface); padding: 40px; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.5); }
    h1 { text-align: center; color: var(--primary); margin: 0 0 10px 0; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(59,130,246,0.1); }
    .seo-subtitle { text-align: center; color: #64748b; font-size: 1rem; margin-bottom: 30px; }
    label { display: flex; align-items: center; gap: 8px; font-weight: 700; margin-bottom: 8px; color: #334155; font-size: 0.95rem; }
    input[type="number"] { width: 100%; padding: 16px; border: 2px solid var(--border); border-radius: 12px; margin-bottom: 20px; font-size: 1rem; transition: all 0.2s ease; box-sizing: border-box; background: #fcfcfc; color: var(--text); box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
    input[type="number"]:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(59,130,246,0.15), inset 0 2px 4px rgba(0,0,0,0.02); background: #fff; }
    button { width: 100%; padding: 18px; background: var(--primary); color: white; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 800; cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 4px 6px -1px rgba(59,130,246,0.3); margin-bottom: 10px; letter-spacing: 0.5px; }
    button:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 8px 15px -3px rgba(59,130,246,0.4); }
    button:active { transform: translateY(0); box-shadow: 0 2px 4px -1px rgba(59,130,246,0.3); }
    .res { margin-top: 25px; padding: 28px; background: linear-gradient(to right, #f8fafc, #f1f5f9); border-radius: 16px; text-align: center; font-size: 1.4rem; font-weight: 800; border: 2px dashed #cbd5e1; color: var(--primary); word-break: break-word; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
    .card { background: #fff; padding: 25px; border-radius: 16px; border: 1px solid var(--border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 20px; transition: 0.2s; }
    .card:hover { border-color: #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>${title}</h1>
    <p class="seo-subtitle">${description}</p>
    
    <div class="card">
      <label for="valueInput">${inputLabel}</label>
      <input id="valueInput" type="number" step="any" placeholder="Enter a value">
      <button id="convertButton" type="button">Calculate Now</button>
    </div>
    <div class="res" id="resultValue">${outputLabel}: -</div>
  </div>

  <script>
    (() => {
      const input = document.getElementById("valueInput");
      const button = document.getElementById("convertButton");
      const result = document.getElementById("resultValue");
      const resultPrefix = ${JSON.stringify(resultPrefix)};
      const outputUnit = ${JSON.stringify(outputUnit)};

      function formatNumber(value) {
        if (!Number.isFinite(value)) return "Invalid result";
        return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(value);
      }

      function convert() {
        const x = Number(input.value);
        if (!Number.isFinite(x)) {
          result.textContent = "${outputLabel}: Enter a valid number";
          return;
        }

        try {
          const y = ${expression};
          const unitSuffix = outputUnit ? " " + outputUnit : "";
          result.textContent = "${outputLabel}: " + resultPrefix + formatNumber(y) + unitSuffix;
        } catch(e) {
          result.textContent = "Calculation Error";
        }
      }

      button.addEventListener("click", convert);
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          convert();
        }
      });

      convert();
    })();
  </script>

  <a href="/tools/" style="position: fixed; bottom: 20px; right: 20px; background: var(--primary); color: #fff; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 800; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4); font-size: 1rem; z-index: 9999; display: flex; align-items: center; gap: 8px; transition: transform 0.2s ease;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
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

if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });

// 🚀 Set default to 5 for now! AI takes time.
const count = Number(parseArgValue("--count", "5")); 
const requestedCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 5;
const stamp = parseArgValue("--date", dateStampUtc(new Date()));
const model = String(parseArgValue("--model", "gpt-4.1"));
const reasoning = String(parseArgValue("--reasoning", "standard"));

const existingToolNames = getExistingToolNames();
const createdFiles = [];
let consecutiveFailures = 0;

console.log(`Starting True AI Generation. Requested: ${requestedCount} tools.`);

while (createdFiles.length < requestedCount && consecutiveFailures < 5) {
  const spec = askCopilotForToolSpec(createdFiles.length + 1, existingToolNames);
  
  if (!spec) {
    consecutiveFailures++;
    continue;
  }
  
  consecutiveFailures = 0; // Reset on success
  
  const ordinal = String(createdFiles.length + 1).padStart(2, "0");
  const baseSlug = slugify(`daily-${stamp}-${ordinal}-${spec.slug}`);
  const categorySlug = slugify(spec.category);
  const categoryDir = path.join(toolsDir, categorySlug);
  
  spec.fileName = findUniqueFileInCategory(categorySlug, baseSlug);
  const relativePath = `${categorySlug}/${spec.fileName}`;

  fs.mkdirSync(categoryDir, { recursive: true });
  
  const content = renderTool(spec, model, reasoning, stamp);
  fs.writeFileSync(path.join(categoryDir, spec.fileName), content, "utf8");

  existingToolNames.push(spec.title);
  createdFiles.push(relativePath);
  
  console.log(`✅ Success: ${spec.title}`);
}

console.log(`\nCreated ${createdFiles.length} TRUE AI tools.`);
writeOutput("created_count", createdFiles.length);
writeOutput("created_files", createdFiles.join(","));
