import { useState } from 'react';

export default function CSSMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const minify = () => {
    const minified = input
      .replace(/\/\*.*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*:\s*/g, ':')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*,\s*/g, ',')
      .trim();
    setOutput(minified);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200">
      <h2 className="text-4xl font-extrabold mb-6 text-cyan-700 drop-shadow">CSS Minifier</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter CSS to minify..."
          className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500 h-48 mb-4 font-mono text-sm resize-none"
        />
        <button
          onClick={minify}
          className="w-full px-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold shadow hover:bg-cyan-600 transition mb-4"
        >
          Minify CSS
        </button>
        <textarea
          value={output}
          readOnly
          placeholder="Minified result..."
          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-32 font-mono text-sm resize-none"
        />
        {output && (
          <div className="mt-2 text-sm text-gray-600">
            Original: {input.length} chars | Minified: {output.length} chars | Saved: {((1 - output.length/input.length) * 100).toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  );
}
