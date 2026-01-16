const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = window.tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
  window.renderTools(filtered);
});
