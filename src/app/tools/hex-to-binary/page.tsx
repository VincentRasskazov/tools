"use client";
import React, { useState } from "react";

function hexToBinary(hex: string) {
  if (!/^([0-9A-Fa-f]{2})+$/.test(hex.replace(/\s+/g, ""))) return "Invalid hex input";
  return hex.replace(/\s+/g, "").match(/.{1,2}/g)?.map(h => ("00000000" + parseInt(h, 16).toString(2)).slice(-8)).join(" ") || "";
}

export default function HexToBinary() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Hex to Binary Converter</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Enter hex (e.g. 4F 2A)"
        />
        <button className="btn btn-primary" onClick={() => setResult(hexToBinary(input))}>Convert</button>
        {result && <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">{result}</div>}
      </div>
    </div>
  );
}
