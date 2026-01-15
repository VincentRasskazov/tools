import { useState } from 'react';

const Button = ({ value, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-6 py-4 text-xl font-semibold rounded-lg shadow hover:shadow-lg transition ${className}`}
  >
    {value}
  </button>
);

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumber = (num) => {
    if (resetDisplay) {
      setDisplay(String(num));
      setResetDisplay(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (resetDisplay) {
      setDisplay('0.');
      setResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-slate-200">
      <h2 className="text-4xl font-extrabold mb-6 text-slate-700 drop-shadow">Calculator</h2>
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80">
        <div className="mb-4 p-4 bg-gray-100 rounded-lg text-right">
          <div className="text-3xl font-mono font-bold text-gray-800 break-all">{display}</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button value="C" onClick={handleClear} className="bg-red-500 text-white hover:bg-red-600" />
          <Button value="⌫" onClick={handleBackspace} className="bg-gray-300 text-gray-800 hover:bg-gray-400" />
          <Button value="/" onClick={() => handleOperation('/')} className="bg-orange-500 text-white hover:bg-orange-600" />
          <Button value="*" onClick={() => handleOperation('*')} className="bg-orange-500 text-white hover:bg-orange-600" />
          
          <Button value="7" onClick={() => handleNumber(7)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="8" onClick={() => handleNumber(8)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="9" onClick={() => handleNumber(9)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="-" onClick={() => handleOperation('-')} className="bg-orange-500 text-white hover:bg-orange-600" />
          
          <Button value="4" onClick={() => handleNumber(4)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="5" onClick={() => handleNumber(5)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="6" onClick={() => handleNumber(6)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="+" onClick={() => handleOperation('+')} className="bg-orange-500 text-white hover:bg-orange-600" />
          
          <Button value="1" onClick={() => handleNumber(1)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="2" onClick={() => handleNumber(2)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <Button value="3" onClick={() => handleNumber(3)} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
          <button
            onClick={handleEquals}
            className="bg-green-500 text-white hover:bg-green-600 px-6 py-4 text-xl font-semibold rounded-lg shadow hover:shadow-lg transition row-span-2"
          >
            =
          </button>
          
          <Button value="0" onClick={() => handleNumber(0)} className="bg-gray-200 text-gray-800 hover:bg-gray-300 col-span-2" />
          <Button value="." onClick={handleDecimal} className="bg-gray-200 text-gray-800 hover:bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
