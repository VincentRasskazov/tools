import { useState } from 'react';

export default function CharacterCounter() {
  const [text, setText] = useState('');

  const total = text.length;
  const noSpaces = text.replace(/\s/g, '').length;
  const letters = text.replace(/[^a-zA-Z]/g, '').length;
  const numbers = text.replace(/[^0-9]/g, '').length;
  const special = text.replace(/[a-zA-Z0-9\s]/g, '').length;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-200">
      <h2 className="text-4xl font-extrabold mb-6 text-green-700 drop-shadow">Character Counter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 h-48 mb-4 resize-none"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">{total}</div>
            <div className="text-sm text-gray-600">Total Characters</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-teal-600">{noSpaces}</div>
            <div className="text-sm text-gray-600">Without Spaces</div>
          </div>
          <div className="bg-cyan-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-600">{letters}</div>
            <div className="text-sm text-gray-600">Letters</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{numbers}</div>
            <div className="text-sm text-gray-600">Numbers</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-indigo-600">{special}</div>
            <div className="text-sm text-gray-600">Special Chars</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">{text.split(/\s+/).filter(w => w).length}</div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
        </div>
      </div>
    </div>
  );
}
