window.renderCategories = function () {
  const container = document.getElementById('categories');
  const categories = {};

  for (const tool of window.tools) {
    if (!categories[tool.category]) categories[tool.category] = [];
    categories[tool.category].push(tool);
  }

  console.log('[DEBUG] Rendering categories:', Object.keys(categories));

  container.innerHTML = Object.keys(categories)
    .map(cat => `
      <div class="category-card">
        <h2>${cat}</h2>
        <ul class="category-list">
          ${categories[cat].map(tool =>
            `<li><a href="tools/${tool.file}">${tool.name}</a></li>`
          ).join('')}
        </ul>
      </div>
    `).join('');
  console.log('[DEBUG] Categories HTML:', container.innerHTML.length, 'chars');
};

window.renderTools = function (list) {
  const container = document.getElementById('tools-list');
  if (!list.length) {
    container.innerHTML = `<div style="text-align:center;padding:40px 0;color:#888;font-size:1.2rem;">No tools found. Try a different search!</div>`;
    return;
  }
  container.innerHTML = `
    <div class="tools-grid">
      ${list.map(t => `
        <div class="tool-card">
          <div class="tool-card-title">${t.name}</div>
          <div class="tool-card-category">${t.category}</div>
          <a class="tool-card-link" href="tools/${t.file}">Open Tool →</a>
        </div>
      `).join('')}
    </div>
  `;
};
