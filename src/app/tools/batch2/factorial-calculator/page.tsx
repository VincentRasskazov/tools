"use client";
import React, { useState } from "react";

function factorial(n: number): number {
  if (n < 0) return NaN;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}

export default function FactorialCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleClick = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 0 || n > 170) {
      setError("Enter an integer 0-170");
      setResult(null);
      return;
    }
    setError("");
    setResult(factorial(n).toLocaleString());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Factorial Calculator</h1>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-32"
          placeholder="Enter integer 0-170"
        />
        <button className="btn btn-primary" onClick={handleClick}>Calculate</button>
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
        {result && (
          <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
