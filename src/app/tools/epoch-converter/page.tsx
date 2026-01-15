"use client";
import React, { useState } from "react";

export default function EpochConverter() {
  const [epoch, setEpoch] = useState("");
  const [date, setDate] = useState("");

  const convert = () => {
    const n = Number(epoch);
    if (isNaN(n)) return setDate("Invalid epoch");
    setDate(new Date(n * 1000).toLocaleString());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Epoch Converter</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Epoch seconds"
        value={epoch}
        onChange={e => setEpoch(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4" onClick={convert}>
        Convert
      </button>
      {date && <div className="bg-gray-100 p-2 rounded text-center">{date}</div>}
    </div>
  );
}
