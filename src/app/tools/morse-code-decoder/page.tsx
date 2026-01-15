"use client";
import React, { useState } from "react";

const morseMap: Record<string, string> = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..", 0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-", 5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----." };
const reverseMorse = Object.fromEntries(Object.entries(morseMap).map(([k, v]) => [v, k]));

function decodeMorse(str: string) {
  return str.split(" ").map(c => reverseMorse[c] || c).join("");
}

export default function MorseCodeDecoder() {
  const [input, setInput] = useState("");
  const result = decodeMorse(input);
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Morse Code Decoder</h1>
      <input className="w-full border p-2 rounded mb-2" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter morse code..." />
      <div className="bg-gray-100 p-2 rounded text-xs break-all">{result}</div>
    </div>
  );
}
