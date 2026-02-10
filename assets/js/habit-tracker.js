// habit-tracker.js
// Simple habit tracker logic

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('habit-app');
  app.innerHTML = `
    <form id="habit-form">
      <input type="text" id="habit-name" placeholder="Habit name" required>
      <button type="submit">Add Habit</button>
    </form>
    <ul id="habit-list"></ul>
  `;
  const form = document.getElementById('habit-form');
  const list = document.getElementById('habit-list');
  let habits = JSON.parse(localStorage.getItem('habits') || '[]');
  function render() {
    list.innerHTML = habits.map((h, i) => `<li><input type='checkbox' ${h.done ? 'checked' : ''} data-i='${i}'> ${h.name}</li>`).join('');
  }
  render();
  form.onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById('habit-name').value.trim();
    if (name) {
      habits.push({name, done: false});
      localStorage.setItem('habits', JSON.stringify(habits));
      render();
      form.reset();
    }
  };
  list.onclick = e => {
    if (e.target.tagName === 'INPUT') {
      const i = e.target.dataset.i;
      habits[i].done = !habits[i].done;
      localStorage.setItem('habits', JSON.stringify(habits));
      render();
    }
  };
});
