import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["m/s", "km/h", "mph", "ft/s", "knots"];
const factors: Record<string, number> = {
  "m/s": 1,
  "km/h": 0.277778,
  "mph": 0.44704,
  "ft/s": 0.3048,
  "knots": 0.514444,
};

export default function SpeedConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m/s");
  const [to, setTo] = useState("km/h");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const ms = parseFloat(value) * factors[from];
    const converted = ms / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Speed Converter" desc="Convert between different speed units.">
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
