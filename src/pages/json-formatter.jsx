import { useState } from 'react';

export default function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-sky-700 drop-shadow">JSON Formatter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Input JSON</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value"}'
              className="w-full px-4 py-2 border-2 border-sky-300 rounded-lg focus:outline-none focus:border-sky-500 h-64 font-mono text-sm resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Output</label>
            <textarea
              value={output}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-64 font-mono text-sm resize-none"
            />
          </div>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={formatJSON}
            className="px-6 py-2 rounded-lg bg-sky-500 text-white font-semibold shadow hover:bg-sky-600 transition"
          >
            Format
          </button>
          <button
            onClick={minifyJSON}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
          >
            Minify
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
