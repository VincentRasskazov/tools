"use client";
import React, { useState } from "react";

export default function TextReverser() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const reverse = () => {
    setResult(input.split("").reverse().join(""));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Text Reverser</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter text"
      />
      <button className="btn btn-primary" onClick={reverse}>Reverse</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow">{result}</div>
      )}
    </div>
  );
}
