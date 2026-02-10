import os

# Define the tools and their code
tools = {
    "tools/age-calculator.html": r"""---
layout: default
title: "Age Calculator Online - Calculate Your Exact Age"
description: "Instantly calculate your age in years, months, and days. Free, fast, and accurate online age calculator."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Age Calculator Online</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 30px; }
    h1 { color: #2563eb; margin-bottom: 20px; text-align: center; }
    label { display: block; margin-bottom: 8px; font-weight: 600; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer; font-weight: bold; }
    button:hover { background: #1d4ed8; }
    .result-box { margin-top: 25px; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center; font-size: 1.2rem; color: #1e293b; display: none; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Age Calculator</h1>
    <label for="dob">Enter your Date of Birth</label>
    <input type="date" id="dob">
    <button onclick="calculateAge()">Calculate Age</button>
    <div id="result" class="result-box"></div>
  </div>
  <script>
    function calculateAge() {
      const dobInput = document.getElementById('dob').value;
      if (!dobInput) return alert('Please select a date.');
      const dob = new Date(dobInput);
      const today = new Date();
      let years = today.getFullYear() - dob.getFullYear();
      let months = today.getMonth() - dob.getMonth();
      let days = today.getDate() - dob.getDate();
      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      const result = document.getElementById('result');
      result.style.display = 'block';
      result.innerHTML = `<strong>You are:</strong><br>${years} years, ${months} months, and ${days} days old.`;
    }
  </script>
</body>
</html>""",

    "tools/password-generator.html": r"""---
layout: default
title: "Strong Password Generator - Secure & Random"
description: "Generate strong, secure, and random passwords instantly. Customizable length and characters."
category: "Security Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Strong Password Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .result { background: #f1f5f9; padding: 15px; border-radius: 6px; font-family: monospace; font-size: 1.2rem; word-break: break-all; margin-bottom: 20px; border: 1px solid #cbd5e1; display: flex; justify-content: space-between; align-items: center; }
    .options { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
    label { display: flex; align-items: center; gap: 8px; cursor: pointer; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; }
    button:hover { background: #1d4ed8; }
    .copy-btn { background: none; color: #2563eb; border: none; cursor: pointer; font-size: 0.9rem; width: auto; padding: 5px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Password Generator</h1>
    <div class="result">
      <span id="password">Click Generate</span>
      <button class="copy-btn" onclick="copyPass()">Copy</button>
    </div>
    <label>Length: <span id="len-val">16</span></label>
    <input type="range" id="length" min="6" max="50" value="16" oninput="document.getElementById('len-val').innerText = this.value">
    <div class="options">
      <label><input type="checkbox" id="uppercase" checked> Uppercase (A-Z)</label>
      <label><input type="checkbox" id="lowercase" checked> Lowercase (a-z)</label>
      <label><input type="checkbox" id="numbers" checked> Numbers (0-9)</label>
      <label><input type="checkbox" id="symbols" checked> Symbols (!@#$)</label>
    </div>
    <button onclick="generatePassword()">Generate New Password</button>
  </div>
  <script>
    function generatePassword() {
      const length = document.getElementById('length').value;
      const charset = {
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        number: "0123456789",
        symbol: "!@#$%^&*()_+~`|}{[]:;?><,./-="
      };
      let characters = "";
      if(document.getElementById('uppercase').checked) characters += charset.upper;
      if(document.getElementById('lowercase').checked) characters += charset.lower;
      if(document.getElementById('numbers').checked) characters += charset.number;
      if(document.getElementById('symbols').checked) characters += charset.symbol;
      if(characters === "") return alert("Please select at least one character type!");
      let password = "";
      for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      document.getElementById('password').innerText = password;
    }
    function copyPass() {
      const pass = document.getElementById('password').innerText;
      if(pass === "Click Generate") return;
      navigator.clipboard.writeText(pass);
      alert("Password copied!");
    }
    window.onload = generatePassword;
  </script>
</body>
</html>""",

    "tools/bmi-calculator.html": r"""---
layout: default
title: "BMI Calculator - Body Mass Index"
description: "Calculate your Body Mass Index (BMI) instantly. Free health tool for checking if you are in a healthy weight range."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BMI Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; margin-bottom: 25px; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-top: 10px; }
    button:hover { background: #1d4ed8; }
    #result { margin-top: 20px; padding: 15px; border-radius: 6px; text-align: center; display: none; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>BMI Calculator</h1>
    <div class="input-group">
      <label>Weight (kg)</label>
      <input type="number" id="weight" placeholder="e.g. 70">
    </div>
    <div class="input-group">
      <label>Height (cm)</label>
      <input type="number" id="height" placeholder="e.g. 175">
    </div>
    <button onclick="calculateBMI()">Calculate BMI</button>
    <div id="result"></div>
  </div>
  <script>
    function calculateBMI() {
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      if (!weight || !height) return alert("Please enter valid numbers.");
      const bmi = (weight / ((height / 100) ** 2)).toFixed(1);
      let category = "";
      let color = "";
      if (bmi < 18.5) { category = "Underweight"; color = "#facc15"; }
      else if (bmi < 25) { category = "Normal weight"; color = "#4ade80"; }
      else if (bmi < 30) { category = "Overweight"; color = "#fb923c"; }
      else { category = "Obese"; color = "#f87171"; }
      const result = document.getElementById('result');
      result.style.display = "block";
      result.style.backgroundColor = color;
      result.innerHTML = `Your BMI is <strong>${bmi}</strong><br>Category: <strong>${category}</strong>`;
    }
  </script>
</body>
</html>""",

    "tools/word-counter.html": r"""---
layout: default
title: "Word Counter - Count Words & Characters"
description: "Free online word and character counter. Check text length, paragraph count, and reading time instantly."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Word Counter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 250px; padding: 15px; border: 1px solid #ccc; border-radius: 8px; font-family: sans-serif; font-size: 16px; resize: vertical; margin-bottom: 20px; }
    .stats { display: flex; justify-content: space-around; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
    .stat-item { text-align: center; }
    .stat-val { font-size: 1.5rem; font-weight: bold; color: #2563eb; }
    .stat-label { color: #64748b; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Word Counter</h1>
    <textarea id="textInput" placeholder="Type or paste your text here..." oninput="countStats()"></textarea>
    <div class="stats">
      <div class="stat-item">
        <div class="stat-val" id="words">0</div>
        <div class="stat-label">Words</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" id="chars">0</div>
        <div class="stat-label">Characters</div>
      </div>
      <div class="stat-item">
        <div class="stat-val" id="paragraphs">0</div>
        <div class="stat-label">Paragraphs</div>
      </div>
    </div>
  </div>
  <script>
    function countStats() {
      const text = document.getElementById('textInput').value;
      const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
      document.getElementById('words').innerText = words;
      document.getElementById('chars').innerText = text.length;
      const paragraphs = text.replace(/\n$/gm, '').split(/\n/).length;
      document.getElementById('paragraphs').innerText = text.trim() === '' ? 0 : paragraphs;
    }
  </script>
</body>
</html>""",

    "tools/base64-encoder.html": r"""---
layout: default
title: "Base64 Encoder - Text to Base64"
description: "Convert text to Base64 format instantly. Secure client-side encoding for developers."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Base64 Encoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; margin-bottom: 30px; }
    label { font-weight: 600; display: block; margin-bottom: 8px; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-family: monospace; font-size: 14px; margin-bottom: 20px; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Base64 Encoder</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Type text here to encode..."></textarea>
    <button onclick="encode()">Encode to Base64 &darr;</button>
    <label style="margin-top: 20px;">Base64 Output</label>
    <textarea id="output" readonly placeholder="Result will appear here..."></textarea>
  </div>
  <script>
    function encode() {
      const input = document.getElementById('input').value;
      try {
        const output = btoa(input);
        document.getElementById('output').value = output;
      } catch (e) {
        alert("Error: Input contains characters that cannot be encoded in Latin1 range.");
      }
    }
  </script>
</body>
</html>"""
}

# Ensure directory exists
os.makedirs("tools", exist_ok=True)

# Write files
for filename, content in tools.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created {filename}")