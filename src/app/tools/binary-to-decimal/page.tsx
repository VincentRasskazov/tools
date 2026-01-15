"use client";
import React, { useState } from "react";

export default function BinaryToDecimal() {
  const [input, setInput] = useState("");
  let result = "";
  try {
    result = parseInt(input, 2).toString();
  } catch {
    result = "Invalid binary";
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Binary to Decimal</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter binary..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{input && result}</div>
    </div>
  );
}
