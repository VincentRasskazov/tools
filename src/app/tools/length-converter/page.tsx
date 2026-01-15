import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["meters", "kilometers", "miles", "feet", "inches", "centimeters"];
const factors: Record<string, number> = {
  meters: 1,
  kilometers: 1000,
  miles: 1609.34,
  feet: 0.3048,
  inches: 0.0254,
  centimeters: 0.01,
};

export default function LengthConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("meters");
  const [to, setTo] = useState("kilometers");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const meters = parseFloat(value) * factors[from];
    const converted = meters / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Length Converter" desc="Convert between different length units.">
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
