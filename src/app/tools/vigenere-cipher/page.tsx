"use client";
import React, { useState } from "react";

function vigenere(str: string, key: string) {
  if (!key) return str;
  key = key.toLowerCase();
  let j = 0;
  return str.replace(/[a-z]/gi, c => {
    const code = c.charCodeAt(0);
    const base = code >= 97 ? 97 : 65;
    const k = key[j++ % key.length].charCodeAt(0) - 97;
    return String.fromCharCode(((code - base + k + 26) % 26) + base);
  });
}

export default function VigenereCipher() {
  const [input, setInput] = useState("");
  const [key, setKey] = useState("");
  const result = vigenere(input, key);
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vigenère Cipher</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <input className="w-full border p-2 rounded mb-2" value={key} onChange={e => setKey(e.target.value)} placeholder="Key (letters)" />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{result}</div>
    </div>
  );
}
