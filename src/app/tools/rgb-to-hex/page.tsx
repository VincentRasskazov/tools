import React, { useState } from "react";

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

export default function RgbToHex() {
  const [r, setR] = useState("");
  const [g, setG] = useState("");
  const [b, setB] = useState("");
  const [hex, setHex] = useState("");

  const convert = () => {
    const rn = Number(r), gn = Number(g), bn = Number(b);
    if ([rn, gn, bn].some(x => isNaN(x) || x < 0 || x > 255)) {
      setHex("Invalid RGB");
      return;
    }
    setHex(rgbToHex(rn, gn, bn));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">RGB to Hex Converter</h1>
      <div className="flex gap-2 mb-2">
        <input className="border p-2 rounded w-full" placeholder="R" value={r} onChange={e => setR(e.target.value)} />
        <input className="border p-2 rounded w-full" placeholder="G" value={g} onChange={e => setG(e.target.value)} />
        <input className="border p-2 rounded w-full" placeholder="B" value={b} onChange={e => setB(e.target.value)} />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4" onClick={convert}>
        Convert
      </button>
      {hex && <div className="bg-gray-100 p-2 rounded text-center">{hex}</div>}
    </div>
  );
}
