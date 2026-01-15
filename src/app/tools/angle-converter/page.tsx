import ToolPageLayout from "../../ToolPageLayout";
import React, { useState } from "react";

const units = ["degrees", "radians", "gradians"];
const factors: Record<string, number> = {
  degrees: 1,
  radians: 57.2958,
  gradians: 0.9,
};

export default function AngleConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("degrees");
  const [to, setTo] = useState("radians");
  const [result, setResult] = useState("");

  const convert = () => {
    if (!value) return setResult("");
    const degrees = parseFloat(value) * factors[from];
    const converted = degrees / factors[to];
    setResult(converted.toFixed(4));
  };

  return (
    <ToolPageLayout title="Angle Converter" desc="Convert between degrees, radians, and gradians.">
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
