window.tools = [];

function loadToolsJson(cb) {
  fetch('/tools.json')
    .then(res => res.json())
    .then(data => {
      window.tools = data;
      if (typeof cb === 'function') cb();
      if (typeof renderCategories === 'function') renderCategories();
      if (typeof renderTools === 'function') renderTools();
    });
}

document.addEventListener('DOMContentLoaded', function() {
  loadToolsJson();
});
