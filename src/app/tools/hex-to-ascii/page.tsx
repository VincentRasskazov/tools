"use client";
import React, { useState } from "react";

function hexToAscii(hex: string) {
  if (!/^([0-9A-Fa-f]{2})+$/.test(hex.replace(/\s+/g, ""))) return "Invalid hex input";
  return hex.replace(/\s+/g, "").match(/.{1,2}/g)?.map(h => String.fromCharCode(parseInt(h, 16))).join("") || "";
}

export default function HexToAscii() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Hex to ASCII Converter</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Enter hex (e.g. 48 65 6C 6C 6F)"
        />
        <button className="btn btn-primary" onClick={() => setResult(hexToAscii(input))}>Convert</button>
        {result && <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">{result}</div>}
      </div>
    </div>
  );
}
