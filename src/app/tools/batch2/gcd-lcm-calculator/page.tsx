"use client";
import React, { useState } from "react";

function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return Math.abs(a);
}
function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

export default function GcdLcmCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<{gcd: number, lcm: number} | null>(null);
  const [error, setError] = useState("");

  const handleClick = () => {
    const n1 = parseInt(a);
    const n2 = parseInt(b);
    if (isNaN(n1) || isNaN(n2) || n1 === 0 || n2 === 0) {
      setError("Enter two nonzero integers");
      setResult(null);
      return;
    }
    setError("");
    setResult({ gcd: gcd(n1, n2), lcm: lcm(n1, n2) });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">GCD & LCM Calculator</h1>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={a}
          onChange={e => setA(e.target.value)}
          className="border rounded px-2 py-1 w-32"
          placeholder="First integer"
        />
        <input
          type="number"
          value={b}
          onChange={e => setB(e.target.value)}
          className="border rounded px-2 py-1 w-32"
          placeholder="Second integer"
        />
        <button className="btn btn-primary" onClick={handleClick}>Calculate</button>
        {error && <div className="text-red-600 font-semibold mt-2">{error}</div>}
        {result && (
          <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">
            GCD: {result.gcd} <br /> LCM: {result.lcm}
          </div>
        )}
      </div>
    </div>
  );
}
