"use client";
import { useState } from "react";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<string | null>(null);

  function calculate() {
    if (!dob) return setAge(null);
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return setAge("Invalid date");
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) years--;
    setAge(`${years} year${years !== 1 ? "s" : ""}`);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100">
      <h1 className="text-3xl font-bold mb-8 text-yellow-900 drop-shadow">Age Calculator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-8 flex flex-col gap-6 items-center">
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="px-3 py-2 rounded-lg border border-zinc-300 text-lg shadow" />
        <button onClick={calculate} className="px-6 py-2 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500">Calculate</button>
        {age && <div className="mt-4 text-xl font-semibold text-yellow-700">{age}</div>}
      </div>
    </div>
  );
}
