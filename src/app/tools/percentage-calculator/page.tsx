import React, { useState } from "react";

export default function PercentageCalculator() {
  const [base, setBase] = useState("");
  const [percent, setPercent] = useState("");
  const value = base && percent ? (Number(base) * Number(percent)) / 100 : "";
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Percentage Calculator</h1>
      <div className="flex gap-2 mb-2">
        <input
          className="border p-2 rounded w-1/2"
          placeholder="Base value"
          value={base}
          onChange={e => setBase(e.target.value.replace(/[^\d.]/g, ""))}
        />
        <input
          className="border p-2 rounded w-1/2"
          placeholder="Percent (%)"
          value={percent}
          onChange={e => setPercent(e.target.value.replace(/[^\d.]/g, ""))}
        />
      </div>
      {value !== "" && (
        <div className="mt-2">Result: <span className="font-mono">{value}</span></div>
      )}
    </div>
  );
}
