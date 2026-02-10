import os

tools = {
    "tools/html-minifier.html": r"""---
layout: default
title: "HTML Minifier - Compress HTML Code"
description: "Minify your HTML code instantly. Remove whitespace, comments, and newlines to speed up your website."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Minifier</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; font-size: 14px; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>HTML Minifier</h1>
    <label>Input HTML</label>
    <textarea id="input" placeholder="<div class='test'>
  Hello World
</div>"></textarea>
    <button onclick="minify()">Minify HTML</button>
    <label style="margin-top:20px; display:block;">Minified Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function minify() {
      let html = document.getElementById('input').value;
      // Remove comments
      html = html.replace(//g, "");
      // Remove whitespace between tags
      html = html.replace(/>\s+</g, "><");
      // Remove whitespace start/end
      html = html.trim();
      document.getElementById('output').value = html;
    }
  </script>
</body>
</html>""",

    "tools/css-minifier.html": r"""---
layout: default
title: "CSS Minifier - Compress CSS Code"
description: "Minify CSS code instantly. Reduce file size by removing spaces, indentation, and comments."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CSS Minifier</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 200px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-family: monospace; font-size: 14px; margin-bottom: 20px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
    button:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>CSS Minifier</h1>
    <label>Input CSS</label>
    <textarea id="input" placeholder="body {
  color: white;
  background: black;
}"></textarea>
    <button onclick="minify()">Minify CSS</button>
    <label style="margin-top:20px; display:block;">Minified Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function minify() {
      let css = document.getElementById('input').value;
      // Remove comments
      css = css.replace(/\/\*[\s\S]*?\*\//g, "");
      // Remove whitespace
      css = css.replace(/\s+/g, " ");
      // Remove space around symbols
      css = css.replace(/\s?([\{\}\:\;\,])\s?/g, "$1");
      css = css.replace(/;\}/g, "}");
      document.getElementById('output').value = css.trim();
    }
  </script>
</body>
</html>""",

    "tools/slug-generator.html": r"""---
layout: default
title: "URL Slug Generator - SEO Friendly URLs"
description: "Convert text to clean URL slugs. Removes special characters and replaces spaces with dashes."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Slug Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    .result { background: #f8fafc; padding: 15px; border: 1px solid #e2e8f0; border-radius: 6px; font-family: monospace; color: #334155; word-break: break-all; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Slug Generator</h1>
    <label>Enter Title</label>
    <input type="text" id="input" placeholder="Hello World! This is a Post Title." oninput="generate()">
    <label>Generated Slug</label>
    <div class="result" id="output">hello-world-this-is-a-post-title</div>
  </div>
  <script>
    function generate() {
      const val = document.getElementById('input').value;
      const slug = val.toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
                      .replace(/\s+/g, '-')         // replace whitespace with -
                      .replace(/-+/g, '-');         // collapse dashes
      document.getElementById('output').innerText = slug;
    }
  </script>
</body>
</html>""",

    "tools/html-entity-encoder.html": r"""---
layout: default
title: "HTML Entity Encoder - Escape Special Characters"
description: "Convert text to HTML entities instantly. Escape characters like <, >, and & for safe HTML usage."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Entity Encoder</title>
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
    <h1>HTML Entity Encoder</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="<div class='box'> & 'Quote'"></textarea>
    <button onclick="encode()">Encode</button>
    <label style="margin-top:20px; display:block;">Encoded Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function encode() {
      const val = document.getElementById('input').value;
      const el = document.createElement('div');
      el.innerText = val;
      document.getElementById('output').value = el.innerHTML;
    }
  </script>
</body>
</html>""",

    "tools/html-entity-decoder.html": r"""---
layout: default
title: "HTML Entity Decoder - Unescape Characters"
description: "Convert HTML entities back to readable text. Decode &amp;, &lt;, and other special characters."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Entity Decoder</title>
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
    <h1>HTML Entity Decoder</h1>
    <label>Input Entities</label>
    <textarea id="input" placeholder="&lt;div class='box'&gt;"></textarea>
    <button onclick="decode()">Decode</button>
    <label style="margin-top:20px; display:block;">Decoded Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function decode() {
      const val = document.getElementById('input').value;
      const el = document.createElement('textarea');
      el.innerHTML = val;
      document.getElementById('output').value = el.value;
    }
  </script>
</body>
</html>""",

    "tools/caesar-cipher.html": r"""---
layout: default
title: "Caesar Cipher - Online Encryption/Decryption"
description: "Encrypt and decrypt text using the classic Caesar Cipher method. Shift letters by a set amount."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Caesar Cipher</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 120px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    .controls { display: flex; gap: 10px; align-items: center; margin-bottom: 20px; }
    input[type="number"] { width: 80px; padding: 10px; border-radius: 6px; border: 1px solid #ccc; }
    button { padding: 10px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Caesar Cipher</h1>
    <textarea id="input" placeholder="Type your secret message..."></textarea>
    
    <div class="controls">
      <label>Shift:</label>
      <input type="number" id="shift" value="3">
      <button onclick="run(1)">Encrypt</button>
      <button onclick="run(-1)" style="background:#4b5563">Decrypt</button>
    </div>
    
    <label>Result</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function run(direction) {
      const text = document.getElementById('input').value;
      const shift = parseInt(document.getElementById('shift').value) * direction;
      
      let result = "";
      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
          const code = text.charCodeAt(i);
          // Uppercase
          if (code >= 65 && code <= 90) {
            char = String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
          }
          // Lowercase
          else if (code >= 97 && code <= 122) {
            char = String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
          }
        }
        result += char;
      }
      document.getElementById('output').value = result;
    }
  </script>
</body>
</html>""",

    "tools/rot13-cipher.html": r"""---
layout: default
title: "ROT13 Cipher - Text Encryption"
description: "Simple ROT13 encryption tool. Shifts every letter 13 places in the alphabet."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ROT13 Cipher</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>ROT13 Cipher</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="Type here..."></textarea>
    <button onclick="rot13()">Encrypt / Decrypt (Toggle)</button>
    <label style="margin-top:20px; display:block;">Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    function rot13() {
      const str = document.getElementById('input').value;
      const res = str.replace(/[a-zA-Z]/g, function(c){
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
      });
      document.getElementById('output').value = res;
    }
  </script>
</body>
</html>""",

    "tools/morse-code-encoder.html": r"""---
layout: default
title: "Morse Code Encoder - Text to Morse"
description: "Convert text into Morse code dots and dashes instantly. Fun and educational utility."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Morse Code Encoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Morse Code Encoder</h1>
    <label>Input Text</label>
    <textarea id="input" placeholder="SOS"></textarea>
    <button onclick="encode()">Encode to Morse</button>
    <label style="margin-top:20px; display:block;">Morse Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    const morseMap = { 'A':'.-', 'B':'-...', 'C':'-.-.', 'D':'-..', 'E':'.', 'F':'..-.', 'G':'--.', 'H':'....', 'I':'..', 'J':'.---', 'K':'-.-', 'L':'.-..', 'M':'--', 'N':'-.', 'O':'---', 'P':'.--.', 'Q':'--.-', 'R':'.-.', 'S':'...', 'T':'-', 'U':'..-', 'V':'...-', 'W':'.--', 'X':'-..-', 'Y':'-.--', 'Z':'--..', '1':'.----', '2':'..---', '3':'...--', '4':'....-', '5':'.....', '6':'-....', '7':'--...', '8':'---..', '9':'----.', '0':'-----', ' ': '/' };
    
    function encode() {
      const text = document.getElementById('input').value.toUpperCase();
      let res = "";
      for(let char of text) {
        res += (morseMap[char] || char) + " ";
      }
      document.getElementById('output').value = res.trim();
    }
  </script>
</body>
</html>""",

    "tools/morse-code-decoder.html": r"""---
layout: default
title: "Morse Code Decoder - Morse to Text"
description: "Translate Morse code dots and dashes back into readable text."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Morse Code Decoder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 800px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    textarea { width: 100%; height: 150px; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Morse Code Decoder</h1>
    <label>Input Morse Code (Use spaces between letters)</label>
    <textarea id="input" placeholder="... --- ..."></textarea>
    <button onclick="decode()">Decode to Text</button>
    <label style="margin-top:20px; display:block;">Text Output</label>
    <textarea id="output" readonly></textarea>
  </div>
  <script>
    const morseMap = { '.-':'A', '-...':'B', '-.-.':'C', '-..':'D', '.':'E', '..-.':'F', '--.':'G', '....':'H', '..':'I', '.---':'J', '-.-':'K', '.-..':'L', '--':'M', '-.':'N', '---':'O', '.--.':'P', '--.-':'Q', '.-.':'R', '...':'S', '-':'T', '..-':'U', '...-':'V', '.--':'W', '-..-':'X', '-.--':'Y', '--..':'Z', '.----':'1', '..---':'2', '...--':'3', '....-':'4', '.....':'5', '-....':'6', '--...':'7', '---..':'8', '----.':'9', '-----':'0', '/':' ' };

    function decode() {
      const code = document.getElementById('input').value.trim();
      const parts = code.split(' ');
      let res = "";
      for(let p of parts) {
        res += (morseMap[p] || "?");
      }
      document.getElementById('output').value = res;
    }
  </script>
</body>
</html>""",

    "tools/binary-to-hex.html": r"""---
layout: default
title: "Binary to Hex Converter"
description: "Convert binary code to hexadecimal format instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Binary to Hex</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .tool-container { max-width: 600px; margin: 40px auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; text-align: center; }
    input { width: 100%; padding: 12px; border: 1px solid #ccc; border-radius: 6px; margin-bottom: 20px; font-size: 16px; font-family: monospace; }
    button { padding: 12px 24px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; }
  </style>
</head>
<body>
  <div class="tool-container">
    <h1>Binary to Hex</h1>
    <label>Binary Input</label>
    <input type="text" id="input" placeholder="10101100">
    <button onclick="convert()">Convert</button>
    <label style="margin-top:20px; display:block;">Hex Output</label>
    <input type="text" id="output" readonly>
  </div>
  <script>
    function convert() {
      const bin = document.getElementById('input').value;
      if(!/^[01]+$/.test(bin)) return alert("Invalid Binary");
      const hex = parseInt(bin, 2).toString(16).toUpperCase();
      document.getElementById('output').value = hex;
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
