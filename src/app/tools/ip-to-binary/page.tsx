"use client";
import React, { useState } from "react";

export default function IpToBinary() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState("");

  function convert(ip: string) {
    const parts = ip.split(".");
    if (parts.length !== 4 || parts.some(p => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
      setResult("Invalid IP address");
      return;
    }
    setResult(parts.map(p => ("00000000" + Number(p).toString(2)).slice(-8)).join("."));
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">IP to Binary Converter</h1>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={ip}
          onChange={e => setIp(e.target.value)}
          className="border rounded px-2 py-1 w-48"
          placeholder="Enter IPv4 address"
        />
        <button className="btn btn-primary" onClick={() => convert(ip)}>Convert</button>
        {result && <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">{result}</div>}
      </div>
    </div>
  );
}
