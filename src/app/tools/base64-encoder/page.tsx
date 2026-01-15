"use client";
import { useState } from "react";

export default function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function encode() {
    try {
      setOutput(btoa(input));
    } catch {
      setOutput("Invalid input");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-indigo-900 drop-shadow">Base64 Encoder</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to encode" className="w-80 h-24 p-2 border rounded-lg" />
        <button onClick={encode} className="px-6 py-2 rounded-lg bg-indigo-400 text-white font-semibold shadow hover:bg-indigo-500">Encode</button>
        {output && <textarea className="mt-4 w-80 h-24 p-2 border rounded-lg" value={output} readOnly />}
      </div>
    </div>
  );
}
