"use client";
import React, { useState } from "react";

export default function HtmlEntityEncoder() {
  const [input, setInput] = useState("");
  const encode = (str: string) => str.replace(/./g, c => `&#${c.charCodeAt(0)};`);
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">HTML Entity Encoder</h1>
      <textarea className="w-full h-32 border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{encode(input)}</div>
    </div>
  );
}
