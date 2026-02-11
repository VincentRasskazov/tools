import os

tools = {
    "tools/atbash-cipher.html": r"""---
layout: default
title: "Atbash Cipher"
description: "Encrypt and decrypt text using the Atbash cipher (A->Z, B->Y)."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Atbash Cipher</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Atbash Cipher</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Type here..."></textarea>
    <button onclick="convert()">Encrypt / Decrypt</button>
    <label style="margin-top:20px; display:block;">Output Text</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      const val = document.getElementById('input').value;
      const res = val.replace(/[a-z]/gi, c => {
        const code = c.charCodeAt(0);
        return String.fromCharCode(code <= 90 ? 155 - code : 219 - code);
      });
      document.getElementById('output').value = res;
    }
  </script>
</body>
</html>""",

    "tools/decimal-to-binary.html": r"""---
layout: default
title: "Decimal to Binary Converter"
description: "Convert decimal numbers to binary format instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Decimal to Binary</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Decimal to Binary</h1>
    <input type="number" id="dec" placeholder="e.g., 42">
    <button onclick="convert()">Convert</button>
    <label style="margin-top:20px; display:block;">Binary Result</label>
    <input type="text" id="bin" readonly>
  </div>
  <script>
    function convert() {
      const val = parseInt(document.getElementById('dec').value, 10);
      if(!isNaN(val)) document.getElementById('bin').value = val.toString(2);
    }
  </script>
</body>
</html>""",

    "tools/hex-to-decimal.html": r"""---
layout: default
title: "Hex to Decimal Converter"
description: "Convert hexadecimal values to decimal numbers instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hex to Decimal</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Hex to Decimal</h1>
    <input type="text" id="hex" placeholder="e.g., 2A">
    <button onclick="convert()">Convert</button>
    <label style="margin-top:20px; display:block;">Decimal Result</label>
    <input type="text" id="dec" readonly>
  </div>
  <script>
    function convert() {
      const val = parseInt(document.getElementById('hex').value, 16);
      if(!isNaN(val)) document.getElementById('dec').value = val.toString(10);
    }
  </script>
</body>
</html>""",

    "tools/js-minifier.html": r"""---
layout: default
title: "JS Minifier"
description: "Compress JavaScript code to reduce file size and improve load times."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JS Minifier</title>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>JS Minifier</h1>
    <textarea id="input" placeholder="function hello() {&#10;  console.log('world');&#10;}"></textarea>
    <button onclick="minify()">Minify JS</button>
    <label style="margin-top:20px; display:block;">Minified Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function minify() {
      let code = document.getElementById('input').value;
      code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Remove comments
      code = code.replace(/\s+/g, ' ').replace(/\s*([\{\}\(\)\;\:\,\=\+\-\*\/])\s*/g, '$1'); // Remove whitespace
      document.getElementById('output').value = code.trim();
    }
  </script>
</body>
</html>""",

    "tools/json-to-yaml.html": r"""---
layout: default
title: "JSON to YAML Converter"
description: "Convert JSON data into YAML format instantly."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JSON to YAML</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"></script>
  <style>
    .tool-container { max-width: 900px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .grid { display: flex; gap: 20px; }
    textarea { width: 100%; height: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>JSON to YAML</h1>
    <div class="grid">
      <div style="flex:1;"><label>JSON</label><textarea id="json"></textarea></div>
      <div style="flex:1;"><label>YAML</label><textarea id="yaml" readonly></textarea></div>
    </div>
    <button onclick="convert()">Convert to YAML &rarr;</button>
  </div>
  <script>
    function convert() {
      try {
        const obj = JSON.parse(document.getElementById('json').value);
        document.getElementById('yaml').value = jsyaml.dump(obj);
      } catch(e) { alert("Invalid JSON"); }
    }
  </script>
</body>
</html>""",

    "tools/yaml-to-json.html": r"""---
layout: default
title: "YAML to JSON Converter"
description: "Convert YAML data into JSON format instantly."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>YAML to JSON</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"></script>
  <style>
    .tool-container { max-width: 900px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .grid { display: flex; gap: 20px; }
    textarea { width: 100%; height: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>YAML to JSON</h1>
    <div class="grid">
      <div style="flex:1;"><label>YAML</label><textarea id="yaml"></textarea></div>
      <div style="flex:1;"><label>JSON</label><textarea id="json" readonly></textarea></div>
    </div>
    <button onclick="convert()">Convert to JSON &rarr;</button>
  </div>
  <script>
    function convert() {
      try {
        const obj = jsyaml.load(document.getElementById('yaml').value);
        document.getElementById('json').value = JSON.stringify(obj, null, 2);
      } catch(e) { alert("Invalid YAML"); }
    }
  </script>
</body>
</html>""",

    "tools/jwt-decoder.html": r"""---
layout: default
title: "JWT Decoder"
description: "Decode JSON Web Tokens (JWT) to view payload and header data."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JWT Decoder</title>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin: 15px 0; }
    .output-box { background: #f8fafc; padding: 15px; border-radius: 6px; font-family: monospace; white-space: pre-wrap; word-break: break-all; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>JWT Decoder</h1>
    <label>Encoded JWT</label>
    <textarea id="jwt" placeholder="eyJhbGci..."></textarea>
    <button onclick="decode()">Decode Token</button>
    <label>Header</label>
    <div class="output-box" id="header"></div>
    <label>Payload</label>
    <div class="output-box" id="payload"></div>
  </div>
  <script>
    function decode() {
      try {
        const token = document.getElementById('jwt').value.split('.');
        const head = JSON.parse(atob(token[0].replace(/-/g, '+').replace(/_/g, '/')));
        const pay = JSON.parse(atob(token[1].replace(/-/g, '+').replace(/_/g, '/')));
        document.getElementById('header').innerText = JSON.stringify(head, null, 2);
        document.getElementById('payload').innerText = JSON.stringify(pay, null, 2);
      } catch(e) { alert("Invalid JWT"); }
    }
  </script>
</body>
</html>""",

    "tools/xml-formatter.html": r"""---
layout: default
title: "XML Formatter"
description: "Format and beautify XML code to make it readable."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>XML Formatter</title>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; font-size: 14px; margin-bottom: 20px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>XML Formatter</h1>
    <textarea id="input" placeholder="<root><child>Data</child></root>"></textarea>
    <button onclick="format()">Beautify XML</button>
    <label style="margin-top:20px; display:block;">Formatted Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function format() {
      let xml = document.getElementById('input').value;
      let formatted = '', pad = 0;
      xml = xml.replace(/(>)(<)(\/*)/g, '$1\r\n$2$3');
      xml.split('\r\n').forEach(node => {
        let indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) indent = 0;
        else if (node.match(/^<\/\w/)) { if (pad !== 0) pad -= 1; }
        else if (node.match(/^<\w[^>]*[^\/]>.*$/)) indent = 1;
        else indent = 0;
        formatted += '  '.repeat(pad) + node + '\r\n';
        pad += indent;
      });
      document.getElementById('output').value = formatted.trim();
    }
  </script>
</body>
</html>""",

    "tools/regex-tester.html": r"""---
layout: default
title: "Regex Tester"
description: "Test your regular expressions in real-time."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Regex Tester</title>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input, textarea { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 15px; font-family: monospace; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { padding: 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; margin-top: 15px; min-height: 50px; }
    .match { background: #fef08a; padding: 2px; border-radius: 3px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Regex Tester</h1>
    <label>Regular Expression</label>
    <div style="display:flex; gap:10px;">
      <span style="font-size:1.5rem;">/</span>
      <input type="text" id="regex" placeholder="[a-z]+">
      <span style="font-size:1.5rem;">/</span>
      <input type="text" id="flags" placeholder="g" style="width:50px;">
    </div>
    <label>Test String</label>
    <textarea id="text" placeholder="Type text to test..."></textarea>
    <button onclick="testRegex()">Test Match</button>
    <div id="result">Matches will highlight here...</div>
  </div>
  <script>
    function testRegex() {
      try {
        const reStr = document.getElementById('regex').value;
        const flags = document.getElementById('flags').value;
        const text = document.getElementById('text').value;
        const regex = new RegExp(reStr, flags);
        
        let html = text.replace(regex, match => `<span class="match">${match}</span>`);
        document.getElementById('result').innerHTML = html;
      } catch (e) { document.getElementById('result').innerText = "Invalid Regex"; }
    }
  </script>
</body>
</html>""",

    "tools/note-pad.html": r"""---
layout: default
title: "Online Notepad"
description: "A simple online notepad that saves automatically to your browser."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Online Notepad</title>
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    textarea { width: 100%; height: 500px; padding: 15px; border: 1px solid #ccc; border-radius: 6px; font-family: sans-serif; font-size: 16px; resize: vertical; }
    .status { color: #16a34a; font-size: 0.9rem; margin-top: 10px; text-align: right; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="color: #2563eb; margin-top:0;">Notepad</h1>
    <textarea id="note" oninput="saveNote()" placeholder="Start typing..."></textarea>
    <div class="status" id="status">Ready</div>
  </div>
  <script>
    document.getElementById('note').value = localStorage.getItem('autosave_note') || '';
    function saveNote() {
      localStorage.setItem('autosave_note', document.getElementById('note').value);
      document.getElementById('status').innerText = 'Saved automatically.';
      setTimeout(() => document.getElementById('status').innerText = '', 2000);
    }
  </script>
</body>
</html>""",

    "tools/countdown-timer.html": r"""---
layout: default
title: "Countdown Timer"
description: "Create a countdown to a specific date and time."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Countdown Timer</title>
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 30px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #display { font-size: 3rem; font-weight: bold; color: #1e293b; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="color: #2563eb;">Countdown Timer</h1>
    <label style="display:block;margin-bottom:10px;">Target Date & Time</label>
    <input type="datetime-local" id="target">
    <button onclick="start()">Start Countdown</button>
    <div id="display">00d 00h 00m 00s</div>
  </div>
  <script>
    let timer;
    function start() {
      clearInterval(timer);
      const targetDate = new Date(document.getElementById('target').value).getTime();
      
      timer = setInterval(() => {
        const now = new Date().getTime();
        const dist = targetDate - now;
        
        if (dist < 0) {
          clearInterval(timer);
          document.getElementById('display').innerText = "EXPIRED";
          return;
        }
        
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);
        
        document.getElementById('display').innerText = `${d}d ${h}h ${m}m ${s}s`;
      }, 1000);
    }
  </script>
</body>
</html>""",

    "tools/timer.html": r"""---
layout: default
title: "Timer - Online Alarm"
description: "Set a simple countdown timer in minutes and seconds."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Timer</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    .inputs { display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; }
    input { width: 80px; padding: 10px; font-size: 1.5rem; text-align: center; border: 1px solid #ccc; border-radius: 6px; }
    #display { font-size: 4rem; font-family: monospace; font-weight: bold; color: #1e293b; margin: 20px 0; }
    button { padding: 12px 24px; font-size: 1.1rem; border: none; border-radius: 6px; cursor: pointer; color: white; margin: 5px; }
    .start { background: #16a34a; } .stop { background: #dc2626; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="color: #2563eb; margin-top:0;">Timer</h1>
    <div class="inputs" id="setup">
      <input type="number" id="min" placeholder="Min" value="5" min="0"> :
      <input type="number" id="sec" placeholder="Sec" value="0" min="0" max="59">
    </div>
    <div id="display" style="display:none;">05:00</div>
    <button class="start" onclick="start()">Start</button>
    <button class="stop" onclick="stop()">Stop / Reset</button>
  </div>
  <script>
    let interval, totalSecs;
    function start() {
      if(!interval) {
        document.getElementById('setup').style.display = 'none';
        document.getElementById('display').style.display = 'block';
        totalSecs = (parseInt(document.getElementById('min').value||0) * 60) + parseInt(document.getElementById('sec').value||0);
        updateDisplay();
        interval = setInterval(() => {
          if(totalSecs <= 0) { stop(); alert("Time's Up!"); return; }
          totalSecs--; updateDisplay();
        }, 1000);
      }
    }
    function stop() {
      clearInterval(interval); interval = null;
      document.getElementById('setup').style.display = 'flex';
      document.getElementById('display').style.display = 'none';
    }
    function updateDisplay() {
      const m = Math.floor(totalSecs / 60).toString().padStart(2, '0');
      const s = (totalSecs % 60).toString().padStart(2, '0');
      document.getElementById('display').innerText = `${m}:${s}`;
    }
  </script>
</body>
</html>""",

    "tools/timezone-converter.html": r"""---
layout: default
title: "Timezone Converter"
description: "Convert current time across major world timezones."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Timezone Converter</title>
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .tz-row { display: flex; justify-content: space-between; padding: 15px; border-bottom: 1px solid #eee; font-size: 1.2rem; }
    .tz-name { font-weight: bold; color: #334155; }
    .tz-time { font-family: monospace; color: #2563eb; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>World Clock</h1>
    <div id="clocks"></div>
  </div>
  <script>
    const zones = [
      { name: "Local Time", tz: undefined },
      { name: "UTC / GMT", tz: "UTC" },
      { name: "New York", tz: "America/New_York" },
      { name: "London", tz: "Europe/London" },
      { name: "Tokyo", tz: "Asia/Tokyo" },
      { name: "Sydney", tz: "Australia/Sydney" }
    ];
    
    function update() {
      let html = '';
      const now = new Date();
      zones.forEach(z => {
        const time = now.toLocaleTimeString('en-US', { timeZone: z.tz, hour: '2-digit', minute:'2-digit', second:'2-digit' });
        html += `<div class="tz-row"><span class="tz-name">${z.name}</span><span class="tz-time">${time}</span></div>`;
      });
      document.getElementById('clocks').innerHTML = html;
    }
    setInterval(update, 1000);
    update();
  </script>
</body>
</html>""",

    "tools/trip-time-estimator.html": r"""---
layout: default
title: "Trip Time Estimator"
description: "Estimate driving or travel time based on distance and speed."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Trip Time Estimator</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 15px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { margin-top: 20px; font-size: 1.5rem; text-align: center; color: #16a34a; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Trip Time Estimator</h1>
    <label>Distance (Miles or Km)</label>
    <input type="number" id="dist" placeholder="e.g. 100">
    <label>Average Speed</label>
    <input type="number" id="speed" placeholder="e.g. 60">
    <button onclick="calc()">Estimate Time</button>
    <div id="result"></div>
  </div>
  <script>
    function calc() {
      const d = parseFloat(document.getElementById('dist').value);
      const s = parseFloat(document.getElementById('speed').value);
      if(!d || !s) return;
      const hours = Math.floor(d / s);
      const minutes = Math.round(((d / s) - hours) * 60);
      document.getElementById('result').innerText = `${hours} hrs ${minutes} mins`;
    }
  </script>
</body>
</html>""",

    "tools/unit-price-calculator.html": r"""---
layout: default
title: "Unit Price Calculator"
description: "Compare prices to find the best deal based on unit cost."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Unit Price Calculator</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .row { display: flex; gap: 10px; margin-bottom: 15px; }
    .col { flex: 1; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { margin-top: 20px; font-size: 1.2rem; text-align: center; background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Unit Price Calculator</h1>
    <div class="row">
      <div class="col"><label>Total Price ($)</label><input type="number" id="price"></div>
      <div class="col"><label>Quantity / Size</label><input type="number" id="qty"></div>
    </div>
    <button onclick="calc()">Calculate Unit Price</button>
    <div id="result" style="display:none;"></div>
  </div>
  <script>
    function calc() {
      const p = parseFloat(document.getElementById('price').value);
      const q = parseFloat(document.getElementById('qty').value);
      if(!p || !q) return;
      const unit = p / q;
      const res = document.getElementById('result');
      res.style.display = 'block';
      res.innerHTML = `Price per unit: <strong>$${unit.toFixed(4)}</strong>`;
    }
  </script>
</body>
</html>""",

    "tools/fuel-cost-calculator.html": r"""---
layout: default
title: "Fuel Cost Calculator"
description: "Calculate how much your road trip will cost based on distance and fuel efficiency."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fuel Cost</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    label { display: block; font-weight: 600; margin-bottom: 5px; margin-top: 15px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 20px; }
    #result { margin-top: 20px; font-size: 1.5rem; text-align: center; color: #dc2626; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Fuel Cost Calculator</h1>
    <label>Distance (Miles or Km)</label><input type="number" id="dist">
    <label>Fuel Efficiency (MPG or Km/L)</label><input type="number" id="eff">
    <label>Gas Price per Gallon/Liter ($)</label><input type="number" id="price">
    <button onclick="calc()">Calculate Cost</button>
    <div id="result"></div>
  </div>
  <script>
    function calc() {
      const d = parseFloat(document.getElementById('dist').value);
      const e = parseFloat(document.getElementById('eff').value);
      const p = parseFloat(document.getElementById('price').value);
      if(!d || !e || !p) return;
      const cost = (d / e) * p;
      document.getElementById('result').innerText = `Total Cost: $${cost.toFixed(2)}`;
    }
  </script>
</body>
</html>""",

    "tools/moon-phase.html": r"""---
layout: default
title: "Moon Phase Calculator"
description: "Estimate the current phase of the moon based on simple lunar cycles."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Moon Phase</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #2563eb; }
    .phase { font-size: 5rem; margin: 20px 0; }
    .phase-text { font-size: 1.5rem; font-weight: bold; color: #334155; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Moon Phase Today</h1>
    <div class="phase" id="icon">🌕</div>
    <div class="phase-text" id="text">Loading...</div>
    <button onclick="calcPhase()">Check Current Phase</button>
  </div>
  <script>
    function calcPhase() {
      const now = new Date();
      // Known new moon approx: 2000-01-06
      const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14));
      const lunarDays = 29.53058867;
      
      const diffDays = (now - knownNewMoon) / (1000 * 60 * 60 * 24);
      const cyclePos = (diffDays % lunarDays) / lunarDays;
      
      let phase, icon;
      if (cyclePos < 0.05) { phase = "New Moon"; icon = "🌑"; }
      else if (cyclePos < 0.25) { phase = "Waxing Crescent"; icon = "🌒"; }
      else if (cyclePos < 0.3) { phase = "First Quarter"; icon = "🌓"; }
      else if (cyclePos < 0.5) { phase = "Waxing Gibbous"; icon = "🌔"; }
      else if (cyclePos < 0.55) { phase = "Full Moon"; icon = "🌕"; }
      else if (cyclePos < 0.75) { phase = "Waning Gibbous"; icon = "🌖"; }
      else if (cyclePos < 0.8) { phase = "Last Quarter"; icon = "🌗"; }
      else { phase = "Waning Crescent"; icon = "🌘"; }
      
      document.getElementById('icon').innerText = icon;
      document.getElementById('text').innerText = phase;
    }
    window.onload = calcPhase;
  </script>
</body>
</html>""",

    "tools/sunrise-sunset.html": r"""---
layout: default
title: "Sunrise & Sunset Calculator"
description: "Get today's sunrise and sunset times based on your current location."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sunrise Sunset</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #2563eb; }
    .data-box { background: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 20px; font-size: 1.2rem; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Sunrise / Sunset</h1>
    <p>We need your location to calculate times.</p>
    <button onclick="getLocation()">Get Times</button>
    <div class="data-box" id="result" style="display:none;"></div>
  </div>
  <script>
    function getLocation() {
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').innerHTML = "Locating...";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fetchTimes, () => {
          document.getElementById('result').innerHTML = "Location access denied.";
        });
      } else {
        document.getElementById('result').innerHTML = "Geolocation not supported.";
      }
    }
    async function fetchTimes(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      try {
        const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`);
        const data = await res.json();
        
        const sunrise = new Date(data.results.sunrise).toLocaleTimeString();
        const sunset = new Date(data.results.sunset).toLocaleTimeString();
        
        document.getElementById('result').innerHTML = `<strong>Sunrise:</strong> ${sunrise}<br><br><strong>Sunset:</strong> ${sunset}`;
      } catch(e) { document.getElementById('result').innerHTML = "Error fetching data."; }
    }
  </script>
</body>
</html>""",

    "tools/lighting-converter.html": r"""---
layout: default
title: "Lighting Converter"
description: "Convert illumination and luminance values (Lux, Foot-candles)."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lighting Converter</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .input-group { margin-bottom: 15px; }
    label { display: block; font-weight: 600; margin-bottom: 5px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Lighting Converter</h1>
    <div class="input-group"><label>Lux (lx)</label><input type="number" id="lux" oninput="conv('lux',this.value)"></div>
    <div class="input-group"><label>Foot-candle (fc)</label><input type="number" id="fc" oninput="conv('fc',this.value)"></div>
  </div>
  <script>
    function conv(id, val) {
      val = parseFloat(val);
      if(id === 'lux') document.getElementById('fc').value = val * 0.092903;
      if(id === 'fc') document.getElementById('lux').value = val / 0.092903;
    }
  </script>
</body>
</html>""",

    "tools/lighting-lux-calculator.html": r"""---
layout: default
title: "Lux / Lumens Calculator"
description: "Calculate Lux from Lumens and Area, or vice versa."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lux Calculator</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    label { display: block; font-weight: 600; margin-bottom: 5px; margin-top: 15px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 20px; }
    #result { margin-top: 20px; font-size: 1.5rem; text-align: center; color: #16a34a; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Lux Calculator</h1>
    <label>Lumens (lm)</label><input type="number" id="lm">
    <label>Area (Square Meters)</label><input type="number" id="area">
    <button onclick="calc()">Calculate Lux</button>
    <div id="result"></div>
  </div>
  <script>
    function calc() {
      const lm = parseFloat(document.getElementById('lm').value);
      const area = parseFloat(document.getElementById('area').value);
      if(lm && area) {
        document.getElementById('result').innerText = `${(lm / area).toFixed(2)} Lux (lx)`;
      }
    }
  </script>
</body>
</html>""",

    "tools/field-strength-converter.html": r"""---
layout: default
title: "Field Strength Converter"
description: "Convert Electric Field Strength (V/m to dBuV/m)."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Field Strength</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    label { display: block; font-weight: 600; margin-bottom: 5px; margin-top: 15px; }
    input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Field Strength Converter</h1>
    <label>Volts per Meter (V/m)</label>
    <input type="number" id="vm" oninput="conv('vm')">
    <label>dB microVolts per Meter (dBµV/m)</label>
    <input type="number" id="dbuv" oninput="conv('dbuv')">
  </div>
  <script>
    function conv(id) {
      if(id === 'vm') {
        const vm = parseFloat(document.getElementById('vm').value);
        document.getElementById('dbuv').value = 20 * Math.log10(vm * 1e6);
      } else {
        const dbuv = parseFloat(document.getElementById('dbuv').value);
        document.getElementById('vm').value = Math.pow(10, dbuv / 20) / 1e6;
      }
    }
  </script>
</body>
</html>""",

    "tools/clipboard-viewer.html": r"""---
layout: default
title: "Clipboard Viewer"
description: "Safely read and view the current text stored in your clipboard."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Clipboard Viewer</title>
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #2563eb; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-bottom: 20px; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; resize: vertical; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Clipboard Viewer</h1>
    <p>Click below to paste and view your clipboard contents securely.</p>
    <button onclick="readClip()">Read Clipboard</button>
    <textarea id="output" readonly placeholder="Clipboard text will appear here..."></textarea>
  </div>
  <script>
    async function readClip() {
      try {
        const text = await navigator.clipboard.readText();
        document.getElementById('output').value = text;
      } catch(e) {
        document.getElementById('output').value = "Permission denied or empty clipboard.";
      }
    }
  </script>
</body>
</html>""",

    "tools/markdown-editor.html": r"""---
layout: default
title: "Markdown Editor"
description: "A simple, clean markdown text editor."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Markdown Editor</title>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <style>
    .tool-container { max-width: 1000px; margin: 40px auto; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    .split { display: flex; gap: 20px; height: 60vh; }
    textarea, .preview { flex: 1; padding: 15px; border: 1px solid #ccc; border-radius: 6px; overflow-y: auto; }
    .preview { background: #f8fafc; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Markdown Editor</h1>
    <div class="split">
      <textarea id="editor" placeholder="Write markdown here..." oninput="update()"></textarea>
      <div class="preview" id="preview"></div>
    </div>
  </div>
  <script>
    function update() {
      document.getElementById('preview').innerHTML = marked.parse(document.getElementById('editor').value);
    }
  </script>
</body>
</html>""",

    "tools/week-number.html": r"""---
layout: default
title: "Week Number Calculator"
description: "Find out what week of the year a specific date falls in."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Week Number</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #2563eb; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
    #result { margin-top: 20px; font-size: 2rem; font-weight: bold; color: #16a34a; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Week Number</h1>
    <input type="date" id="date">
    <button onclick="calc()">Get Week Number</button>
    <div id="result"></div>
  </div>
  <script>
    function calc() {
      const d = new Date(document.getElementById('date').value);
      if(isNaN(d)) return;
      const start = new Date(d.getFullYear(), 0, 1);
      const days = Math.floor((d - start) / (24 * 60 * 60 * 1000));
      const week = Math.ceil((d.getDay() + 1 + days) / 7);
      document.getElementById('result').innerText = `Week ${week}`;
    }
  </script>
</body>
</html>""",

    "tools/words-to-number.html": r"""---
layout: default
title: "Words to Number Converter"
description: "Convert basic number words (e.g. one, two) back to digits."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Words to Number</title>
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #2563eb; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
    #result { margin-top: 20px; font-size: 2rem; font-weight: bold; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Words to Number</h1>
    <input type="text" id="words" placeholder="e.g. forty two">
    <button onclick="convert()">Convert</button>
    <div id="result"></div>
  </div>
  <script>
    const nums = {"zero":0,"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"ten":10,"eleven":11,"twelve":12,"thirteen":13,"fourteen":14,"fifteen":15,"sixteen":16,"seventeen":17,"eighteen":18,"nineteen":19,"twenty":20,"thirty":30,"forty":40,"fifty":50,"sixty":60,"seventy":70,"eighty":80,"ninety":90};
    function convert() {
      const arr = document.getElementById('words').value.toLowerCase().split(/[\s-]+/);
      let total = 0;
      for(let w of arr) { if(nums[w] !== undefined) total += nums[w]; }
      document.getElementById('result').innerText = total > 0 ? total : "0";
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
