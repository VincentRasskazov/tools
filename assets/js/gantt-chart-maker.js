// gantt-chart-maker.js
// Simple Gantt chart maker (demo, text only)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('gantt-app');
  app.innerHTML = `
    <form id="gantt-form">
      <input type="text" id="task" placeholder="Task name" required>
      <input type="date" id="start" required>
      <input type="date" id="end" required>
      <button type="submit">Add Task</button>
    </form>
    <ul id="gantt-list"></ul>
  `;
  const form = document.getElementById('gantt-form');
  const list = document.getElementById('gantt-list');
  let tasks = JSON.parse(localStorage.getItem('gantt-tasks') || '[]');
  function render() {
    list.innerHTML = tasks.map((t, i) => `<li>${t.task}: ${t.start} to ${t.end} <button data-i='${i}'>Remove</button></li>`).join('');
  }
  render();
  form.onsubmit = e => {
    e.preventDefault();
    const task = document.getElementById('task').value.trim();
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    if (task && start && end) {
      tasks.push({task, start, end});
      localStorage.setItem('gantt-tasks', JSON.stringify(tasks));
      render();
      form.reset();
    }
  };
  list.onclick = e => {
    if (e.target.tagName === 'BUTTON') {
      const i = e.target.dataset.i;
      tasks.splice(i, 1);
      localStorage.setItem('gantt-tasks', JSON.stringify(tasks));
      render();
    }
  };
});
