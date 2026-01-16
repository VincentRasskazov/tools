window.tools = [];


function loadToolsJson(cb) {
  fetch('/tools.json')
    .then(res => res.json())
    .then(data => {
      window.tools = data;
      console.log('[DEBUG] tools.json loaded:', window.tools);
      if (typeof cb === 'function') cb();
      if (typeof renderCategories === 'function') renderCategories();
      if (typeof renderTools === 'function') renderTools(window.tools);
    })
    .catch(err => {
      console.error('[DEBUG] Failed to load tools.json:', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadToolsJson();
});
