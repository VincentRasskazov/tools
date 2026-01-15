import { useState } from 'react';

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = useState(3);
  const [text, setText] = useState('');

  const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

  const generate = () => {
    let result = [];
    for (let i = 0; i < paragraphs; i++) {
      let para = [];
      const sentences = 4 + Math.floor(Math.random() * 3);
      for (let j = 0; j < sentences; j++) {
        const words = 8 + Math.floor(Math.random() * 8);
        let sentence = [];
        for (let k = 0; k < words; k++) {
          sentence.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        }
        sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
        para.push(sentence.join(' ') + '.');
      }
      result.push(para.join(' '));
    }
    setText(result.join('\n\n'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-slate-700 drop-shadow">Lorem Ipsum Generator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <div className="mb-4 flex gap-4 items-center">
          <label className="text-sm font-semibold text-gray-700">Paragraphs:</label>
          <input
            type="number"
            min="1"
            max="20"
            value={paragraphs}
            onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
            className="px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-slate-500 w-20"
          />
          <button
            onClick={generate}
            className="flex-1 px-6 py-2 rounded-lg bg-slate-500 text-white font-semibold shadow hover:bg-slate-600 transition"
          >
            Generate
          </button>
          {text && (
            <button
              onClick={() => navigator.clipboard.writeText(text)}
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition"
            >
              Copy
            </button>
          )}
        </div>
        <textarea
          value={text}
          readOnly
          placeholder="Click generate to create Lorem Ipsum text..."
          className="w-full px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-lg h-96 resize-none"
        />
      </div>
    </div>
  );
}
