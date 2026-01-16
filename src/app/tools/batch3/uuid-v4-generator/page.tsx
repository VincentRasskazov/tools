"use client";
import React, { useState } from "react";

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default function UUIDv4Generator() {
  const [result, setResult] = useState("");

  const generate = () => {
    setResult(uuidv4());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">UUID v4 Generator</h1>
      <button className="btn btn-primary" onClick={generate}>Generate UUID v4</button>
      {result && (
        <div className="mt-4 text-lg font-semibold bg-blue-100 text-blue-900 px-4 py-2 rounded shadow break-all">{result}</div>
      )}
    </div>
  );
}
