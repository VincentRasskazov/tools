"use client";
import React, { useState } from "react";

// Simple Base32 encoding (RFC 4648, no padding)
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Encode(input: string): string {
  let bits = "";
  for (let i = 0; i < input.length; i++) {
    bits += input.charCodeAt(i).toString(2).padStart(8, "0");
  }
  let output = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.substr(i, 5);
    if (chunk.length < 5) output += alphabet[parseInt(chunk.padEnd(5, "0"), 2)];
    else output += alphabet[parseInt(chunk, 2)];
  }
  return output;
}

export default function Base32Encoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const encode = () => {
    setResult(base32Encode(input));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Base32 Encoder</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter text"
      />
      <button className="btn btn-primary" onClick={encode}>Encode</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
