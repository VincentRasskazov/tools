// update-tool-layout.js
// Adds a modern header/footer and shared style to every tool HTML file
const fs = require('fs');
const path = require('path');
const tools = JSON.parse(fs.readFileSync('tools.json', 'utf8'));

const header = (name) => `
  <div class="tool-header">
    <a class="tool-back" href="../index.html">← Back</a>
    <h1 class="tool-title">${name}</h1>
  </div>
`;
const footer = `
  <div class="tool-footer">&copy; ${new Date().getFullYear()} Ultimate Tools Hub</div>
`;

for (const tool of tools) {
  const filePath = path.join('tools', tool.file);
  if (!fs.existsSync(filePath)) continue;
  let html = fs.readFileSync(filePath, 'utf8');

  // Remove any old injected style/header/footer
  html = html.replace(/<link rel="stylesheet" href="..\/assets\/css\/tool-style.css">/g, '');
  html = html.replace(/<div class="tool-header">[\s\S]*?<\/div>/, '');
  html = html.replace(/<div class="tool-footer">[\s\S]*?<\/div>/, '');

  // Inject style, header, and footer
  html = html.replace(/<head>/i, `<head>\n  <link rel="stylesheet" href="../assets/css/tool-style.css">`);
  html = html.replace(/<body[^>]*>/i, match => `${match}\n  <div class="tool-container">${header(tool.name)}`);
  html = html.replace(/<\/body>/i, `${footer}\n  </div>\n</body>`);

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Updated', filePath);
}
