"use client";
import React, { useState } from "react";

function leet(str: string) {
  const map: Record<string, string> = {a: "4", e: "3", i: "1", o: "0", s: "5", t: "7"};
  return str.replace(/[aeiost]/gi, c => map[c.toLowerCase()] || c);
}

export default function LeetSpeakConverter() {
  const [input, setInput] = useState("");
  const result = leet(input);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leet Speak Converter</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{result}</div>
    </div>
  );
}
