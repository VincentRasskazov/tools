// daily-calorie-tracker.js
// Simple daily calorie tracker (demo)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('calorie-app');
  app.innerHTML = `
    <form id="calorie-form">
      <input type="text" id="food" placeholder="Food" required>
      <input type="number" id="calories" placeholder="Calories" required>
      <button type="submit">Add</button>
    </form>
    <ul id="calorie-list"></ul>
    <div id="calorie-total"></div>
  `;
  const form = document.getElementById('calorie-form');
  const list = document.getElementById('calorie-list');
  const totalDiv = document.getElementById('calorie-total');
  let items = JSON.parse(localStorage.getItem('calorie-items') || '[]');
  function render() {
    list.innerHTML = items.map((item, i) => `<li>${item.food}: ${item.calories} kcal <button data-i='${i}'>Remove</button></li>`).join('');
    const total = items.reduce((sum, item) => sum + item.calories, 0);
    totalDiv.textContent = `Total: ${total} kcal`;
  }
  render();
  form.onsubmit = e => {
    e.preventDefault();
    const food = document.getElementById('food').value.trim();
    const calories = parseInt(document.getElementById('calories').value, 10);
    if (food && !isNaN(calories)) {
      items.push({food, calories});
      localStorage.setItem('calorie-items', JSON.stringify(items));
      render();
      form.reset();
    }
  };
  list.onclick = e => {
    if (e.target.tagName === 'BUTTON') {
      const i = e.target.dataset.i;
      items.splice(i, 1);
      localStorage.setItem('calorie-items', JSON.stringify(items));
      render();
    }
  };
});
