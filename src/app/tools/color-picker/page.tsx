"use client";
import { useState } from "react";

export default function ColorPicker() {
  const [color, setColor] = useState("#3498db");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-purple-900 drop-shadow">Color Picker</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          className="w-32 h-32 rounded-lg border-4 border-zinc-200 shadow"
        />
        <div className="text-xl font-mono text-pink-700">{color}</div>
        <div className="w-32 h-8 rounded-lg" style={{ background: color }} />
      </div>
    </div>
  );
}
