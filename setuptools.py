import os

tools = {
    "tools/angle-converter.html": r"""---
layout: default
title: "Angle Converter"
description: "Convert angles between Degrees, Radians, and Gradians."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Angle Converter</title>
  <style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border-radius:6px;border:1px solid #ccc;}</style>
</head>
<body>
  <div class="tool-container">
    <h1 style="color:#2563eb;text-align:center;">Angle Converter</h1>
    <label>Degrees (°)</label><input type="number" id="deg" oninput="conv('deg',this.value)">
    <label>Radians (rad)</label><input type="number" id="rad" oninput="conv('rad',this.value)">
    <label>Gradians (grad)</label><input type="number" id="grad" oninput="conv('grad',this.value)">
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val); if(isNaN(val)) return;
      const deg = id === 'deg' ? val : id === 'rad' ? val * (180/Math.PI) : val * 0.9;
      if(id !== 'deg') document.getElementById('deg').value = deg;
      if(id !== 'rad') document.getElementById('rad').value = deg * (Math.PI/180);
      if(id !== 'grad') document.getElementById('grad').value = deg / 0.9;
    }
  </script>
</body>
</html>""",

    "tools/pomodoro-timer.html": r"""---
layout: default
title: "Pomodoro Timer"
description: "Boost productivity with this 25-minute Pomodoro focus timer."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"><title>Pomodoro Timer</title>
  <style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} #time{font-size:5rem;font-weight:bold;color:#1e293b;margin:20px 0;} button{padding:12px 24px;font-size:1.1rem;border:none;border-radius:6px;cursor:pointer;color:white;margin:5px;} .start{background:#16a34a;} .stop{background:#dc2626;} .mode{background:#2563eb;}</style>
</head>
<body>
  <div class="tool-container">
    <h1 id="status">Focus Mode</h1>
    <div id="time">25:00</div>
    <button class="start" onclick="start()">Start</button>
    <button class="stop" onclick="reset()">Reset</button>
    <br><br>
    <button class="mode" onclick="setMode(25, 'Focus')">Pomodoro (25m)</button>
    <button class="mode" onclick="setMode(5, 'Break')">Short Break (5m)</button>
  </div>
  <script>
    let t, secs = 1500, running = false;
    function update() { document.getElementById('time').innerText = `${String(Math.floor(secs/60)).padStart(2,'0')}:${String(secs%60).padStart(2,'0')}`; }
    function start() { if(!running) { running = true; t = setInterval(()=>{ if(secs>0){secs--; update();}else{clearInterval(t); alert("Time's up!");} }, 1000); } }
    function reset() { clearInterval(t); running = false; update(); }
    function setMode(m, name) { clearInterval(t); running = false; secs = m*60; document.getElementById('status').innerText = name + ' Mode'; update(); }
  </script>
</body>
</html>""",

    "tools/compound-interest-calculator.html": r"""---
layout: default
title: "Compound Interest Calculator"
description: "Calculate future value of investments with compound interest."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Compound Interest</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;} #res{margin-top:20px;font-size:1.5rem;text-align:center;color:#16a34a;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Compound Interest</h1>
<label>Principal Amount ($)</label><input type="number" id="p" value="1000">
<label>Annual Interest Rate (%)</label><input type="number" id="r" value="5">
<label>Years</label><input type="number" id="t" value="10">
<button onclick="calc()">Calculate Future Value</button><div id="res"></div></div>
<script>function calc(){ const p=parseFloat(document.getElementById('p').value), r=parseFloat(document.getElementById('r').value)/100, t=parseFloat(document.getElementById('t').value); const a = p * Math.pow(1 + r, t); document.getElementById('res').innerText = '$' + a.toFixed(2); }</script></body></html>""",

    "tools/margin-calculator.html": r"""---
layout: default
title: "Margin Calculator"
description: "Calculate gross margin percentage based on cost and revenue."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Margin Calculator</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;} #res{margin-top:20px;font-size:1.2rem;text-align:center;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Margin Calculator</h1>
<label>Cost ($)</label><input type="number" id="c" placeholder="50">
<label>Revenue / Sale Price ($)</label><input type="number" id="r" placeholder="100">
<button onclick="calc()">Calculate</button><div id="res"></div></div>
<script>function calc(){ const c=parseFloat(document.getElementById('c').value), r=parseFloat(document.getElementById('r').value); if(r && c){ const p = r-c; const m = (p/r)*100; document.getElementById('res').innerHTML = `Profit: <strong>$${p.toFixed(2)}</strong><br>Margin: <strong>${m.toFixed(2)}%</strong>`; } }</script></body></html>""",

    "tools/roi-calculator.html": r"""---
layout: default
title: "ROI Calculator"
description: "Calculate Return on Investment (ROI) instantly."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>ROI Calculator</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;} #res{margin-top:20px;font-size:1.5rem;text-align:center;color:#16a34a;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">ROI Calculator</h1>
<label>Amount Invested ($)</label><input type="number" id="inv">
<label>Amount Returned ($)</label><input type="number" id="ret">
<button onclick="calc()">Calculate ROI</button><div id="res"></div></div>
<script>function calc(){ const i=parseFloat(document.getElementById('inv').value), r=parseFloat(document.getElementById('ret').value); if(i && r){ const roi = ((r-i)/i)*100; document.getElementById('res').innerText = `${roi.toFixed(2)}% ROI`; } }</script></body></html>""",

    "tools/salary-calculator.html": r"""---
layout: default
title: "Salary Calculator"
description: "Convert hourly wage to yearly salary and vice versa."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Salary Calculator</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Salary Calculator</h1>
<label>Hourly Wage ($)</label><input type="number" id="h" oninput="calc('h')">
<label>Weekly Income ($)</label><input type="number" id="w" oninput="calc('w')">
<label>Yearly Salary ($)</label><input type="number" id="y" oninput="calc('y')">
<p style="font-size:0.8rem;color:#666;text-align:center;">Assumes 40 hours/week, 52 weeks/year.</p></div>
<script>function calc(type){ const h=document.getElementById('h'), w=document.getElementById('w'), y=document.getElementById('y'); if(type==='h'){ w.value=(h.value*40).toFixed(2); y.value=(h.value*2080).toFixed(2); }else if(type==='w'){ h.value=(w.value/40).toFixed(2); y.value=(w.value*52).toFixed(2); }else{ h.value=(y.value/2080).toFixed(2); w.value=(y.value/52).toFixed(2); } }</script></body></html>""",

    "tools/sales-tax-calculator.html": r"""---
layout: default
title: "Sales Tax Calculator"
description: "Add sales tax to a price or find the pre-tax price."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Sales Tax</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;} #res{margin-top:20px;font-size:1.2rem;text-align:center;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Sales Tax</h1>
<label>Price Before Tax ($)</label><input type="number" id="p">
<label>Tax Rate (%)</label><input type="number" id="t" value="8">
<button onclick="calc()">Calculate Total</button><div id="res"></div></div>
<script>function calc(){ const p=parseFloat(document.getElementById('p').value), t=parseFloat(document.getElementById('t').value); if(p && t){ const tax = p*(t/100); const tot = p+tax; document.getElementById('res').innerHTML = `Tax Amount: $${tax.toFixed(2)}<br><strong>Total: $${tot.toFixed(2)}</strong>`; } }</script></body></html>""",

    "tools/aspect-ratio-calculator.html": r"""---
layout: default
title: "Aspect Ratio Calculator"
description: "Calculate missing dimensions based on aspect ratios."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Aspect Ratio</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .row{display:flex;gap:10px;} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Aspect Ratio</h1>
<p>Original Ratio (W1 : H1)</p>
<div class="row"><input type="number" id="w1" value="1920" oninput="calc()"><input type="number" id="h1" value="1080" oninput="calc()"></div>
<p>New Dimensions (W2 : H2)</p>
<div class="row">
  <div><label>New Width</label><input type="number" id="w2" oninput="calcW()"></div>
  <div><label>New Height</label><input type="number" id="h2" oninput="calcH()"></div>
</div></div>
<script>
  function calcW(){ const w1=document.getElementById('w1').value, h1=document.getElementById('h1').value, w2=document.getElementById('w2').value; document.getElementById('h2').value = (h1/w1)*w2; }
  function calcH(){ const w1=document.getElementById('w1').value, h1=document.getElementById('h1').value, h2=document.getElementById('h2').value; document.getElementById('w2').value = (w1/h1)*h2; }
  function calc(){ calcW(); }
</script></body></html>""",

    "tools/golden-ratio-calculator.html": r"""---
layout: default
title: "Golden Ratio Calculator"
description: "Calculate golden ratio proportions instantly."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Golden Ratio</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} p{text-align:center;color:#666;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Golden Ratio</h1>
<p>A / B = 1.618</p>
<label>Larger Part (A)</label><input type="number" id="a" oninput="calc('a')">
<label>Smaller Part (B)</label><input type="number" id="b" oninput="calc('b')">
<label>Total (A + B)</label><input type="number" id="t" oninput="calc('t')"></div>
<script>
  const phi = 1.61803398875;
  function calc(type){
    const a=document.getElementById('a'), b=document.getElementById('b'), t=document.getElementById('t');
    if(type==='a'){ b.value=(a.value/phi).toFixed(2); t.value=(parseFloat(a.value)+parseFloat(b.value)).toFixed(2); }
    if(type==='b'){ a.value=(b.value*phi).toFixed(2); t.value=(parseFloat(a.value)+parseFloat(b.value)).toFixed(2); }
    if(type==='t'){ a.value=(t.value/phi).toFixed(2); b.value=(t.value-a.value).toFixed(2); }
  }
</script></body></html>""",

    "tools/css-gradient-generator.html": r"""---
layout: default
title: "CSS Gradient Generator"
description: "Generate CSS linear gradients easily."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>CSS Gradient Generator</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} #preview{height:150px;border-radius:8px;margin-bottom:20px;border:1px solid #ccc;} .row{display:flex;gap:10px;margin-bottom:15px;} input[type=color]{width:100%;height:40px;} textarea{width:100%;padding:10px;font-family:monospace;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">CSS Gradient</h1>
<div id="preview"></div>
<div class="row"><input type="color" id="c1" value="#2563eb" oninput="update()"><input type="color" id="c2" value="#4ade80" oninput="update()"></div>
<label>Angle</label><input type="range" id="angle" min="0" max="360" value="90" style="width:100%" oninput="update()">
<textarea id="css" readonly rows="3"></textarea></div>
<script>
  function update(){
    const c1 = document.getElementById('c1').value, c2 = document.getElementById('c2').value, a = document.getElementById('angle').value;
    const grad = `linear-gradient(${a}deg, ${c1}, ${c2})`;
    document.getElementById('preview').style.background = grad;
    document.getElementById('css').value = `background: ${grad};`;
  }
  window.onload = update;
</script></body></html>""",

    "tools/css-box-shadow-generator.html": r"""---
layout: default
title: "CSS Box Shadow Generator"
description: "Generate CSS box shadow code visually."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Box Shadow Generator</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} #box{width:150px;height:150px;background:#2563eb;margin:40px auto;} .row{display:flex;justify-content:space-between;margin-bottom:10px;} input[type=range]{width:70%;} textarea{width:100%;padding:10px;font-family:monospace;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Box Shadow</h1>
<div id="box"></div>
<div class="row"><label>X Offset</label><input type="range" id="x" min="-50" max="50" value="10" oninput="update()"></div>
<div class="row"><label>Y Offset</label><input type="range" id="y" min="-50" max="50" value="10" oninput="update()"></div>
<div class="row"><label>Blur</label><input type="range" id="b" min="0" max="50" value="15" oninput="update()"></div>
<div class="row"><label>Spread</label><input type="range" id="s" min="-50" max="50" value="0" oninput="update()"></div>
<textarea id="css" readonly rows="2"></textarea></div>
<script>
  function update(){
    const x = document.getElementById('x').value, y = document.getElementById('y').value, b = document.getElementById('b').value, s = document.getElementById('s').value;
    const shadow = `${x}px ${y}px ${b}px ${s}px rgba(0,0,0,0.3)`;
    document.getElementById('box').style.boxShadow = shadow;
    document.getElementById('css').value = `box-shadow: ${shadow};`;
  }
  window.onload = update;
</script></body></html>""",

    "tools/css-border-radius-generator.html": r"""---
layout: default
title: "CSS Border Radius Generator"
description: "Generate CSS border radius visually."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Border Radius</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} #box{width:200px;height:200px;background:#2563eb;margin:40px auto;} .row{display:flex;justify-content:space-between;margin-bottom:10px;} input[type=range]{width:70%;} textarea{width:100%;padding:10px;font-family:monospace;border:1px solid #ccc;border-radius:6px;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Border Radius</h1>
<div id="box"></div>
<div class="row"><label>All Corners</label><input type="range" id="r" min="0" max="100" value="20" oninput="update()"></div>
<textarea id="css" readonly rows="2"></textarea></div>
<script>
  function update(){
    const r = document.getElementById('r').value + '%';
    document.getElementById('box').style.borderRadius = r;
    document.getElementById('css').value = `border-radius: ${r};`;
  }
  window.onload = update;
</script></body></html>""",

    "tools/base64-to-image.html": r"""---
layout: default
title: "Base64 to Image Decoder"
description: "Decode Base64 strings back into viewable images."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Base64 to Image</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;margin:15px 0;} img{max-width:100%;border-radius:6px;display:none;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Base64 to Image</h1>
<textarea id="input" placeholder="data:image/png;base64,iVBORw0KG..."></textarea>
<button onclick="decode()">View Image</button>
<div style="text-align:center;"><img id="img" src=""></div></div>
<script>
  function decode(){
    const val = document.getElementById('input').value.trim();
    if(!val) return;
    const img = document.getElementById('img');
    img.src = val.startsWith('data:image') ? val : 'data:image/png;base64,' + val;
    img.style.display = 'inline-block';
  }
</script></body></html>""",

    "tools/whitespace-remover.html": r"""---
layout: default
title: "Whitespace Remover"
description: "Remove extra spaces, tabs, and line breaks from text."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Whitespace Remover</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Whitespace Remover</h1>
<textarea id="in" placeholder="Type text with     too much   space..."></textarea>
<button onclick="removeExtra()">Remove Extra Spaces</button>
<button onclick="removeAll()" style="background:#4b5563;">Remove ALL Whitespace</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  function removeExtra(){ document.getElementById('out').value = document.getElementById('in').value.replace(/\s+/g, ' ').trim(); }
  function removeAll(){ document.getElementById('out').value = document.getElementById('in').value.replace(/\s+/g, ''); }
</script></body></html>""",

    "tools/line-break-remover.html": r"""---
layout: default
title: "Line Break Remover"
description: "Remove line breaks and paragraph formatting from text."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Line Break Remover</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Line Break Remover</h1>
<textarea id="in" placeholder="Text with&#10;line breaks..."></textarea>
<button onclick="removeBr()">Remove Line Breaks</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  function removeBr(){ document.getElementById('out').value = document.getElementById('in').value.replace(/(\r\n|\n|\r)/gm, " "); }
</script></body></html>""",

    "tools/list-alphabetizer.html": r"""---
layout: default
title: "List Alphabetizer"
description: "Sort any list of text alphabetically in seconds."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>List Alphabetizer</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">List Alphabetizer</h1>
<textarea id="in" placeholder="Zebra&#10;Apple&#10;Banana"></textarea>
<button onclick="sortA()">Sort A-Z</button>
<button onclick="sortZ()" style="background:#4b5563;">Sort Z-A</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  function getLines(){ return document.getElementById('in').value.split('\n').filter(l=>l.trim()!==''); }
  function sortA(){ document.getElementById('out').value = getLines().sort((a,b)=>a.localeCompare(b)).join('\n'); }
  function sortZ(){ document.getElementById('out').value = getLines().sort((a,b)=>b.localeCompare(a)).join('\n'); }
</script></body></html>""",

    "tools/list-shuffler.html": r"""---
layout: default
title: "List Shuffler"
description: "Randomize the order of items in a text list."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>List Shuffler</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">List Shuffler</h1>
<textarea id="in" placeholder="Item 1&#10;Item 2&#10;Item 3"></textarea>
<button onclick="shuffle()">Randomize List</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  function shuffle(){ 
    let arr = document.getElementById('in').value.split('\n').filter(l=>l.trim()!=='');
    for(let i = arr.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    document.getElementById('out').value = arr.join('\n'); 
  }
</script></body></html>""",

    "tools/remove-duplicate-lines.html": r"""---
layout: default
title: "Remove Duplicate Lines"
description: "Find and remove duplicate lines from a text document."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Remove Duplicates</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Remove Duplicates</h1>
<textarea id="in" placeholder="Apple&#10;Banana&#10;Apple"></textarea>
<button onclick="rem()">Remove Duplicate Lines</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  function rem(){ 
    const arr = document.getElementById('in').value.split('\n');
    document.getElementById('out').value = [...new Set(arr)].join('\n'); 
  }
</script></body></html>""",

    "tools/prefix-suffix-adder.html": r"""---
layout: default
title: "Prefix & Suffix Text Adder"
description: "Add a prefix or suffix to every line of text instantly."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Prefix/Suffix Adder</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea,input{width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} .row{display:flex;gap:10px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Add Prefix & Suffix</h1>
<textarea id="in" placeholder="Line 1&#10;Line 2"></textarea>
<div class="row"><div><label>Prefix</label><input type="text" id="pre" placeholder="- "></div><div><label>Suffix</label><input type="text" id="suf" placeholder=","></div></div>
<button onclick="add()">Process Lines</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  function add(){ 
    const pre = document.getElementById('pre').value;
    const suf = document.getElementById('suf').value;
    const lines = document.getElementById('in').value.split('\n');
    document.getElementById('out').value = lines.map(l => l.trim().length > 0 ? pre + l + suf : l).join('\n'); 
  }
</script></body></html>""",

    "tools/json-validator.html": r"""---
layout: default
title: "JSON Validator"
description: "Check if your JSON code is valid and well-formed."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>JSON Validator</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:200px;padding:10px;border:1px solid #ccc;border-radius:6px;font-family:monospace;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;margin-top:10px;} #res{margin-top:20px;padding:15px;border-radius:6px;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">JSON Validator</h1>
<textarea id="in" placeholder='{"key":"value"}'></textarea>
<button onclick="val()">Validate JSON</button>
<div id="res"></div></div>
<script>
  function val(){ 
    const t = document.getElementById('in').value;
    const res = document.getElementById('res');
    if(!t){ res.innerText=""; return; }
    try{ JSON.parse(t); res.innerText="✅ Valid JSON!"; res.style.background="#d1fae5"; res.style.color="#065f46"; }
    catch(e){ res.innerText="❌ Invalid JSON: " + e.message; res.style.background="#fee2e2"; res.style.color="#991b1b"; }
  }
</script></body></html>""",

    "tools/password-strength-checker.html": r"""---
layout: default
title: "Password Strength Checker"
description: "Test the security and strength of your passwords safely offline."
category: "Security Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Password Strength</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;font-size:18px;margin-bottom:20px;} #bar{height:10px;background:#e2e8f0;border-radius:5px;margin-bottom:10px;overflow:hidden;} #fill{height:100%;width:0%;background:#ef4444;transition:0.3s;} #msg{font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">Password Checker</h1>
<input type="text" id="pass" placeholder="Type password here..." oninput="check()">
<div id="bar"><div id="fill"></div></div><div id="msg">Strength: None</div>
<p style="font-size:0.8rem;color:#666;">Data is not sent anywhere.</p></div>
<script>
  function check(){ 
    const p = document.getElementById('pass').value;
    let s = 0;
    if(p.length > 5) s+=1; if(p.length > 10) s+=1;
    if(/[A-Z]/.test(p)) s+=1; if(/[0-9]/.test(p)) s+=1; if(/[^A-Za-z0-9]/.test(p)) s+=1;
    const fill = document.getElementById('fill'), msg = document.getElementById('msg');
    if(s===0){ fill.style.width="0%"; msg.innerText="Strength: None"; }
    else if(s<=2){ fill.style.width="33%"; fill.style.background="#ef4444"; msg.innerText="Strength: Weak"; msg.style.color="#ef4444"; }
    else if(s<=4){ fill.style.width="66%"; fill.style.background="#facc15"; msg.innerText="Strength: Medium"; msg.style.color="#ca8a04"; }
    else { fill.style.width="100%"; fill.style.background="#16a34a"; msg.innerText="Strength: Strong"; msg.style.color="#16a34a"; }
  }
</script></body></html>""",

    "tools/reading-time-estimator.html": r"""---
layout: default
title: "Reading Time Estimator"
description: "Calculate how long it takes to read an article or text block."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Reading Time</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:200px;padding:10px;border:1px solid #ccc;border-radius:6px;} #res{margin-top:20px;font-size:1.5rem;font-weight:bold;text-align:center;color:#2563eb;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Reading Time Estimator</h1>
<textarea id="in" placeholder="Paste your article here..." oninput="calc()"></textarea>
<div id="res">0 min read</div></div>
<script>
  function calc(){ 
    const t = document.getElementById('in').value.trim();
    const w = t ? t.split(/\s+/).length : 0;
    const m = Math.ceil(w / 200); // 200 words per min avg
    document.getElementById('res').innerText = `${m} min read (${w} words)`; 
  }
</script></body></html>""",

    "tools/leet-speak-converter.html": r"""---
layout: default
title: "Leet Speak Converter"
description: "Convert normal text to 1337 5p34k instantly."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Leet Speak</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{padding:12px 24px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Leet Speak Converter</h1>
<textarea id="in" placeholder="Hello hacker"></textarea>
<button onclick="conv()">Convert to 1337</button>
<textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
  const dict = {'a':'4','e':'3','i':'1','o':'0','s':'5','t':'7','l':'1'};
  function conv(){ 
    let t = document.getElementById('in').value.toLowerCase();
    document.getElementById('out').value = t.replace(/[aeiostl]/g, m => dict[m]); 
  }
</script></body></html>""",

    "tools/octal-to-decimal.html": r"""---
layout: default
title: "Octal to Decimal Converter"
description: "Convert octal (base-8) numbers to decimal format."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Octal to Decimal</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;margin-bottom:20px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Octal to Decimal</h1>
<input type="text" id="in" placeholder="e.g. 17">
<button onclick="conv()">Convert</button>
<label style="margin-top:20px; display:block;">Decimal Result</label>
<input type="text" id="out" readonly></div>
<script>
  function conv(){ 
    const v = document.getElementById('in').value;
    if(!/^[0-7]+$/.test(v)) return alert("Invalid Octal number");
    document.getElementById('out').value = parseInt(v, 8); 
  }
</script></body></html>""",

    "tools/decimal-to-octal.html": r"""---
layout: default
title: "Decimal to Octal Converter"
description: "Convert decimal numbers to octal (base-8) format."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Decimal to Octal</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;margin-bottom:20px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Decimal to Octal</h1>
<input type="number" id="in" placeholder="e.g. 15">
<button onclick="conv()">Convert</button>
<label style="margin-top:20px; display:block;">Octal Result</label>
<input type="text" id="out" readonly></div>
<script>
  function conv(){ 
    const v = parseInt(document.getElementById('in').value, 10);
    if(!isNaN(v)) document.getElementById('out').value = v.toString(8); 
  }
</script></body></html>"""
}

# Ensure directory exists
os.makedirs("tools", exist_ok=True)

# Write files
for filename, content in tools.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created {filename}")
