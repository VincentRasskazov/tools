window.renderCategories = function () {
  const container = document.getElementById('categories')
  const categories = {}

  for (const tool of window.tools) {
    if (!categories[tool.category]) categories[tool.category] = []
    categories[tool.category].push(tool)
  }

  container.innerHTML = Object.keys(categories)
    .map(cat => `<div class="category"><h2>${cat}</h2></div>`)
    .join('')
}

window.renderTools = function (list) {
  const container = document.getElementById('tools-list')
  container.innerHTML = list
    .map(t => `<a class="tool-link" href="tools/${t.file}">${t.name}</a>`)
    .join('')
}
