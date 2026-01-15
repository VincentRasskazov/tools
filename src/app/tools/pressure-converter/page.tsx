import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["pascals", "bar", "atmospheres", "psi", "mmHg"];
const factors: Record<string, number> = {
  pascals: 1,
  bar: 100000,
  atmospheres: 101325,
  psi: 6894.76,
  mmHg: 133.322,
};

export default function PressureConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("pascals");
  const [to, setTo] = useState("bar");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const pascals = parseFloat(value) * factors[from];
    const converted = pascals / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Pressure Converter" desc="Convert between different pressure units.">
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
