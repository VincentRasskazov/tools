"use client";
import { useState } from "react";

function generateUUID() {
  // RFC4122 version 4 compliant
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState("");

  function handleGenerate() {
    setUuid(generateUUID());
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-purple-900 drop-shadow">UUID Generator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <button onClick={handleGenerate} className="px-6 py-2 rounded-lg bg-purple-400 text-white font-semibold shadow hover:bg-purple-500">Generate UUID</button>
        {uuid && <input className="mt-4 w-80 p-2 border rounded-lg text-center" value={uuid} readOnly />}
      </div>
    </div>
  );
}
