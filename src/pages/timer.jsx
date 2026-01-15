import { useState, useRef } from 'react';

function formatTime(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function Timer() {
  const [input, setInput] = useState('01:00');
  const [time, setTime] = useState(60000);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef(null);

  const parseInput = (str) => {
    const [min, sec] = str.split(':').map(Number);
    return (min * 60 + (sec || 0)) * 1000;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setTime(parseInput(e.target.value));
    setFinished(false);
  };

  const start = () => {
    if (!running && time > 0) {
      setRunning(true);
      setFinished(false);
      const endTime = Date.now() + time;
      intervalRef.current = setInterval(() => {
        const newTime = endTime - Date.now();
        if (newTime <= 0) {
          setTime(0);
          setRunning(false);
          setFinished(true);
          clearInterval(intervalRef.current);
        } else {
          setTime(newTime);
        }
      }, 100);
    }
  };

  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setTime(parseInput(input));
    setFinished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100">
      <h2 className="text-4xl font-extrabold mb-6 text-pink-700 drop-shadow">Timer</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          pattern="[0-9]{2}:[0-9]{2}"
          className="mb-4 text-3xl font-mono text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 w-32 bg-transparent"
          disabled={running}
          aria-label="Set timer (mm:ss)"
        />
        <span className="text-5xl font-mono font-bold mb-4 text-gray-800 tracking-widest">{formatTime(time)}</span>
        <div className="flex gap-4 mb-4">
          {!running ? (
            <button onClick={start} className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition" disabled={time <= 0}>Start</button>
          ) : (
            <button onClick={pause} className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition">Pause</button>
          )}
          <button onClick={reset} className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 transition">Reset</button>
        </div>
        {finished && <div className="text-xl text-pink-600 font-bold mt-2">Time's up!</div>}
      </div>
    </div>
  );
}
