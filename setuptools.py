import os

tools = {
    "tools/gpa-calculator.html": r"""---
layout: default
title: "GPA Calculator"
description: "Easily calculate your Grade Point Average (GPA) for school or college."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>GPA Calculator</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .row{display:flex;gap:10px;margin-bottom:10px;} select,input{width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;} button{padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;width:100%;margin-top:10px;} #res{margin-top:20px;font-size:2rem;text-align:center;color:#16a34a;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">GPA Calculator</h1>
<div id="courses">
  <div class="row"><input type="text" placeholder="Course Name (Optional)"><select class="grade"><option value="4.0">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3.0">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2.0">C</option><option value="1.7">C-</option><option value="1.0">D</option><option value="0.0">F</option></select><input type="number" class="credits" placeholder="Credits" value="3"></div>
</div>
<button onclick="addRow()" style="background:#4b5563;">+ Add Course</button>
<button onclick="calc()">Calculate GPA</button>
<div id="res">0.00</div></div>
<script>
function addRow(){
  const div = document.createElement('div'); div.className = 'row';
  div.innerHTML = '<input type="text" placeholder="Course Name (Optional)"><select class="grade"><option value="4.0">A</option><option value="3.7">A-</option><option value="3.3">B+</option><option value="3.0">B</option><option value="2.7">B-</option><option value="2.3">C+</option><option value="2.0">C</option><option value="1.7">C-</option><option value="1.0">D</option><option value="0.0">F</option></select><input type="number" class="credits" placeholder="Credits" value="3">';
  document.getElementById('courses').appendChild(div);
}
function calc(){
  const grades = document.querySelectorAll('.grade'), credits = document.querySelectorAll('.credits');
  let totalPts = 0, totalCreds = 0;
  for(let i=0; i<grades.length; i++){
    let c = parseFloat(credits[i].value); let g = parseFloat(grades[i].value);
    if(c > 0){ totalCreds += c; totalPts += (g * c); }
  }
  document.getElementById('res').innerText = totalCreds > 0 ? (totalPts/totalCreds).toFixed(2) : "0.00";
}
</script></body></html>""",

    "tools/rule-of-72-calculator.html": r"""---
layout: default
title: "Rule of 72 Calculator"
description: "Quickly estimate how many years it will take to double your investment."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Rule of 72</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} input{width:100%;padding:12px;border:1px solid #ccc;border-radius:6px;margin-bottom:20px;font-size:16px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #res{margin-top:20px;font-size:2rem;color:#16a34a;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="color:#2563eb;">Rule of 72 Calculator</h1>
<label style="display:block;text-align:left;font-weight:bold;margin-bottom:5px;">Annual Interest Rate (%)</label>
<input type="number" id="r" placeholder="e.g. 8">
<button onclick="calc()">Calculate</button>
<div id="res"></div>
<p style="color:#64748b;font-size:0.9rem;margin-top:10px;">The Rule of 72 is a mental math shortcut to estimate compounding returns.</p></div>
<script>
function calc(){
  const r = parseFloat(document.getElementById('r').value);
  if(r > 0) document.getElementById('res').innerText = (72 / r).toFixed(1) + " Years to Double";
}
</script></body></html>""",

    "tools/commission-calculator.html": r"""---
layout: default
title: "Commission Calculator"
description: "Calculate sales commission amounts based on sale price and commission rate."
category: "Calculators"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Commission Calculator</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;} #res{margin-top:20px;font-size:1.5rem;text-align:center;color:#16a34a;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Commission Calculator</h1>
<label>Sale Amount ($)</label><input type="number" id="s" placeholder="1000">
<label>Commission Rate (%)</label><input type="number" id="r" placeholder="5">
<button onclick="calc()">Calculate</button><div id="res"></div></div>
<script>
function calc(){
  const s = parseFloat(document.getElementById('s').value), r = parseFloat(document.getElementById('r').value);
  if(s && r) document.getElementById('res').innerText = "Commission: $" + (s * (r/100)).toFixed(2);
}
</script></body></html>""",

    "tools/css-triangle-generator.html": r"""---
layout: default
title: "CSS Triangle Generator"
description: "Generate pure CSS triangles for your web design projects instantly."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>CSS Triangle</title><style>.tool-container{max-width:700px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .grid{display:flex;gap:20px;} .col{flex:1;} input,select{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;} textarea{width:100%;height:120px;padding:10px;font-family:monospace;border-radius:6px;border:1px solid #ccc;} #preview-box{height:200px;display:flex;align-items:center;justify-content:center;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0;margin-bottom:20px;} #triangle{width:0;height:0;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">CSS Triangle Generator</h1>
<div id="preview-box"><div id="triangle"></div></div>
<div class="grid"><div class="col">
  <label>Direction</label><select id="dir" onchange="gen()"><option value="top">Up</option><option value="bottom">Down</option><option value="left">Left</option><option value="right">Right</option></select>
  <label>Color</label><input type="color" id="col" value="#2563eb" oninput="gen()">
</div><div class="col">
  <label>Width (px)</label><input type="number" id="w" value="100" oninput="gen()">
  <label>Height (px)</label><input type="number" id="h" value="100" oninput="gen()">
</div></div>
<textarea id="out" readonly></textarea></div>
<script>
function gen(){
  const d = document.getElementById('dir').value, c = document.getElementById('col').value, w = document.getElementById('w').value/2, h = document.getElementById('h').value;
  let css = "width: 0;\nheight: 0;\n";
  if(d==='top') css += `border-left: ${w}px solid transparent;\nborder-right: ${w}px solid transparent;\nborder-bottom: ${h}px solid ${c};`;
  if(d==='bottom') css += `border-left: ${w}px solid transparent;\nborder-right: ${w}px solid transparent;\nborder-top: ${h}px solid ${c};`;
  if(d==='left') css += `border-top: ${w}px solid transparent;\nborder-bottom: ${w}px solid transparent;\nborder-right: ${h}px solid ${c};`;
  if(d==='right') css += `border-top: ${w}px solid transparent;\nborder-bottom: ${w}px solid transparent;\nborder-left: ${h}px solid ${c};`;
  document.getElementById('triangle').style.cssText = css; document.getElementById('out').value = css;
} window.onload=gen;
</script></body></html>""",

    "tools/rgb-to-hsl-converter.html": r"""---
layout: default
title: "RGB to HSL Converter"
description: "Convert RGB color codes to HSL (Hue, Saturation, Lightness)."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>RGB to HSL</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .row{display:flex;gap:10px;} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;text-align:center;} #box{height:100px;border-radius:6px;margin-top:20px;border:1px solid #ccc;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">RGB to HSL</h1>
<div class="row">
  <div><label>R</label><input type="number" id="r" value="37" min="0" max="255" oninput="calc()"></div>
  <div><label>G</label><input type="number" id="g" value="99" min="0" max="255" oninput="calc()"></div>
  <div><label>B</label><input type="number" id="b" value="235" min="0" max="255" oninput="calc()"></div>
</div>
<label>HSL Result</label><input type="text" id="out" readonly>
<div id="box" style="background:rgb(37,99,235)"></div></div>
<script>
function calc(){
  let r=document.getElementById('r').value/255, g=document.getElementById('g').value/255, b=document.getElementById('b').value/255;
  document.getElementById('box').style.background = `rgb(${r*255},${g*255},${b*255})`;
  let max=Math.max(r,g,b), min=Math.min(r,g,b), h, s, l=(max+min)/2;
  if(max===min){ h=s=0; } else {
    let d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){ case r: h=(g-b)/d+(g<b?6:0); break; case g: h=(b-r)/d+2; break; case b: h=(r-g)/d+4; break; } h/=6;
  }
  document.getElementById('out').value = `hsl(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%)`;
} window.onload=calc;
</script></body></html>""",

    "tools/hsl-to-rgb-converter.html": r"""---
layout: default
title: "HSL to RGB Converter"
description: "Convert HSL (Hue, Saturation, Lightness) color values to RGB."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>HSL to RGB</title><style>.tool-container{max-width:500px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .row{display:flex;gap:10px;} input{width:100%;padding:10px;margin-bottom:15px;border:1px solid #ccc;border-radius:6px;text-align:center;} #box{height:100px;border-radius:6px;margin-top:20px;border:1px solid #ccc;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">HSL to RGB</h1>
<div class="row">
  <div><label>H (°)</label><input type="number" id="h" value="221" min="0" max="360" oninput="calc()"></div>
  <div><label>S (%)</label><input type="number" id="s" value="83" min="0" max="100" oninput="calc()"></div>
  <div><label>L (%)</label><input type="number" id="l" value="53" min="0" max="100" oninput="calc()"></div>
</div>
<label>RGB Result</label><input type="text" id="out" readonly>
<div id="box" style="background:hsl(221,83%,53%)"></div></div>
<script>
function calc(){
  let h=document.getElementById('h').value/360, s=document.getElementById('s').value/100, l=document.getElementById('l').value/100;
  document.getElementById('box').style.background = `hsl(${h*360},${s*100}%,${l*100}%)`;
  let r, g, b;
  if(s===0){ r=g=b=l; } else {
    const hue2rgb = (p,q,t) => { if(t<0)t+=1; if(t>1)t-=1; if(t<1/6)return p+(q-p)*6*t; if(t<1/2)return q; if(t<2/3)return p+(q-p)*(2/3-t)*6; return p; };
    let q = l<0.5 ? l*(1+s) : l+s-l*s, p = 2*l-q;
    r = hue2rgb(p,q,h+1/3); g = hue2rgb(p,q,h); b = hue2rgb(p,q,h-1/3);
  }
  document.getElementById('out').value = `rgb(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)})`;
} window.onload=calc;
</script></body></html>""",

    "tools/keycode-info.html": r"""---
layout: default
title: "JavaScript Keycode Finder"
description: "Press any key to get the JavaScript event keycode, code, and meta information."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Keycode Info</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} #main{font-size:6rem;font-weight:bold;color:#2563eb;margin:20px 0;} .grid{display:flex;gap:10px;justify-content:center;} .box{background:#f8fafc;padding:15px;border:1px solid #e2e8f0;border-radius:6px;flex:1;} .lbl{font-size:0.9rem;color:#64748b;font-weight:bold;} .val{font-family:monospace;font-size:1.2rem;}</style></head>
<body><div class="tool-container"><h1>Press any key</h1>
<div id="main">...</div>
<div class="grid">
  <div class="box"><div class="lbl">event.key</div><div class="val" id="k">-</div></div>
  <div class="box"><div class="lbl">event.code</div><div class="val" id="c">-</div></div>
  <div class="box"><div class="lbl">event.keyCode</div><div class="val" id="kc">-</div></div>
</div></div>
<script>
window.addEventListener('keydown', e => {
  e.preventDefault();
  document.getElementById('main').innerText = e.keyCode;
  document.getElementById('k').innerText = e.key === " " ? "Space" : e.key;
  document.getElementById('c').innerText = e.code;
  document.getElementById('kc').innerText = e.keyCode;
});
</script></body></html>""",

    "tools/css-cursor-tester.html": r"""---
layout: default
title: "CSS Cursor Tester"
description: "Hover over different blocks to test and visualize all available CSS cursors."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>CSS Cursor Tester</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .grid{display:grid;grid-template-columns:repeat(auto-fill, minmax(120px, 1fr));gap:15px;} .cur-box{background:#f8fafc;border:1px solid #cbd5e1;padding:20px;text-align:center;border-radius:6px;font-family:monospace;font-size:0.9rem;transition:background 0.2s;} .cur-box:hover{background:#e2e8f0;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">CSS Cursor Tester</h1>
<p style="text-align:center;color:#666;margin-bottom:30px;">Hover over the boxes below to see the cursor change.</p>
<div class="grid" id="grid"></div></div>
<script>
const cursors = ['alias','all-scroll','auto','cell','context-menu','col-resize','copy','crosshair','default','e-resize','ew-resize','grab','grabbing','help','move','n-resize','ne-resize','nesw-resize','ns-resize','nw-resize','nwse-resize','no-drop','none','not-allowed','pointer','progress','row-resize','s-resize','se-resize','sw-resize','text','vertical-text','w-resize','wait','zoom-in','zoom-out'];
const g = document.getElementById('grid');
cursors.forEach(c => { const d = document.createElement('div'); d.className = 'cur-box'; d.style.cursor = c; d.innerText = c; g.appendChild(d); });
</script></body></html>""",

    "tools/upside-down-text.html": r"""---
layout: default
title: "Upside Down Text Generator"
description: "Flip your text upside down instantly. Fun text tool for social media."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Upside Down Text</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:120px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-size:1.2rem;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Upside Down Text</h1>
<textarea id="in" placeholder="Type here..." oninput="flip()"></textarea>
<textarea id="out" readonly placeholder="...ǝɹǝɥ ǝdʎʇ" style="background:#f8fafc;"></textarea></div>
<script>
const flipTable = { a:'\u0250',b:'q',c:'\u0254',d:'p',e:'\u01DD',f:'\u025F',g:'\u0183',h:'\u0265',i:'\u0131',j:'\u027E',k:'\u029E',l:'l',m:'\u026F',n:'u',o:'o',p:'d',q:'b',r:'\u0279',s:'s',t:'\u0287',u:'n',v:'\u028C',w:'\u028D',x:'x',y:'\u028E',z:'z','.':'\u02D9','[':']',']':'[','(':')',')':'(','{':'}','}':'{','?':'\u00BF','!':'\u00A1','\'':',',',':'\'','<':'>','>':'<','_':'\u203E','\\':'/','/':'\\',';':'\u061B','9':'6','6':'9' };
function flip(){
  const str = document.getElementById('in').value.toLowerCase(); let res = '';
  for(let i=str.length-1; i>=0; i--){ res += flipTable[str[i]] || str[i]; }
  document.getElementById('out').value = res;
}
</script></body></html>""",

    "tools/zalgo-text-generator.html": r"""---
layout: default
title: "Zalgo Text Generator"
description: "Generate creepy, cursed Zalgo glitch text instantly."
category: "Text Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Zalgo Text</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-size:1.2rem;overflow:hidden;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Zalgo Glitch Text</h1>
<textarea id="in" placeholder="Type here..." oninput="z()"></textarea>
<label>Crazy Level</label><input type="range" id="lvl" min="1" max="20" value="8" style="width:100%;margin-bottom:20px;" oninput="z()">
<textarea id="out" readonly style="background:#f8fafc;"></textarea></div>
<script>
const chars = ['\u030d','\u030e','\u0304','\u0305','\u033f','\u0311','\u0306','\u0310','\u0352','\u0357','\u0351','\u030f','\u0350','\u0343','\u035d','\u034e','\u0340','\u0341','\u031b','\u0315','\u0312','\u034a','\u034b','\u034c','\u0334','\u0342','\u0318','\u0303','\u0320','\u0322','\u0331','\u032b','\u032a','\u0326','\u0333','\u0332','\u032c','\u032d','\u032e','\u0324','\u0325','\u0321','\u031c'];
function z(){
  const str = document.getElementById('in').value; const lvl = parseInt(document.getElementById('lvl').value); let res = '';
  for(let i=0; i<str.length; i++){
    res += str[i];
    for(let j=0; j<lvl; j++) res += chars[Math.floor(Math.random()*chars.length)];
  }
  document.getElementById('out').value = res;
}
</script></body></html>""",

    "tools/text-to-octal.html": r"""---
layout: default
title: "Text to Octal Converter"
description: "Convert text characters into Octal (Base 8) numbers."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Text to Octal</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:120px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Text to Octal</h1>
<textarea id="in" placeholder="Hello" oninput="c()"></textarea>
<label>Octal Output</label>
<textarea id="out" readonly style="background:#f8fafc;"></textarea></div>
<script>function c(){ document.getElementById('out').value = document.getElementById('in').value.split('').map(ch=>ch.charCodeAt(0).toString(8).padStart(3,'0')).join(' '); }</script></body></html>""",

    "tools/octal-to-text.html": r"""---
layout: default
title: "Octal to Text Converter"
description: "Convert space-separated Octal (Base 8) values back to readable text."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Octal to Text</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:120px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Octal to Text</h1>
<textarea id="in" placeholder="110 145 154 154 157" oninput="c()"></textarea>
<label>Text Output</label>
<textarea id="out" readonly style="background:#f8fafc;"></textarea></div>
<script>function c(){ try{ document.getElementById('out').value = document.getElementById('in').value.trim().split(/\s+/).map(o=>String.fromCharCode(parseInt(o,8))).join(''); }catch(e){} }</script></body></html>""",

    "tools/base64-to-hex.html": r"""---
layout: default
title: "Base64 to Hex Converter"
description: "Convert Base64 strings to Hexadecimal format."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Base64 to Hex</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:120px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Base64 to Hex</h1>
<textarea id="in" placeholder="SGVsbG8=" oninput="c()"></textarea>
<label>Hex Output</label>
<textarea id="out" readonly style="background:#f8fafc;"></textarea></div>
<script>function c(){ try{ const raw=atob(document.getElementById('in').value.trim()); let hex=''; for(let i=0;i<raw.length;i++)hex+=raw.charCodeAt(i).toString(16).padStart(2,'0'); document.getElementById('out').value=hex.toUpperCase(); }catch(e){document.getElementById('out').value="Invalid Base64";} }</script></body></html>""",

    "tools/hex-to-base64.html": r"""---
layout: default
title: "Hex to Base64 Converter"
description: "Convert Hexadecimal strings directly into Base64."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Hex to Base64</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:120px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Hex to Base64</h1>
<textarea id="in" placeholder="48656C6C6F" oninput="c()"></textarea>
<label>Base64 Output</label>
<textarea id="out" readonly style="background:#f8fafc;"></textarea></div>
<script>function c(){ try{ const h=document.getElementById('in').value.replace(/\s+/g,''); if(h.length%2!==0)return; let raw=''; for(let i=0;i<h.length;i+=2)raw+=String.fromCharCode(parseInt(h.substr(i,2),16)); document.getElementById('out').value=btoa(raw); }catch(e){document.getElementById('out').value="Invalid Hex";} }</script></body></html>""",

    "tools/viewport-size-tester.html": r"""---
layout: default
title: "Viewport Size Tester"
description: "Find the exact pixel width and height of your current browser window."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Viewport Size</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:40px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);text-align:center;} #size{font-size:4rem;font-weight:bold;color:#2563eb;margin:20px 0;} p{color:#64748b;}</style></head>
<body><div class="tool-container"><h1>Current Viewport Size</h1>
<p>Resize your browser window to see this update in real time.</p>
<div id="size">0 x 0</div>
<p id="dpi"></p></div>
<script>
function u(){ document.getElementById('size').innerText = window.innerWidth + " x " + window.innerHeight; document.getElementById('dpi').innerText = "Device Pixel Ratio: " + window.devicePixelRatio; }
window.addEventListener('resize', u); u();
</script></body></html>""",

    "tools/device-info-tester.html": r"""---
layout: default
title: "Browser & Device Info"
description: "View your current browser user agent, platform, and screen capabilities."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Device Info</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} .row{padding:15px;border-bottom:1px solid #eee;display:flex;flex-direction:column;} .key{font-weight:bold;color:#64748b;margin-bottom:5px;} .val{font-family:monospace;font-size:1.1rem;word-break:break-all;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Your Device Info</h1>
<div id="out"></div></div>
<script>
const out = document.getElementById('out');
const data = [
  ['User Agent', navigator.userAgent], ['Platform', navigator.platform], ['Language', navigator.language], ['Cookies Enabled', navigator.cookieEnabled],
  ['Screen Resolution', screen.width + 'x' + screen.height], ['Color Depth', screen.colorDepth + ' bit']
];
data.forEach(d => out.innerHTML += `<div class="row"><span class="key">${d[0]}</span><span class="val">${d[1]}</span></div>`);
</script></body></html>""",

    "tools/byte-size-calculator.html": r"""---
layout: default
title: "String Byte Size Calculator"
description: "Calculate the exact storage size in Bytes, KB, and MB of any text string."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Byte Size</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} .grid{display:flex;gap:10px;text-align:center;} .box{flex:1;background:#f8fafc;padding:20px;border-radius:6px;border:1px solid #e2e8f0;} .val{font-size:1.5rem;font-weight:bold;color:#2563eb;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Byte Size Calculator</h1>
<textarea id="in" oninput="c()" placeholder="Paste text here..."></textarea>
<div class="grid">
  <div class="box">Bytes<br><span class="val" id="b">0</span></div>
  <div class="box">Kilobytes (KB)<br><span class="val" id="kb">0</span></div>
  <div class="box">Megabytes (MB)<br><span class="val" id="mb">0</span></div>
</div></div>
<script>
function c(){
  const bytes = new Blob([document.getElementById('in').value]).size;
  document.getElementById('b').innerText = bytes;
  document.getElementById('kb').innerText = (bytes/1024).toFixed(2);
  document.getElementById('mb').innerText = (bytes/1048576).toFixed(4);
}
</script></body></html>""",

    "tools/random-choice-generator.html": r"""---
layout: default
title: "Random Choice Generator"
description: "Pick a random item, name, or winner from a list instantly."
category: "Utility"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Random Choice</title><style>.tool-container{max-width:600px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;} button{width:100%;padding:15px;background:#16a34a;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;font-size:1.1rem;} #res{margin-top:20px;font-size:2rem;text-align:center;color:#2563eb;font-weight:bold;padding:20px;background:#f0f9ff;border-radius:6px;border:1px solid #bae6fd;display:none;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Pick a Random Item</h1>
<label>Enter items (one per line)</label>
<textarea id="in" placeholder="Alice&#10;Bob&#10;Charlie"></textarea>
<button onclick="pick()">Spin the Wheel!</button>
<div id="res"></div></div>
<script>
function pick(){
  const arr = document.getElementById('in').value.split('\n').filter(l=>l.trim()!=='');
  if(arr.length === 0) return;
  const res = document.getElementById('res');
  res.style.display = 'block'; res.innerText = "Choosing...";
  setTimeout(()=>{ res.innerText = "🎉 " + arr[Math.floor(Math.random()*arr.length)]; }, 500);
}
</script></body></html>""",

    "tools/text-to-csv.html": r"""---
layout: default
title: "Text to CSV Converter"
description: "Convert a simple list of text into comma-separated values (CSV) instantly."
category: "Converters"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>Text to CSV</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} textarea{width:100%;height:150px;padding:10px;border:1px solid #ccc;border-radius:6px;margin-bottom:15px;font-family:monospace;} button{width:100%;padding:12px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">Text to CSV</h1>
<textarea id="in" placeholder="Apple&#10;Banana&#10;Cherry"></textarea>
<button onclick="c()">Convert to Comma Separated</button>
<textarea id="out" readonly style="margin-top:20px;background:#f8fafc;"></textarea></div>
<script>
function c(){
  const txt = document.getElementById('in').value.trim();
  document.getElementById('out').value = txt.split(/\n+/).map(l=>l.trim()).join(', ');
}
</script></body></html>""",

    "tools/css-transform-generator.html": r"""---
layout: default
title: "CSS Transform Generator"
description: "Visually generate CSS 2D transforms (Scale, Rotate, Translate, Skew)."
category: "Developer Tools"
---
<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><title>CSS Transform</title><style>.tool-container{max-width:800px;margin:40px auto;background:#fff;padding:30px;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.1);} #box-wrapper{height:250px;display:flex;align-items:center;justify-content:center;border:1px solid #eee;margin-bottom:20px;background:#f8fafc;overflow:hidden;} #box{width:100px;height:100px;background:#2563eb;color:white;display:flex;align-items:center;justify-content:center;font-weight:bold;} .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;} input[type=range]{width:100%;} textarea{width:100%;padding:10px;font-family:monospace;border-radius:6px;border:1px solid #ccc;margin-top:20px;}</style></head>
<body><div class="tool-container"><h1 style="text-align:center;color:#2563eb;">CSS Transform Generator</h1>
<div id="box-wrapper"><div id="box">Box</div></div>
<div class="grid">
  <div><label>Scale (<span id="sv">1</span>)</label><input type="range" id="sc" min="0" max="3" step="0.1" value="1" oninput="u()"></div>
  <div><label>Rotate (<span id="rv">0</span>deg)</label><input type="range" id="ro" min="0" max="360" value="0" oninput="u()"></div>
  <div><label>Translate X (<span id="txv">0</span>px)</label><input type="range" id="tx" min="-100" max="100" value="0" oninput="u()"></div>
  <div><label>Translate Y (<span id="tyv">0</span>px)</label><input type="range" id="ty" min="-100" max="100" value="0" oninput="u()"></div>
  <div><label>Skew X (<span id="sxv">0</span>deg)</label><input type="range" id="sx" min="-90" max="90" value="0" oninput="u()"></div>
  <div><label>Skew Y (<span id="syv">0</span>deg)</label><input type="range" id="sy" min="-90" max="90" value="0" oninput="u()"></div>
</div>
<textarea id="out" readonly></textarea></div>
<script>
function u(){
  const sc=document.getElementById('sc').value, ro=document.getElementById('ro').value, tx=document.getElementById('tx').value, ty=document.getElementById('ty').value, sx=document.getElementById('sx').value, sy=document.getElementById('sy').value;
  document.getElementById('sv').innerText=sc; document.getElementById('rv').innerText=ro; document.getElementById('txv').innerText=tx; document.getElementById('tyv').innerText=ty; document.getElementById('sxv').innerText=sx; document.getElementById('syv').innerText=sy;
  const t = `scale(${sc}) rotate(${ro}deg) translate(${tx}px, ${ty}px) skew(${sx}deg, ${sy}deg)`;
  document.getElementById('box').style.transform = t;
  document.getElementById('out').value = `transform: ${t};`;
} window.onload=u;
</script></body></html>"""
}

# Ensure directory exists
os.makedirs("tools", exist_ok=True)

# Write files
for filename, content in tools.items():
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✅ Created {filename}")
