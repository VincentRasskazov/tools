window.tools = []

async function loadTools() {
  const res = await fetch('../tools.json')
  const tools = await res.json()

  window.tools = tools

  window.renderCategories()
  window.renderTools(tools)
}

loadTools()
