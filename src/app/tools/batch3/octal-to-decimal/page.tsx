"use client";
import React, { useState } from "react";

function octalToDecimal(octal: string): string {
  try {
    const dec = parseInt(octal, 8);
    if (isNaN(dec)) return "Invalid octal input";
    return dec.toString(10);
  } catch {
    return "Invalid octal input";
  }
}

export default function OctalToDecimal() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    setResult(octalToDecimal(input.trim()));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Octal to Decimal Converter</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter octal (e.g. 123)"
      />
      <button className="btn btn-primary" onClick={convert}>Convert</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
