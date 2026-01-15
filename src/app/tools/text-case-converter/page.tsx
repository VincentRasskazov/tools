"use client";
import { useState } from "react";

export default function TextCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function toUpper() {
    setOutput(input.toUpperCase());
  }
  function toLower() {
    setOutput(input.toLowerCase());
  }
  function toTitle() {
    setOutput(input.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-yellow-100">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 drop-shadow">Text Case Converter</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text" className="w-80 h-24 p-2 border rounded-lg" />
        <div className="flex gap-2">
          <button onClick={toUpper} className="px-4 py-2 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500">UPPERCASE</button>
          <button onClick={toLower} className="px-4 py-2 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500">lowercase</button>
          <button onClick={toTitle} className="px-4 py-2 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500">Title Case</button>
        </div>
        {output && <textarea className="mt-4 w-80 h-24 p-2 border rounded-lg" value={output} readOnly />}
      </div>
    </div>
  );
}
