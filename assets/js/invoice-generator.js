// invoice-generator.js
// Simple invoice generator logic (demo)

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('invoice-app');
  app.innerHTML = `
    <form id="invoice-form">
      <input type="text" id="client" placeholder="Client Name" required><br>
      <input type="number" id="amount" placeholder="Amount ($)" required><br>
      <button type="submit">Generate Invoice</button>
    </form>
    <div id="invoice-output"></div>
  `;
  const form = document.getElementById('invoice-form');
  const output = document.getElementById('invoice-output');
  form.onsubmit = e => {
    e.preventDefault();
    const client = document.getElementById('client').value;
    const amount = document.getElementById('amount').value;
    output.innerHTML = `<h2>Invoice</h2><p>Client: ${client}</p><p>Amount: $${amount}</p>`;
  };
});
