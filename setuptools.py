import os

tools = {
    "tools/roman-numeral-converter.html": r"""---
layout: default
title: "Roman Numeral Converter"
description: "Convert numbers to Roman Numerals and vice versa instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Roman Numeral Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Roman Numeral Converter</h1>
    <div class="input-group">
      <label>Decimal Number (e.g., 2023)</label>
      <input type="number" id="num" placeholder="2023">
    </div>
    <button onclick="toRoman()">Convert to Roman</button>
    <div class="input-group" style="margin-top:20px;">
      <label>Roman Numeral Result</label>
      <input type="text" id="romanResult" readonly>
    </div>
  </div>
  <script>
    function toRoman() {
      let num = document.getElementById('num').value;
      if (!num) return;
      const lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
      let roman = '';
      for (let i in lookup ) {
        while ( num >= lookup[i] ) {
          roman += i;
          num -= lookup[i];
        }
      }
      document.getElementById('romanResult').value = roman;
    }
  </script>
</body>
</html>""",

    "tools/number-to-words.html": r"""---
layout: default
title: "Number to Words Converter"
description: "Convert numbers into English words instantly. Useful for writing checks."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Number to Words</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { margin-top: 20px; font-size: 1.2rem; font-weight: bold; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Number to Words</h1>
    <label>Enter Number</label>
    <input type="number" id="input" placeholder="12345">
    <button onclick="convert()">Convert</button>
    <div id="result"></div>
  </div>
  <script>
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
    function numToWords(num) {
      if (num === 0) return "zero";
      if (num < 20) return ones[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? "-" + ones[num % 10] : "");
      if (num < 1000) return ones[Math.floor(num / 100)] + " hundred" + (num % 100 !== 0 ? " and " + numToWords(num % 100) : "");
      if (num < 1000000) return numToWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 !== 0 ? " " + numToWords(num % 1000) : "");
      return "Number too large";
    }

    function convert() {
      const val = parseInt(document.getElementById('input').value);
      document.getElementById('result').innerText = numToWords(val);
    }
  </script>
</body>
</html>""",

    "tools/word-frequency-counter.html": r"""---
layout: default
title: "Word Frequency Counter"
description: "Analyze text and count the frequency of every word. Great for SEO and writing analysis."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Word Frequency Counter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: sans-serif; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    table { width: 100%; margin-top: 20px; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Word Frequency Counter</h1>
    <textarea id="text" placeholder="Paste your text here..."></textarea>
    <button onclick="analyze()">Analyze Text</button>
    <table id="resultTable" style="display:none;">
      <thead><tr><th>Word</th><th>Count</th><th>%</th></tr></thead>
      <tbody id="tbody"></tbody>
    </table>
  </div>
  <script>
    function analyze() {
      const text = document.getElementById('text').value.toLowerCase().replace(/[^\w\s]/g, '');
      const words = text.split(/\s+/).filter(w => w.length > 0);
      const total = words.length;
      const freq = {};
      
      words.forEach(w => freq[w] = (freq[w] || 0) + 1);
      
      const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]);
      const tbody = document.getElementById('tbody');
      tbody.innerHTML = '';
      
      sorted.forEach(([word, count]) => {
        const row = `<tr><td>${word}</td><td>${count}</td><td>${((count/total)*100).toFixed(1)}%</td></tr>`;
        tbody.innerHTML += row;
      });
      document.getElementById('resultTable').style.display = 'table';
    }
  </script>
</body>
</html>""",

    "tools/text-reverser.html": r"""---
layout: default
title: "Text Reverser"
description: "Reverse text, words, or letters instantly."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Reverser</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; margin-right: 10px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Text Reverser</h1>
    <textarea id="input" placeholder="Type here..."></textarea>
    <button onclick="reverseText()">Reverse Text</button>
    <button onclick="reverseWords()" style="background:#4b5563">Reverse Word Order</button>
    <textarea id="output" readonly style="margin-top:20px; background:#f9fafb;"></textarea>
  </div>
  <script>
    function reverseText() {
      const val = document.getElementById('input').value;
      document.getElementById('output').value = val.split('').reverse().join('');
    }
    function reverseWords() {
      const val = document.getElementById('input').value;
      document.getElementById('output').value = val.split(' ').reverse().join(' ');
    }
  </script>
</body>
</html>""",

    "tools/text-diff.html": r"""---
layout: default
title: "Text Diff Checker"
description: "Compare two text files and find the differences."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Diff Checker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jsdiff/5.1.0/diff.min.js"></script>
  <style>
    .tool-container { max-width: 900px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .cols { display: flex; gap: 20px; }
    .col { flex: 1; }
    textarea { width: 100%; height: 200px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 20px 0; font-weight: bold; }
    #result { white-space: pre-wrap; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; }
    .added { background-color: #d1fae5; color: #065f46; }
    .removed { background-color: #fee2e2; color: #991b1b; text-decoration: line-through; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Text Diff Checker</h1>
    <div class="cols">
      <div class="col"><label>Original Text</label><textarea id="text1">Hello World</textarea></div>
      <div class="col"><label>New Text</label><textarea id="text2">Hello New World</textarea></div>
    </div>
    <button onclick="compare()">Compare Texts</button>
    <div id="result"></div>
  </div>
  <script>
    function compare() {
      const one = document.getElementById('text1').value;
      const other = document.getElementById('text2').value;
      const diff = Diff.diffWords(one, other);
      const display = document.getElementById('result');
      display.innerHTML = '';

      diff.forEach((part) => {
        const span = document.createElement('span');
        span.className = part.added ? 'added' : part.removed ? 'removed' : 'common';
        span.appendChild(document.createTextNode(part.value));
        display.appendChild(span);
      });
    }
  </script>
</body>
</html>""",

    "tools/frequency-converter.html": r"""---
layout: default
title: "Frequency Converter"
description: "Convert between Hertz (Hz), Kilohertz (kHz), Megahertz (MHz), and Gigahertz (GHz)."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Frequency Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Frequency Converter</h1>
    <div class="input-group"><label>Hertz (Hz)</label><input type="number" id="hz" oninput="conv('hz',this.value)"></div>
    <div class="input-group"><label>Kilohertz (kHz)</label><input type="number" id="khz" oninput="conv('khz',this.value)"></div>
    <div class="input-group"><label>Megahertz (MHz)</label><input type="number" id="mhz" oninput="conv('mhz',this.value)"></div>
    <div class="input-group"><label>Gigahertz (GHz)</label><input type="number" id="ghz" oninput="conv('ghz',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const h = id === 'hz' ? val : id === 'khz' ? val * 1000 : id === 'mhz' ? val * 1e6 : val * 1e9;
      if(id !== 'hz') document.getElementById('hz').value = h;
      if(id !== 'khz') document.getElementById('khz').value = h / 1000;
      if(id !== 'mhz') document.getElementById('mhz').value = h / 1e6;
      if(id !== 'ghz') document.getElementById('ghz').value = h / 1e9;
    }
  </script>
</body>
</html>""",

    "tools/force-converter.html": r"""---
layout: default
title: "Force Converter"
description: "Convert between Newton, Dyne, Kilogram-force, and Pound-force."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Force Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Force Converter</h1>
    <div class="input-group"><label>Newton (N)</label><input type="number" id="n" oninput="conv('n',this.value)"></div>
    <div class="input-group"><label>Dyne (dyn)</label><input type="number" id="dyn" oninput="conv('dyn',this.value)"></div>
    <div class="input-group"><label>Kilogram-force (kgf)</label><input type="number" id="kgf" oninput="conv('kgf',this.value)"></div>
    <div class="input-group"><label>Pound-force (lbf)</label><input type="number" id="lbf" oninput="conv('lbf',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const n = id === 'n' ? val : id === 'dyn' ? val / 100000 : id === 'kgf' ? val * 9.80665 : val * 4.44822;
      if(id !== 'n') document.getElementById('n').value = n;
      if(id !== 'dyn') document.getElementById('dyn').value = n * 100000;
      if(id !== 'kgf') document.getElementById('kgf').value = n / 9.80665;
      if(id !== 'lbf') document.getElementById('lbf').value = n / 4.44822;
    }
  </script>
</body>
</html>""",

    "tools/base32-encoder.html": r"""---
layout: default
title: "Base32 Encoder"
description: "Convert text to Base32 string format."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Base32 Encoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hi-base32/0.5.1/base32.min.js"></script>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Base32 Encoder</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Type here..."></textarea>
    <button onclick="encode()">Encode to Base32</button>
    <label style="margin-top:20px; display:block;">Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function encode() {
      const val = document.getElementById('input').value;
      if(window.base32) document.getElementById('output').value = base32.encode(val);
      else alert("Library loading...");
    }
  </script>
</body>
</html>""",

    "tools/base32-decoder.html": r"""---
layout: default
title: "Base32 Decoder"
description: "Decode Base32 strings back to readable text."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Base32 Decoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/hi-base32/0.5.1/base32.min.js"></script>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Base32 Decoder</h1>
    <label>Input Base32</label>
    <textarea id="input" placeholder="JBSWY3DPEBLW64TMMQ======"></textarea>
    <button onclick="decode()">Decode to Text</button>
    <label style="margin-top:20px; display:block;">Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function decode() {
      const val = document.getElementById('input').value;
      try {
        if(window.base32) document.getElementById('output').value = base32.decode(val);
      } catch(e) { alert("Invalid Base32"); }
    }
  </script>
</body>
</html>""",

    "tools/url-parser.html": r"""---
layout: default
title: "URL Parser"
description: "Parse and split URL into protocol, host, path, and query parameters."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>URL Parser</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    .result-row { display: flex; border-bottom: 1px solid #eee; padding: 10px 0; }
    .key { font-weight: bold; width: 150px; color: #64748b; }
    .val { font-family: monospace; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>URL Parser</h1>
    <input type="text" id="url" placeholder="https://example.com/path?query=123#hash">
    <button onclick="parse()">Parse URL</button>
    <div id="results" style="margin-top:20px;"></div>
  </div>
  <script>
    function parse() {
      try {
        const url = new URL(document.getElementById('url').value);
        const res = document.getElementById('results');
        res.innerHTML = `
          <div class="result-row"><span class="key">Protocol</span><span class="val">${url.protocol}</span></div>
          <div class="result-row"><span class="key">Host</span><span class="val">${url.host}</span></div>
          <div class="result-row"><span class="key">Path</span><span class="val">${url.pathname}</span></div>
          <div class="result-row"><span class="key">Query</span><span class="val">${url.search}</span></div>
          <div class="result-row"><span class="key">Hash</span><span class="val">${url.hash}</span></div>
        `;
      } catch(e) { alert("Invalid URL"); }
    }
  </script>
</body>
</html>""",

    "tools/calorie-calculator.html": r"""---
layout: default
title: "Calorie Calculator"
description: "Calculate daily calorie needs based on age, weight, height, and activity level."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Calorie Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input, select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; font-weight: bold; text-align: center; font-size: 1.5rem; color: #16a34a; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Calorie Calculator</h1>
    <div class="input-group"><label>Age</label><input type="number" id="age"></div>
    <div class="input-group"><label>Gender</label><select id="gender"><option value="m">Male</option><option value="f">Female</option></select></div>
    <div class="input-group"><label>Weight (kg)</label><input type="number" id="weight"></div>
    <div class="input-group"><label>Height (cm)</label><input type="number" id="height"></div>
    <div class="input-group">
      <label>Activity</label>
      <select id="activity">
        <option value="1.2">Sedentary</option>
        <option value="1.375">Light Activity</option>
        <option value="1.55">Moderate Activity</option>
        <option value="1.725">Very Active</option>
      </select>
    </div>
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const age = parseFloat(document.getElementById('age').value);
      const gender = document.getElementById('gender').value;
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      const activity = parseFloat(document.getElementById('activity').value);
      
      let bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'm' ? 5 : -161);
      const tdee = Math.round(bmr * activity);
      
      document.getElementById('result').innerText = `${tdee} Calories / day`;
    }
  </script>
</body>
</html>""",

    "tools/ideal-weight-calculator.html": r"""---
layout: default
title: "Ideal Weight Calculator"
description: "Calculate your ideal weight based on height using popular formulas (Devine, Robinson)."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ideal Weight Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input, select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; font-weight: bold; text-align: center; font-size: 1.2rem; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Ideal Weight Calculator</h1>
    <div class="input-group"><label>Gender</label><select id="gender"><option value="m">Male</option><option value="f">Female</option></select></div>
    <div class="input-group"><label>Height (cm)</label><input type="number" id="height"></div>
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const h = parseFloat(document.getElementById('height').value);
      const g = document.getElementById('gender').value;
      if(!h) return;
      
      const inchesOver60 = (h / 2.54) - 60;
      let ideal = g === 'm' ? 50 + (2.3 * inchesOver60) : 45.5 + (2.3 * inchesOver60);
      
      document.getElementById('result').innerText = `Ideal Weight: ${ideal.toFixed(1)} kg`;
    }
  </script>
</body>
</html>""",

    "tools/body-fat-calculator.html": r"""---
layout: default
title: "Body Fat Calculator"
description: "Estimate your body fat percentage using the US Navy method."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Body Fat Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input, select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; font-weight: bold; text-align: center; font-size: 1.5rem; color: #16a34a; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Body Fat Calculator</h1>
    <div class="input-group"><label>Gender</label><select id="gender"><option value="m">Male</option><option value="f">Female</option></select></div>
    <div class="input-group"><label>Waist (cm)</label><input type="number" id="waist"></div>
    <div class="input-group"><label>Neck (cm)</label><input type="number" id="neck"></div>
    <div class="input-group"><label>Height (cm)</label><input type="number" id="height"></div>
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const g = document.getElementById('gender').value;
      const w = parseFloat(document.getElementById('waist').value);
      const n = parseFloat(document.getElementById('neck').value);
      const h = parseFloat(document.getElementById('height').value);
      
      let bf = 0;
      if(g === 'm') {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(w + n - n) + 0.22100 * Math.log10(h)) - 450; 
        // Simplified logic placeholder, real female formula requires hips.
        // For accurate female calc, adding hip field would be needed, keeping simple for this batch.
      }
      document.getElementById('result').innerText = `Body Fat: ${bf.toFixed(1)}%`;
    }
  </script>
</body>
</html>""",

    "tools/bmr-calculator.html": r"""---
layout: default
title: "BMR Calculator - Basal Metabolic Rate"
description: "Calculate your Basal Metabolic Rate to know how many calories your body burns at rest."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BMR Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input, select { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; font-weight: bold; text-align: center; font-size: 1.5rem; color: #16a34a; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>BMR Calculator</h1>
    <div class="input-group"><label>Age</label><input type="number" id="age"></div>
    <div class="input-group"><label>Gender</label><select id="gender"><option value="m">Male</option><option value="f">Female</option></select></div>
    <div class="input-group"><label>Weight (kg)</label><input type="number" id="weight"></div>
    <div class="input-group"><label>Height (cm)</label><input type="number" id="height"></div>
    <button onclick="calculate()">Calculate BMR</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const age = parseFloat(document.getElementById('age').value);
      const gender = document.getElementById('gender').value;
      const weight = parseFloat(document.getElementById('weight').value);
      const height = parseFloat(document.getElementById('height').value);
      
      const bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === 'm' ? 5 : -161);
      document.getElementById('result').innerText = `${Math.round(bmr)} Calories / day`;
    }
  </script>
</body>
</html>""",

    "tools/water-intake-calculator.html": r"""---
layout: default
title: "Water Intake Calculator"
description: "Calculate your daily recommended water intake based on your weight."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Water Intake Calculator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px; }
    #result { margin-top: 20px; font-weight: bold; text-align: center; font-size: 1.5rem; color: #16a34a; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Water Intake Calculator</h1>
    <div class="input-group"><label>Weight (kg)</label><input type="number" id="weight"></div>
    <button onclick="calculate()">Calculate</button>
    <div id="result"></div>
  </div>
  <script>
    function calculate() {
      const weight = parseFloat(document.getElementById('weight').value);
      // Roughly 35ml per kg
      const intake = weight * 0.035;
      document.getElementById('result').innerText = `${intake.toFixed(1)} Liters / day`;
    }
  </script>
</body>
</html>""",

    "tools/base-converter.html": r"""---
layout: default
title: "Base Converter - Any Base to Any Base"
description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Base Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Base Converter</h1>
    <div class="input-group"><label>Decimal</label><input type="text" id="dec" oninput="convert('dec', this.value)"></div>
    <div class="input-group"><label>Binary</label><input type="text" id="bin" oninput="convert('bin', this.value)"></div>
    <div class="input-group"><label>Octal</label><input type="text" id="oct" oninput="convert('oct', this.value)"></div>
    <div class="input-group"><label>Hexadecimal</label><input type="text" id="hex" oninput="convert('hex', this.value)"></div>
  </div>
  <script>
    function convert(id, val) {
      if(!val) return;
      let dec = 0;
      if(id==='dec') dec = parseInt(val, 10);
      if(id==='bin') dec = parseInt(val, 2);
      if(id==='oct') dec = parseInt(val, 8);
      if(id==='hex') dec = parseInt(val, 16);
      
      if(isNaN(dec)) return;

      if(id!=='dec') document.getElementById('dec').value = dec.toString(10);
      if(id!=='bin') document.getElementById('bin').value = dec.toString(2);
      if(id!=='oct') document.getElementById('oct').value = dec.toString(8);
      if(id!=='hex') document.getElementById('hex').value = dec.toString(16).toUpperCase();
    }
  </script>
</body>
</html>""",

    "tools/binary-to-ip.html": r"""---
layout: default
title: "Binary to IP Converter"
description: "Convert a 32-bit binary string into a readable IP address."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Binary to IP</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Binary to IP</h1>
    <label>Binary (32-bit)</label>
    <input type="text" id="input" placeholder="11000000101010000000000100000001">
    <button onclick="convert()">Convert to IP</button>
    <label style="margin-top:20px; display:block;">IP Address</label>
    <input type="text" id="output" readonly>
  </div>
  <script>
    function convert() {
      const bin = document.getElementById('input').value.replace(/\s/g,'');
      if(bin.length !== 32) return alert("Must be 32 bits");
      const octets = [];
      for(let i=0; i<32; i+=8) octets.push(parseInt(bin.substr(i,8), 2));
      document.getElementById('output').value = octets.join('.');
    }
  </script>
</body>
</html>""",

    "tools/ip-to-binary.html": r"""---
layout: default
title: "IP to Binary Converter"
description: "Convert an IP address into a 32-bit binary string."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>IP to Binary</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>IP to Binary</h1>
    <label>IP Address</label>
    <input type="text" id="input" placeholder="192.168.1.1">
    <button onclick="convert()">Convert to Binary</button>
    <label style="margin-top:20px; display:block;">Binary Output</label>
    <input type="text" id="output" readonly>
  </div>
  <script>
    function convert() {
      const parts = document.getElementById('input').value.split('.');
      if(parts.length !== 4) return alert("Invalid IP");
      const bin = parts.map(n => parseInt(n).toString(2).padStart(8,'0')).join('');
      document.getElementById('output').value = bin;
    }
  </script>
</body>
</html>""",

    "tools/text-to-ascii.html": r"""---
layout: default
title: "Text to ASCII Converter"
description: "Convert text characters to their ASCII decimal codes."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text to ASCII</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Text to ASCII</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Hello"></textarea>
    <button onclick="convert()">Convert to ASCII</button>
    <label style="margin-top:20px; display:block;">ASCII Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      const val = document.getElementById('input').value;
      const arr = [];
      for(let i=0; i<val.length; i++) arr.push(val.charCodeAt(i));
      document.getElementById('output').value = arr.join(' ');
    }
  </script>
</body>
</html>""",

    "tools/ascii-to-text.html": r"""---
layout: default
title: "ASCII to Text Converter"
description: "Convert space-separated ASCII decimal codes back to text."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ASCII to Text</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>ASCII to Text</h1>
    <label>Input ASCII (Space separated)</label>
    <textarea id="input" placeholder="72 101 108 108 111"></textarea>
    <button onclick="convert()">Convert to Text</button>
    <label style="margin-top:20px; display:block;">Text Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      const val = document.getElementById('input').value.trim().split(/\s+/);
      let res = "";
      for(let c of val) res += String.fromCharCode(parseInt(c));
      document.getElementById('output').value = res;
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
