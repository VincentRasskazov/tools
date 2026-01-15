"use client";
import { useState } from "react";

const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"]
];

export default function Calculator() {
  const [value, setValue] = useState("");

  const handleClick = (char: string) => {
    if (char === "=") {
      try {
        // eslint-disable-next-line no-eval
        setValue(eval(value).toString());
      } catch {
        setValue("Error");
      }
    } else if (char === "C") {
      setValue("");
    } else {
      setValue((v) => v + char);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-100">
      <h1 className="text-3xl font-bold mb-8 text-green-900 drop-shadow">Calculator</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-200 p-6">
        <div className="text-3xl font-mono mb-4 text-right min-h-[2.5rem]">{value || "0"}</div>
        <div className="grid grid-cols-4 gap-3">
          {buttons.flat().map((char) => (
            <button
              key={char}
              onClick={() => handleClick(char)}
              className="px-6 py-4 rounded-lg bg-zinc-100 text-xl font-semibold shadow hover:bg-green-200 transition"
            >
              {char}
            </button>
          ))}
          <button
            onClick={() => handleClick("C")}
            className="col-span-4 px-6 py-2 mt-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition"
          >
            C
          </button>
        </div>
      </div>
    </div>
  );
}
