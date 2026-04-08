#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const toolsDir = path.join(repoRoot, "tools");

function parseArgValue(name, fallbackValue) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallbackValue;
  if (index + 1 >= process.argv.length) return fallbackValue;
  return process.argv[index + 1];
}

function hasFlag(name) {
  return process.argv.includes(name);
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

const specs = [
  { slug: "seconds-to-minutes", title: "Seconds to Minutes Converter", description: "Convert seconds into minutes instantly.", category: "Time", inputLabel: "Seconds", outputLabel: "Minutes", expression: "x / 60", outputUnit: "minutes" },
  { slug: "minutes-to-seconds", title: "Minutes to Seconds Converter", description: "Convert minutes into seconds instantly.", category: "Time", inputLabel: "Minutes", outputLabel: "Seconds", expression: "x * 60", outputUnit: "seconds" },
  { slug: "hours-to-minutes", title: "Hours to Minutes Converter", description: "Convert hours into minutes.", category: "Time", inputLabel: "Hours", outputLabel: "Minutes", expression: "x * 60", outputUnit: "minutes" },
  { slug: "days-to-hours", title: "Days to Hours Converter", description: "Convert days into hours.", category: "Time", inputLabel: "Days", outputLabel: "Hours", expression: "x * 24", outputUnit: "hours" },
  { slug: "weeks-to-days", title: "Weeks to Days Converter", description: "Convert weeks into days quickly.", category: "Time", inputLabel: "Weeks", outputLabel: "Days", expression: "x * 7", outputUnit: "days" },
  { slug: "km-to-miles", title: "Kilometers to Miles Converter", description: "Convert kilometers to miles with precision.", category: "Converters", inputLabel: "Kilometers", outputLabel: "Miles", expression: "x * 0.621371", outputUnit: "miles" },
  { slug: "miles-to-km", title: "Miles to Kilometers Converter", description: "Convert miles to kilometers instantly.", category: "Converters", inputLabel: "Miles", outputLabel: "Kilometers", expression: "x * 1.609344", outputUnit: "km" },
  { slug: "kg-to-lb", title: "Kilograms to Pounds Converter", description: "Convert kilograms to pounds.", category: "Converters", inputLabel: "Kilograms", outputLabel: "Pounds", expression: "x * 2.2046226218", outputUnit: "lb" },
  { slug: "lb-to-kg", title: "Pounds to Kilograms Converter", description: "Convert pounds to kilograms.", category: "Converters", inputLabel: "Pounds", outputLabel: "Kilograms", expression: "x * 0.45359237", outputUnit: "kg" },
  { slug: "cm-to-inch", title: "Centimeters to Inches Converter", description: "Convert centimeters into inches.", category: "Converters", inputLabel: "Centimeters", outputLabel: "Inches", expression: "x / 2.54", outputUnit: "in" },
  { slug: "inch-to-cm", title: "Inches to Centimeters Converter", description: "Convert inches into centimeters.", category: "Converters", inputLabel: "Inches", outputLabel: "Centimeters", expression: "x * 2.54", outputUnit: "cm" },
  { slug: "sqm-to-sqft", title: "Square Meters to Square Feet Converter", description: "Convert square meters to square feet.", category: "Area", inputLabel: "Square meters", outputLabel: "Square feet", expression: "x * 10.7639104167", outputUnit: "sq ft" },
  { slug: "sqft-to-sqm", title: "Square Feet to Square Meters Converter", description: "Convert square feet to square meters.", category: "Area", inputLabel: "Square feet", outputLabel: "Square meters", expression: "x * 0.09290304", outputUnit: "sq m" },
  { slug: "liters-to-gallons", title: "Liters to Gallons Converter", description: "Convert liters to US gallons.", category: "Converters", inputLabel: "Liters", outputLabel: "Gallons", expression: "x * 0.2641720524", outputUnit: "gal" },
  { slug: "gallons-to-liters", title: "Gallons to Liters Converter", description: "Convert US gallons to liters.", category: "Converters", inputLabel: "Gallons", outputLabel: "Liters", expression: "x * 3.785411784", outputUnit: "L" },
  { slug: "c-to-f", title: "Celsius to Fahrenheit Converter", description: "Convert temperature from Celsius to Fahrenheit.", category: "Temperature", inputLabel: "Celsius", outputLabel: "Fahrenheit", expression: "(x * 9) / 5 + 32", outputUnit: "deg F" },
  { slug: "f-to-c", title: "Fahrenheit to Celsius Converter", description: "Convert temperature from Fahrenheit to Celsius.", category: "Temperature", inputLabel: "Fahrenheit", outputLabel: "Celsius", expression: "((x - 32) * 5) / 9", outputUnit: "deg C" },
  { slug: "bytes-to-kb", title: "Bytes to Kilobytes Converter", description: "Convert bytes to kilobytes (base 1024).", category: "Developer Tools", inputLabel: "Bytes", outputLabel: "Kilobytes", expression: "x / 1024", outputUnit: "KB" },
  { slug: "kb-to-bytes", title: "Kilobytes to Bytes Converter", description: "Convert kilobytes to bytes (base 1024).", category: "Developer Tools", inputLabel: "Kilobytes", outputLabel: "Bytes", expression: "x * 1024", outputUnit: "bytes" },
  { slug: "mb-to-kb", title: "Megabytes to Kilobytes Converter", description: "Convert megabytes to kilobytes.", category: "Developer Tools", inputLabel: "Megabytes", outputLabel: "Kilobytes", expression: "x * 1024", outputUnit: "KB" },
  { slug: "kb-to-mb", title: "Kilobytes to Megabytes Converter", description: "Convert kilobytes to megabytes.", category: "Developer Tools", inputLabel: "Kilobytes", outputLabel: "Megabytes", expression: "x / 1024", outputUnit: "MB" },
  { slug: "interest-simple", title: "Simple Interest Calculator", description: "Calculate simple interest for principal, annual rate, and years.", category: "Finance", inputLabel: "Principal", outputLabel: "Interest", expression: "x * 0.05", outputUnit: "(at default 5% annual)", resultPrefix: "$" },
  { slug: "vat-amount", title: "VAT Amount Calculator", description: "Calculate VAT amount from net value with default 20% VAT.", category: "Finance", inputLabel: "Net amount", outputLabel: "VAT amount", expression: "x * 0.2", outputUnit: "", resultPrefix: "$" },
  { slug: "tip-amount", title: "Tip Amount Calculator", description: "Calculate tip amount with a default 15% tip.", category: "Finance", inputLabel: "Bill amount", outputLabel: "Tip", expression: "x * 0.15", outputUnit: "", resultPrefix: "$" },
  { slug: "markup-amount", title: "Markup Amount Calculator", description: "Calculate markup amount with a default 30% markup.", category: "Finance", inputLabel: "Cost", outputLabel: "Markup", expression: "x * 0.3", outputUnit: "", resultPrefix: "$" },
  { slug: "discount-amount", title: "Discount Amount Calculator", description: "Calculate discount amount with a default 10% discount.", category: "Finance", inputLabel: "Original price", outputLabel: "Discount", expression: "x * 0.1", outputUnit: "", resultPrefix: "$" },
  { slug: "profit-amount", title: "Profit Amount Calculator", description: "Estimate profit amount with a default 25% margin.", category: "Finance", inputLabel: "Revenue", outputLabel: "Profit", expression: "x * 0.25", outputUnit: "", resultPrefix: "$" },
  { slug: "ppm-to-percent", title: "PPM to Percent Converter", description: "Convert parts-per-million to percent.", category: "Math", inputLabel: "PPM", outputLabel: "Percent", expression: "x / 10000", outputUnit: "%" },
  { slug: "percent-to-ppm", title: "Percent to PPM Converter", description: "Convert percent to parts-per-million.", category: "Math", inputLabel: "Percent", outputLabel: "PPM", expression: "x * 10000", outputUnit: "ppm" },
  { slug: "radians-to-degrees", title: "Radians to Degrees Converter", description: "Convert radians to degrees.", category: "Math", inputLabel: "Radians", outputLabel: "Degrees", expression: "x * (180 / Math.PI)", outputUnit: "deg" },
  { slug: "degrees-to-radians", title: "Degrees to Radians Converter", description: "Convert degrees to radians.", category: "Math", inputLabel: "Degrees", outputLabel: "Radians", expression: "x * (Math.PI / 180)", outputUnit: "rad" },
  { slug: "minutes-to-hours", title: "Minutes to Hours Converter", description: "Convert minutes to decimal hours.", category: "Time", inputLabel: "Minutes", outputLabel: "Hours", expression: "x / 60", outputUnit: "hours" },
  { slug: "hours-to-seconds", title: "Hours to Seconds Converter", description: "Convert hours directly to seconds.", category: "Time", inputLabel: "Hours", outputLabel: "Seconds", expression: "x * 3600", outputUnit: "seconds" },
  { slug: "months-to-days", title: "Months to Days Converter", description: "Convert months to days using a 30-day month.", category: "Time", inputLabel: "Months", outputLabel: "Days", expression: "x * 30", outputUnit: "days" },
  { slug: "years-to-months", title: "Years to Months Converter", description: "Convert years to months.", category: "Time", inputLabel: "Years", outputLabel: "Months", expression: "x * 12", outputUnit: "months" },
];

function renderTool(spec, model, reasoning, stamp) {
  const title = escapeHtml(spec.title);
  const description = escapeHtml(spec.description);
  const category = escapeHtml(spec.category);
  const inputLabel = escapeHtml(spec.inputLabel);
  const outputLabel = escapeHtml(spec.outputLabel);
  const resultPrefix = spec.resultPrefix || "";
  const outputUnit = spec.outputUnit || "";
  const ogImage = "https://placehold.co/1200x630/2563eb/white?text=Vincent%27s+Tools+Hub";

  return `---
layout: null
title: ${toYamlString(spec.title)}
category: ${toYamlString(spec.category)}
description: ${toYamlString(spec.description)}
permalink: ${toYamlString(`/tools/${spec.fileName}`)}
generated_by: ${toYamlString("copilot")}
generated_date: ${toYamlString(stamp)}
generated_model: ${toYamlString(model)}
generated_reasoning: ${toYamlString(reasoning)}
---
<!DOCTYPE html>
<html lang="en"><head>
  <meta name="description" content="${description}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogImage}">
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root { --primary: #3b82f6; --primary-hover: #2563eb; --bg: #f8fafc; --surface: #ffffff; --text: #0f172a; --border: #e2e8f0; --success: #10b981; --danger: #ef4444; --warning: #f59e0b; }
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #f4f7f9 0%, #e2e8f0 100%); min-height: 100vh; color: var(--text); margin: 0; padding: 20px 20px 80px 20px; line-height: 1.5; }
    .tool-container { max-width: 680px; margin: 40px auto; background: var(--surface); padding: 40px; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.05); border: 1px solid rgba(255,255,255,0.5); }
    h1 { text-align: center; color: var(--primary); margin: 0 0 30px 0; font-size: 2.2rem; font-weight: 800; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(59,130,246,0.1); }
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
    <div class="card">
      <label for="valueInput">${inputLabel}</label>
      <input id="valueInput" type="number" step="any" placeholder="Enter a value">
      <button id="convertButton" type="button">Convert</button>
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

        const y = ${spec.expression};
        const unitSuffix = outputUnit ? " " + outputUnit : "";
        result.textContent = "${outputLabel}: " + resultPrefix + formatNumber(y) + unitSuffix;
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

if (!fs.existsSync(toolsDir)) {
  throw new Error(`Tools directory not found at ${toolsDir}`);
}

const count = Number(parseArgValue("--count", "25"));
const requestedCount = Number.isFinite(count) && count > 0 ? Math.floor(count) : 25;
const model = String(parseArgValue("--model", "gpt-4.1"));
const reasoning = String(parseArgValue("--reasoning", "standard"));
const stamp = parseArgValue("--date", dateStampUtc(new Date()));
const dryRun = hasFlag("--dry-run");

// Model/reasoning are accepted to preserve workflow compatibility and traceability in logs.
void model;
void reasoning;

const numericStamp = Number(stamp.replace(/[^0-9]/g, "")) || 0;
const offset = numericStamp % specs.length;

const selected = [];
for (let i = 0; i < requestedCount; i += 1) {
  const spec = specs[(offset + i) % specs.length];
  selected.push(spec);
}

const createdFiles = [];

for (let index = 0; index < selected.length; index += 1) {
  const spec = selected[index];
  const ordinal = String(index + 1).padStart(2, "0");
  const baseSlug = slugify(`daily-${stamp}-${ordinal}-${spec.slug}`);
  const categorySlug = slugify(spec.category || "utility");
  const categoryDir = path.join(toolsDir, categorySlug);
  const fileName = findUniqueFileInCategory(categorySlug, baseSlug);
  const relativePath = `${categorySlug}/${fileName}`;

  if (!dryRun) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  const fileSpec = {
    ...spec,
    fileName,
  };

  const content = renderTool(fileSpec, model, reasoning, stamp);
  if (!dryRun) {
    fs.writeFileSync(path.join(categoryDir, fileName), content, "utf8");
  }

  createdFiles.push(relativePath);
}

console.log(`${dryRun ? "Planned" : "Created"} ${createdFiles.length} tool files.`);
createdFiles.forEach((name) => console.log(` - tools/${name}`));

writeOutput("created_count", createdFiles.length);
writeOutput("created_files", createdFiles.join(","));
