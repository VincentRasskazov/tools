import { useState } from 'react';

export default function Notepad() {
  const [text, setText] = useState(() => {
    const saved = localStorage.getItem('notepad');
    return saved || '';
  });

  const save = () => {
    localStorage.setItem('notepad', text);
    alert('Saved!');
  };

  const clear = () => {
    if (confirm('Clear all text?')) {
      setText('');
      localStorage.removeItem('notepad');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-yellow-700 drop-shadow">Notepad</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing..."
          className="w-full px-4 py-2 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 h-96 resize-none font-mono"
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={save}
            className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
          >
            Save
          </button>
          <button
            onClick={clear}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
          >
            Clear
          </button>
          <div className="flex-1"></div>
          <span className="text-sm text-gray-600 self-center">{text.length} characters</span>
        </div>
      </div>
    </div>
  );
}
