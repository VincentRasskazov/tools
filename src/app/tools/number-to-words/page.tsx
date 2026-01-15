"use client";
import React, { useState } from "react";

function toWords(num: number) {
  if (isNaN(num) || num < 0 || num > 999999) return "";
  const a = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  if (num === 0) return "zero";
  if (num < 20) return a[num];
  if (num < 100) return b[Math.floor(num / 10)] + (num % 10 ? "-" + a[num % 10] : "");
  if (num < 1000) return a[Math.floor(num / 100)] + " hundred" + (num % 100 ? " and " + toWords(num % 100) : "");
  if (num < 1000000) return toWords(Math.floor(num / 1000)) + " thousand" + (num % 1000 ? " " + toWords(num % 1000) : "");
  return "";
}

export default function NumberToWords() {
  const [input, setInput] = useState("");
  const words = toWords(Number(input));
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Number to Words</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter number (0-999999)..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{words}</div>
    </div>
  );
}
