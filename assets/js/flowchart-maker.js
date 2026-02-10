// flowchart-maker.js
// Simple flowchart maker (demo, text only)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('flowchart-app');
  app.innerHTML = `
    <form id="flowchart-form">
      <input type="text" id="step" placeholder="Step description" required>
      <button type="submit">Add Step</button>
    </form>
    <ul id="flowchart-list"></ul>
  `;
  const form = document.getElementById('flowchart-form');
  const list = document.getElementById('flowchart-list');
  let steps = JSON.parse(localStorage.getItem('flowchart-steps') || '[]');
  function render() {
    list.innerHTML = steps.map((s, i) => `<li>${i + 1}. ${s} <button data-i='${i}'>Remove</button></li>`).join('');
  }
  render();
  form.onsubmit = e => {
    e.preventDefault();
    const step = document.getElementById('step').value.trim();
    if (step) {
      steps.push(step);
      localStorage.setItem('flowchart-steps', JSON.stringify(steps));
      render();
      form.reset();
    }
  };
  list.onclick = e => {
    if (e.target.tagName === 'BUTTON') {
      const i = e.target.dataset.i;
      steps.splice(i, 1);
      localStorage.setItem('flowchart-steps', JSON.stringify(steps));
      render();
    }
  };
});
