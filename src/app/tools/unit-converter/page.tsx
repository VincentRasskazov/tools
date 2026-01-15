"use client";
import { useState } from "react";

const units = [
  { label: "Meters", value: "m", toBase: (v: number) => v, fromBase: (v: number) => v },
  { label: "Kilometers", value: "km", toBase: (v: number) => v * 1000, fromBase: (v: number) => v / 1000 },
  { label: "Centimeters", value: "cm", toBase: (v: number) => v / 100, fromBase: (v: number) => v * 100 },
  { label: "Miles", value: "mi", toBase: (v: number) => v * 1609.34, fromBase: (v: number) => v / 1609.34 },
  { label: "Feet", value: "ft", toBase: (v: number) => v * 0.3048, fromBase: (v: number) => v / 0.3048 },
  { label: "Inches", value: "in", toBase: (v: number) => v * 0.0254, fromBase: (v: number) => v / 0.0254 },
];

export default function UnitConverter() {
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [value, setValue] = useState(1);
  const [result, setResult] = useState(0);

  const convert = () => {
    const fromUnit = units.find((u) => u.value === from)!;
    const toUnit = units.find((u) => u.value === to)!;
    const base = fromUnit.toBase(Number(value));
    setResult(toUnit.fromBase(base));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-green-100">
      <h1 className="text-3xl font-bold mb-8 text-yellow-900 drop-shadow">Unit Converter</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg text-center shadow"
          />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow">
            {units.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
          <span className="text-2xl">→</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow">
            {units.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>
        <button onClick={convert} className="px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500">Convert</button>
        <div className="text-xl font-mono text-green-700">Result: {result}</div>
      </div>
    </div>
  );
}
