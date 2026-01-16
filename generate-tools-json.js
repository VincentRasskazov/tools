const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const toolsDir = path.join(__dirname, 'tools')
const outputFile = path.join(__dirname, 'tools.json')

const tools = []

fs.readdirSync(toolsDir).forEach(file => {
  if (!file.endsWith('.html')) return

  const html = fs.readFileSync(path.join(toolsDir, file), 'utf8')
  const dom = new JSDOM(html)
  const doc = dom.window.document

  const name = doc.querySelector('title')?.textContent || file.replace('.html', '')
  const category = doc.querySelector('meta[name="category"]')?.content || 'Uncategorized'

  tools.push({
    file,
    name,
    category
  })
})

fs.writeFileSync(outputFile, JSON.stringify(tools, null, 2))
console.log('tools.json updated with', tools.length, 'tools')
