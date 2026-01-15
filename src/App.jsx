import './index.css';

const tools = [
  { name: 'Stopwatch', path: '/stopwatch' },
  { name: 'Timer', path: '/timer' },
  { name: 'World Clock', path: '/world-clock' },
  { name: 'Alarm Clock', path: '/alarm-clock' },
  { name: 'Unit Converter', path: '/unit-converter' },
  { name: 'Currency Converter', path: '/currency-converter' },
  { name: 'Calculator', path: '/calculator' },
  { name: 'BMI Calculator', path: '/bmi-calculator' },
  { name: 'Password Generator', path: '/password-generator' },
  { name: 'QR Code Generator', path: '/qr-code-generator' },
  { name: 'Color Picker', path: '/color-picker' },
  { name: 'Text Case Converter', path: '/text-case-converter' },
  { name: 'Base64 Encoder', path: '/base64-encoder' },
  { name: 'Base64 Decoder', path: '/base64-decoder' },
  { name: 'JSON Formatter', path: '/json-formatter' },
  { name: 'UUID Generator', path: '/uuid-generator' },
  { name: 'IP Lookup', path: '/ip-lookup' },
  { name: 'Weather', path: '/weather' },
  { name: 'Random Number Generator', path: '/random-number-generator' },
  { name: 'Notepad', path: '/notepad' },
  { name: 'Markdown Editor', path: '/markdown-editor' },
  { name: 'Image Compressor', path: '/image-compressor' },
  { name: 'PDF to JPG', path: '/pdf-to-jpg' },
  { name: 'JPG to PDF', path: '/jpg-to-pdf' },
  { name: 'HTML Minifier', path: '/html-minifier' },
  { name: 'CSS Minifier', path: '/css-minifier' },
  { name: 'JS Minifier', path: '/js-minifier' },
  { name: 'URL Encoder', path: '/url-encoder' },
  { name: 'URL Decoder', path: '/url-decoder' },
  { name: 'Hex to RGB', path: '/hex-to-rgb' },
  { name: 'RGB to Hex', path: '/rgb-to-hex' },
  { name: 'Palindrome Checker', path: '/palindrome-checker' },
  { name: 'Anagram Solver', path: '/anagram-solver' },
  { name: 'Word Counter', path: '/word-counter' },
  { name: 'Character Counter', path: '/character-counter' },
  { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum-generator' },
  { name: 'Age Calculator', path: '/age-calculator' },
  { name: 'Days Between Dates', path: '/days-between-dates' },
  { name: 'Prime Number Checker', path: '/prime-number-checker' },
  { name: 'Tip Calculator', path: '/tip-calculator' },
  { name: 'Loan Calculator', path: '/loan-calculator' },
  { name: 'Mortgage Calculator', path: '/mortgage-calculator' },
  { name: 'Percentage Calculator', path: '/percentage-calculator' },
  { name: 'Discount Calculator', path: '/discount-calculator' },
  { name: 'Date to Unix', path: '/date-to-unix' },
  { name: 'Unix to Date', path: '/unix-to-date' },
  { name: 'Text to Speech', path: '/text-to-speech' },
  { name: 'Speech to Text', path: '/speech-to-text' },
  { name: 'Morse Code Translator', path: '/morse-code-translator' },
  { name: 'Binary Translator', path: '/binary-translator' },
  { name: 'Roman Numeral Converter', path: '/roman-numeral-converter' },
  { name: 'Number to Words', path: '/number-to-words' },
  { name: 'Words to Number', path: '/words-to-number' },
  { name: 'Temperature Converter', path: '/temperature-converter' },
  { name: 'Length Converter', path: '/length-converter' },
  { name: 'Weight Converter', path: '/weight-converter' },
  { name: 'Speed Converter', path: '/speed-converter' },
  { name: 'Area Converter', path: '/area-converter' },
  { name: 'Volume Converter', path: '/volume-converter' },
  { name: 'Time Converter', path: '/time-converter' },
  { name: 'Data Converter', path: '/data-converter' },
  { name: 'Angle Converter', path: '/angle-converter' },
  { name: 'Sitemap', path: '/sitemap' },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-8 px-2">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 mb-2 drop-shadow-lg">Internet Tools Hub</h1>
        <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto">The largest, most beautiful, and SEO-optimized collection of free online tools for everyone.</p>
      </header>
      <nav className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <a
            key={tool.path}
            href={tool.path}
            className="block bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 text-center font-semibold text-indigo-700 hover:bg-indigo-50 border border-indigo-100"
            aria-label={tool.name}
          >
            {tool.name}
          </a>
        ))}
      </nav>
      <footer className="mt-12 text-gray-500 text-sm text-center">
        &copy; {new Date().getFullYear()} Internet Tools Hub. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
