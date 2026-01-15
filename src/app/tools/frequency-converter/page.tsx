import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["hertz", "kilohertz", "megahertz", "gigahertz"];
const factors: Record<string, number> = {
  hertz: 1,
  kilohertz: 1000,
  megahertz: 1e6,
  gigahertz: 1e9,
};

export default function FrequencyConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("hertz");
  const [to, setTo] = useState("kilohertz");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const hz = parseFloat(value) * factors[from];
    const converted = hz / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Frequency Converter" desc="Convert between different frequency units.">
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
