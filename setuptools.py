import os

tools = {
    "tools/ip-address-lookup.html": r"""---
layout: default
title: "My IP Address Lookup - Geo Location"
description: "Find your public IP address, location, ISP, and coordinates instantly."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>IP Address Lookup</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .data-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eee; }
    .label { font-weight: bold; color: #64748b; }
    .value { font-family: monospace; color: #1e293b; font-size: 1.1rem; }
    #loading { text-align: center; color: #64748b; margin: 20px 0; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>IP Address Lookup</h1>
    <div id="loading">Scanning network...</div>
    <div id="results" style="display:none;">
      <div class="data-row"><span class="label">IP Address</span><span class="value" id="ip"></span></div>
      <div class="data-row"><span class="label">City</span><span class="value" id="city"></span></div>
      <div class="data-row"><span class="label">Region</span><span class="value" id="region"></span></div>
      <div class="data-row"><span class="label">Country</span><span class="value" id="country"></span></div>
      <div class="data-row"><span class="label">ISP</span><span class="value" id="org"></span></div>
    </div>
    <button onclick="fetchIP()">Refresh Data</button>
  </div>
  <script>
    async function fetchIP() {
      const loader = document.getElementById('loading');
      const results = document.getElementById('results');
      loader.style.display = 'block';
      results.style.display = 'none';
      
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        document.getElementById('ip').innerText = data.ip;
        document.getElementById('city').innerText = data.city;
        document.getElementById('region').innerText = data.region;
        document.getElementById('country').innerText = data.country_name;
        document.getElementById('org').innerText = data.org;
        
        loader.style.display = 'none';
        results.style.display = 'block';
      } catch (e) {
        loader.innerText = "Error fetching IP data. Adblocker might be interfering.";
      }
    }
    window.onload = fetchIP;
  </script>
</body>
</html>""",

    "tools/color-picker.html": r"""---
layout: default
title: "Online Color Picker - HEX, RGB, HSL"
description: "Pick colors visually and get HEX, RGB, and HSL codes instantly."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Color Picker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    input[type="color"] { width: 100px; height: 100px; border: none; cursor: pointer; background: none; }
    .codes { margin-top: 30px; text-align: left; }
    .code-row { display: flex; justify-content: space-between; margin-bottom: 10px; background: #f8fafc; padding: 10px; border-radius: 6px; }
    .val { font-family: monospace; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Color Picker</h1>
    <input type="color" id="picker" value="#2563eb" oninput="updateColor()">
    
    <div class="codes">
      <div class="code-row"><span>HEX</span><span class="val" id="hex">#2563eb</span></div>
      <div class="code-row"><span>RGB</span><span class="val" id="rgb">rgb(37, 99, 235)</span></div>
    </div>
  </div>
  <script>
    function updateColor() {
      const hex = document.getElementById('picker').value;
      document.getElementById('hex').innerText = hex;
      
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      document.getElementById('rgb').innerText = `rgb(${r}, ${g}, ${b})`;
    }
  </script>
</body>
</html>""",

    "tools/hex-to-rgb.html": r"""---
layout: default
title: "HEX to RGB Converter"
description: "Convert Hexadecimal color codes to RGB format instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HEX to RGB</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #preview { height: 50px; border-radius: 6px; margin-top: 20px; border: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">HEX to RGB</h1>
    <label>HEX Code</label>
    <input type="text" id="hex" placeholder="#2563eb">
    <button onclick="convert()">Convert</button>
    <label style="margin-top:20px; display:block;">RGB Result</label>
    <input type="text" id="rgb" readonly>
    <div id="preview"></div>
  </div>
  <script>
    function convert() {
      let hex = document.getElementById('hex').value.replace('#', '');
      if(hex.length === 3) hex = hex.split('').map(c => c+c).join('');
      if(hex.length !== 6) return alert("Invalid HEX code");
      
      const r = parseInt(hex.substring(0,2), 16);
      const g = parseInt(hex.substring(2,4), 16);
      const b = parseInt(hex.substring(4,6), 16);
      
      const result = `rgb(${r}, ${g}, ${b})`;
      document.getElementById('rgb').value = result;
      document.getElementById('preview').style.backgroundColor = result;
    }
  </script>
</body>
</html>""",

    "tools/rgb-to-hex.html": r"""---
layout: default
title: "RGB to HEX Converter"
description: "Convert RGB values to Hexadecimal color codes instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RGB to HEX</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .input-row { display: flex; gap: 10px; margin-bottom: 20px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; text-align: center; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #preview { height: 50px; border-radius: 6px; margin-top: 20px; border: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">RGB to HEX</h1>
    <div class="input-row">
      <input type="number" id="r" placeholder="R" min="0" max="255">
      <input type="number" id="g" placeholder="G" min="0" max="255">
      <input type="number" id="b" placeholder="B" min="0" max="255">
    </div>
    <button onclick="convert()">Convert</button>
    <label style="margin-top:20px; display:block;">HEX Result</label>
    <input type="text" id="hex" readonly style="text-align: left; margin-top: 5px;">
    <div id="preview"></div>
  </div>
  <script>
    function componentToHex(c) {
      const hex = parseInt(c).toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    function convert() {
      const r = document.getElementById('r').value;
      const g = document.getElementById('g').value;
      const b = document.getElementById('b').value;
      
      if(!r || !g || !b) return;
      
      const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      document.getElementById('hex').value = hex;
      document.getElementById('preview').style.backgroundColor = hex;
    }
  </script>
</body>
</html>""",

    "tools/image-to-base64.html": r"""---
layout: default
title: "Image to Base64 Converter"
description: "Convert image files (PNG, JPG) to Base64 strings instantly. Useful for embedding images in HTML/CSS."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Image to Base64</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 700px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    input[type="file"] { margin-bottom: 20px; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Image to Base64</h1>
    <p style="text-align: center; color: #666;">Select an image to convert it to a Data URI.</p>
    
    <input type="file" id="fileInput" accept="image/*" onchange="convert()">
    
    <label>Base64 Output</label>
    <textarea id="output" readonly placeholder="Result will appear here..."></textarea>
  </div>
  <script>
    function convert() {
      const file = document.getElementById('fileInput').files[0];
      if(!file) return;
      
      const reader = new FileReader();
      reader.onloadend = function() {
        document.getElementById('output').value = reader.result;
      }
      reader.readAsDataURL(file);
    }
  </script>
</body>
</html>""",

    "tools/loan-calculator.html": r"""---
layout: default
title: "Loan Calculator - Estimate Monthly Payments"
description: "Calculate estimated monthly loan payments, total interest, and total repayment amount."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Loan Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; padding: 15px; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 6px; display: none; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Loan Calculator</h1>
    <div class="input-group">
      <label>Loan Amount ($)</label>
      <input type="number" id="amount" placeholder="10000">
    </div>
    <div class="input-group">
      <label>Interest Rate (%)</label>
      <input type="number" id="rate" placeholder="5.5">
    </div>
    <div class="input-group">
      <label>Loan Term (Years)</label>
      <input type="number" id="years" placeholder="5">
    </div>
    <button onclick="calculate()">Calculate Payment</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const amount = parseFloat(document.getElementById('amount').value);
      const rate = parseFloat(document.getElementById('rate').value) / 100 / 12;
      const terms = parseFloat(document.getElementById('years').value) * 12;
      
      if(!amount || !rate || !terms) return alert("Please fill all fields");
      
      const x = Math.pow(1 + rate, terms);
      const monthly = (amount * x * rate) / (x - 1);
      const total = monthly * terms;
      const interest = total - amount;
      
      const res = document.getElementById('result');
      res.style.display = 'block';
      res.innerHTML = `
        <strong>Monthly Payment:</strong> $${monthly.toFixed(2)}<br>
        <strong>Total Interest:</strong> $${interest.toFixed(2)}<br>
        <strong>Total Payment:</strong> $${total.toFixed(2)}
      `;
    }
  </script>
</body>
</html>""",

    "tools/day-of-week.html": r"""---
layout: default
title: "Day of the Week Calculator"
description: "Find out what day of the week a specific date falls on."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Day of the Week</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { font-size: 2rem; font-weight: 800; color: #16a34a; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Day of the Week</h1>
    <label style="display:block; margin-bottom:10px;">Select a Date</label>
    <input type="date" id="date">
    <button onclick="calculate()">Find Day</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const val = document.getElementById('date').value;
      if(!val) return;
      const date = new Date(val);
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      document.getElementById('result').innerText = days[date.getUTCDay()];
    }
  </script>
</body>
</html>""",

    "tools/date-difference.html": r"""---
layout: default
title: "Date Difference Calculator - Days Between Dates"
description: "Calculate the number of days, weeks, and months between two dates."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Date Difference</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 15px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { margin-top: 20px; font-size: 1.2rem; text-align: center; color: #1e293b; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Date Difference</h1>
    <label>Start Date</label>
    <input type="date" id="start">
    <label>End Date</label>
    <input type="date" id="end">
    <button onclick="calc()">Calculate Duration</button>
    <div id="result"></div>
  </div>
  <script>
    function calc() {
      const start = new Date(document.getElementById('start').value);
      const end = new Date(document.getElementById('end').value);
      
      if(isNaN(start) || isNaN(end)) return alert("Select both dates");
      
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      document.getElementById('result').innerHTML = `Difference: <strong>${diffDays} days</strong>`;
    }
  </script>
</body>
</html>""",

    "tools/markdown-preview.html": r"""---
layout: default
title: "Markdown Preview - Live Editor"
description: "Write and preview Markdown in real-time. Convert Markdown to HTML instantly."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Markdown Preview</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    .tool-container { max-width: 1000px; margin: 40px auto; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .editor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: 500px; }
    textarea { padding: 15px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; resize: none; }
    #preview { padding: 15px; border: 1px solid #eee; border-radius: 6px; overflow-y: auto; background: #fafafa; }
    h1 { text-align: center; color: #2563eb; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Markdown Live Preview</h1>
    <div class="editor-grid">
      <textarea id="editor" oninput="update()"># Hello World
This is a **Markdown** editor.

* List item 1
* List item 2</textarea>
      <div id="preview"></div>
    </div>
  </div>
  <script>
    function update() {
      const val = document.getElementById('editor').value;
      document.getElementById('preview').innerHTML = marked.parse(val);
    }
    window.onload = update;
  </script>
</body>
</html>""",

    "tools/prime-checker.html": r"""---
layout: default
title: "Prime Number Checker"
description: "Check if a number is prime instantly. Simple math utility."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Prime Checker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; text-align: center; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { font-size: 1.5rem; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Prime Number Checker</h1>
    <input type="number" id="num" placeholder="Enter a number (e.g. 17)">
    <button onclick="check()">Check</button>
    <div id="result"></div>
  </div>
  <script>
    function check() {
      const n = parseInt(document.getElementById('num').value);
      const res = document.getElementById('result');
      if(!n) return;
      
      let isPrime = true;
      if (n <= 1) isPrime = false;
      for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) { isPrime = false; break; }
      }
      
      if(isPrime) {
        res.innerText = n + " is a Prime Number!";
        res.style.color = "#16a34a";
      } else {
        res.innerText = n + " is NOT Prime.";
        res.style.color = "#dc2626";
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
