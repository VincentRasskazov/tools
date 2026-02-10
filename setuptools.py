import os

tools = {
    "tools/text-to-hex.html": r"""---
layout: default
title: "Text to Hex Converter"
description: "Convert text to hexadecimal values instantly. View the hex representation of any string."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text to Hex</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Text to Hex</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Hello World"></textarea>
    <button onclick="convert()">Convert to Hex</button>
    <label style="margin-top:20px; display:block;">Hex Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      const input = document.getElementById('input').value;
      let hex = '';
      for(let i=0;i<input.length;i++) {
        hex += input.charCodeAt(i).toString(16) + ' ';
      }
      document.getElementById('output').value = hex.trim().toUpperCase();
    }
  </script>
</body>
</html>""",

    "tools/hex-to-ascii.html": r"""---
layout: default
title: "Hex to ASCII Text Converter"
description: "Convert hexadecimal codes back into readable text instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hex to ASCII</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Hex to ASCII</h1>
    <label>Input Hex (Space separated usually)</label>
    <textarea id="input" placeholder="48 65 6C 6C 6F"></textarea>
    <button onclick="convert()">Convert to Text</button>
    <label style="margin-top:20px; display:block;">Text Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      let hex = document.getElementById('input').value.replace(/\s+/g, '');
      let str = '';
      for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
      }
      document.getElementById('output').value = str;
    }
  </script>
</body>
</html>""",

    "tools/ascii-to-hex.html": r"""---
layout: default
title: "ASCII to Hex Converter"
description: "Convert ASCII characters to hexadecimal format."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ASCII to Hex</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>ASCII to Hex</h1>
    <label>Input ASCII Text</label>
    <textarea id="input" placeholder="Hello"></textarea>
    <button onclick="convert()">Convert to Hex</button>
    <label style="margin-top:20px; display:block;">Hex Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      const input = document.getElementById('input').value;
      let hex = '';
      for(let i=0;i<input.length;i++) {
        hex += input.charCodeAt(i).toString(16).padStart(2, '0') + ' ';
      }
      document.getElementById('output').value = hex.trim().toUpperCase();
    }
  </script>
</body>
</html>""",

    "tools/random-string-generator.html": r"""---
layout: default
title: "Random String Generator"
description: "Generate random strings of characters, numbers, and symbols. Useful for API keys or test data."
category: "Generator"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Random String Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .result { background: #f8fafc; padding: 15px; border-radius: 6px; font-family: monospace; word-break: break-all; border: 1px solid #e2e8f0; margin: 20px 0; font-size: 1.2rem; min-height: 50px; }
    label { display: block; margin: 10px 0 5px; font-weight: 600; }
    input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; width: 100%; margin-top: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Random String Generator</h1>
    <div class="result" id="output"></div>
    <label>Length</label>
    <input type="number" id="length" value="32" min="1" max="1000">
    <label>Allowed Characters</label>
    <input type="text" id="chars" value="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" style="width: 100%">
    <button onclick="generate()">Generate String</button>
  </div>
  <script>
    function generate() {
      const len = parseInt(document.getElementById('length').value);
      const chars = document.getElementById('chars').value;
      let result = '';
      for (let i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById('output').innerText = result;
    }
    window.onload = generate;
  </script>
</body>
</html>""",

    "tools/vigenere-cipher.html": r"""---
layout: default
title: "Vigenère Cipher - Polyalphabetic Substitution"
description: "Encrypt and decrypt text using the Vigenère Cipher method with a keyword."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vigenère Cipher</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; }
    input { padding: 10px; border: 1px solid #ccc; border-radius: 6px; width: 200px; }
    .controls { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Vigenère Cipher</h1>
    <label>Message</label>
    <textarea id="input" placeholder="Secret Message"></textarea>
    <div class="controls">
      <input type="text" id="key" placeholder="Key (e.g., LEMON)">
      <button onclick="crypt(false)">Encrypt</button>
      <button onclick="crypt(true)" style="background:#4b5563">Decrypt</button>
    </div>
    <label>Result</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function crypt(isDecrypt) {
      const input = document.getElementById('input').value;
      const key = document.getElementById('key').value.replace(/[^A-Za-z]/g, "").toUpperCase();
      if(!key) return alert("Please enter a valid key (letters only)");
      
      let res = "";
      for (let i = 0, j = 0; i < input.length; i++) {
        const c = input.charCodeAt(i);
        if (c >= 65 && c <= 90) {
          res += String.fromCharCode((c - 65 + (isDecrypt ? -1 : 1) * (key.charCodeAt(j++ % key.length) - 65) + 26) % 26 + 65);
        } else if (c >= 97 && c <= 122) {
          res += String.fromCharCode((c - 97 + (isDecrypt ? -1 : 1) * (key.charCodeAt(j++ % key.length) - 65) + 26) % 26 + 97);
        } else {
          res += input.charAt(i);
        }
      }
      document.getElementById('output').value = res;
    }
  </script>
</body>
</html>""",

    "tools/length-converter.html": r"""---
layout: default
title: "Length Converter"
description: "Convert between meters, feet, inches, kilometers, miles, and more."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Length Converter</title>
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
    <h1>Length Converter</h1>
    <div class="input-group"><label>Meters (m)</label><input type="number" id="m" oninput="conv('m',this.value)"></div>
    <div class="input-group"><label>Kilometers (km)</label><input type="number" id="km" oninput="conv('km',this.value)"></div>
    <div class="input-group"><label>Feet (ft)</label><input type="number" id="ft" oninput="conv('ft',this.value)"></div>
    <div class="input-group"><label>Inches (in)</label><input type="number" id="in" oninput="conv('in',this.value)"></div>
    <div class="input-group"><label>Miles (mi)</label><input type="number" id="mi" oninput="conv('mi',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const m = id === 'm' ? val : id === 'km' ? val * 1000 : id === 'ft' ? val / 3.28084 : id === 'in' ? val / 39.3701 : val * 1609.34;
      if (id !== 'm') document.getElementById('m').value = m;
      if (id !== 'km') document.getElementById('km').value = m / 1000;
      if (id !== 'ft') document.getElementById('ft').value = m * 3.28084;
      if (id !== 'in') document.getElementById('in').value = m * 39.3701;
      if (id !== 'mi') document.getElementById('mi').value = m / 1609.34;
    }
  </script>
</body>
</html>""",

    "tools/weight-converter.html": r"""---
layout: default
title: "Weight Converter"
description: "Convert between Kilograms, Pounds, Ounces, and Grams."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Weight Converter</title>
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
    <h1>Weight Converter</h1>
    <div class="input-group"><label>Kilograms (kg)</label><input type="number" id="kg" oninput="conv('kg',this.value)"></div>
    <div class="input-group"><label>Pounds (lb)</label><input type="number" id="lb" oninput="conv('lb',this.value)"></div>
    <div class="input-group"><label>Ounces (oz)</label><input type="number" id="oz" oninput="conv('oz',this.value)"></div>
    <div class="input-group"><label>Grams (g)</label><input type="number" id="g" oninput="conv('g',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const k = id === 'kg' ? val : id === 'lb' ? val / 2.20462 : id === 'oz' ? val / 35.274 : val / 1000;
      if(id !== 'kg') document.getElementById('kg').value = k;
      if(id !== 'lb') document.getElementById('lb').value = k * 2.20462;
      if(id !== 'oz') document.getElementById('oz').value = k * 35.274;
      if(id !== 'g') document.getElementById('g').value = k * 1000;
    }
  </script>
</body>
</html>""",

    "tools/volume-converter.html": r"""---
layout: default
title: "Volume Converter"
description: "Convert between Liters, Gallons, Milliliters, and Cups."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Volume Converter</title>
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
    <h1>Volume Converter</h1>
    <div class="input-group"><label>Liters (L)</label><input type="number" id="l" oninput="conv('l',this.value)"></div>
    <div class="input-group"><label>Milliliters (ml)</label><input type="number" id="ml" oninput="conv('ml',this.value)"></div>
    <div class="input-group"><label>Gallons (US)</label><input type="number" id="gal" oninput="conv('gal',this.value)"></div>
    <div class="input-group"><label>Cups</label><input type="number" id="cup" oninput="conv('cup',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const l = id === 'l' ? val : id === 'ml' ? val / 1000 : id === 'gal' ? val * 3.78541 : val * 0.236588;
      if(id !== 'l') document.getElementById('l').value = l;
      if(id !== 'ml') document.getElementById('ml').value = l * 1000;
      if(id !== 'gal') document.getElementById('gal').value = l / 3.78541;
      if(id !== 'cup') document.getElementById('cup').value = l / 0.236588;
    }
  </script>
</body>
</html>""",

    "tools/speed-converter.html": r"""---
layout: default
title: "Speed Converter"
description: "Convert between MPH, KPH, Knots, and Mach."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Speed Converter</title>
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
    <h1>Speed Converter</h1>
    <div class="input-group"><label>MPH (Miles/hr)</label><input type="number" id="mph" oninput="conv('mph',this.value)"></div>
    <div class="input-group"><label>KPH (km/hr)</label><input type="number" id="kph" oninput="conv('kph',this.value)"></div>
    <div class="input-group"><label>Knots</label><input type="number" id="kn" oninput="conv('kn',this.value)"></div>
    <div class="input-group"><label>Mach</label><input type="number" id="ma" oninput="conv('ma',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const k = id === 'kph' ? val : id === 'mph' ? val * 1.60934 : id === 'kn' ? val * 1.852 : val * 1225.044;
      if(id !== 'kph') document.getElementById('kph').value = k;
      if(id !== 'mph') document.getElementById('mph').value = k / 1.60934;
      if(id !== 'kn') document.getElementById('kn').value = k / 1.852;
      if(id !== 'ma') document.getElementById('ma').value = k / 1225.044;
    }
  </script>
</body>
</html>""",

    "tools/area-converter.html": r"""---
layout: default
title: "Area Converter"
description: "Convert between Square Meters, Feet, Acres, and Hectares."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Area Converter</title>
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
    <h1>Area Converter</h1>
    <div class="input-group"><label>Square Meters (m²)</label><input type="number" id="m2" oninput="conv('m2',this.value)"></div>
    <div class="input-group"><label>Square Feet (ft²)</label><input type="number" id="ft2" oninput="conv('ft2',this.value)"></div>
    <div class="input-group"><label>Acres</label><input type="number" id="ac" oninput="conv('ac',this.value)"></div>
    <div class="input-group"><label>Hectares</label><input type="number" id="ha" oninput="conv('ha',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const m = id === 'm2' ? val : id === 'ft2' ? val / 10.764 : id === 'ac' ? val * 4046.86 : val * 10000;
      if(id !== 'm2') document.getElementById('m2').value = m;
      if(id !== 'ft2') document.getElementById('ft2').value = m * 10.764;
      if(id !== 'ac') document.getElementById('ac').value = m / 4046.86;
      if(id !== 'ha') document.getElementById('ha').value = m / 10000;
    }
  </script>
</body>
</html>""",

    "tools/time-converter.html": r"""---
layout: default
title: "Time Converter"
description: "Convert between Seconds, Minutes, Hours, Days, and Weeks."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Time Converter</title>
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
    <h1>Time Converter</h1>
    <div class="input-group"><label>Seconds</label><input type="number" id="s" oninput="conv('s',this.value)"></div>
    <div class="input-group"><label>Minutes</label><input type="number" id="m" oninput="conv('m',this.value)"></div>
    <div class="input-group"><label>Hours</label><input type="number" id="h" oninput="conv('h',this.value)"></div>
    <div class="input-group"><label>Days</label><input type="number" id="d" oninput="conv('d',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const s = id === 's' ? val : id === 'm' ? val * 60 : id === 'h' ? val * 3600 : val * 86400;
      if(id !== 's') document.getElementById('s').value = s;
      if(id !== 'm') document.getElementById('m').value = s / 60;
      if(id !== 'h') document.getElementById('h').value = s / 3600;
      if(id !== 'd') document.getElementById('d').value = s / 86400;
    }
  </script>
</body>
</html>""",

    "tools/pressure-converter.html": r"""---
layout: default
title: "Pressure Converter"
description: "Convert between Pascal, Bar, PSI, and Atmosphere."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Pressure Converter</title>
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
    <h1>Pressure Converter</h1>
    <div class="input-group"><label>Pascal (Pa)</label><input type="number" id="pa" oninput="conv('pa',this.value)"></div>
    <div class="input-group"><label>Bar</label><input type="number" id="bar" oninput="conv('bar',this.value)"></div>
    <div class="input-group"><label>PSI</label><input type="number" id="psi" oninput="conv('psi',this.value)"></div>
    <div class="input-group"><label>Standard Atmosphere (atm)</label><input type="number" id="atm" oninput="conv('atm',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const pa = id === 'pa' ? val : id === 'bar' ? val * 100000 : id === 'psi' ? val * 6894.76 : val * 101325;
      if(id !== 'pa') document.getElementById('pa').value = pa;
      if(id !== 'bar') document.getElementById('bar').value = pa / 100000;
      if(id !== 'psi') document.getElementById('psi').value = pa / 6894.76;
      if(id !== 'atm') document.getElementById('atm').value = pa / 101325;
    }
  </script>
</body>
</html>""",

    "tools/power-converter.html": r"""---
layout: default
title: "Power Converter"
description: "Convert between Watts, Kilowatts, and Horsepower."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Power Converter</title>
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
    <h1>Power Converter</h1>
    <div class="input-group"><label>Watts (W)</label><input type="number" id="w" oninput="conv('w',this.value)"></div>
    <div class="input-group"><label>Kilowatts (kW)</label><input type="number" id="kw" oninput="conv('kw',this.value)"></div>
    <div class="input-group"><label>Horsepower (hp)</label><input type="number" id="hp" oninput="conv('hp',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const w = id === 'w' ? val : id === 'kw' ? val * 1000 : val * 745.7;
      if(id !== 'w') document.getElementById('w').value = w;
      if(id !== 'kw') document.getElementById('kw').value = w / 1000;
      if(id !== 'hp') document.getElementById('hp').value = w / 745.7;
    }
  </script>
</body>
</html>""",

    "tools/energy-converter.html": r"""---
layout: default
title: "Energy Converter"
description: "Convert between Joules, Kilojoules, Calories, and Kilowatt-hours."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Energy Converter</title>
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
    <h1>Energy Converter</h1>
    <div class="input-group"><label>Joules (J)</label><input type="number" id="j" oninput="conv('j',this.value)"></div>
    <div class="input-group"><label>Kilojoules (kJ)</label><input type="number" id="kj" oninput="conv('kj',this.value)"></div>
    <div class="input-group"><label>Calories (cal)</label><input type="number" id="cal" oninput="conv('cal',this.value)"></div>
    <div class="input-group"><label>Kilowatt-hour (kWh)</label><input type="number" id="kwh" oninput="conv('kwh',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const j = id === 'j' ? val : id === 'kj' ? val * 1000 : id === 'cal' ? val * 4.184 : val * 3600000;
      if(id !== 'j') document.getElementById('j').value = j;
      if(id !== 'kj') document.getElementById('kj').value = j / 1000;
      if(id !== 'cal') document.getElementById('cal').value = j / 4.184;
      if(id !== 'kwh') document.getElementById('kwh').value = j / 3600000;
    }
  </script>
</body>
</html>""",

    "tools/data-size-converter.html": r"""---
layout: default
title: "Data Size Converter"
description: "Convert between Bytes, Kilobytes, Megabytes, Gigabytes, and Terabytes."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Data Size Converter</title>
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
    <h1>Data Size Converter</h1>
    <div class="input-group"><label>Megabytes (MB)</label><input type="number" id="mb" oninput="conv('mb',this.value)"></div>
    <div class="input-group"><label>Gigabytes (GB)</label><input type="number" id="gb" oninput="conv('gb',this.value)"></div>
    <div class="input-group"><label>Terabytes (TB)</label><input type="number" id="tb" oninput="conv('tb',this.value)"></div>
    <div class="input-group"><label>Kilobytes (KB)</label><input type="number" id="kb" oninput="conv('kb',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      const mb = id === 'mb' ? val : id === 'gb' ? val * 1024 : id === 'tb' ? val * 1048576 : val / 1024;
      if(id !== 'mb') document.getElementById('mb').value = mb;
      if(id !== 'gb') document.getElementById('gb').value = mb / 1024;
      if(id !== 'tb') document.getElementById('tb').value = mb / 1048576;
      if(id !== 'kb') document.getElementById('kb').value = mb * 1024;
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
