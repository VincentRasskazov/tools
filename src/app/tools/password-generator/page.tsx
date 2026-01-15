"use client";
import { useState } from "react";

const charset = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(12);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNumber, setUseNumber] = useState(true);
  const [useSymbol, setUseSymbol] = useState(false);
  const [password, setPassword] = useState("");

  const generate = () => {
    let chars = "";
    if (useLower) chars += charset.lower;
    if (useUpper) chars += charset.upper;
    if (useNumber) chars += charset.number;
    if (useSymbol) chars += charset.symbol;
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-pink-900 drop-shadow">Password Generator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Length:</label>
          <input type="number" min={4} max={32} value={length} onChange={e => setLength(Number(e.target.value))} className="w-20 px-3 py-2 rounded-lg border border-zinc-300 text-lg text-center shadow" />
        </div>
        <div className="flex gap-4 flex-wrap">
          <label><input type="checkbox" checked={useLower} onChange={e => setUseLower(e.target.checked)} /> Lowercase</label>
          <label><input type="checkbox" checked={useUpper} onChange={e => setUseUpper(e.target.checked)} /> Uppercase</label>
          <label><input type="checkbox" checked={useNumber} onChange={e => setUseNumber(e.target.checked)} /> Numbers</label>
          <label><input type="checkbox" checked={useSymbol} onChange={e => setUseSymbol(e.target.checked)} /> Symbols</label>
        </div>
        <button onClick={generate} className="px-6 py-2 rounded-lg bg-pink-400 text-white font-semibold shadow hover:bg-pink-500">Generate</button>
        <div className="text-xl font-mono text-blue-700 break-all select-all bg-zinc-100 rounded-lg px-4 py-2">{password}</div>
      </div>
    </div>
  );
}
