"use client";
import React, { useState } from "react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
function base32Decode(input: string): string {
  let bits = "";
  for (let i = 0; i < input.length; i++) {
    const idx = alphabet.indexOf(input[i].toUpperCase());
    if (idx === -1) continue;
    bits += idx.toString(2).padStart(5, "0");
  }
  let output = "";
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.substr(i, 8);
    if (byte.length === 8) output += String.fromCharCode(parseInt(byte, 2));
  }
  return output;
}

export default function Base32Decoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const decode = () => {
    setResult(base32Decode(input));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Base32 Decoder</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter Base32 string"
      />
      <button className="btn btn-primary" onClick={decode}>Decode</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
