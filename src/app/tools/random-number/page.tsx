"use client";
import { useState } from "react";

export default function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);

  function generate() {
    if (min > max) return setResult(null);
    setResult(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 drop-shadow">Random Number Generator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <div className="flex gap-2">
          <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
          <span className="text-lg">to</span>
          <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
        </div>
        <button onClick={generate} className="px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-500">Generate</button>
        {result !== null && <div className="mt-4 text-2xl font-semibold text-blue-700">{result}</div>}
      </div>
    </div>
  );
}
