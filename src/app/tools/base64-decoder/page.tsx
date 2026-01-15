"use client";
import { useState } from "react";

export default function Base64Decoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function decode() {
    try {
      setOutput(atob(input));
    } catch {
      setOutput("Invalid base64");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 drop-shadow">Base64 Decoder</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter base64 to decode" className="w-80 h-24 p-2 border rounded-lg" />
        <button onClick={decode} className="px-6 py-2 rounded-lg bg-pink-400 text-white font-semibold shadow hover:bg-pink-500">Decode</button>
        {output && <textarea className="mt-4 w-80 h-24 p-2 border rounded-lg" value={output} readOnly />}
      </div>
    </div>
  );
}
