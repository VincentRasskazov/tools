"use client";
import { useState } from "react";

export default function DateDifference() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [result, setResult] = useState<string | null>(null);

  function calculate() {
    if (!start || !end) return setResult(null);
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return setResult("Invalid date");
    const diff = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setResult(`${days} day${days !== 1 ? "s" : ""}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-green-900 drop-shadow">Date Difference Calculator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <input type="date" value={start} onChange={e => setStart(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
        <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
        <button onClick={calculate} className="px-6 py-2 rounded-lg bg-green-400 text-white font-semibold shadow hover:bg-green-500">Calculate</button>
        {result && <div className="mt-4 text-xl font-semibold text-green-700">{result}</div>}
      </div>
    </div>
  );
}
