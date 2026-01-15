import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["sq meters", "sq kilometers", "sq miles", "sq feet", "sq inches", "acres", "hectares"];
const factors: Record<string, number> = {
  "sq meters": 1,
  "sq kilometers": 1e6,
  "sq miles": 2.59e6,
  "sq feet": 0.092903,
  "sq inches": 0.00064516,
  "acres": 4046.86,
  "hectares": 10000,
};

export default function AreaConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("sq meters");
  const [to, setTo] = useState("sq kilometers");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const sqm = parseFloat(value) * factors[from];
    const converted = sqm / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Area Converter" desc="Convert between different area units.">
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
