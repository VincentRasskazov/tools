"use client";
import React, { useState } from "react";

export default function DecimalToBinary() {
  const [input, setInput] = useState("");
  let result = "";
  try {
    result = (parseInt(input, 10) >>> 0).toString(2);
  } catch {
    result = "Invalid decimal";
  }
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Decimal to Binary</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter decimal..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{input && result}</div>
    </div>
  );
}
