import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["grams", "kilograms", "pounds", "ounces", "stones"];
const factors: Record<string, number> = {
  grams: 1,
  kilograms: 1000,
  pounds: 453.592,
  ounces: 28.3495,
  stones: 6350.29,
};

export default function WeightConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("grams");
  const [to, setTo] = useState("kilograms");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const grams = parseFloat(value) * factors[from];
    const converted = grams / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Weight Converter" desc="Convert between different weight units.">
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
