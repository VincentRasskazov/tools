// file-metadata-viewer.js
// Simple file metadata viewer (demo)

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('file-input');
  const result = document.getElementById('metadata-result');
  input.onchange = () => {
    const file = input.files[0];
    if (!file) return;
    let html = `<h2>File Metadata</h2>`;
    html += `<p>Name: ${file.name}</p>`;
    html += `<p>Type: ${file.type}</p>`;
    html += `<p>Size: ${file.size} bytes</p>`;
    html += `<p>Last Modified: ${new Date(file.lastModified).toLocaleString()}</p>`;
    result.innerHTML = html;
  };
});
