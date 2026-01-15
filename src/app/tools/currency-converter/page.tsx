"use client";
import { useState } from "react";

const currencies = [
  { label: "USD", value: "USD", rate: 1 },
  { label: "EUR", value: "EUR", rate: 0.92 },
  { label: "GBP", value: "GBP", rate: 0.8 },
  { label: "JPY", value: "JPY", rate: 145 },
  { label: "INR", value: "INR", rate: 83 },
];

export default function CurrencyConverter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(0);

  const convert = () => {
    const fromCur = currencies.find((c) => c.value === from)!;
    const toCur = currencies.find((c) => c.value === to)!;
    setResult((Number(value) / fromCur.rate) * toCur.rate);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 drop-shadow">Currency Converter</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg text-center shadow"
          />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow">
            {currencies.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <span className="text-2xl">→</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow">
            {currencies.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <button onClick={convert} className="px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-500">Convert</button>
        <div className="text-xl font-mono text-green-700">Result: {result.toFixed(2)}</div>
      </div>
    </div>
  );
}
