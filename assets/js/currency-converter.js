// currency-converter.js
// Fetches currency rates and handles conversion

document.addEventListener('DOMContentLoaded', () => {
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const form = document.getElementById('currency-form');
  const resultDiv = document.getElementById('result');

  // Example currency list (for demo)
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AUD', 'CAD', 'CHF', 'CNY', 'RUB'];
  currencies.forEach(cur => {
    fromCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
    toCurrency.innerHTML += `<option value="${cur}">${cur}</option>`;
  });
  fromCurrency.value = 'USD';
  toCurrency.value = 'EUR';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('amount').value);
    const from = fromCurrency.value;
    const to = toCurrency.value;
    if (isNaN(amount) || !from || !to) {
      resultDiv.textContent = 'Please enter a valid amount and select currencies.';
      return;
    }
    resultDiv.textContent = 'Converting...';
    try {
      // Use a free API for demo (replace with your own for production)
      const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
      const data = await res.json();
      if (!data.rates[to]) throw new Error('Currency not supported.');
      const converted = (amount * data.rates[to]).toFixed(2);
      resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
    } catch (err) {
      resultDiv.textContent = 'Conversion failed. Try again later.';
    }
  });
});
