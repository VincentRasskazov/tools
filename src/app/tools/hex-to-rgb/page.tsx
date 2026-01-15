import React, { useState } from "react";

export default function HexToRgb() {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");

  const convert = () => {
    let h = hex.replace(/^#/, "");
    if (h.length === 3) h = h.split("").map(x => x + x).join("");
    if (h.length !== 6) return setRgb("Invalid hex");
    const n = parseInt(h, 16);
    setRgb(`rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Hex to RGB Converter</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="#RRGGBB"
        value={hex}
        onChange={e => setHex(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4" onClick={convert}>
        Convert
      </button>
      {rgb && <div className="bg-gray-100 p-2 rounded text-center">{rgb}</div>}
    </div>
  );
}
