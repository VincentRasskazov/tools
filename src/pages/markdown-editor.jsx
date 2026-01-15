import { useState } from 'react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Hello Markdown!\n\nStart typing...');

  const renderMarkdown = (text) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-blue-600 underline">$1</a>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-200 px-1 rounded font-mono text-sm">$1</code>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-4">
      <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 drop-shadow">Markdown Editor</h2>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Editor</h3>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 h-96 font-mono text-sm resize-none"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Preview</h3>
            <div
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg h-96 overflow-y-auto bg-gray-50"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
