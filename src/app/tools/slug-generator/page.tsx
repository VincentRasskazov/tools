"use client";
import React, { useState } from "react";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const slug = input.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Slug Generator</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{slug}</div>
    </div>
  );
}
