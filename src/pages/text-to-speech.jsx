import { useState } from 'react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-200">
      <h2 className="text-4xl font-extrabold mb-6 text-purple-700 drop-shadow">Text to Speech</h2>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to speak..."
          className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 h-48 mb-4 resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={speak}
            disabled={!text || speaking}
            className="flex-1 px-6 py-2 rounded-lg bg-purple-500 text-white font-semibold shadow hover:bg-purple-600 transition disabled:opacity-50"
          >
            {speaking ? 'Speaking...' : 'Speak'}
          </button>
          <button
            onClick={stop}
            disabled={!speaking}
            className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition disabled:opacity-50"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}
