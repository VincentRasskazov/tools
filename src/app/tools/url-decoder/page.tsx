"use client";
import React, { useState } from "react";

export default function UrlDecoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">URL Decoder</h1>
      <textarea
        className="border p-2 rounded w-full h-32 mb-2"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter encoded URL text..."
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4" onClick={() => setOutput(decodeURIComponent(input))}>
        Decode
      </button>
      {output && <div className="bg-gray-100 p-2 rounded text-center break-all">{output}</div>}
    </div>
  );
}
