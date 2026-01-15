import ToolPageLayout from "../../ToolPageLayout";
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
    <ToolPageLayout title="Time Converter" desc="Convert between different time units.">
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="input input-bordered"
          placeholder="Value"
        />
        <div className="flex gap-2">
          <select value={from} onChange={e => setFrom(e.target.value)} className="select select-bordered">
            {units.map(u => <option key={u}>{u}</option>)}
          </select>
          <span>to</span>
          <select value={to} onChange={e => setTo(e.target.value)} className="select select-bordered">
            {units.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <button className="btn btn-primary" onClick={convert}>Convert</button>
        {result && <div className="alert alert-info">Result: {result} {to}</div>}
      </div>
    </ToolPageLayout>
  );
}
