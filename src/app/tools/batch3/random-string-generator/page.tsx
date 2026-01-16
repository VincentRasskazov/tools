"use client";
import React, { useState } from "react";

function randomString(length: number) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function RandomStringGenerator() {
  const [length, setLength] = useState(8);
  const [result, setResult] = useState("");

  const generate = () => {
    setResult(randomString(length));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Random String Generator</h1>
      <input
        type="number"
        value={length}
        min={1}
        max={64}
        onChange={e => setLength(Number(e.target.value))}
        className="border rounded px-2 py-1 w-24 mb-4"
        placeholder="Length"
      />
      <button className="btn btn-primary" onClick={generate}>Generate</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
