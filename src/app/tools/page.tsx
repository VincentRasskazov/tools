import Link from "next/link";

const tools = [
  { name: "Stopwatch", path: "/tools/stopwatch" },
  { name: "Timer", path: "/tools/timer" },
  { name: "Calculator", path: "/tools/calculator" },
  { name: "Unit Converter", path: "/tools/unit-converter" },
  { name: "Currency Converter", path: "/tools/currency-converter" },
  { name: "Password Generator", path: "/tools/password-generator" },
  { name: "BMI Calculator", path: "/tools/bmi-calculator" },
  { name: "QR Code Generator", path: "/tools/qr-code-generator" },
  { name: "Color Picker", path: "/tools/color-picker" },
  { name: "Date Difference Calculator", path: "/tools/date-difference" },
  { name: "Age Calculator", path: "/tools/age-calculator" },
  { name: "Lorem Ipsum Generator", path: "/tools/lorem-ipsum" },
  { name: "JSON Formatter", path: "/tools/json-formatter" },
  { name: "Base64 Encoder", path: "/tools/base64-encoder" },
  { name: "Base64 Decoder", path: "/tools/base64-decoder" },
  { name: "Text Case Converter", path: "/tools/text-case-converter" },
  { name: "UUID Generator", path: "/tools/uuid-generator" },
  { name: "Random Number Generator", path: "/tools/random-number" },
  { name: "Prime Number Checker", path: "/tools/prime-checker" },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-10 text-zinc-900 drop-shadow-lg">All Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {tools.map((tool) => (
          <Link key={tool.path} href={tool.path} className="block p-8 rounded-2xl shadow-xl bg-white hover:bg-blue-50 transition border border-zinc-200 hover:scale-105">
            <span className="text-2xl font-semibold text-blue-700">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
