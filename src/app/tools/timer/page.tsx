"use client";
import { useState, useRef } from "react";

export default function Timer() {
  const [input, setInput] = useState(60);
  const [time, setTime] = useState(60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (!running && time > 0) {
      setRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
  };
  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const reset = () => {
    setTime(input);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const setNewTime = (v: number) => {
    setInput(v);
    setTime(v);
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-200 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-purple-900 drop-shadow">Timer</h1>
      <div className="text-6xl font-mono mb-8 bg-white px-10 py-6 rounded-2xl shadow-lg border border-zinc-200">
        {format(time)}
      </div>
      <div className="flex gap-4 mb-6">
        <input
          type="number"
          min={1}
          max={3600}
          value={input}
          onChange={(e) => setNewTime(Number(e.target.value))}
          className="w-24 px-3 py-2 rounded-lg border border-zinc-300 text-lg text-center shadow"
          disabled={running}
        />
        <span className="self-center text-zinc-600">seconds</span>
      </div>
      <div className="flex gap-4">
        <button onClick={start} disabled={running || time === 0} className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 disabled:opacity-50">Start</button>
        <button onClick={stop} disabled={!running} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 disabled:opacity-50">Stop</button>
        <button onClick={reset} className="px-6 py-2 rounded-lg bg-gray-300 text-zinc-800 font-semibold shadow hover:bg-gray-400">Reset</button>
      </div>
    </div>
  );
}
