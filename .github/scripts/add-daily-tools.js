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

function stripQuotes(value) {
  const text = String(value || "").trim();
  if (text.length >= 2) {
    if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
      return text.slice(1, -1);
    }
  }
  return text;
}

function extractFrontmatter(content) {
  const match = String(content || "").match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  return match ? match[1] : "";
}

function extractField(frontmatter, field) {
  if (!frontmatter) return "";
  const pattern = new RegExp(`^${field}:\\s*(.+)$`, "m");
  const match = frontmatter.match(pattern);
  return match ? stripQuotes(match[1]) : "";
}

function walkHtmlFiles(dirPath) {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "category-manifests") continue;
      files.push(...walkHtmlFiles(absolutePath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(absolutePath);
    }
  }

  return files;
}

function normalizeIdentity(input) {
  return String(input || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function deriveFamilyKey(rawValue) {
  const normalized = normalizeIdentity(rawValue);
  if (!normalized) return "";
  return normalized.replace(/-(index|score|efficiency|buffer|projection)(?:-[0-9]+)?$/i, "");
}

function dateStampUtc(dateObj) {
  const year = dateObj.getUTCFullYear();
  const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function collectGeneratedIdentitySets() {
  const generatedTitleKeys = new Set();
  const generatedConceptSlugs = new Set();
  const generatedFamilyKeys = new Set();
  const htmlFiles = walkHtmlFiles(toolsDir);

  for (const filePath of htmlFiles) {
    const baseName = path.basename(filePath, ".html");
    const isDailyName = /^daily-\d{8}-\d{2}-/i.test(baseName);

    let frontmatter = "";
    try {
      const content = fs.readFileSync(filePath, "utf8");
      frontmatter = extractFrontmatter(content);
    } catch {
      frontmatter = "";
    }

    const generatedBy = extractField(frontmatter, "generated_by").toLowerCase();
    const isCopilotGenerated = generatedBy.includes("copilot") || isDailyName;
    if (!isCopilotGenerated) continue;

    const title = extractField(frontmatter, "title");
    const titleKey = normalizeIdentity(title);
    if (titleKey) generatedTitleKeys.add(titleKey);

    const match = baseName.match(/^daily-\d{8}-\d{2}-(.+?)(?:-\d+)?$/i);
    if (match) {
      const conceptSlug = normalizeIdentity(match[1]);
      const familyKey = deriveFamilyKey(conceptSlug);
      if (conceptSlug) generatedConceptSlugs.add(conceptSlug);
      if (familyKey) generatedFamilyKeys.add(familyKey);
    }
  }

  return {
    generatedTitleKeys,
    generatedConceptSlugs,
    generatedFamilyKeys,
  };
}

const specs = [
  { slug: "seconds-to-minutes", title: "Seconds to Minutes Converter", description: "Convert seconds into minutes instantly.", category: "Time", inputLabel: "Seconds", outputLabel: "Minutes", expression: "x / 60", outputUnit: "minutes" },
  { slug: "minutes-to-seconds", title: "Minutes to Seconds Converter", description: "Convert minutes into seconds instantly.", category: "Time", inputLabel: "Minutes", outputLabel: "Seconds", expression: "x * 60", outputUnit: "seconds" },
  { slug: "hours-to-minutes", title: "Hours to Minutes Converter", description: "Convert hours into minutes.", category: "Time", inputLabel: "Hours", outputLabel: "Minutes", expression: "x * 60", outputUnit: "minutes" },
  { slug: "days-to-hours", title: "Days to Hours Converter", description: "Convert days into hours.", category: "Time", inputLabel: "Days", outputLabel: "Hours", expression: "x * 24", outputUnit: "hours" },
  { slug: "weeks-to-days", title: "Weeks to Days Converter", description: "Convert weeks into days quickly.", category: "Time", inputLabel: "Weeks", outputLabel: "Days", expression: "x * 7", outputUnit: "days" },
  { slug: "km-to-miles", title: "Kilometers to Miles Converter", description: "Convert kilometers to miles with precision.", category: "Converter", inputLabel: "Kilometers", outputLabel: "Miles", expression: "x * 0.621371", outputUnit: "miles" },
  { slug: "miles-to-km", title: "Miles to Kilometers Converter", description: "Convert miles to kilometers instantly.", category: "Converter", inputLabel: "Miles", outputLabel: "Kilometers", expression: "x * 1.609344", outputUnit: "km" },
  { slug: "kg-to-lb", title: "Kilograms to Pounds Converter", description: "Convert kilograms to pounds.", category: "Converter", inputLabel: "Kilograms", outputLabel: "Pounds", expression: "x * 2.2046226218", outputUnit: "lb" },
  { slug: "lb-to-kg", title: "Pounds to Kilograms Converter", description: "Convert pounds to kilograms.", category: "Converter", inputLabel: "Pounds", outputLabel: "Kilograms", expression: "x * 0.45359237", outputUnit: "kg" },
  { slug: "cm-to-inch", title: "Centimeters to Inches Converter", description: "Convert centimeters into inches.", category: "Converter", inputLabel: "Centimeters", outputLabel: "Inches", expression: "x / 2.54", outputUnit: "in" },
  { slug: "inch-to-cm", title: "Inches to Centimeters Converter", description: "Convert inches into centimeters.", category: "Converter", inputLabel: "Inches", outputLabel: "Centimeters", expression: "x * 2.54", outputUnit: "cm" },
  { slug: "sqm-to-sqft", title: "Square Meters to Square Feet Converter", description: "Convert square meters to square feet.", category: "Area", inputLabel: "Square meters", outputLabel: "Square feet", expression: "x * 10.7639104167", outputUnit: "sq ft" },
  { slug: "sqft-to-sqm", title: "Square Feet to Square Meters Converter", description: "Convert square feet to square meters.", category: "Area", inputLabel: "Square feet", outputLabel: "Square meters", expression: "x * 0.09290304", outputUnit: "sq m" },
  { slug: "liters-to-gallons", title: "Liters to Gallons Converter", description: "Convert liters to US gallons.", category: "Converter", inputLabel: "Liters", outputLabel: "Gallons", expression: "x * 0.2641720524", outputUnit: "gal" },
  { slug: "gallons-to-liters", title: "Gallons to Liters Converter", description: "Convert US gallons to liters.", category: "Converter", inputLabel: "Gallons", outputLabel: "Liters", expression: "x * 3.785411784", outputUnit: "L" },
  { slug: "c-to-f", title: "Celsius to Fahrenheit Converter", description: "Convert temperature from Celsius to Fahrenheit.", category: "Temperature", inputLabel: "Celsius", outputLabel: "Fahrenheit", expression: "(x * 9) / 5 + 32", outputUnit: "deg F" },
  { slug: "f-to-c", title: "Fahrenheit to Celsius Converter", description: "Convert temperature from Fahrenheit to Celsius.", category: "Temperature", inputLabel: "Fahrenheit", outputLabel: "Celsius", expression: "((x - 32) * 5) / 9", outputUnit: "deg C" },
  { slug: "bytes-to-kb", title: "Bytes to Kilobytes Converter", description: "Convert bytes to kilobytes (base 1024).", category: "Developer", inputLabel: "Bytes", outputLabel: "Kilobytes", expression: "x / 1024", outputUnit: "KB" },
  { slug: "kb-to-bytes", title: "Kilobytes to Bytes Converter", description: "Convert kilobytes to bytes (base 1024).", category: "Developer", inputLabel: "Kilobytes", outputLabel: "Bytes", expression: "x * 1024", outputUnit: "bytes" },
  { slug: "mb-to-kb", title: "Megabytes to Kilobytes Converter", description: "Convert megabytes to kilobytes.", category: "Developer", inputLabel: "Megabytes", outputLabel: "Kilobytes", expression: "x * 1024", outputUnit: "KB" },
  { slug: "kb-to-mb", title: "Kilobytes to Megabytes Converter", description: "Convert kilobytes to megabytes.", category: "Developer", inputLabel: "Kilobytes", outputLabel: "Megabytes", expression: "x / 1024", outputUnit: "MB" },
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
  { slug: "xp-level-progress", title: "XP to Level Progress Estimator", description: "Estimate level progression from XP using a simple scaling model.", category: "Games", inputLabel: "XP", outputLabel: "Estimated level", expression: "x / 100", outputUnit: "levels" },
  { slug: "critical-hit-chance", title: "Critical Hit Chance Estimator", description: "Estimate final critical chance after buffs and cap it at 100%.", category: "Games", inputLabel: "Base critical chance (%)", outputLabel: "Final critical chance", expression: "Math.max(0, Math.min(100, x * 1.15))", outputUnit: "%" },
  { slug: "speedrun-pace", title: "Speedrun Pace Estimator", description: "Estimate projected finish time based on your current split pace.", category: "Games", inputLabel: "Current pace (minutes)", outputLabel: "Projected finish", expression: "x * 0.96", outputUnit: "minutes" },
  { slug: "password-entropy-score", title: "Password Entropy Score Estimator", description: "Estimate password entropy from character length using a baseline charset model.", category: "Security", inputLabel: "Password length", outputLabel: "Estimated entropy", expression: "x * 6.5", outputUnit: "bits" },
  { slug: "brute-force-window", title: "Brute Force Window Estimator", description: "Estimate brute-force time in hours from password entropy bits.", category: "Security", inputLabel: "Entropy bits", outputLabel: "Estimated crack time", expression: "Math.pow(2, Math.min(52, x)) / (1e9 * 3600)", outputUnit: "hours" },
  { slug: "phishing-risk-index", title: "Phishing Risk Index Calculator", description: "Turn suspicious-signal count into a quick phishing risk score.", category: "Security", inputLabel: "Suspicious signal count", outputLabel: "Phishing risk index", expression: "Math.max(0, Math.min(100, x * 12))", outputUnit: "%" },
  { slug: "token-expiry-buffer", title: "Token Expiry Buffer Calculator", description: "Calculate a safe refresh buffer window before token expiration.", category: "Security", inputLabel: "Token lifetime (minutes)", outputLabel: "Recommended refresh buffer", expression: "Math.max(1, x * 0.15)", outputUnit: "minutes" },
  { slug: "raid-readiness-score", title: "Raid Readiness Score", description: "Estimate readiness for high-difficulty raid attempts.", category: "Games", inputLabel: "Current power score", outputLabel: "Raid readiness", expression: "Math.max(0, Math.min(100, x * 0.85))", outputUnit: "%" },
  { slug: "aim-consistency-index", title: "Aim Consistency Index", description: "Estimate aim consistency based on your base tracking score.", category: "Games", inputLabel: "Tracking score", outputLabel: "Consistency index", expression: "x * 1.08", outputUnit: "index" },
  { slug: "resource-farming-efficiency", title: "Resource Farming Efficiency", description: "Estimate farming output efficiency for repetitive grind sessions.", category: "Games", inputLabel: "Resources per run", outputLabel: "Efficiency score", expression: "x * 0.92", outputUnit: "score" },
  { slug: "mfa-coverage-score", title: "MFA Coverage Score", description: "Estimate account protection strength from MFA coverage percentage.", category: "Security", inputLabel: "Accounts with MFA (%)", outputLabel: "Coverage score", expression: "Math.max(0, Math.min(100, x * 1.05))", outputUnit: "%" },
  { slug: "patch-priority-index", title: "Patch Priority Index", description: "Estimate urgency for patch rollout planning.", category: "Security", inputLabel: "Open critical findings", outputLabel: "Priority index", expression: "x * 4", outputUnit: "index" },
  { slug: "incident-response-window", title: "Incident Response Window", description: "Estimate recommended response window for suspicious activity.", category: "Security", inputLabel: "Risk score", outputLabel: "Response window", expression: "Math.max(1, 240 / Math.max(1, x))", outputUnit: "minutes" },
  { slug: "deep-work-block-planner", title: "Deep Work Block Planner", description: "Estimate ideal deep-work block length from available focus energy.", category: "Productivity", inputLabel: "Focus energy score", outputLabel: "Recommended block", expression: "Math.max(20, x * 2)", outputUnit: "minutes" },
  { slug: "meeting-load-estimator", title: "Meeting Load Estimator", description: "Estimate daily meeting load impact on maker-time.", category: "Productivity", inputLabel: "Meeting minutes", outputLabel: "Load impact", expression: "Math.max(0, Math.min(100, x / 4.8))", outputUnit: "%" },
  { slug: "context-switch-cost", title: "Context Switch Cost", description: "Estimate productivity loss from frequent task switching.", category: "Productivity", inputLabel: "Switches per day", outputLabel: "Estimated cost", expression: "x * 6", outputUnit: "minutes" },
  { slug: "backlog-burn-estimator", title: "Backlog Burn Estimator", description: "Estimate backlog reduction pace based on current throughput.", category: "Productivity", inputLabel: "Tasks completed per day", outputLabel: "Weekly burn", expression: "x * 5", outputUnit: "tasks" },
  { slug: "task-focus-index", title: "Task Focus Index", description: "Estimate daily focus quality from uninterrupted work intervals.", category: "Productivity", inputLabel: "Focused intervals", outputLabel: "Focus index", expression: "x * 8", outputUnit: "index" },
  { slug: "hydration-intake-estimator", title: "Hydration Intake Estimator", description: "Estimate target water intake from baseline daily activity.", category: "Health", inputLabel: "Body weight (kg)", outputLabel: "Recommended intake", expression: "x * 0.033", outputUnit: "L" },
  { slug: "sleep-debt-estimator", title: "Sleep Debt Estimator", description: "Estimate accumulated sleep debt over recent days.", category: "Health", inputLabel: "Hours slept last night", outputLabel: "Sleep debt", expression: "Math.max(0, 8 - x)", outputUnit: "hours" },
  { slug: "step-goal-progress", title: "Step Goal Progress", description: "Estimate step goal completion from current count.", category: "Health", inputLabel: "Steps today", outputLabel: "Goal completion", expression: "Math.max(0, Math.min(100, (x / 10000) * 100))", outputUnit: "%" },
  { slug: "recovery-readiness-score", title: "Recovery Readiness Score", description: "Estimate recovery readiness from rest and exertion signals.", category: "Health", inputLabel: "Recovery input score", outputLabel: "Readiness", expression: "Math.max(0, Math.min(100, x * 1.1))", outputUnit: "%" },
  { slug: "reading-time-estimator", title: "Reading Time Estimator", description: "Estimate article reading time from word count.", category: "Writing", inputLabel: "Word count", outputLabel: "Reading time", expression: "Math.max(1, x / 220)", outputUnit: "minutes" },
  { slug: "headline-length-score", title: "Headline Length Score", description: "Estimate headline effectiveness from character count.", category: "Writing", inputLabel: "Headline length", outputLabel: "Length score", expression: "Math.max(0, 100 - Math.abs(60 - x) * 2)", outputUnit: "%" },
  { slug: "sentence-complexity-index", title: "Sentence Complexity Index", description: "Estimate sentence complexity from average words per sentence.", category: "Writing", inputLabel: "Words per sentence", outputLabel: "Complexity index", expression: "x * 3", outputUnit: "index" },
  { slug: "keyword-density-estimator", title: "Keyword Density Estimator", description: "Estimate keyword density percentage for on-page drafts.", category: "Writing", inputLabel: "Keyword mentions", outputLabel: "Estimated density", expression: "x * 0.15", outputUnit: "%" },
  { slug: "sample-size-sanity-check", title: "Sample Size Sanity Check", description: "Estimate basic confidence readiness from sample size.", category: "Data", inputLabel: "Sample size", outputLabel: "Readiness score", expression: "Math.max(0, Math.min(100, x / 12))", outputUnit: "%" },
  { slug: "error-rate-estimator", title: "Error Rate Estimator", description: "Estimate error rate as a percentage from observed incidents.", category: "Data", inputLabel: "Observed errors", outputLabel: "Estimated error rate", expression: "x * 0.8", outputUnit: "%" },
  { slug: "outlier-impact-score", title: "Outlier Impact Score", description: "Estimate outlier influence on overall analysis quality.", category: "Data", inputLabel: "Outlier count", outputLabel: "Impact score", expression: "Math.min(100, x * 5)", outputUnit: "%" },
  { slug: "data-freshness-score", title: "Data Freshness Score", description: "Estimate freshness score from data age in hours.", category: "Data", inputLabel: "Data age (hours)", outputLabel: "Freshness score", expression: "Math.max(0, 100 - x * 2.5)", outputUnit: "%" },
  { slug: "study-session-retention", title: "Study Session Retention", description: "Estimate retention score from completed study minutes.", category: "Education", inputLabel: "Study minutes", outputLabel: "Retention score", expression: "Math.max(0, Math.min(100, x / 1.2))", outputUnit: "%" },
  { slug: "quiz-readiness-score", title: "Quiz Readiness Score", description: "Estimate quiz readiness from revision attempts.", category: "Education", inputLabel: "Revision attempts", outputLabel: "Readiness", expression: "Math.min(100, x * 14)", outputUnit: "%" },
  { slug: "learning-pace-estimator", title: "Learning Pace Estimator", description: "Estimate weekly learning pace from daily focused sessions.", category: "Education", inputLabel: "Focused sessions per day", outputLabel: "Weekly pace", expression: "x * 7", outputUnit: "sessions" },
  { slug: "lead-qualification-score", title: "Lead Qualification Score", description: "Estimate lead quality score from matched buying signals.", category: "Business", inputLabel: "Qualified signals", outputLabel: "Lead score", expression: "Math.min(100, x * 9)", outputUnit: "%" },
  { slug: "support-sla-buffer", title: "Support SLA Buffer", description: "Estimate remaining SLA buffer from current queue pressure.", category: "Business", inputLabel: "Open tickets", outputLabel: "SLA buffer", expression: "Math.max(5, 180 - x * 3)", outputUnit: "minutes" },
  { slug: "churn-risk-signal", title: "Churn Risk Signal", description: "Estimate churn risk from recent negative customer signals.", category: "Business", inputLabel: "Risk events", outputLabel: "Churn risk", expression: "Math.min(100, x * 11)", outputUnit: "%" },
  { slug: "campaign-reach-estimator", title: "Campaign Reach Estimator", description: "Estimate campaign reach from current daily impressions.", category: "Marketing", inputLabel: "Daily impressions", outputLabel: "Weekly reach", expression: "x * 7", outputUnit: "impressions" },
  { slug: "ctr-lift-projection", title: "CTR Lift Projection", description: "Estimate projected click-through lift after optimization.", category: "Marketing", inputLabel: "Current CTR (%)", outputLabel: "Projected CTR", expression: "x * 1.18", outputUnit: "%" },
  { slug: "conversion-gap-index", title: "Conversion Gap Index", description: "Estimate conversion gap relative to target benchmark.", category: "Marketing", inputLabel: "Current conversion (%)", outputLabel: "Gap index", expression: "Math.max(0, 10 - x)", outputUnit: "points" },
  { slug: "daily-challenge-difficulty", title: "Daily Challenge Difficulty", description: "Estimate challenge difficulty score from modifier input.", category: "Random", inputLabel: "Modifier value", outputLabel: "Difficulty", expression: "Math.min(100, x * 8)", outputUnit: "%" },
];

const adaptiveTopicMap = {
  Games: ["Loot Route", "Boss Cycle", "XP Grind", "Crafting Session", "Ranked Match", "Combo Chain", "Aim Training", "Dungeon Clear", "Arena Draft", "Quest Route"],
  Security: ["Access Audit", "Credential Hygiene", "Patch Rollout", "Endpoint Risk", "Threat Signal", "Session Guard", "Policy Drift", "Incident Queue", "Token Refresh", "Alert Triage"],
  Productivity: ["Sprint Planning", "Task Prioritization", "Calendar Load", "Workflow Drift", "Focus Session", "Backlog Health", "Deadline Buffer", "Handoff Quality", "Review Cycle", "Execution Pace"],
  Developer: ["Build Pipeline", "Test Stability", "Deploy Window", "Dependency Drift", "Latency Budget", "Code Review", "Branch Hygiene", "CI Throughput", "Refactor Effort", "Debug Window"],
  Finance: ["Budget Buffer", "Cash Flow", "Profit Guard", "Expense Trend", "Revenue Pace", "Forecast Drift", "Invoice Cycle", "Margin Health", "Runway Track", "Cost Pressure"],
  Data: ["Ingestion Health", "Schema Drift", "Event Quality", "Sampling Health", "Freshness Window", "Metric Noise", "Coverage Gap", "Outlier Pressure", "Trend Stability", "Pipeline Throughput"],
  Health: ["Recovery Load", "Sleep Rhythm", "Hydration Plan", "Cardio Pace", "Mobility Routine", "Nutrition Window", "Stress Trend", "Readiness Signal", "Habit Streak", "Training Balance"],
  Writing: ["Draft Clarity", "Outline Depth", "Revision Loop", "Headline Strength", "Reading Flow", "Paragraph Pace", "Narrative Focus", "Argument Density", "Edit Overhead", "Publication Readiness"],
  Education: ["Study Rhythm", "Revision Depth", "Quiz Confidence", "Concept Recall", "Practice Pace", "Retention Curve", "Lesson Load", "Course Momentum", "Assignment Buffer", "Exam Readiness"],
  Marketing: ["Campaign Pulse", "Audience Fit", "Message Clarity", "Funnel Friction", "Reach Quality", "Content Cadence", "Ad Fatigue", "Lead Velocity", "Attribution Stability", "Launch Readiness"],
};

const adaptiveInputLabels = {
  Games: "Current stat",
  Security: "Signal score",
  Productivity: "Current workload",
  Developer: "Current metric",
  Finance: "Current value",
  Data: "Observed value",
  Health: "Current baseline",
  Writing: "Draft metric",
  Education: "Current score",
  Marketing: "Current KPI",
};

const adaptiveFormulaTemplates = [
  { slug: "index", titleSuffix: "Index Estimator", outputLabel: "Index", expression: "x * 1.07", outputUnit: "index", descriptionLead: "Estimate an index for" },
  { slug: "score", titleSuffix: "Score Calculator", outputLabel: "Score", expression: "Math.max(0, Math.min(100, x * 1.2))", outputUnit: "%", descriptionLead: "Calculate a quick score for" },
  { slug: "efficiency", titleSuffix: "Efficiency Estimator", outputLabel: "Efficiency", expression: "x * 0.93", outputUnit: "efficiency", descriptionLead: "Estimate operating efficiency for" },
  { slug: "buffer", titleSuffix: "Buffer Planner", outputLabel: "Recommended buffer", expression: "Math.max(1, x * 0.18)", outputUnit: "units", descriptionLead: "Plan a safe buffer for" },
  { slug: "projection", titleSuffix: "Projection Calculator", outputLabel: "Projected value", expression: "x * 1.14", outputUnit: "units", descriptionLead: "Project the next value for" },
];

function buildAdaptiveIdeaPool() {
  const generated = [];

  for (const [category, topics] of Object.entries(adaptiveTopicMap)) {
    const inputLabel = adaptiveInputLabels[category] || "Current value";

    for (const topic of topics) {
      for (const formula of adaptiveFormulaTemplates) {
        const topicSlug = slugify(topic);
        const categorySlug = slugify(category);

        generated.push({
          slug: `adaptive-${categorySlug}-${topicSlug}-${formula.slug}`,
          familyKey: `adaptive-${categorySlug}-${topicSlug}`,
          title: `${topic} ${formula.titleSuffix}`,
          description: `${formula.descriptionLead} ${topic.toLowerCase()} with a lightweight model.`,
          category,
          inputLabel,
          outputLabel: formula.outputLabel,
          expression: formula.expression,
          outputUnit: formula.outputUnit,
        });
      }
    }
  }

  return generated;
}

specs.push(...buildAdaptiveIdeaPool());

function rotateArray(values, offset) {
  if (!Array.isArray(values) || values.length === 0) return [];
  const normalizedOffset = ((offset % values.length) + values.length) % values.length;
  return [...values.slice(normalizedOffset), ...values.slice(0, normalizedOffset)];
}

function buildFallbackSpecFromSeed(seed, index, usedTitleKeys, usedConceptSlugs, usedFamilyKeys) {
  const categories = Object.keys(adaptiveTopicMap).sort((a, b) => a.localeCompare(b));
  if (categories.length === 0) {
    throw new Error("No fallback categories are available.");
  }

  let attempt = 0;
  while (attempt < 5000) {
    const category = categories[(seed + index + attempt) % categories.length];
    const topics = adaptiveTopicMap[category] || ["Adaptive Idea"];
    const formula = adaptiveFormulaTemplates[(seed + (attempt * 3)) % adaptiveFormulaTemplates.length];
    const topic = topics[(seed + (attempt * 5) + index) % topics.length];
    const variant = Math.floor((attempt + index) / Math.max(1, topics.length)) + 1;

    const baseTitle = `${topic} ${formula.titleSuffix}`;
    const title = variant === 1 ? baseTitle : `${baseTitle} ${variant}`;
    const slug = slugify(`fallback-${category}-${topic}-${formula.slug}-${variant}`);
    const familyKey = slugify(`fallback-${category}-${topic}-${variant}`);

    const titleKey = normalizeIdentity(title);
    const slugKey = normalizeIdentity(slug);
    if (usedTitleKeys.has(titleKey) || usedConceptSlugs.has(slugKey) || usedFamilyKeys.has(familyKey)) {
      attempt += 1;
      continue;
    }

    return {
      slug,
      title,
      description: `${formula.descriptionLead} ${topic.toLowerCase()} with an adaptive fallback idea model.`,
      category,
      familyKey,
      inputLabel: adaptiveInputLabels[category] || "Current value",
      outputLabel: formula.outputLabel,
      expression: formula.expression,
      outputUnit: formula.outputUnit,
    };
  }

  throw new Error("Unable to create a unique fallback tool spec.");
}

function selectDiverseSpecs(allSpecs, requestedCount, seed, existingIdentities) {
  if (!Array.isArray(allSpecs) || allSpecs.length === 0 || requestedCount <= 0) {
    return [];
  }

  const usedTitleKeys = new Set(existingIdentities?.generatedTitleKeys || []);
  const usedConceptSlugs = new Set(existingIdentities?.generatedConceptSlugs || []);
  const usedFamilyKeys = new Set(existingIdentities?.generatedFamilyKeys || []);
  const localTitleKeys = new Set();
  const localSlugKeys = new Set();
  const localFamilyKeys = new Set();
  const uniqueSpecs = [];

  for (const spec of allSpecs) {
    const titleKey = normalizeIdentity(spec.title);
    const conceptSlug = normalizeIdentity(spec.slug || spec.title);
    const familyKey = normalizeIdentity(spec.familyKey || deriveFamilyKey(spec.slug || spec.title));
    if (!titleKey || !conceptSlug || !familyKey) continue;

    if (usedTitleKeys.has(titleKey) || usedConceptSlugs.has(conceptSlug)) continue;
    if (usedFamilyKeys.has(familyKey)) continue;
    if (localTitleKeys.has(titleKey) || localSlugKeys.has(conceptSlug) || localFamilyKeys.has(familyKey)) continue;

    localTitleKeys.add(titleKey);
    localSlugKeys.add(conceptSlug);
    localFamilyKeys.add(familyKey);
    uniqueSpecs.push({
      ...spec,
      slug: conceptSlug,
      familyKey,
    });
  }

  const byCategory = new Map();
  for (const spec of uniqueSpecs) {
    const category = String(spec.category || "Utility");
    if (!byCategory.has(category)) {
      byCategory.set(category, []);
    }
    byCategory.get(category).push(spec);
  }

  const categoryNames = [...byCategory.keys()].sort((a, b) => a.localeCompare(b));
  if (categoryNames.length === 0) {
    const fallbackOnly = [];
    while (fallbackOnly.length < requestedCount) {
      const fallbackSpec = buildFallbackSpecFromSeed(seed, fallbackOnly.length, usedTitleKeys, usedConceptSlugs, usedFamilyKeys);
      const titleKey = normalizeIdentity(fallbackSpec.title);
      const conceptSlug = normalizeIdentity(fallbackSpec.slug);
      const familyKey = normalizeIdentity(fallbackSpec.familyKey || deriveFamilyKey(fallbackSpec.slug || fallbackSpec.title));
      fallbackOnly.push(fallbackSpec);
      usedTitleKeys.add(titleKey);
      usedConceptSlugs.add(conceptSlug);
      usedFamilyKeys.add(familyKey);
    }

    return fallbackOnly;
  }

  const orderedCategories = rotateArray(categoryNames, seed % categoryNames.length);

  const categoryQueues = orderedCategories.map((categoryName, index) => {
    const categorySpecs = byCategory.get(categoryName) || [];
    const categoryOffset = categorySpecs.length === 0 ? 0 : (seed + index) % categorySpecs.length;
    return {
      categoryName,
      specs: rotateArray(categorySpecs, categoryOffset),
    };
  });

  const picked = [];
  while (picked.length < requestedCount) {
    let progressed = false;

    for (const queue of categoryQueues) {
      if (queue.specs.length === 0) continue;

      const nextSpec = queue.specs.shift();
      const titleKey = normalizeIdentity(nextSpec.title);
      const conceptSlug = normalizeIdentity(nextSpec.slug);
      const familyKey = normalizeIdentity(nextSpec.familyKey || deriveFamilyKey(nextSpec.slug || nextSpec.title));

      if (usedTitleKeys.has(titleKey) || usedConceptSlugs.has(conceptSlug)) {
        continue;
      }
      if (usedFamilyKeys.has(familyKey)) {
        continue;
      }

      picked.push(nextSpec);
      usedTitleKeys.add(titleKey);
      usedConceptSlugs.add(conceptSlug);
      usedFamilyKeys.add(familyKey);
      progressed = true;

      if (picked.length >= requestedCount) break;
    }

    if (!progressed) break;
  }

  if (picked.length < requestedCount) {
    while (picked.length < requestedCount) {
      const fallbackSpec = buildFallbackSpecFromSeed(seed, picked.length, usedTitleKeys, usedConceptSlugs, usedFamilyKeys);
      const titleKey = normalizeIdentity(fallbackSpec.title);
      const conceptSlug = normalizeIdentity(fallbackSpec.slug);
      const familyKey = normalizeIdentity(fallbackSpec.familyKey || deriveFamilyKey(fallbackSpec.slug || fallbackSpec.title));
      picked.push(fallbackSpec);
      usedTitleKeys.add(titleKey);
      usedConceptSlugs.add(conceptSlug);
      usedFamilyKeys.add(familyKey);
    }
  }

  return picked;
}

function renderTool(spec, model, reasoning, stamp) {
  const title = escapeHtml(spec.title);
  // 🚀 SEO FIX 1: Create a highly specific, keyword-rich title for search engines
  const seoTitle = `${title} | Free Online Calculator & Tool`;
  
  const description = escapeHtml(spec.description);
  // 🚀 SEO FIX 2: Expand the description so search engines know it's interactive and useful
  const seoDescription = `${description} Use this free online utility to calculate your results instantly in the browser. No signup required.`;
  
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
const generatedIdentities = collectGeneratedIdentitySets();
const selected = selectDiverseSpecs(specs, requestedCount, numericStamp, generatedIdentities);

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
const categoryCounts = selected.reduce((map, spec) => {
  const category = spec.category || "Utility";
  map.set(category, (map.get(category) || 0) + 1);
  return map;
}, new Map());
const categorySummary = [...categoryCounts.entries()]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([category, amount]) => `${category}:${amount}`)
  .join(", ");
console.log(`Category mix (${categoryCounts.size} categories): ${categorySummary}`);
createdFiles.forEach((name) => console.log(` - tools/${name}`));

writeOutput("created_count", createdFiles.length);
writeOutput("created_files", createdFiles.join(","));
