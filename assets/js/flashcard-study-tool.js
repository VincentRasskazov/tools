// flashcard-study-tool.js
// Simple flashcard study tool (demo)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('flashcard-app');
  app.innerHTML = `
    <form id="flashcard-form">
      <input type="text" id="question" placeholder="Question" required>
      <input type="text" id="answer" placeholder="Answer" required>
      <button type="submit">Add Card</button>
    </form>
    <ul id="flashcard-list"></ul>
  `;
  const form = document.getElementById('flashcard-form');
  const list = document.getElementById('flashcard-list');
  let cards = JSON.parse(localStorage.getItem('flashcards') || '[]');
  function render() {
    list.innerHTML = cards.map((c, i) => `<li><b>Q:</b> ${c.q} <b>A:</b> ${c.a} <button data-i='${i}'>Remove</button></li>`).join('');
  }
  render();
  form.onsubmit = e => {
    e.preventDefault();
    const q = document.getElementById('question').value.trim();
    const a = document.getElementById('answer').value.trim();
    if (q && a) {
      cards.push({q, a});
      localStorage.setItem('flashcards', JSON.stringify(cards));
      render();
      form.reset();
    }
  };
  list.onclick = e => {
    if (e.target.tagName === 'BUTTON') {
      const i = e.target.dataset.i;
      cards.splice(i, 1);
      localStorage.setItem('flashcards', JSON.stringify(cards));
      render();
    }
  };
});
