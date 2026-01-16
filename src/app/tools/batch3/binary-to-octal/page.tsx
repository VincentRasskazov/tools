"use client";
import React, { useState } from "react";

function binaryToOctal(binary: string): string {
  try {
    const dec = parseInt(binary, 2);
    if (isNaN(dec)) return "Invalid binary input";
    return dec.toString(8);
  } catch {
    return "Invalid binary input";
  }
}

export default function BinaryToOctal() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    setResult(binaryToOctal(input.trim()));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Binary to Octal Converter</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter binary (e.g. 101011)"
      />
      <button className="btn btn-primary" onClick={convert}>Convert</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
