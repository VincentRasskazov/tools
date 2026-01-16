"use client";
import React, { useState } from "react";

export default function PalindromeChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const checkPalindrome = () => {
    const clean = input.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    setResult(clean === clean.split("").reverse().join("") ? "Palindrome" : "Not a palindrome");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Palindrome Checker</h1>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border rounded px-2 py-1 w-full mb-4"
        placeholder="Enter text"
      />
      <button className="btn btn-primary" onClick={checkPalindrome}>Check</button>
      {result && (
        <div className={`mt-4 text-lg font-semibold px-4 py-2 rounded shadow ${result === "Palindrome" ? "bg-green-100 text-green-900" : "bg-red-100 text-red-900"}`}>{result}</div>
      )}
    </div>
  );
}
