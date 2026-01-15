import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("# Hello, Markdown!\nEdit on the left.");
  return (
    <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h1 className="text-xl font-bold mb-2">Markdown Editor</h1>
        <textarea
          className="w-full h-64 border p-2 rounded"
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="prose bg-gray-50 p-4 rounded min-h-[16rem]">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
