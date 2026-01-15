"use client";
import React, { useState } from "react";

function caesar(str: string, shift: number) {
  return str.replace(/[a-z]/gi, c => {
    const code = c.charCodeAt(0);
    const base = code >= 97 ? 97 : 65;
    return String.fromCharCode(((code - base + shift + 26) % 26) + base);
  });
}

export default function CaesarCipher() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState("3");
  const result = caesar(input, Number(shift));
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Caesar Cipher</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <input className="w-full border p-2 rounded mb-2" value={shift} onChange={e => setShift(e.target.value)} placeholder="Shift (number)" />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{result}</div>
    </div>
  );
}
