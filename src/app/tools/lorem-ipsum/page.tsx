"use client";
import { useState } from "react";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc ut laoreet dictum, massa sapien hendrerit enim, euismod tincidunt nunc nulla euismod nunc.";

export default function LoremIpsum() {
  const [paras, setParas] = useState(1);
  const [text, setText] = useState("");

  function generate() {
    setText(Array.from({ length: paras }, () => LOREM).join("\n\n"));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <h1 className="text-3xl font-bold mb-8 text-pink-900 drop-shadow">Lorem Ipsum Generator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <input type="number" min={1} max={10} value={paras} onChange={e => setParas(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
        <button onClick={generate} className="px-6 py-2 rounded-lg bg-pink-400 text-white font-semibold shadow hover:bg-pink-500">Generate</button>
        {text && <textarea className="mt-4 w-80 h-40 p-2 border rounded-lg" value={text} readOnly />}
      </div>
    </div>
  );
}
