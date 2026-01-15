"use client";
import React, { useState } from "react";

const units = [
  { name: "Joules", value: 1 },
  { name: "Kilojoules", value: 1000 },
  { name: "Calories", value: 4.184 },
  { name: "Kilocalories", value: 4184 },
  { name: "Watt-hours", value: 3600 },
  { name: "Kilowatt-hours", value: 3600000 },
];

export default function EnergyConverter() {
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState(units[0].name);
  const [to, setTo] = useState(units[1].name);
  const convert = (value: number, from: string, to: string) => {
    const fromUnit = units.find(u => u.name === from)?.value || 1;
    const toUnit = units.find(u => u.name === to)?.value || 1;
    return value * fromUnit / toUnit;
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Energy Converter</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          value={input}
          onChange={e => setInput(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
        <select value={from} onChange={e => setFrom(e.target.value)} className="border rounded px-2 py-1">
          {units.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
        </select>
        <span className="mx-2">to</span>
        <select value={to} onChange={e => setTo(e.target.value)} className="border rounded px-2 py-1">
          {units.map(u => <option key={u.name} value={u.name}>{u.name}</option>)}
        </select>
      </div>
      <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">
        Result: {convert(input, from, to).toFixed(4)} {to}
      </div>
    </div>
  );
}
