"use client";
import React, { useState } from "react";

function rot13(str: string) {
  return str.replace(/[a-z]/gi, c => {
    const code = c.charCodeAt(0);
    const base = code >= 97 ? 97 : 65;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  });
}

export default function Rot13Cipher() {
  const [input, setInput] = useState("");
  const result = rot13(input);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ROT13 Cipher</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{result}</div>
    </div>
  );
}
