// mind-map-creator.js
// Simple mind map creator (demo, text only)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('mindmap-app');
  app.innerHTML = `
    <form id="mindmap-form">
      <input type="text" id="node" placeholder="Node text" required>
      <button type="submit">Add Node</button>
    </form>
    <ul id="mindmap-list"></ul>
  `;
  const form = document.getElementById('mindmap-form');
  const list = document.getElementById('mindmap-list');
  let nodes = JSON.parse(localStorage.getItem('mindmap-nodes') || '[]');
  function render() {
    list.innerHTML = nodes.map((n, i) => `<li>${n} <button data-i='${i}'>Remove</button></li>`).join('');
  }
  render();
  form.onsubmit = e => {
    e.preventDefault();
    const node = document.getElementById('node').value.trim();
    if (node) {
      nodes.push(node);
      localStorage.setItem('mindmap-nodes', JSON.stringify(nodes));
      render();
      form.reset();
    }
  };
  list.onclick = e => {
    if (e.target.tagName === 'BUTTON') {
      const i = e.target.dataset.i;
      nodes.splice(i, 1);
      localStorage.setItem('mindmap-nodes', JSON.stringify(nodes));
      render();
    }
  };
});
