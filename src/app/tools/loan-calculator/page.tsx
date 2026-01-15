import React, { useState } from "react";

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const principal = Number(amount);
  const interest = Number(rate) / 100 / 12;
  const payments = Number(years) * 12;
  let monthly = "";
  if (principal && interest && payments) {
    monthly = (
      (principal * interest) /
      (1 - Math.pow(1 + interest, -payments))
    ).toFixed(2);
  }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Loan Calculator</h1>
      <div className="flex gap-2 mb-2">
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
        />
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Rate (%)"
          value={rate}
          onChange={e => setRate(e.target.value.replace(/[^\d.]/g, ""))}
        />
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Years"
          value={years}
          onChange={e => setYears(e.target.value.replace(/[^\d.]/g, ""))}
        />
      </div>
      {monthly && (
        <div className="mt-2">Monthly Payment: <span className="font-mono">${monthly}</span></div>
      )}
    </div>
  );
}
