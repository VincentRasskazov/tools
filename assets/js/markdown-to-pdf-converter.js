// markdown-to-pdf-converter.js
// Simple Markdown to PDF converter (demo, PDF export uses browser print)

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('md-input');
  const previewBtn = document.getElementById('preview-btn');
  const exportBtn = document.getElementById('export-btn');
  const preview = document.getElementById('md-preview');
  function renderMarkdown(md) {
    // Very basic Markdown to HTML (for demo)
    return md.replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/\n/g, '<br>');
  }
  previewBtn.onclick = () => {
    preview.innerHTML = renderMarkdown(input.value);
  };
  exportBtn.onclick = () => {
    window.print();
  };
});
