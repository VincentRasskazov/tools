"use client";
import React, { useState } from "react";

const morseMap: Record<string, string> = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..", 0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----." };

function encodeMorse(str: string) {
  return str.toLowerCase().split("").map(c => morseMap[c] || c).join(" ");
}

export default function MorseCodeEncoder() {
  const [input, setInput] = useState("");
  const result = encodeMorse(input);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Morse Code Encoder</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{result}</div>
    </div>
  );
}
