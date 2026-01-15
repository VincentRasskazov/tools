"use client";
import { useState } from "react";

function isPrime(n: number) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export default function PrimeChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function check() {
    const n = Number(input);
    if (!input || isNaN(n) || !Number.isInteger(n)) return setResult("Enter a valid integer");
    setResult(isPrime(n) ? `${n} is prime` : `${n} is not prime`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-yellow-100">
      <h1 className="text-3xl font-bold mb-8 text-green-900 drop-shadow">Prime Number Checker</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <input type="number" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a number" className="w-64 px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
        <button onClick={check} className="px-6 py-2 rounded-lg bg-green-400 text-white font-semibold shadow hover:bg-green-500">Check</button>
        {result && <div className="mt-4 text-xl font-semibold text-green-700">{result}</div>}
      </div>
    </div>
  );
}
