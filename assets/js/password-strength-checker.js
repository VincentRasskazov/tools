// password-strength-checker.js
// Simple password strength checker

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('password-input');
  const btn = document.getElementById('check-btn');
  const result = document.getElementById('strength-result');
  btn.onclick = () => {
    const pwd = input.value;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    let msg = '';
    switch (score) {
      case 5: msg = 'Very Strong'; break;
      case 4: msg = 'Strong'; break;
      case 3: msg = 'Medium'; break;
      case 2: msg = 'Weak'; break;
      default: msg = 'Very Weak';
    }
    result.textContent = `Strength: ${msg}`;
  };
});
