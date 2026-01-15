import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-cyan-200">
      <h2 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">Word Counter</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your text here..."
          className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 h-48 mb-4 resize-none"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">{words}</div>
            <div className="text-sm text-gray-600">Words</div>
          </div>
          <div className="bg-cyan-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-cyan-600">{characters}</div>
            <div className="text-sm text-gray-600">Characters</div>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-teal-600">{charactersNoSpaces}</div>
            <div className="text-sm text-gray-600">No Spaces</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-indigo-600">{sentences}</div>
            <div className="text-sm text-gray-600">Sentences</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">{paragraphs}</div>
            <div className="text-sm text-gray-600">Paragraphs</div>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-pink-600">{words ? Math.ceil(words / 200) : 0}</div>
            <div className="text-sm text-gray-600">Min Read</div>
          </div>
        </div>
      </div>
    </div>
  );
}
