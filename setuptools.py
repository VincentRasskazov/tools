import os

tools = {
    "tools/base58-encoder.html": r"""---
layout: default
title: "Base58 Encoder"
description: "Encode text to Base58 format instantly."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Base58 Encoder</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Base58 Encoder</h1><textarea id="in" placeholder="Type text here..."></textarea><button onclick="encode()">Encode to Base58</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function encode(){
  let str = document.getElementById('in').value;
  let num = BigInt(0); for(let i=0; i<str.length; i++) num = (num * BigInt(256)) + BigInt(str.charCodeAt(i));
  let res = ''; while(num > BigInt(0)){ res = ALPHABET[num % BigInt(58)] + res; num /= BigInt(58); }
  for(let i=0; i<str.length && str[i]==='\0'; i++) res = '1' + res;
  document.getElementById('out').value = res;
}
</script></body></html>""",

    "tools/slug-to-text.html": r"""---
layout: default
title: "URL Slug to Text"
description: "Convert a URL slug with dashes back into normal readable text."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Slug to Text</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;margin-bottom:20px;font-size:16px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Slug to Text</h1><input type="text" id="in" placeholder="my-awesome-blog-post"><button onclick="c()">Convert</button><input type="text" id="out" readonly style="margin-top:20px;background:#f8fafc;"></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); }</script></body></html>""",

    "tools/text-to-html.html": r"""---
layout: default
title: "Text to HTML Paragraphs"
description: "Convert standard text blocks into formatted HTML paragraphs."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Text to HTML</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Text to HTML</h1><textarea id="in" placeholder="Paragraph 1...&#10;&#10;Paragraph 2..."></textarea><button onclick="c()">Convert to HTML</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ const t = document.getElementById('in').value.split('\n\n').filter(p=>p.trim()!==''); document.getElementById('out').value = t.map(p=>`<p>${p.trim()}</p>`).join('\n'); }</script></body></html>""",

    "tools/json-minifier.html": r"""---
layout: default
title: "JSON Minifier"
description: "Compress JSON code to a single line, saving space and reducing file size."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>JSON Minifier</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">JSON Minifier</h1><textarea id="in" placeholder='{&#10;  "key": "value"&#10;}'></textarea><button onclick="c()">Minify JSON</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ try{ document.getElementById('out').value = JSON.stringify(JSON.parse(document.getElementById('in').value)); }catch(e){alert("Invalid JSON!");} }</script></body></html>""",

    "tools/xml-minifier.html": r"""---
layout: default
title: "XML Minifier"
description: "Compress XML code by removing whitespace and line breaks."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>XML Minifier</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">XML Minifier</h1><textarea id="in" placeholder="<root>&#10;  <child>Data</child>&#10;</root>"></textarea><button onclick="c()">Minify XML</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.replace(/>\s+</g, '><').trim(); }</script></body></html>""",

    "tools/random-color-generator.html": r"""---
layout: default
title: "Random Color Generator"
description: "Generate random colors visually. Get HEX, RGB, and HSL values instantly."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Random Color</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} #box{width:100%;height:150px;border-radius:12px;margin-bottom:20px;background:#000;transition:0.3s;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} .code{font-family:monospace;font-size:1.5rem;margin:10px 0;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">Random Color</h1><div id="box"></div><div class="code" id="hex">#000000</div><button onclick="c()">Generate Color</button></div>
<script>function c(){ const hex = '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'); document.getElementById('box').style.background = hex; document.getElementById('hex').innerText = hex.toUpperCase(); } window.onload=c;</script></body></html>""",

    "tools/random-hex-generator.html": r"""---
layout: default
title: "Random Hex Generator"
description: "Generate random cryptographic hex strings for keys, IDs, and tokens."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Random Hex</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;font-size:16px;margin-bottom:20px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{font-family:monospace;font-size:1.5rem;background:#f8fafc;padding:20px;border-radius:6px;margin-top:20px;word-break:break-all;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">Random Hex Generator</h1><label>Length (bytes)</label><input type="number" id="len" value="16" min="1" max="512"><button onclick="c()">Generate Hex</button><div id="out">...</div></div>
<script>function c(){ const len=parseInt(document.getElementById('len').value); const arr=new Uint8Array(len); crypto.getRandomValues(arr); document.getElementById('out').innerText = Array.from(arr).map(b=>b.toString(16).padStart(2,'0')).join(''); } window.onload=c;</script></body></html>""",

    "tools/random-mac-address.html": r"""---
layout: default
title: "Random MAC Address Generator"
description: "Generate spoofed or random MAC addresses for networking and testing."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Random MAC</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{font-family:monospace;font-size:2rem;background:#f8fafc;padding:20px;border-radius:6px;margin-bottom:20px;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">MAC Generator</h1><div id="out">00:00:00:00:00:00</div><button onclick="c()">Generate MAC Address</button></div>
<script>function c(){ const hex = "0123456789ABCDEF"; let mac = "02"; for(let i=0;i<5;i++){ mac += ":" + hex[Math.floor(Math.random()*16)] + hex[Math.floor(Math.random()*16)]; } document.getElementById('out').innerText = mac; } window.onload=c;</script></body></html>""",

    "tools/random-ip-generator.html": r"""---
layout: default
title: "Random IP Address Generator"
description: "Generate random IPv4 addresses instantly for testing and mock data."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Random IP</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{font-family:monospace;font-size:2rem;background:#f8fafc;padding:20px;border-radius:6px;margin-bottom:20px;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">IP Generator</h1><div id="out">0.0.0.0</div><button onclick="c()">Generate IPv4</button></div>
<script>function c(){ const ip = Array.from({length:4}, ()=>Math.floor(Math.random()*256)).join('.'); document.getElementById('out').innerText = ip; } window.onload=c;</script></body></html>""",

    "tools/sentence-counter.html": r"""---
layout: default
title: "Sentence Counter"
description: "Count the exact number of sentences in your text."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Sentence Counter</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} #out{font-size:3rem;font-weight:bold;color:#2563eb;}</style></head>
<body><div class="tool-container"><h1>Sentence Counter</h1><textarea id="in" oninput="c()" placeholder="Type here..."></textarea><div id="out">0</div><p>Sentences</p></div>
<script>function c(){ const t=document.getElementById('in').value.trim(); const m=t.match(/[^\.!\?]+[\.!\?]+/g); document.getElementById('out').innerText = m ? m.length : (t.length > 0 ? 1 : 0); }</script></body></html>""",

    "tools/syllable-counter.html": r"""---
layout: default
title: "Syllable Counter"
description: "Estimate the number of syllables in a word or paragraph."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Syllable Counter</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} #out{font-size:3rem;font-weight:bold;color:#16a34a;}</style></head>
<body><div class="tool-container"><h1>Syllable Counter</h1><textarea id="in" oninput="c()" placeholder="Type here..."></textarea><div id="out">0</div><p>Syllables (Estimated)</p></div>
<script>function syl(word){ word=word.toLowerCase(); if(word.length<=3) return 1; word=word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); word=word.replace(/^y/, ''); return word.match(/[aeiouy]{1,2}/g)?.length || 1; } function c(){ const t=document.getElementById('in').value.trim().split(/\s+/); let sum=0; if(t[0]!=="") t.forEach(w=>sum+=syl(w)); document.getElementById('out').innerText = sum; }</script></body></html>""",

    "tools/title-case-converter.html": r"""---
layout: default
title: "Title Case Converter"
description: "Capitalize the first letter of every word."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Title Case</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Title Case Converter</h1><textarea id="in" placeholder="hello world"></textarea><button onclick="c()">Convert</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.toLowerCase().split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' '); }</script></body></html>""",

    "tools/snake-case-converter.html": r"""---
layout: default
title: "Snake Case Converter"
description: "Convert text to snake_case format for programming."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Snake Case</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Snake Case Converter</h1><textarea id="in" placeholder="Hello World"></textarea><button onclick="c()">Convert</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_'); }</script></body></html>""",

    "tools/camel-case-converter.html": r"""---
layout: default
title: "Camel Case Converter"
description: "Convert text to camelCase format for programming variables."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Camel Case</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Camel Case Converter</h1><textarea id="in" placeholder="Hello World"></textarea><button onclick="c()">Convert</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.trim().toLowerCase().replace(/[^a-z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); }</script></body></html>""",

    "tools/pascal-case-converter.html": r"""---
layout: default
title: "Pascal Case Converter"
description: "Convert text to PascalCase format for classes and objects."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Pascal Case</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Pascal Case Converter</h1><textarea id="in" placeholder="hello world"></textarea><button onclick="c()">Convert</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ const str = document.getElementById('in').value.trim().toLowerCase().replace(/[^a-z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); document.getElementById('out').value = str.charAt(0).toUpperCase() + str.slice(1); }</script></body></html>""",

    "tools/kebab-case-converter.html": r"""---
layout: default
title: "Kebab Case Converter"
description: "Convert text to kebab-case format."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Kebab Case</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Kebab Case Converter</h1><textarea id="in" placeholder="Hello World"></textarea><button onclick="c()">Convert</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'); }</script></body></html>""",

    "tools/alternating-case.html": r"""---
layout: default
title: "Alternating Case Converter"
description: "cOnVeRt TeXt LiKe ThIs instantly. Perfect for memes."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Alternating Case</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Alternating Case Converter</h1><textarea id="in" placeholder="hello world"></textarea><button onclick="c()">cOnVeRt</button><textarea id="out" readonly style="margin-top:20px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.split('').map((c,i)=> i%2===0 ? c.toLowerCase() : c.toUpperCase()).join(''); }</script></body></html>""",

    "tools/utm-builder.html": r"""---
layout: default
title: "UTM Campaign Builder"
description: "Easily build UTM parameters for your URLs to track marketing campaigns in Google Analytics."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>UTM Builder</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} label{font-weight:bold;display:block;margin-bottom:5px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{background:#f8fafc;padding:15px;margin-top:20px;word-break:break-all;font-family:monospace;border:1px solid #ccc;}</style></head>
<body><div class="tool-container"><h1>UTM Builder</h1>
<label>Website URL *</label><input type="text" id="url" placeholder="https://example.com">
<label>Campaign Source *</label><input type="text" id="src" placeholder="google, newsletter">
<label>Campaign Medium</label><input type="text" id="med" placeholder="cpc, email">
<label>Campaign Name</label><input type="text" id="name" placeholder="spring_sale">
<button onclick="c()">Generate URL</button>
<div id="out">URL will appear here...</div></div>
<script>function c(){ const u=document.getElementById('url').value, s=document.getElementById('src').value, m=document.getElementById('med').value, n=document.getElementById('name').value; if(!u||!s)return alert("URL and Source required!"); let res=`${u}?utm_source=${encodeURIComponent(s)}`; if(m) res+=`&utm_medium=${encodeURIComponent(m)}`; if(n) res+=`&utm_campaign=${encodeURIComponent(n)}`; document.getElementById('out').innerText = res; }</script></body></html>""",

    "tools/meta-tag-generator.html": r"""---
layout: default
title: "Meta Tag Generator"
description: "Generate SEO meta tags for your website header."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Meta Tags</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input,textarea{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{background:#1e293b;color:#a5b4fc;padding:15px;margin-top:20px;font-family:monospace;height:150px;}</style></head>
<body><div class="tool-container"><h1>Meta Tag Generator</h1>
<input type="text" id="t" placeholder="Page Title (Max 60 chars)">
<textarea id="d" placeholder="Page Description (Max 160 chars)"></textarea>
<input type="text" id="k" placeholder="Keywords (comma separated)">
<input type="text" id="a" placeholder="Author">
<button onclick="c()">Generate HTML</button>
<textarea id="out" readonly></textarea></div>
<script>function c(){ const t=document.getElementById('t').value, d=document.getElementById('d').value, k=document.getElementById('k').value, a=document.getElementById('a').value; document.getElementById('out').value = `<title>${t}</title>\n<meta name="description" content="${d}">\n<meta name="keywords" content="${k}">\n<meta name="author" content="${a}">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">`; }</script></body></html>""",

    "tools/open-graph-generator.html": r"""---
layout: default
title: "Open Graph Generator"
description: "Generate Facebook and Open Graph tags for better social media sharing."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Open Graph</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input,textarea{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{background:#1e293b;color:#a5b4fc;padding:15px;margin-top:20px;font-family:monospace;height:150px;}</style></head>
<body><div class="tool-container"><h1>Open Graph Generator</h1>
<input type="text" id="t" placeholder="og:title">
<input type="text" id="d" placeholder="og:description">
<input type="text" id="i" placeholder="og:image (URL)">
<input type="text" id="u" placeholder="og:url">
<button onclick="c()">Generate Tags</button>
<textarea id="out" readonly></textarea></div>
<script>function c(){ const t=document.getElementById('t').value, d=document.getElementById('d').value, i=document.getElementById('i').value, u=document.getElementById('u').value; document.getElementById('out').value = `<meta property="og:title" content="${t}">\n<meta property="og:description" content="${d}">\n<meta property="og:image" content="${i}">\n<meta property="og:url" content="${u}">\n<meta property="og:type" content="website">`; }</script></body></html>""",

    "tools/twitter-card-generator.html": r"""---
layout: default
title: "Twitter Card Generator"
description: "Generate Twitter Card HTML tags for perfect X/Twitter embeds."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Twitter Card</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input,textarea{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{background:#1e293b;color:#a5b4fc;padding:15px;margin-top:20px;font-family:monospace;height:150px;}</style></head>
<body><div class="tool-container"><h1>Twitter Card Generator</h1>
<input type="text" id="t" placeholder="twitter:title">
<input type="text" id="d" placeholder="twitter:description">
<input type="text" id="i" placeholder="twitter:image (URL)">
<input type="text" id="s" placeholder="twitter:site (@username)">
<button onclick="c()">Generate Tags</button>
<textarea id="out" readonly></textarea></div>
<script>function c(){ const t=document.getElementById('t').value, d=document.getElementById('d').value, i=document.getElementById('i').value, s=document.getElementById('s').value; document.getElementById('out').value = `<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:site" content="${s}">\n<meta name="twitter:title" content="${t}">\n<meta name="twitter:description" content="${d}">\n<meta name="twitter:image" content="${i}">`; }</script></body></html>""",

    "tools/css-formatter.html": r"""---
layout: default
title: "CSS Formatter"
description: "Beautify and format minified CSS code."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>CSS Formatter</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">CSS Formatter</h1><textarea id="in" placeholder="body{color:red;margin:0}"></textarea><button onclick="c()">Beautify</button><textarea id="out" readonly style="margin-top:20px;height:250px;"></textarea></div>
<script>function c(){ let css=document.getElementById('in').value; css=css.replace(/\s*([\{\}\:\;])\s*/g, '$1').replace(/;/g, ';\n  ').replace(/\{/g, ' {\n  ').replace(/\}/g, '\n}\n\n').replace(/  \n/g,'\n'); document.getElementById('out').value = css.trim(); }</script></body></html>""",

    "tools/markdown-to-html.html": r"""---
layout: default
title: "Markdown to HTML Converter"
description: "Convert markdown directly to raw HTML code strings."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Markdown to HTML</title><script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Markdown to HTML</h1><textarea id="in" placeholder="**Bold** and *Italic*"></textarea><button onclick="c()">Get HTML</button><textarea id="out" readonly style="margin-top:20px;height:250px;"></textarea></div>
<script>function c(){ document.getElementById('out').value = marked.parse(document.getElementById('in').value); }</script></body></html>""",

    "tools/uuid-v1-generator.html": r"""---
layout: default
title: "UUID v1 Generator"
description: "Generate timestamp-based Version 1 UUIDs."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>UUID v1</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #out{font-family:monospace;font-size:1.5rem;background:#f8fafc;padding:20px;border-radius:6px;margin-bottom:20px;word-break:break-all;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">UUID v1 Generator</h1><div id="out">...</div><button onclick="c()">Generate UUID</button></div>
<script>
function c(){ 
  let d = new Date().getTime();
  let uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  document.getElementById('out').innerText = uuid; 
} window.onload=c;
</script></body></html>"""
}

# Ensure directory exists
os.makedirs("tools", exist_ok=True)

# Write files
for filename, content in tools.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created {filename}")
