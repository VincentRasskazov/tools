"use client";
import React, { useState } from "react";

function isAnagram(a: string, b: string): boolean {
  const clean = (s: string) => s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().split("").sort().join("");
  return clean(a) === clean(b);
}

export default function AnagramSolver() {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const check = () => {
    setResult(isAnagram(first, second) ? "Anagrams" : "Not anagrams");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Anagram Solver</h1>
      <input
        type="text"
        value={first}
        onChange={e => setFirst(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="First word/phrase"
      />
      <input
        type="text"
        value={second}
        onChange={e => setSecond(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Second word/phrase"
      />
      <button className="btn btn-primary" onClick={check}>Check</button>
      {result && (
        <div className={`mt-4 text-lg font-semibold px-4 py-2 rounded shadow ${result === "Anagrams" ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>{result}</div>
      )}
    </div>
  );
}
