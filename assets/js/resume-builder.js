// resume-builder.js
// Simple resume builder logic (demo)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('resume-app');
  app.innerHTML = `
    <form id="resume-form">
      <input type="text" id="name" placeholder="Full Name" required><br>
      <input type="text" id="email" placeholder="Email" required><br>
      <textarea id="summary" placeholder="Professional Summary"></textarea><br>
      <button type="submit">Generate Resume</button>
    </form>
    <div id="resume-output"></div>
  `;
  const form = document.getElementById('resume-form');
  const output = document.getElementById('resume-output');
  form.onsubmit = e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const summary = document.getElementById('summary').value;
    output.innerHTML = `<h2>${name}</h2><p>${email}</p><p>${summary}</p>`;
  };
});
