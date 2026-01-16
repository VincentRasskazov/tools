"use client";
import React, { useState } from "react";

function binaryToHex(binary: string) {
  const parts = binary.trim().split(/\s+/);
  if (parts.some(p => !/^([01]{8})$/.test(p))) return "Invalid binary input";
  return parts.map(p => ("0" + parseInt(p, 2).toString(16).toUpperCase()).slice(-2)).join(" ");
}

export default function BinaryToHex() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Binary to Hex Converter</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Enter binary (e.g. 01001111 00101010)"
        />
        <button className="btn btn-primary" onClick={() => setResult(binaryToHex(input))}>Convert</button>
        {result && <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">{result}</div>}
      </div>
    </div>
  );
}
