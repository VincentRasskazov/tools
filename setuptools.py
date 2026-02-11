import os

tools = {
    "tools/loan-amortization-schedule.html": r"""---
layout: default
title: "Loan Amortization Schedule Generator"
description: "Generate a full payment schedule for your loan, including interest and principal breakdowns."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Amortization Schedule</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;} table{width:100%;margin-top:20px;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;text-align:right;} th{background:#f2f2f2;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Amortization Schedule</h1>
<label>Loan Amount ($)</label><input type="number" id="p" value="10000">
<label>Interest Rate (%)</label><input type="number" id="r" value="5">
<label>Years</label><input type="number" id="y" value="3">
<button onclick="calc()">Generate Schedule</button>
<table id="st" style="display:none;"><thead><tr><th>Month</th><th>Payment</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody id="sb"></tbody></table></div>
<script>
function calc(){
  const P=parseFloat(document.getElementById('p').value), r=parseFloat(document.getElementById('r').value)/100/12, n=parseFloat(document.getElementById('y').value)*12;
  const pay = (P*r)/(1-Math.pow(1+r,-n));
  let bal = P, html = '';
  for(let i=1;i<=n;i++){
    let intr = bal*r, prin = pay-intr; bal -= prin;
    html += `<tr><td>${i}</td><td>${pay.toFixed(2)}</td><td>${prin.toFixed(2)}</td><td>${intr.toFixed(2)}</td><td>${Math.max(0,bal).toFixed(2)}</td></tr>`;
  }
  document.getElementById('sb').innerHTML = html; document.getElementById('st').style.display='table';
}
</script></body></html>""",

    "tools/html-escape-unescape.html": r"""---
layout: default
title: "HTML Escape & Unescape"
description: "Safely escape or unescape HTML characters for web development."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>HTML Escape</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;font-family:monospace;margin-bottom:10px;} button{padding:10px 20px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;margin-right:10px;}</style></head>
<body><div class="tool-container"><h1>HTML Escape / Unescape</h1>
<textarea id="i" placeholder="<div>Hello World</div>"></textarea>
<button onclick="esc()">Escape</button><button onclick="unesc()" style="background:#4b5563">Unescape</button>
<textarea id="o" readonly style="margin-top:20px;background:#f9fafb;"></textarea></div>
<script>
function esc(){ const d=document.createElement('div'); d.textContent=document.getElementById('i').value; document.getElementById('o').value=d.innerHTML; }
function unesc(){ const d=document.createElement('div'); d.innerHTML=document.getElementById('i').value; document.getElementById('o').value=d.textContent; }
</script></body></html>""",

    "tools/reading-time.html": r"""---
layout: default
title: "Advanced Reading Time Estimator"
description: "Get detailed insights on reading time based on word complexity."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Reading Time</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:200px;padding:10px;border:1px solid #ccc;border-radius:6px;} .stats{display:flex;justify-content:space-around;margin-top:20px;text-align:center;}</style></head>
<body><div class="tool-container"><h1>Reading Time Estimator</h1>
<textarea id="in" placeholder="Paste your text..." oninput="calc()"></textarea>
<div class="stats">
  <div><h3 id="slow">0</h3><p>Slow (150 wpm)</p></div>
  <div><h3 id="avg">0</h3><p>Avg (220 wpm)</p></div>
  <div><h3 id="fast">0</h3><p>Fast (300 wpm)</p></div>
</div></div>
<script>
function calc(){
  const text = document.getElementById('in').value.trim();
  const w = text ? text.split(/\s+/).length : 0;
  document.getElementById('slow').innerText = Math.ceil(w/150) + ' min';
  document.getElementById('avg').innerText = Math.ceil(w/220) + ' min';
  document.getElementById('fast').innerText = Math.ceil(w/300) + ' min';
}
</script></body></html>""",

    "tools/lightning-lux-calculator.html": r"""---
layout: default
title: "Lux to Lumens Calculator"
description: "Calculate light intensity (Lux) based on lumens and surface area."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Lux/Lumens Calc</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1>Lux/Lumens Calculator</h1>
<label>Luminous Flux (Lumens)</label><input type="number" id="lm" value="800">
<label>Area (sq. meters)</label><input type="number" id="ar" value="10">
<button onclick="calc()">Calculate Lux</button>
<h2 id="res" style="text-align:center;color:#16a34a;"></h2></div>
<script>
function calc(){ const lm=document.getElementById('lm').value, ar=document.getElementById('ar').value; document.getElementById('res').innerText = (lm/ar).toFixed(2) + ' lux'; }
</script></body></html>""",

    "tools/binary-to-hex-converter.html": r"""---
layout: default
title: "Binary to Hex Converter"
description: "Convert binary numbers to hexadecimal format instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Binary to Hex</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1>Binary to Hex</h1>
<label>Binary</label><input type="text" id="b" oninput="document.getElementById('h').value = parseInt(this.value, 2).toString(16).toUpperCase()">
<label>Hexadecimal</label><input type="text" id="h" readonly></div></body></html>""",

    "tools/decimal-to-hex.html": r"""---
layout: default
title: "Decimal to Hex Converter"
description: "Convert decimal numbers to hexadecimal."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Decimal to Hex</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Decimal to Hex</h1>
<label>Decimal</label><input type="number" id="d" oninput="document.getElementById('h').value = parseInt(this.value, 10).toString(16).toUpperCase()">
<label>Hexadecimal</label><input type="text" id="h" readonly></div></body></html>""",

    "tools/ip-subnet-calculator.html": r"""---
layout: default
title: "IP Subnet Calculator"
description: "Calculate network range, broadcast, and mask for any IP address."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Subnet Calculator</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} .res{margin-top:20px;font-family:monospace;background:#f8fafc;padding:15px;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Subnet Calculator</h1>
<label>IP Address</label><input type="text" id="ip" value="192.168.1.1">
<label>CIDR Mask (e.g. 24)</label><input type="number" id="mask" value="24">
<button onclick="calc()">Calculate</button>
<div class="res" id="out"></div></div>
<script>
function calc(){
  const ip = document.getElementById('ip').value;
  const mask = document.getElementById('mask').value;
  document.getElementById('out').innerHTML = `IP: ${ip}<br>Mask: /${mask}<br>Hosts: ${Math.pow(2, 32-mask)-2}`;
}
</script></body></html>""",

    "tools/binary-to-text.html": r"""---
layout: default
title: "Binary to Text Converter"
description: "Convert binary code into readable text characters."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Binary to Text</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1>Binary to Text</h1>
<textarea id="i" placeholder="01001000 01100101 01101100 01101100 01101111" oninput="conv()"></textarea>
<textarea id="o" readonly style="margin-top:20px;background:#f9fafb;"></textarea></div>
<script>
function conv(){
  const b = document.getElementById('i').value.trim().split(/\s+/);
  document.getElementById('o').value = b.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
}
</script></body></html>""",

    "tools/hex-to-octal.html": r"""---
layout: default
title: "Hex to Octal Converter"
description: "Convert hexadecimal values to octal instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Hex to Octal</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Hex to Octal</h1>
<label>Hex</label><input type="text" id="h" oninput="document.getElementById('o').value = parseInt(this.value, 16).toString(8)">
<label>Octal</label><input type="text" id="o" readonly></div></body></html>""",

    "tools/octal-to-hex.html": r"""---
layout: default
title: "Octal to Hex Converter"
description: "Convert octal numbers to hexadecimal format."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Octal to Hex</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Octal to Hex</h1>
<label>Octal</label><input type="text" id="o" oninput="document.getElementById('h').value = parseInt(this.value, 8).toString(16).toUpperCase()">
<label>Hex</label><input type="text" id="h" readonly></div></body></html>""",

    "tools/octal-to-binary.html": r"""---
layout: default
title: "Octal to Binary Converter"
description: "Convert octal numbers to binary code."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Octal to Binary</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Octal to Binary</h1>
<label>Octal</label><input type="text" id="o" oninput="document.getElementById('b').value = parseInt(this.value, 8).toString(2)">
<label>Binary</label><input type="text" id="b" readonly></div></body></html>""",

    "tools/binary-to-octal.html": r"""---
layout: default
title: "Binary to Octal Converter"
description: "Convert binary code into octal numbers."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Binary to Octal</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Binary to Octal</h1>
<label>Binary</label><input type="text" id="b" oninput="document.getElementById('o').value = parseInt(this.value, 2).toString(8)">
<label>Octal</label><input type="text" id="o" readonly></div></body></html>""",

    "tools/sha1-hash-generator.html": r"""---
layout: default
title: "SHA1 Hash Generator"
description: "Generate SHA1 hashes from text strings."
category: "Security Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>SHA1 Generator</title><script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script><style>.tool-container{max-width:700px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:100px;padding:10px;border:1px solid #ccc;border-radius:6px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1>SHA1 Hash Generator</h1>
<textarea id="i" placeholder="Type text..." oninput="document.getElementById('o').innerText = CryptoJS.SHA1(this.value).toString()"></textarea>
<div id="o" style="margin-top:20px;word-break:break-all;font-family:monospace;background:#f8fafc;padding:15px;border-radius:6px;">Hash will appear here...</div></div></body></html>""",

    "tools/palindrome-checker.html": r"""---
layout: default
title: "Palindrome Checker"
description: "Check if a word or phrase is a palindrome."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Palindrome Checker</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} .res{text-align:center;font-size:1.5rem;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1>Palindrome Checker</h1>
<input type="text" id="i" placeholder="racecar" oninput="check()">
<div id="r" class="res"></div></div>
<script>
function check(){
  const s = document.getElementById('i').value.toLowerCase().replace(/[^a-z0-9]/g,'');
  const r = s.split('').reverse().join('');
  document.getElementById('r').innerText = s && s === r ? "✅ Yes!" : "❌ No";
  document.getElementById('r').style.color = s && s === r ? "#16a34a" : "#dc2626";
}
</script></body></html>""",

    "tools/anagram-solver.html": r"""---
layout: default
title: "Anagram Solver"
description: "Find if two words are anagrams of each other."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Anagram Solver</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} .res{text-align:center;font-size:1.5rem;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1>Anagram Solver</h1>
<input type="text" id="a" placeholder="Listen" oninput="solve()">
<input type="text" id="b" placeholder="Silent" oninput="solve()">
<div id="r" class="res"></div></div>
<script>
function solve(){
  const s1 = document.getElementById('a').value.toLowerCase().replace(/[^a-z]/g,'').split('').sort().join('');
  const s2 = document.getElementById('b').value.toLowerCase().replace(/[^a-z]/g,'').split('').sort().join('');
  document.getElementById('r').innerText = (s1 && s1 === s2) ? "✅ Anagrams!" : "❌ Not Anagrams";
  document.getElementById('r').style.color = (s1 && s1 === s2) ? "#16a34a" : "#dc2626";
}
</script></body></html>""",

    "tools/daily-calorie-tracker.html": r"""---
layout: default
title: "Daily Calorie Tracker"
description: "Keep track of your daily food intake and calories."
category: "Health Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Calorie Tracker</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{padding:8px;border:1px solid #ccc;border-radius:4px;margin-right:10px;} button{padding:8px 15px;background:#2563eb;color:white;border:none;border-radius:4px;cursor:pointer;} ul{list-style:none;padding:0;margin-top:20px;} li{padding:10px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;}</style></head>
<body><div class="tool-container"><h1>Daily Calorie Tracker</h1>
<input type="text" id="f" placeholder="Food item">
<input type="number" id="c" placeholder="Calories">
<button onclick="add()">Add</button>
<h2 id="total" style="margin-top:20px;">Total: 0 kcal</h2><ul id="list"></ul></div>
<script>
let total = 0;
function add(){
  const f=document.getElementById('f').value, c=parseInt(document.getElementById('c').value);
  if(f && c){
    total += c; document.getElementById('total').innerText = `Total: ${total} kcal`;
    const li = document.createElement('li'); li.innerHTML = `<span>${f}</span><span>${c} kcal</span>`;
    document.getElementById('list').appendChild(li);
    document.getElementById('f').value=''; document.getElementById('c').value='';
  }
}
</script></body></html>""",

    "tools/flashcard-study-tool.html": r"""---
layout: default
title: "Flashcard Study Tool"
description: "Create and study simple flashcards to help you memorize anything."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Flashcards</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} .card{height:200px;border:2px solid #2563eb;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:2rem;cursor:pointer;margin:20px 0;transition:0.3s;padding:20px;} .card:hover{background:#f0f9ff;}</style></head>
<body><div class="tool-container"><h1>Flashcards</h1>
<div id="card" class="card" onclick="flip()">Click to Add First Card</div>
<div id="controls" style="display:none;"><button onclick="prev()">Prev</button> <button onclick="next()">Next</button></div>
<hr><input id="q" placeholder="Question"><input id="a" placeholder="Answer"><button onclick="add()">Add Card</button></div>
<script>
let cards = [], cur = 0, side = 0;
function add(){
  const q=document.getElementById('q').value, a=document.getElementById('a').value;
  if(q&&a){ cards.push({q,a}); document.getElementById('controls').style.display='block'; show(); }
}
function flip(){ if(cards.length) { side = 1-side; show(); } }
function next(){ cur = (cur+1)%cards.length; side=0; show(); }
function prev(){ cur = (cur-1+cards.length)%cards.length; side=0; show(); }
function show(){ document.getElementById('card').innerText = side === 0 ? cards[cur].q : cards[cur].a; }
</script></body></html>""",

    "tools/markdown-to-pdf-converter.html": r"""---
layout: default
title: "Markdown to PDF Converter"
description: "Convert your markdown text to a clean PDF document."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Markdown to PDF</title><script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:300px;margin-bottom:20px;padding:10px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Markdown to PDF</h1>
<textarea id="m" placeholder="# Title\nYour text..."></textarea>
<button onclick="window.print()" style="width:100%;padding:15px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Save as PDF (Print to PDF)</button>
<div id="p" style="display:none;"></div></div></body></html>""",

    "tools/regex-pattern-generator.html": r"""---
layout: default
title: "Regex Pattern Generator"
description: "Generate simple regular expressions for common tasks like email or date matching."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Regex Generator</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} select, input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} .res{font-family:monospace;background:#f8fafc;padding:15px;border-radius:6px;word-break:break-all;font-size:1.2rem;color:#2563eb;}</style></head>
<body><div class="tool-container"><h1>Regex Pattern Generator</h1>
<label>I want to match:</label>
<select id="sel" onchange="gen()">
  <option value="email">Email Address</option>
  <option value="date">Date (YYYY-MM-DD)</option>
  <option value="phone">Phone Number (US)</option>
  <option value="url">URL</option>
  <option value="num">Only Numbers</option>
</select>
<div class="res" id="out">^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$</div></div>
<script>
const patterns = { email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', date: '^\\d{4}-\\d{2}-\\d{2}$', phone: '^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$', url: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$', num: '^\\d+$' };
function gen(){ document.getElementById('out').innerText = patterns[document.getElementById('sel').value]; }
</script></body></html>""",

    "tools/mind-map-creator.html": r"""---
layout: default
title: "Simple Mind Map Creator"
description: "Create visual mind maps with simple bullet points."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Mind Map</title><style>.tool-container{max-width:900px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;font-family:monospace;padding:10px;border-radius:6px;} .node{margin-left:20px;border-left:2px solid #2563eb;padding-left:10px;margin-top:5px;}</style></head>
<body><div class="tool-container"><h1>Text to Mind Map</h1>
<textarea id="i" oninput="draw()" placeholder="Main Topic&#10; Subtopic 1&#10; Subtopic 2"></textarea>
<div id="o" style="margin-top:30px;"></div></div>
<script>
function draw(){
  const lines = document.getElementById('i').value.split('\n');
  let html = '';
  lines.forEach(l => {
    const indent = l.search(/\S/);
    if(indent !== -1) html += `<div class="node" style="margin-left:${indent*20}px">${l.trim()}</div>`;
  });
  document.getElementById('o').innerHTML = html;
}
</script></body></html>""",

    "tools/website-uptime-monitor.html": r"""---
layout: default
title: "Website Uptime Checker"
description: "Check if a website is currently up or down."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Uptime Checker</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;margin-bottom:20px;}</style></head>
<body><div class="tool-container"><h1>Website Status Checker</h1>
<input type="text" id="u" placeholder="google.com">
<button onclick="check()" style="width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;">Check Status</button>
<div id="r" style="margin-top:20px;font-size:1.5rem;font-weight:bold;"></div></div>
<script>
async function check(){
  const u = document.getElementById('u').value;
  document.getElementById('r').innerText = "Checking...";
  try{
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://'+u)}`);
    document.getElementById('r').innerText = res.ok ? "✅ Website is ONLINE" : "❌ Website is OFFLINE";
    document.getElementById('r').style.color = res.ok ? "#16a34a" : "#dc2626";
  } catch(e) { document.getElementById('r').innerText = "Error checking status"; }
}
</script></body></html>""",

    "tools/time-zone-converter.html": r"""---
layout: default
title: "Time Zone Converter"
description: "Convert a specific time from one time zone to another."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>TZ Converter</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input, select{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Time Zone Converter</h1>
<input type="datetime-local" id="t" oninput="calc()">
<label>To Time Zone:</label>
<select id="z" onchange="calc()">
  <option value="UTC">UTC</option><option value="America/New_York">New York (EST)</option><option value="Europe/London">London (GMT)</option><option value="Asia/Tokyo">Tokyo</option>
</select>
<div id="r" style="text-align:center;font-size:1.5rem;font-weight:bold;color:#2563eb;margin-top:20px;"></div></div>
<script>
function calc(){
  const t = document.getElementById('t').value;
  const z = document.getElementById('z').value;
  if(t){
    const d = new Date(t);
    document.getElementById('r').innerText = d.toLocaleString('en-US', { timeZone: z });
  }
}
</script></body></html>""",

    "tools/gantt-chart-maker.html": r"""---
layout: default
title: "Simple Gantt Chart Maker"
description: "Create a simple visual Gantt chart for project management."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Gantt Chart</title><style>.tool-container{max-width:900px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .bar{height:30px;background:#2563eb;color:white;border-radius:4px;margin-bottom:10px;display:flex;align-items:center;padding:0 10px;font-size:0.8rem;}</style></head>
<body><div class="tool-container"><h1>Simple Gantt Chart</h1>
<div id="chart">
  <div class="bar" style="width:20%; margin-left:0%">Task 1: Design</div>
  <div class="bar" style="width:30%; margin-left:20%; background:#16a34a">Task 2: Develop</div>
  <div class="bar" style="width:15%; margin-left:50%; background:#facc15">Task 3: Test</div>
</div>
<p style="text-align:center;color:#666;">Coming Soon: Dynamic Editing</p></div></body></html>""",

    "tools/text-similarity-checker.html": r"""---
layout: default
title: "Text Similarity Checker"
description: "Check how similar two pieces of text are using a percentage score."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Similarity Checker</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1>Text Similarity Checker</h1>
<textarea id="a" placeholder="Text One"></textarea><textarea id="b" style="margin-top:10px" placeholder="Text Two"></textarea>
<button onclick="check()" style="width:100%;padding:12px;margin-top:10px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Compare</button>
<h2 id="r" style="text-align:center;margin-top:20px;"></h2></div>
<script>
function check(){
  const s1=document.getElementById('a').value, s2=document.getElementById('b').value;
  let matches = 0; const a1=s1.split(' '), a2=s2.split(' ');
  a1.forEach(w => { if(a2.includes(w)) matches++; });
  const score = ((matches*2)/(a1.length+a2.length)*100).toFixed(1);
  document.getElementById('r').innerText = `Similarity: ${score}%`;
}
</script></body></html>""",

    "tools/flowchart-maker.html": r"""---
layout: default
title: "Flowchart Maker"
description: "Create simple flowcharts using text-based logic."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Flowchart Maker</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} .box{border:2px solid #333;padding:10px;display:inline-block;margin:10px;} .arr{font-size:2rem;}</style></head>
<body><div class="tool-container"><h1>Flowchart Maker</h1>
<div class="box">Start</div><div class="arr">↓</div>
<div class="box">Process</div><div class="arr">↓</div>
<div class="box">End</div>
<p style="margin-top:30px;color:#666;">Coming Soon: Drag and Drop Flowcharts</p></div></body></html>"""
}

# Ensure directory exists
os.makedirs("tools", exist_ok=True)

# Write files
for filename, content in tools.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created {filename}")
