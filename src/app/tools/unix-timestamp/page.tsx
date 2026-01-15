import React, { useState } from "react";

export default function UnixTimestamp() {
  const [date, setDate] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const convert = () => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return setTimestamp("Invalid date");
    setTimestamp(Math.floor(d.getTime() / 1000).toString());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Date to Unix Timestamp</h1>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="YYYY-MM-DD or any date string"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4" onClick={convert}>
        Convert
      </button>
      {timestamp && <div className="bg-gray-100 p-2 rounded text-center">{timestamp}</div>}
    </div>
  );
}
