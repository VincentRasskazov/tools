"use client";
import { useState } from "react";

export default function BMICalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [bmi, setBmi] = useState<number|null>(null);

  const calculate = () => {
    if (height > 0) {
      const h = height / 100;
      setBmi(Number((weight / (h * h)).toFixed(2)));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-green-900 drop-shadow">BMI Calculator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6">
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Weight (kg):</label>
          <input type="number" min={1} value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg text-center shadow" />
        </div>
        <div className="flex gap-4 items-center">
          <label className="font-semibold">Height (cm):</label>
          <input type="number" min={1} value={height} onChange={e => setHeight(Number(e.target.value))} className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg text-center shadow" />
        </div>
        <button onClick={calculate} className="px-6 py-2 rounded-lg bg-green-400 text-white font-semibold shadow hover:bg-green-500">Calculate</button>
        {bmi !== null && <div className="text-xl font-mono text-pink-700">BMI: {bmi}</div>}
      </div>
    </div>
  );
}
