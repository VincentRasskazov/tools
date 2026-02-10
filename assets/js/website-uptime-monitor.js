// website-uptime-monitor.js
// Simple website uptime checker (demo, uses fetch)

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('url-input');
  const btn = document.getElementById('check-btn');
  const result = document.getElementById('uptime-result');
  btn.onclick = async () => {
    const url = input.value.trim();
    if (!url) {
      result.textContent = 'Enter a website URL.';
      return;
    }
    result.textContent = 'Checking...';
    try {
      const res = await fetch(url, {mode: 'no-cors'});
      result.textContent = 'Website is UP (response received).';
    } catch {
      result.textContent = 'Website is DOWN or unreachable.';
    }
  };
});
