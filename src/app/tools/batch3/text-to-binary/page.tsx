"use client";
import React, { useState } from "react";

function textToBinary(text: string): string {
  return text.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
}

export default function TextToBinary() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    setResult(textToBinary(input));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Text to Binary Converter</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter text"
      />
      <button className="btn btn-primary" onClick={convert}>Convert</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
