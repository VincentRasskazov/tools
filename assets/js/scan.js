window.tools = []

async function scanTools() {
  const res = await fetch('/tools/')
  const html = await res.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const links = [...doc.querySelectorAll('a')]
    .map(a => a.getAttribute('href'))
    .filter(h => h.endsWith('.html'))

  for (const file of links) {
    const toolUrl = `/tools/${file}`
    const toolHtml = await fetch(toolUrl).then(r => r.text())
    const toolDoc = parser.parseFromString(toolHtml, 'text/html')

    const name = toolDoc.querySelector('title')?.innerText || file.replace('.html', '')
    const category = toolDoc.querySelector('meta[name="category"]')?.content || 'Uncategorized'

    window.tools.push({ name, category, file })
  }

  window.renderCategories()
  window.renderTools(window.tools)
}

scanTools()
