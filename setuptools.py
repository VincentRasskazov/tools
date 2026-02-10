import os

tools = {
    "tools/md5-hash-generator.html": r"""---
layout: default
title: "MD5 Hash Generator - Online MD5 Encrypt"
description: "Generate MD5 hashes from any string instantly. Fast, client-side secure hashing."
category: "Security Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MD5 Hash Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
  <style>
    .tool-container { max-width: 700px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-family: monospace; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
    .result-box { margin-top: 20px; background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; word-break: break-all; font-family: monospace; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>MD5 Hash Generator</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Type here..."></textarea>
    <button onclick="generate()">Generate MD5 Hash</button>
    <div class="result-box" id="output">Result will appear here...</div>
  </div>
  <script>
    function generate() {
      const input = document.getElementById('input').value;
      if(!input) return alert("Enter some text first");
      const hash = CryptoJS.MD5(input).toString();
      document.getElementById('output').innerText = hash;
    }
  </script>
</body>
</html>""",

    "tools/sha256-hash-generator.html": r"""---
layout: default
title: "SHA256 Hash Generator - Online Secure Hashing"
description: "Generate SHA256 hashes instantly. Secure, client-side hashing for developers."
category: "Security Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SHA256 Hash Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
  <style>
    .tool-container { max-width: 700px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-family: monospace; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
    .result-box { margin-top: 20px; background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; word-break: break-all; font-family: monospace; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>SHA256 Generator</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Type here..."></textarea>
    <button onclick="generate()">Generate SHA256</button>
    <div class="result-box" id="output">Result will appear here...</div>
  </div>
  <script>
    function generate() {
      const input = document.getElementById('input').value;
      if(!input) return alert("Enter some text first");
      const hash = CryptoJS.SHA256(input).toString();
      document.getElementById('output').innerText = hash;
    }
  </script>
</body>
</html>""",

    "tools/url-encoder.html": r"""---
layout: default
title: "URL Encoder - Encode URLs Instantly"
description: "Free online URL encoder. Convert characters to percent-encoding format safe for URLs."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>URL Encoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>URL Encoder</h1>
    <label>Input URL / Text</label>
    <textarea id="input" placeholder="https://example.com/search?q=hello world"></textarea>
    <button onclick="encode()">Encode</button>
    <label style="margin-top:20px; display:block;">Encoded Result</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function encode() {
      const val = document.getElementById('input').value;
      document.getElementById('output').value = encodeURIComponent(val);
    }
  </script>
</body>
</html>""",

    "tools/url-decoder.html": r"""---
layout: default
title: "URL Decoder - Decode URLs Instantly"
description: "Free online URL decoder. Convert percent-encoded URLs back to readable text."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>URL Decoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>URL Decoder</h1>
    <label>Encoded URL</label>
    <textarea id="input" placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"></textarea>
    <button onclick="decode()">Decode</button>
    <label style="margin-top:20px; display:block;">Decoded Result</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function decode() {
      const val = document.getElementById('input').value;
      try {
        document.getElementById('output').value = decodeURIComponent(val);
      } catch(e) {
        alert("Invalid URL encoding");
      }
    }
  </script>
</body>
</html>""",

    "tools/csv-to-json.html": r"""---
layout: default
title: "CSV to JSON Converter - Free Online Tool"
description: "Convert CSV data to JSON format instantly. Simple, client-side, and secure."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSV to JSON</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>
  <style>
    .tool-container { max-width: 900px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .row { display: flex; gap: 20px; }
    .col { flex: 1; }
    textarea { width: 100%; height: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; resize: vertical; }
    button { padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; width: 100%; margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">CSV to JSON</h1>
    <div class="row">
      <div class="col">
        <label>CSV Input</label>
        <textarea id="csv" placeholder="name,age\nJohn,30\nJane,25"></textarea>
      </div>
      <div class="col">
        <label>JSON Output</label>
        <textarea id="json" readonly></textarea>
      </div>
    </div>
    <button onclick="convert()">Convert CSV to JSON &rarr;</button>
  </div>
  <script>
    function convert() {
      const csv = document.getElementById('csv').value;
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          document.getElementById('json').value = JSON.stringify(results.data, null, 2);
        },
        error: function(err) {
          alert("Error parsing CSV");
        }
      });
    }
  </script>
</body>
</html>""",

    "tools/json-to-csv.html": r"""---
layout: default
title: "JSON to CSV Converter - Free Online Tool"
description: "Convert JSON arrays to CSV format instantly. Free developer utility."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JSON to CSV</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"></script>
  <style>
    .tool-container { max-width: 900px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .row { display: flex; gap: 20px; }
    .col { flex: 1; }
    textarea { width: 100%; height: 300px; padding: 10px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; resize: vertical; }
    button { padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; width: 100%; margin-top: 10px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">JSON to CSV</h1>
    <div class="row">
      <div class="col">
        <label>JSON Input</label>
        <textarea id="json" placeholder='[{"name":"John", "age":30}]'></textarea>
      </div>
      <div class="col">
        <label>CSV Output</label>
        <textarea id="csv" readonly></textarea>
      </div>
    </div>
    <button onclick="convert()">Convert JSON to CSV &rarr;</button>
  </div>
  <script>
    function convert() {
      try {
        const json = JSON.parse(document.getElementById('json').value);
        const csv = Papa.unparse(json);
        document.getElementById('csv').value = csv;
      } catch(e) {
        alert("Invalid JSON: " + e.message);
      }
    }
  </script>
</body>
</html>""",

    "tools/unix-timestamp.html": r"""---
layout: default
title: "Unix Timestamp Converter - Epoch Time"
description: "Convert Unix timestamps to human-readable dates and vice versa. Current Epoch time tool."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Unix Timestamp Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    .current-time { font-size: 2rem; font-weight: bold; color: #2563eb; margin: 20px 0; }
    input { padding: 10px; width: 70%; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 10px; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .result { margin-top: 15px; font-weight: bold; color: #334155; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Unix Timestamp Converter</h1>
    <p>Current Unix Epoch Time:</p>
    <div class="current-time" id="now">Loading...</div>
    
    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;">
    
    <h3>Convert Timestamp to Date</h3>
    <input type="number" id="tsInput" placeholder="1672531200">
    <button onclick="convert()">Convert</button>
    <div class="result" id="resDate"></div>
  </div>
  <script>
    // Update current time every second
    setInterval(() => {
      document.getElementById('now').innerText = Math.floor(Date.now() / 1000);
    }, 1000);

    function convert() {
      const ts = document.getElementById('tsInput').value;
      if(!ts) return;
      const date = new Date(ts * 1000);
      document.getElementById('resDate').innerText = date.toUTCString() + " | " + date.toLocaleTimeString();
    }
  </script>
</body>
</html>""",

    "tools/text-case-converter.html": r"""---
layout: default
title: "Text Case Converter - Upper, Lower, Title Case"
description: "Convert text case instantly. Uppercase, lowercase, title case, sentence case, and more."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text Case Converter</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    textarea { width: 100%; height: 200px; padding: 15px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 20px; font-size: 16px; }
    .btn-group { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
    button { padding: 10px 20px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Text Case Converter</h1>
    <textarea id="text" placeholder="Type or paste your text here..."></textarea>
    <div class="btn-group">
      <button onclick="convert('upper')">UPPERCASE</button>
      <button onclick="convert('lower')">lowercase</button>
      <button onclick="convert('title')">Title Case</button>
      <button onclick="convert('sentence')">Sentence case</button>
      <button onclick="convert('clear')" style="background: #ef4444;">Clear</button>
    </div>
  </div>
  <script>
    function convert(type) {
      const el = document.getElementById('text');
      let val = el.value;
      
      if(type === 'upper') el.value = val.toUpperCase();
      if(type === 'lower') el.value = val.toLowerCase();
      if(type === 'title') el.value = val.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if(type === 'sentence') el.value = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
      if(type === 'clear') el.value = '';
    }
  </script>
</body>
</html>""",

    "tools/text-to-binary.html": r"""---
layout: default
title: "Text to Binary Converter - Translate ASCII"
description: "Convert text to binary code (010101) instantly. Useful for learning computer science concepts."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Text to Binary</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-family: monospace; }
    button { width: 100%; padding: 12px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1 style="text-align: center; color: #2563eb;">Text to Binary</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Hello World"></textarea>
    <button onclick="convert()">Convert to Binary</button>
    <label style="margin-top:20px; display:block;">Binary Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function convert() {
      const input = document.getElementById('input').value;
      let binary = '';
      for (let i = 0; i < input.length; i++) {
        binary += input[i].charCodeAt(0).toString(2).padStart(8, '0') + ' ';
      }
      document.getElementById('output').value = binary.trim();
    }
  </script>
</body>
</html>""",

    "tools/random-number.html": r"""---
layout: default
title: "Random Number Generator - RNG Tool"
description: "Generate random numbers within a specific range instantly. True randomness for games and lotteries."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Random Number Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 500px; margin: 40px auto; background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center; }
    #result { font-size: 5rem; font-weight: 800; color: #2563eb; margin: 20px 0; }
    .inputs { display: flex; gap: 10px; justify-content: center; margin-bottom: 20px; }
    input { width: 80px; padding: 10px; text-align: center; border: 1px solid #ccc; border-radius: 6px; }
    button { padding: 12px 30px; background: #16a34a; color: white; border: none; border-radius: 6px; font-size: 1.2rem; cursor: pointer; }
    button:hover { background: #15803d; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Random Number</h1>
    <div id="result">0</div>
    <div class="inputs">
      <input type="number" id="min" value="1" placeholder="Min">
      <input type="number" id="max" value="100" placeholder="Max">
    </div>
    <button onclick="generate()">Generate</button>
  </div>
  <script>
    function generate() {
      const min = Math.ceil(document.getElementById('min').value);
      const max = Math.floor(document.getElementById('max').value);
      const random = Math.floor(Math.random() * (max - min + 1) + min);
      document.getElementById('result').innerText = random;
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