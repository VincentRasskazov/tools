import { useRef, useState } from 'react';

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
}

export default function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      const startTime = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
  };

  const stop = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (running) setLaps([time, ...laps]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 drop-shadow">Stopwatch</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <span className="text-5xl font-mono font-bold mb-4 text-gray-800 tracking-widest">{formatTime(time)}</span>
        <div className="flex gap-4 mb-4">
          {!running ? (
            <button onClick={start} className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition">Start</button>
          ) : (
            <button onClick={stop} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition">Stop</button>
          )}
          <button onClick={reset} className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 transition">Reset</button>
          <button onClick={lap} disabled={!running} className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition disabled:opacity-50">Lap</button>
        </div>
        {laps.length > 0 && (
          <div className="w-full mt-4">
            <h3 className="text-lg font-bold mb-2 text-indigo-600">Laps</h3>
            <ul className="max-h-40 overflow-y-auto divide-y divide-indigo-100">
              {laps.map((lapTime, i) => (
                <li key={i} className="py-1 flex justify-between text-gray-700">
                  <span>Lap {laps.length - i}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
