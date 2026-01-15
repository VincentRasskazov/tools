"use client";
import React, { useState } from "react";



function toRoman(num: number): string {
  let n = Number(num);
  if (isNaN(n) || n < 1 || n > 3999) return "";
  const map = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
    [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let res = "";
  for (const [v, s] of map) {
    while (n >= v) { res += s; n -= v; }
  }
  return res;
}

export default function RomanNumeralConverter() {
  const [input, setInput] = useState("");
  const roman = toRoman(Number(input));
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Roman Numeral Converter</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter number (1-3999)..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{roman}</div>
    </div>
  );
}
