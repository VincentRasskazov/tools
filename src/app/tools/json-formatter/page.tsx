"use client";
import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  function format() {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch {
      setOutput("Invalid JSON");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 drop-shadow">JSON Formatter</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON here" className="w-80 h-32 p-2 border rounded-lg" />
        <button onClick={format} className="px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-500">Format</button>
        {output && <textarea className="mt-4 w-80 h-32 p-2 border rounded-lg" value={output} readOnly />}
      </div>
    </div>
  );
}
