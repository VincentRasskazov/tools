"use client";
import React, { useState } from "react";

function fibonacci(n: number): number[] {
  if (n < 1) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2]);
  return seq;
}

export default function FibonacciSequence() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");

  const handleClick = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 1 || n > 100) {
      setError("Enter an integer from 1 to 100");
      setResult([]);
      return;
    }
    setError("");
    setResult(fibonacci(n));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Fibonacci Sequence Generator</h1>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-32"
          placeholder="Length (1-100)"
        />
        <button className="btn btn-primary" onClick={handleClick}>Generate</button>
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
        {result.length > 0 && (
          <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow overflow-x-auto">
            {result.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}
