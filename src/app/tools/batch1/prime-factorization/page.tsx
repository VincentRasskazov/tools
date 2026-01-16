"use client";
import React, { useState } from "react";

function factorize(n: number): number[] {
  const result: number[] = [];
  let d = 2;
  while (n > 1) {
    while (n % d === 0) {
      result.push(d);
      n /= d;
    }
    d++;
    if (d * d > n && n > 1) {
      result.push(n);
      break;
    }
  }
  return result;
}

export default function PrimeFactorization() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number[]>([]);
  const [error, setError] = useState("");

  const handleClick = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 2) {
      setError("Enter an integer ≥ 2");
      setResult([]);
      return;
    }
    setError("");
    setResult(factorize(n));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Prime Factorization</h1>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-32"
          placeholder="Enter integer ≥ 2"
        />
        <button className="btn btn-primary" onClick={handleClick}>Factorize</button>
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
        {result.length > 0 && (
          <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">
            Factors: {result.join(" × ")}
          </div>
        )}
      </div>
    </div>
  );
}
