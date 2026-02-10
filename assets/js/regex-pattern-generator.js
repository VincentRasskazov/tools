// regex-pattern-generator.js
// Demo: Regex pattern generator (manual, not AI)

document.addEventListener('DOMContentLoaded', () => {
  const descInput = document.getElementById('regex-desc');
  const generateBtn = document.getElementById('generate-btn');
  const regexResult = document.getElementById('regex-result');
  const testInput = document.getElementById('test-string');
  const testBtn = document.getElementById('test-btn');
  const testResult = document.getElementById('test-result');
  let regex = '';
  generateBtn.onclick = () => {
    // For demo, just echo a simple regex for email
    if (/email/i.test(descInput.value)) {
      regex = '/^\\S+@\\S+\\.\\S+$/';
    } else {
      regex = '/.*/';
    }
    regexResult.textContent = `Generated Regex: ${regex}`;
  };
  testBtn.onclick = () => {
    if (!regex) {
      testResult.textContent = 'Generate a regex first.';
      return;
    }
    try {
      const re = new RegExp(regex.replace(/^\//, '').replace(/\/$/, ''));
      testResult.textContent = re.test(testInput.value) ? 'Match!' : 'No match.';
    } catch {
      testResult.textContent = 'Invalid regex.';
    }
  };
});
