"use client";
import { useRef, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => setTime((t) => t + 10), 10);
    }
  };
  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const reset = () => {
    setTime(0);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const format = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}.${String(Math.floor((ms % 1000) / 10)).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-100">
      <h1 className="text-3xl font-bold mb-8 text-blue-900 drop-shadow">Stopwatch</h1>
      <div className="text-6xl font-mono mb-8 bg-white px-10 py-6 rounded-2xl shadow-lg border border-zinc-200">
        {format(time)}
      </div>
      <div className="flex gap-4">
        <button onClick={start} disabled={running} className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-50">Start</button>
        <button onClick={stop} disabled={!running} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 disabled:opacity-50">Stop</button>
        <button onClick={reset} className="px-6 py-2 rounded-lg bg-gray-300 text-zinc-800 font-semibold shadow hover:bg-gray-400">Reset</button>
      </div>
    </div>
  );
}
