import { useState } from 'react';

export default function SpeechToText() {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(prev => prev + (prev ? ' ' : '') + transcript);
      };
      
      recognition.onerror = () => {
        setListening(false);
        alert('Speech recognition error. Please try again.');
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200">
      <h2 className="text-4xl font-extrabold mb-6 text-cyan-700 drop-shadow">Speech to Text</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Click 'Start Listening' to begin..."
          className="w-full px-4 py-2 border-2 border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500 h-48 mb-4 resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={startListening}
            disabled={listening}
            className="flex-1 px-6 py-2 rounded-lg bg-cyan-500 text-white font-semibold shadow hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {listening ? '🎤 Listening...' : 'Start Listening'}
          </button>
          <button
            onClick={() => setText('')}
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-800 font-semibold shadow hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
