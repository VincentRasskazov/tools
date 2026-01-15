import ToolPageLayout from "../../ToolPageLayout";
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
    <ToolPageLayout title="Temperature Converter" desc="Convert between Celsius and Fahrenheit.">
      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <label className="flex flex-col">
          Celsius
          <input
            type="number"
            value={celsius}
            onChange={handleCelsiusChange}
            className="input input-bordered mt-1"
            placeholder="Celsius"
          />
        </label>
        <label className="flex flex-col">
          Fahrenheit
          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
            className="input input-bordered mt-1"
            placeholder="Fahrenheit"
          />
        </label>
      </div>
    </ToolPageLayout>
  );
}
