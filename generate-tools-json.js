const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const outFile = path.join(__dirname, 'tools.json');

function walkHtmlFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkHtmlFiles(absolute));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(absolute);
    }
  }

  return files;
}

function extractMeta(html, name) {
  const meta = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i').exec(html);
  return meta ? meta[1] : '';
}

function extractTitle(html) {
  const match = /<title>([^<]+)<\/title>/i.exec(html);
  return match ? match[1].trim() : '';
}

const files = walkHtmlFiles(toolsDir);
const tools = files.map(filePath => {
  const html = fs.readFileSync(filePath, 'utf8');
  const file = path.relative(toolsDir, filePath).split(path.sep).join('/');
  return {
    file,
    name: extractTitle(html),
    category: extractMeta(html, 'category')
  };
});

fs.writeFileSync(outFile, JSON.stringify(tools, null, 2));
console.log(`Generated ${outFile} with ${tools.length} tools.`);
