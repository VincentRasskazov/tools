"use client";
import React, { useState } from "react";


const units = ["seconds", "minutes", "hours", "days", "weeks"];
const factors: Record<string, number> = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
};

export default function TimeConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("seconds");
  const [to, setTo] = useState("minutes");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const seconds = parseFloat(value) * factors[from];
    const converted = seconds / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Time Converter</h1>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="border rounded px-2 py-1 w-24"
          placeholder="Value"
        />
        <div className="flex gap-2">
          <select value={from} onChange={e => setFrom(e.target.value)} className="border rounded px-2 py-1">
            {units.map(u => <option key={u}>{u}</option>)}
          </select>
          <span>to</span>
          <select value={to} onChange={e => setTo(e.target.value)} className="border rounded px-2 py-1">
            {units.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={convert}>Convert</button>
        {result && <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">Result: {result} {to}</div>}
      </div>
    </div>
  );
}
