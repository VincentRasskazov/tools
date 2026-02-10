// loan-amortization-schedule.js
// Simple loan amortization schedule generator

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('amortization-form');
  const resultDiv = document.getElementById('amortization-result');
  form.onsubmit = e => {
    e.preventDefault();
    const P = parseFloat(document.getElementById('loan-amount').value);
    const r = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
    const n = parseInt(document.getElementById('years').value, 10) * 12;
    if (isNaN(P) || isNaN(r) || isNaN(n)) {
      resultDiv.textContent = 'Please enter valid numbers.';
      return;
    }
    const payment = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    let balance = P;
    let schedule = `<table><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>`;
    for (let i = 1; i <= n; i++) {
      const interest = balance * r;
      const principal = payment - interest;
      balance -= principal;
      schedule += `<tr><td>${i}</td><td>${payment.toFixed(2)}</td><td>${principal.toFixed(2)}</td><td>${interest.toFixed(2)}</td><td>${balance > 0 ? balance.toFixed(2) : '0.00'}</td></tr>`;
    }
    schedule += '</table>';
    resultDiv.innerHTML = schedule;
  };
});
