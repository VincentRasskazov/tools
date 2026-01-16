
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = window.tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
  window.renderTools(filtered);
  // Highlight matches
  setTimeout(() => {
    const cards = document.querySelectorAll('.tool-card');
    cards.forEach(card => {
      const title = card.querySelector('.tool-card-title').textContent.toLowerCase();
      if (q && title.includes(q)) {
        card.classList.add('search-match');
      } else {
        card.classList.remove('search-match');
      }
    });
    // Auto-scroll to tools-list if searching
    if (q && filtered.length) {
      document.getElementById('tools-list').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 10);
});
