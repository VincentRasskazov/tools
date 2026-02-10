// compound-interest-calculator.js
// Compound interest calculation logic

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('compound-form');
  const resultDiv = document.getElementById('compound-result');
  form.onsubmit = e => {
    e.preventDefault();
    const P = parseFloat(document.getElementById('principal').value);
    const r = parseFloat(document.getElementById('rate').value) / 100;
    const n = parseInt(document.getElementById('times').value, 10);
    const t = parseFloat(document.getElementById('years').value);
    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(t)) {
      resultDiv.textContent = 'Please enter valid numbers.';
      return;
    }
    const A = P * Math.pow(1 + r / n, n * t);
    resultDiv.textContent = `Future Value: $${A.toFixed(2)}`;
  };
});
