import os

tools = {
    "tools/qr-code-generator.html": r"""---
layout: default
title: "QR Code Generator - Free Online QR Creator"
description: "Generate free, high-quality QR codes instantly. Perfect for URLs, text, Wi-Fi passwords, and more."
category: "Generator"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>QR Code Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; }
    button:hover { background: #1d4ed8; }
    #qrcode { margin-top: 30px; display: flex; justify-content: center; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>QR Code Generator</h1>
    <input type="text" id="text" placeholder="Enter URL or text here (e.g., https://google.com)">
    <button onclick="generateQR()">Generate QR Code</button>
    <div id="qrcode"></div>
  </div>
  <script>
    function generateQR() {
      const text = document.getElementById("text").value;
      const container = document.getElementById("qrcode");
      container.innerHTML = ""; // Clear previous
      if (text) {
        new QRCode(container, {
          text: text,
          width: 200,
          height: 200
        });
      } else {
        alert("Please enter some text or a URL!");
      }
    }
  </script>
</body>
</html>""",

    "tools/discount-calculator.html": r"""---
layout: default
title: "Discount Calculator - Calculate Savings"
description: "Calculate final price after discount instantly. See how much you save on sales."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Discount Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; padding: 15px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 6px; color: #064e3b; display: none; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Discount Calculator</h1>
    <div class="input-group">
      <label>Original Price ($)</label>
      <input type="number" id="price" placeholder="100.00">
    </div>
    <div class="input-group">
      <label>Discount (%)</label>
      <input type="number" id="discount" placeholder="20">
    </div>
    <button onclick="calcDiscount()">Calculate Savings</button>
    <div id="result"></div>
  </div>
  <script>
    function calcDiscount() {
      const price = parseFloat(document.getElementById('price').value);
      const discount = parseFloat(document.getElementById('discount').value);
      if(!price || !discount) return alert("Please enter valid numbers");
      
      const saved = (price * discount) / 100;
      const finalPrice = price - saved;
      
      const res = document.getElementById('result');
      res.style.display = 'block';
      res.innerHTML = `<strong>Final Price:</strong> $${finalPrice.toFixed(2)}<br><strong>You Save:</strong> $${saved.toFixed(2)}`;
    }
  </script>
</body>
</html>""",

    "tools/percentage-calculator.html": r"""---
layout: default
title: "Percentage Calculator - Online Math Tool"
description: "Solve simple percentage problems. Calculate X% of Y, or find what percentage X is of Y."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Percentage Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h2 { color: #2563eb; font-size: 1.2rem; margin-top: 0; }
    .calc-row { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; flex-wrap: wrap; }
    input { width: 80px; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .result { font-weight: bold; color: #16a34a; margin-left: 10px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; margin-bottom: 30px;">Percentage Calculator</h1>
    
    <h2>What is X% of Y?</h2>
    <div class="calc-row">
      <span>What is</span>
      <input type="number" id="num1A" placeholder="20">
      <span>% of</span>
      <input type="number" id="num1B" placeholder="100">
      <button onclick="calc1()">Calculate</button>
      <span class="result" id="res1"></span>
    </div>

    <h2>X is what percent of Y?</h2>
    <div class="calc-row">
      <input type="number" id="num2A" placeholder="5">
      <span>is what % of</span>
      <input type="number" id="num2B" placeholder="20">
      <button onclick="calc2()">Calculate</button>
      <span class="result" id="res2"></span>
    </div>
  </div>
  <script>
    function calc1() {
      const a = parseFloat(document.getElementById('num1A').value);
      const b = parseFloat(document.getElementById('num1B').value);
      if(a && b) document.getElementById('res1').innerText = "= " + ((a/100)*b).toFixed(2);
    }
    function calc2() {
      const a = parseFloat(document.getElementById('num2A').value);
      const b = parseFloat(document.getElementById('num2B').value);
      if(a && b) document.getElementById('res2').innerText = "= " + ((a/b)*100).toFixed(2) + "%";
    }
  </script>
</body>
</html>""",

    "tools/lorem-ipsum.html": r"""---
layout: default
title: "Lorem Ipsum Generator - Dummy Text"
description: "Generate Lorem Ipsum placeholder text for web design, graphics, and layouts."
category: "Generator"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorem Ipsum Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    textarea { width: 100%; height: 300px; padding: 15px; border: 1px solid #ccc; border-radius: 8px; margin-top: 20px; line-height: 1.6; }
    .controls { display: flex; align-items: center; gap: 15px; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Lorem Ipsum Generator</h1>
    <div class="controls">
      <label>Paragraphs:</label>
      <input type="number" id="count" value="3" min="1" max="20" style="width: 60px; padding: 8px;">
      <button onclick="generate()">Generate</button>
      <button onclick="copy()" style="background: #4b5563;">Copy Text</button>
    </div>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    
    function generate() {
      const count = document.getElementById('count').value;
      let text = "";
      for(let i=0; i<count; i++) {
        text += lorem + "\n\n";
      }
      document.getElementById('output').value = text.trim();
    }
    function copy() {
      const el = document.getElementById('output');
      el.select();
      document.execCommand('copy');
      alert("Copied to clipboard!");
    }
    window.onload = generate;
  </script>
</body>
</html>""",

    "tools/stopwatch.html": r"""---
layout: default
title: "Online Stopwatch - Precise Time Tracker"
description: "Simple online stopwatch with start, stop, and reset functions. Track time accurately."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Online Stopwatch</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    #display { font-size: 4rem; font-family: monospace; font-weight: bold; color: #1e293b; margin-bottom: 30px; }
    .btn-group { display: flex; justify-content: center; gap: 15px; }
    button { padding: 12px 30px; font-size: 1.2rem; border: none; border-radius: 8px; cursor: pointer; color: white; transition: opacity 0.2s; }
    .start { background: #16a34a; }
    .stop { background: #dc2626; }
    .reset { background: #4b5563; }
    button:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Stopwatch</h1>
    <div id="display">00:00:00</div>
    <div class="btn-group">
      <button class="start" onclick="startTimer()">Start</button>
      <button class="stop" onclick="stopTimer()">Stop</button>
      <button class="reset" onclick="resetTimer()">Reset</button>
    </div>
  </div>
  <script>
    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let running = false;
    
    const display = document.getElementById('display');
    
    function startTimer(){
      if(!running){
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
      }
    }
    
    function stopTimer(){
      if(running){
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
      }
    }
    
    function resetTimer(){
      clearInterval(tInterval);
      running = false;
      difference = 0;
      display.innerHTML = "00:00:00";
    }
    
    function getShowTime(){
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      
      let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);
      let ms = Math.floor((difference % 1000) / 10); // Hundredths
      
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      
      display.innerHTML = hours + ':' + minutes + ':' + seconds;
    }
  </script>
</body>
</html>""",

    "tools/tip-calculator.html": r"""---
layout: default
title: "Tip Calculator - Easy Bill Splitter"
description: "Calculate tips and split bills instantly. Perfect for dining out with friends."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tip Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .input-group { margin-bottom: 20px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; }
    button { width: 100%; padding: 14px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; }
    #result { margin-top: 25px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; display: none; }
    .res-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 1.1rem; }
    .total-row { font-weight: bold; color: #2563eb; border-top: 1px solid #cbd5e1; padding-top: 10px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Tip Calculator</h1>
    
    <div class="input-group">
      <label>Bill Amount ($)</label>
      <input type="number" id="bill" placeholder="e.g. 50.00">
    </div>
    <div class="input-group">
      <label>Tip Percentage (%)</label>
      <input type="number" id="tip" placeholder="e.g. 15">
    </div>
    <div class="input-group">
      <label>Number of People</label>
      <input type="number" id="people" placeholder="1" value="1">
    </div>
    
    <button onclick="calculateTip()">Calculate</button>
    
    <div id="result">
      <div class="res-row"><span>Tip Amount:</span> <span id="tipAmount">$0.00</span></div>
      <div class="res-row"><span>Total Bill:</span> <span id="totalBill">$0.00</span></div>
      <div class="res-row total-row"><span>Per Person:</span> <span id="perPerson">$0.00</span></div>
    </div>
  </div>
  <script>
    function calculateTip() {
      const bill = parseFloat(document.getElementById('bill').value);
      const tipPercent = parseFloat(document.getElementById('tip').value);
      const people = parseInt(document.getElementById('people').value) || 1;
      
      if(!bill || !tipPercent) return alert("Please enter bill and tip amount.");
      
      const tipAmount = (bill * tipPercent) / 100;
      const total = bill + tipAmount;
      const perPerson = total / people;
      
      document.getElementById('tipAmount').innerText = "$" + tipAmount.toFixed(2);
      document.getElementById('totalBill').innerText = "$" + total.toFixed(2);
      document.getElementById('perPerson').innerText = "$" + perPerson.toFixed(2);
      document.getElementById('result').style.display = 'block';
    }
  </script>
</body>
</html>""",

    "tools/uuid-generator.html": r"""---
layout: default
title: "UUID Generator - Version 4"
description: "Generate random UUIDs (Version 4) instantly. Free developer tool for creating unique identifiers."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>UUID Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    .uuid-box { background: #f1f5f9; padding: 20px; font-family: monospace; font-size: 1.5rem; border: 1px solid #cbd5e1; border-radius: 8px; margin: 20px 0; word-break: break-all; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; margin: 5px; }
    button:hover { background: #1d4ed8; }
    .secondary { background: #64748b; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>UUID Generator (v4)</h1>
    <p>Generate a Universally Unique Identifier.</p>
    
    <div class="uuid-box" id="uuid">Generating...</div>
    
    <button onclick="generate()">Generate New</button>
    <button class="secondary" onclick="copy()">Copy UUID</button>
  </div>
  <script>
    function generate() {
      const uuid = crypto.randomUUID();
      document.getElementById('uuid').innerText = uuid;
    }
    function copy() {
      const text = document.getElementById('uuid').innerText;
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
    window.onload = generate;
  </script>
</body>
</html>""",

    "tools/binary-to-decimal.html": r"""---
layout: default
title: "Binary to Decimal Converter"
description: "Convert binary numbers (0s and 1s) to decimal integers instantly. Simple and fast conversion tool."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Binary to Decimal</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { text-align: center; color: #2563eb; }
    label { font-weight: 600; display: block; margin-bottom: 8px; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 18px; font-family: monospace; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Binary to Decimal</h1>
    
    <label>Binary Number (e.g., 1010)</label>
    <input type="text" id="binary" placeholder="101010">
    
    <button onclick="convert()">Convert &darr;</button>
    
    <label style="margin-top: 20px;">Decimal Result</label>
    <input type="text" id="decimal" readonly placeholder="Result will appear here">
  </div>
  <script>
    function convert() {
      const bin = document.getElementById('binary').value;
      if (!/^[01]+$/.test(bin)) {
        return alert("Please enter a valid binary number (only 0s and 1s).");
      }
      const dec = parseInt(bin, 2);
      document.getElementById('decimal').value = dec;
    }
  </script>
</body>
</html>""",

    "tools/temperature-converter.html": r"""---
layout: default
title: "Temperature Converter - Celsius to Fahrenheit"
description: "Convert temperatures between Celsius, Fahrenheit, and Kelvin instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Temperature Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .input-row { display: flex; gap: 20px; margin-bottom: 20px; }
    .input-group { flex: 1; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Temperature Converter</h1>
    
    <div class="input-row">
      <div class="input-group">
        <label>Celsius (°C)</label>
        <input type="number" id="celsius" oninput="convert('C')">
      </div>
      <div class="input-group">
        <label>Fahrenheit (°F)</label>
        <input type="number" id="fahrenheit" oninput="convert('F')">
      </div>
    </div>
    
    <div class="input-group">
      <label>Kelvin (K)</label>
      <input type="number" id="kelvin" oninput="convert('K')">
    </div>
  </div>
  <script>
    function convert(type) {
      const c = document.getElementById('celsius');
      const f = document.getElementById('fahrenheit');
      const k = document.getElementById('kelvin');
      
      let val;
      
      if(type === 'C') {
        val = parseFloat(c.value);
        f.value = (val * 9/5) + 32;
        k.value = val + 273.15;
      } else if(type === 'F') {
        val = parseFloat(f.value);
        c.value = (val - 32) * 5/9;
        k.value = (val - 32) * 5/9 + 273.15;
      } else if(type === 'K') {
        val = parseFloat(k.value);
        c.value = val - 273.15;
        f.value = (val - 273.15) * 9/5 + 32;
      }
    }
  </script>
</body>
</html>""",

    "tools/json-formatter.html": r"""---
layout: default
title: "JSON Formatter - Beautify JSON Code"
description: "Format, validate, and beautify your JSON data. Readable output for developers."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JSON Formatter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 900px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { text-align: center; color: #2563eb; }
    textarea { width: 100%; height: 300px; padding: 15px; border: 1px solid #ccc; border-radius: 8px; font-family: monospace; font-size: 14px; margin-bottom: 20px; resize: vertical; background: #f9fafb; }
    .controls { display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    button:hover { background: #1d4ed8; }
    .clear { background: #ef4444; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>JSON Formatter</h1>
    <div class="controls">
      <button onclick="format()">Format / Beautify</button>
      <button onclick="minify()">Minify</button>
      <button class="clear" onclick="document.getElementById('input').value=''">Clear</button>
    </div>
    <textarea id="input" placeholder='Paste your JSON here (e.g. {"name":"John", "age":30})'></textarea>
  </div>
  <script>
    function format() {
      const el = document.getElementById('input');
      try {
        const obj = JSON.parse(el.value);
        el.value = JSON.stringify(obj, null, 4);
      } catch(e) {
        alert("Invalid JSON: " + e.message);
      }
    }
    function minify() {
      const el = document.getElementById('input');
      try {
        const obj = JSON.parse(el.value);
        el.value = JSON.stringify(obj);
      } catch(e) {
        alert("Invalid JSON: " + e.message);
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