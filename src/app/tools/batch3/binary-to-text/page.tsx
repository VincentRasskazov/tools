"use client";
import React, { useState } from "react";

function binaryToText(binary: string): string {
  return binary.split(" ").map(b => String.fromCharCode(parseInt(b, 2))).join("");
}

export default function BinaryToText() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    try {
      setResult(binaryToText(input));
    } catch {
      setResult("Invalid binary input");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Binary to Text Converter</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter binary (e.g. 01001000 01101001)"
      />
      <button className="btn btn-primary" onClick={convert}>Convert</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
