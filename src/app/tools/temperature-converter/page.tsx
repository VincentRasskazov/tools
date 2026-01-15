"use client";
import React, { useState } from "react";


export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCelsius(value);
    setFahrenheit(value ? ((parseFloat(value) * 9) / 5 + 32).toFixed(2) : "");
  };

  const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFahrenheit(value);
    setCelsius(value ? (((parseFloat(value) - 32) * 5) / 9).toFixed(2) : "");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Temperature Converter</h1>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col">
          Celsius
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            className="border rounded px-2 py-1 mt-1 w-24"
            placeholder="Celsius"
          />
        </label>
        <label className="flex flex-col">
          Fahrenheit
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            className="border rounded px-2 py-1 mt-1 w-24"
            placeholder="Fahrenheit"
          />
        </label>
        {(celsius || fahrenheit) && (
          <div className="text-lg font-semibold bg-blue-100 text-blue-900 rounded px-4 py-2 mt-2 shadow">
            {celsius && `Celsius: ${celsius}`} {fahrenheit && `Fahrenheit: ${fahrenheit}`}
          </div>
        )}
      </div>
    </div>
  );
}
