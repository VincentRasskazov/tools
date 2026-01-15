"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownPreview() {
  const [input, setInput] = useState("# Hello, Markdown!\nType here...");
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Markdown Preview</h1>
      <textarea
        className="border p-2 rounded w-full h-40 mb-4"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="prose bg-gray-50 p-4 rounded">
        <ReactMarkdown>{input}</ReactMarkdown>
      </div>
    </div>
  );
}
