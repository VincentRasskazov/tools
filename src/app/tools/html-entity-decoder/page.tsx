"use client";
import React, { useState } from "react";

export default function HtmlEntityDecoder() {
  const [input, setInput] = useState("");
  const decode = (str: string) => str.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HTML Entity Decoder</h1>
      <textarea className="w-full h-32 border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter HTML entities..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{decode(input)}</div>
    </div>
  );
}
