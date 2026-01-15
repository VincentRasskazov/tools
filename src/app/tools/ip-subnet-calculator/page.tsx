"use client";
import React, { useState } from "react";

function calculateSubnet(ip: string, mask: string) {
  // Simple IPv4 subnet calculation
  const ipParts = ip.split('.').map(Number);
  const maskParts = mask.split('.').map(Number);
  if (ipParts.length !== 4 || maskParts.length !== 4 || ipParts.some(isNaN) || maskParts.some(isNaN)) return "Invalid input";
  const network = ipParts.map((p, i) => p & maskParts[i]).join('.');
  const broadcast = ipParts.map((p, i) => (p & maskParts[i]) | (~maskParts[i] & 255)).join('.');
  return `Network: ${network}\nBroadcast: ${broadcast}`;
}

export default function IpSubnetCalculator() {
  const [ip, setIp] = useState("");
  const [mask, setMask] = useState("");
  const [result, setResult] = useState("");
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">IP Subnet Calculator</h1>
      <input className="w-full border p-2 rounded mb-2" value={ip} onChange={e => setIp(e.target.value)} placeholder="IP address (e.g. 192.168.1.1)" />
      <input className="w-full border p-2 rounded mb-2" value={mask} onChange={e => setMask(e.target.value)} placeholder="Subnet mask (e.g. 255.255.255.0)" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded mb-2" onClick={() => setResult(calculateSubnet(ip, mask))}>Calculate</button>
      <pre className="bg-gray-100 p-2 rounded text-xs break-all">{result}</pre>
    </div>
  );
}
