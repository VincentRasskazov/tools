
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-center py-24 px-4">
      <h1 className="text-5xl font-extrabold text-blue-900 drop-shadow mb-6 text-center">Ultimate Online Tools Hub</h1>
      <p className="text-xl text-zinc-700 max-w-2xl text-center mb-10">A massive collection of free, fast, and beautiful online tools. From calculators to converters, stopwatches to generators—find everything you need in one place!</p>
      <div className="flex flex-wrap gap-6 justify-center mb-12">
        <Link href="/tools" className="px-8 py-4 rounded-2xl bg-blue-600 text-white text-xl font-semibold shadow-lg hover:bg-blue-700 transition">Browse All Tools</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl w-full">
        <ToolCard name="Stopwatch" path="/tools/stopwatch" desc="Simple, accurate stopwatch" color="from-blue-400 to-blue-600" />
        <ToolCard name="Timer" path="/tools/timer" desc="Countdown timer" color="from-purple-400 to-purple-600" />
        <ToolCard name="Calculator" path="/tools/calculator" desc="Basic calculator" color="from-green-400 to-green-600" />
        <ToolCard name="Unit Converter" path="/tools/unit-converter" desc="Convert between units" color="from-yellow-400 to-yellow-600" />
        <ToolCard name="Currency Converter" path="/tools/currency-converter" desc="Convert currencies" color="from-blue-300 to-green-400" />
        <ToolCard name="Password Generator" path="/tools/password-generator" desc="Generate strong passwords" color="from-pink-400 to-pink-600" />
        <ToolCard name="BMI Calculator" path="/tools/bmi-calculator" desc="Body Mass Index calculator" color="from-green-300 to-pink-400" />
        <ToolCard name="QR Code Generator" path="/tools/qr-code-generator" desc="Create QR codes" color="from-blue-200 to-yellow-400" />
        <ToolCard name="Color Picker" path="/tools/color-picker" desc="Pick and copy colors" color="from-purple-200 to-pink-300" />
      </div>
      <footer className="mt-20 text-zinc-500 text-sm">&copy; {new Date().getFullYear()} Ultimate Online Tools Hub. All rights reserved.</footer>
    </div>
  );
}

function ToolCard({ name, path, desc, color }: { name: string; path: string; desc: string; color: string }) {
  return (
    <Link href={path} className={`block p-8 rounded-2xl shadow-xl bg-gradient-to-br ${color} text-white hover:scale-105 transition border border-zinc-200`}>
      <div className="text-2xl font-bold mb-2">{name}</div>
      <div className="text-base opacity-90">{desc}</div>
    </Link>
  );
}
