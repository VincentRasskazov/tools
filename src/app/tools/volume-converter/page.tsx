import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["liters", "milliliters", "cubic meters", "gallons", "quarts", "pints", "cups", "fluid ounces"];
const factors: Record<string, number> = {
  liters: 1,
  milliliters: 0.001,
  "cubic meters": 1000,
  gallons: 3.78541,
  quarts: 0.946353,
  pints: 0.473176,
  cups: 0.24,
  "fluid ounces": 0.0295735,
};

export default function VolumeConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("liters");
  const [to, setTo] = useState("milliliters");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const liters = parseFloat(value) * factors[from];
    const converted = liters / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Volume Converter" desc="Convert between different volume units.">
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
