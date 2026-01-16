const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'tools');
const outFile = path.join(__dirname, 'tools.json');

function extractMeta(html, name) {
  const meta = new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i').exec(html);
  return meta ? meta[1] : '';
}

function extractTitle(html) {
  const match = /<title>([^<]+)<\/title>/i.exec(html);
  return match ? match[1].trim() : '';
}

const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));
const tools = files.map(file => {
  const html = fs.readFileSync(path.join(toolsDir, file), 'utf8');
  return {
    file,
    name: extractTitle(html),
    category: extractMeta(html, 'category')
  };
});

fs.writeFileSync(outFile, JSON.stringify(tools, null, 2));
console.log(`Generated ${outFile} with ${tools.length} tools.`);
