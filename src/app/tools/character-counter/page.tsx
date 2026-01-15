"use client";
import React, { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Character Counter</h1>
      <textarea
        className="border p-2 rounded w-full h-32 mb-4"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type or paste text here..."
      />
      <div className="bg-gray-100 p-2 rounded text-center">Characters: {text.length}</div>
    </div>
  );
}
