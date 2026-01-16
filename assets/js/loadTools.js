window.tools = [];


function loadToolsJson(cb) {
  // Always fetch from the absolute GitHub Pages URL
  const jsonUrl = 'https://vincentrasskazov.github.io/tools/tools.json';
  console.log('[DEBUG] Fetching tools.json from:', jsonUrl);
  fetch(jsonUrl)
    .then(res => {
      console.log('[DEBUG] Response status:', res.status);
      return res.json();
    })
    .then(data => {
      window.tools = data;
      console.log('[DEBUG] tools.json loaded:', window.tools.length, 'tools');
      if (typeof cb === 'function') cb();
      if (typeof renderCategories === 'function') {
        console.log('[DEBUG] Calling renderCategories');
        renderCategories();
      }
      if (typeof renderTools === 'function') {
        console.log('[DEBUG] Calling renderTools with', window.tools.length, 'tools');
        renderTools(window.tools);
      }
    })
    .catch(err => {
      console.error('[DEBUG] Failed to load tools.json:', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('[DEBUG] DOMContentLoaded');
  loadToolsJson();
});
