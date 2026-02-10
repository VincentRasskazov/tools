// reading-time-estimator.js
// Estimate reading time for given text

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('estimate-btn');
  const textarea = document.getElementById('reading-text');
  const result = document.getElementById('reading-result');
  btn.onclick = () => {
    const text = textarea.value.trim();
    if (!text) {
      result.textContent = 'Please enter some text.';
      return;
    }
    const words = text.split(/\s+/).length;
    const wpm = 200; // average reading speed
    const minutes = words / wpm;
    const min = Math.floor(minutes);
    const sec = Math.round((minutes - min) * 60);
    result.textContent = `Estimated reading time: ${min} min ${sec} sec (${words} words)`;
  };
});
