"use client";
import React, { useState } from "react";

export default function IpAddressLookup() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupIp = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Failed to fetch IP info." });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">IP Address Lookup</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter IP address"
        value={ip}
        onChange={e => setIp(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
        onClick={lookupIp}
        disabled={loading || !ip}
      >
        {loading ? "Looking up..." : "Lookup"}
      </button>
      {result && (
        <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
