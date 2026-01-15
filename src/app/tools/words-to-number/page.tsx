"use client";
import React, { useState } from "react";

// Simple English words to number (0-99)
function wordsToNumber(str: string) {
  const a = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
  const b = ["twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
  str = str.toLowerCase().replace(/-/g, " ").replace(/ and /g, " ");
  let n = 0;
  for (let i = 0; i < b.length; i++) if (str.startsWith(b[i])) { n += (i+2)*10; str = str.replace(b[i],"").trim(); }
  for (let i = 0; i < a.length; i++) if (str.startsWith(a[i])) { n += i; }
  return isNaN(n) ? "" : n;
}

export default function WordsToNumber() {
  const [input, setInput] = useState("");
  const num = wordsToNumber(input);
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Words to Number</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter words (zero-ninety nine)..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{num}</div>
    </div>
  );
}
