"use client";
import React, { useState } from "react";

// Simple MD5 implementation (for demo, not cryptographically secure)
import md5 from "blueimp-md5";

export default function MD5HashGenerator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleHash = () => {
    setResult(md5(input));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">MD5 Hash Generator</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter text"
      />
      <button className="btn btn-primary" onClick={handleHash}>Generate</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
