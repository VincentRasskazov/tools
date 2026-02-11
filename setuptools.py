import os

tools = {
    "tools/unit-converter.html": r"""---
layout: default
title: "Unit Converter - Length, Weight & More"
description: "Free online unit converter. Easily convert between different units of length and weight."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Unit Converter</title>
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .row { display: flex; gap: 15px; margin-bottom: 20px; }
    .col { flex: 1; }
    select, input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 16px; margin-top: 5px; }
    label { font-weight: 600; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Unit Converter</h1>
    <label>Category</label>
    <select id="cat" onchange="updateUnits()" style="margin-bottom: 20px;">
      <option value="length">Length</option>
      <option value="weight">Weight</option>
    </select>
    <div class="row">
      <div class="col">
        <label>From</label>
        <input type="number" id="valA" value="1" oninput="calc('A')">
        <select id="unitA" onchange="calc('A')"></select>
      </div>
      <div class="col">
        <label>To</label>
        <input type="number" id="valB" oninput="calc('B')">
        <select id="unitB" onchange="calc('A')"></select>
      </div>
    </div>
  </div>
  <script>
    const units = {
      length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
      weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.453592, oz: 0.0283495 }
    };
    function updateUnits() {
      const cat = document.getElementById('cat').value;
      const u = Object.keys(units[cat]);
      let html = u.map(x => `<option value="${x}">${x.toUpperCase()}</option>`).join('');
      document.getElementById('unitA').innerHTML = html;
      document.getElementById('unitB').innerHTML = html;
      document.getElementById('unitB').selectedIndex = 1 % u.length;
      calc('A');
    }
    function calc(source) {
      const cat = document.getElementById('cat').value;
      const uA = document.getElementById('unitA').value;
      const uB = document.getElementById('unitB').value;
      const vA = document.getElementById('valA');
      const vB = document.getElementById('valB');
      if(source === 'A') {
        vB.value = (vA.value * units[cat][uA] / units[cat][uB]).toFixed(5).replace(/\.?0+$/, '');
      } else {
        vA.value = (vB.value * units[cat][uB] / units[cat][uA]).toFixed(5).replace(/\.?0+$/, '');
      }
    }
    updateUnits();
  </script>
</body>
</html>""",

    "tools/epoch-converter.html": r"""---
layout: default
title: "Epoch Converter - Unix Timestamp to Date"
description: "Convert Unix epoch timestamps to human-readable dates and local time instantly."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Epoch Converter</title>
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #2563eb; }
    .now { font-size: 2.5rem; font-weight: bold; color: #16a34a; margin: 20px 0; font-family: monospace; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 18px; margin-bottom: 20px; text-align: center; font-family: monospace; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 16px; }
    .res { margin-top: 20px; font-family: monospace; background: #f8fafc; padding: 20px; border-radius: 6px; text-align: left; font-size: 1.1rem; border: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Epoch Converter</h1>
    <p style="color: #64748b; font-weight: bold;">Current Epoch Time (Seconds):</p>
    <div class="now" id="now">...</div>
    <hr style="border:0; border-top:1px solid #e2e8f0; margin:30px 0;">
    <label style="display:block; margin-bottom:10px; font-weight:bold; text-align: left;">Convert Timestamp</label>
    <input type="number" id="ts" placeholder="e.g. 1672531200">
    <button onclick="conv()">Convert to Date</button>
    <div class="res" id="out" style="display:none;"></div>
  </div>
  <script>
    setInterval(() => document.getElementById('now').innerText = Math.floor(Date.now() / 1000), 1000);
    function conv() {
      let ts = parseInt(document.getElementById('ts').value);
      if(isNaN(ts)) return;
      if(ts < 10000000000) ts *= 1000; // auto-detect seconds vs ms
      const d = new Date(ts);
      document.getElementById('out').style.display = 'block';
      document.getElementById('out').innerHTML = `
        <span style="color:#64748b">GMT:</span><br><strong>${d.toUTCString()}</strong><br><br>
        <span style="color:#64748b">Local Time:</span><br><strong>${d.toLocaleString()}</strong>
      `;
    }
  </script>
</body>
</html>"""
}

# Write files
for filename, content in tools.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ FINALIZED: {filename}")
