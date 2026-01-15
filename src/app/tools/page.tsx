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
  { name: "IP Address Lookup", path: "/tools/ip-address-lookup" },
  { name: "Markdown Editor", path: "/tools/markdown-editor" },
  { name: "Hex to RGB Converter", path: "/tools/hex-to-rgb" },
  { name: "RGB to Hex Converter", path: "/tools/rgb-to-hex" },
  { name: "Word Counter", path: "/tools/word-counter" },
  { name: "Character Counter", path: "/tools/character-counter" },
  { name: "Epoch Converter", path: "/tools/epoch-converter" },
  { name: "Unix Timestamp Converter", path: "/tools/unix-timestamp" },
  { name: "Percentage Calculator", path: "/tools/percentage-calculator" },
  { name: "Loan Calculator", path: "/tools/loan-calculator" },
  { name: "HTML Entity Encoder", path: "/tools/html-entity-encoder" },
  { name: "HTML Entity Decoder", path: "/tools/html-entity-decoder" },
  { name: "URL Encoder", path: "/tools/url-encoder" },
  { name: "URL Decoder", path: "/tools/url-decoder" },
  { name: "Slug Generator", path: "/tools/slug-generator" },
  { name: "Roman Numeral Converter", path: "/tools/roman-numeral-converter" },
  { name: "Number to Words", path: "/tools/number-to-words" },
  { name: "Words to Number", path: "/tools/words-to-number" },
  { name: "Caesar Cipher", path: "/tools/caesar-cipher" },
  { name: "Vigenère Cipher", path: "/tools/vigenere-cipher" },
  { name: "Binary to Decimal", path: "/tools/binary-to-decimal" },
  { name: "Decimal to Binary", path: "/tools/decimal-to-binary" },
  { name: "Hex to Decimal", path: "/tools/hex-to-decimal" },
  { name: "Decimal to Hex", path: "/tools/decimal-to-hex" },
  { name: "IP Subnet Calculator", path: "/tools/ip-subnet-calculator" },
  { name: "Morse Code Encoder", path: "/tools/morse-code-encoder" },
  { name: "Morse Code Decoder", path: "/tools/morse-code-decoder" },
  { name: "Atbash Cipher", path: "/tools/atbash-cipher" },
  { name: "ROT13 Cipher", path: "/tools/rot13-cipher" },
  { name: "Leet Speak Converter", path: "/tools/leet-speak-converter" },
    { name: "Angle Converter", path: "/tools/angle-converter" },
    { name: "Area Converter", path: "/tools/area-converter" },
    { name: "Data Size Converter", path: "/tools/data-size-converter" },
    { name: "Energy Converter", path: "/tools/energy-converter" },
    { name: "Field Strength Converter", path: "/tools/field-strength-converter" },
    { name: "Force Converter", path: "/tools/force-converter" },
    { name: "Frequency Converter", path: "/tools/frequency-converter" },
    { name: "Length Converter", path: "/tools/length-converter" },
    { name: "Lighting Converter", path: "/tools/lighting-converter" },
    { name: "Power Converter", path: "/tools/power-converter" },
    { name: "Pressure Converter", path: "/tools/pressure-converter" },
    { name: "Speed Converter", path: "/tools/speed-converter" },
    { name: "Temperature Converter", path: "/tools/temperature-converter" },
    { name: "Time Converter", path: "/tools/time-converter" },
    { name: "Volume Converter", path: "/tools/volume-converter" },
    { name: "Weight Converter", path: "/tools/weight-converter" },
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
