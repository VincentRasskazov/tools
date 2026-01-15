"use client";
import { useState } from "react";

function generateQRUrl(text: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
}

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");

  const handleGenerate = () => {
    setUrl(generateQRUrl(text));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-yellow-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 drop-shadow">QR Code Generator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text or URL"
          className="w-64 px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow"
        />
        <button onClick={handleGenerate} className="px-6 py-2 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-500">Generate</button>
        {url && <img src={url} alt="QR Code" className="mt-4 rounded-lg border border-zinc-200 shadow" />}
      </div>
    </div>
  );
}
