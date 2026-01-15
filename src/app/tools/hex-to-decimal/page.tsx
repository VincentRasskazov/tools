"use client";
import React, { useState } from "react";

export default function HexToDecimal() {
  const [input, setInput] = useState("");
  let result = "";
  try {
    result = parseInt(input, 16).toString();
  } catch {
    result = "Invalid hex";
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hex to Decimal</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter hex..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{input && result}</div>
    </div>
  );
}
