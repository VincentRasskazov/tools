import { Link } from 'react-router-dom';

const tools = [
  { name: 'Stopwatch', path: '/stopwatch', desc: 'Accurate stopwatch with lap timing functionality' },
  { name: 'Timer', path: '/timer', desc: 'Countdown timer for any duration' },
  { name: 'World Clock', path: '/world-clock', desc: 'View time in multiple time zones' },
  { name: 'Alarm Clock', path: '/alarm-clock', desc: 'Set alarms and reminders' },
  { name: 'Unit Converter', path: '/unit-converter', desc: 'Convert between different units of measurement' },
  { name: 'Currency Converter', path: '/currency-converter', desc: 'Convert between world currencies' },
  { name: 'Calculator', path: '/calculator', desc: 'Basic arithmetic calculator' },
  { name: 'BMI Calculator', path: '/bmi-calculator', desc: 'Calculate your Body Mass Index' },
  { name: 'Password Generator', path: '/password-generator', desc: 'Generate secure random passwords' },
  { name: 'QR Code Generator', path: '/qr-code-generator', desc: 'Create QR codes from text' },
  { name: 'Color Picker', path: '/color-picker', desc: 'Pick colors and get hex/RGB values' },
  { name: 'Text Case Converter', path: '/text-case-converter', desc: 'Convert text between different cases' },
  { name: 'Base64 Encoder', path: '/base64-encoder', desc: 'Encode text to Base64' },
  { name: 'Base64 Decoder', path: '/base64-decoder', desc: 'Decode Base64 to text' },
  { name: 'JSON Formatter', path: '/json-formatter', desc: 'Format and validate JSON data' },
  { name: 'UUID Generator', path: '/uuid-generator', desc: 'Generate unique identifiers' },
  { name: 'IP Lookup', path: '/ip-lookup', desc: 'Find your IP address and location' },
  { name: 'Weather', path: '/weather', desc: 'Check weather conditions' },
  { name: 'Random Number Generator', path: '/random-number-generator', desc: 'Generate random numbers' },
  { name: 'Notepad', path: '/notepad', desc: 'Simple online notepad' },
  { name: 'Markdown Editor', path: '/markdown-editor', desc: 'Write and preview Markdown' },
  { name: 'Image Compressor', path: '/image-compressor', desc: 'Compress images to reduce file size' },
  { name: 'PDF to JPG', path: '/pdf-to-jpg', desc: 'Convert PDF files to JPG images' },
  { name: 'JPG to PDF', path: '/jpg-to-pdf', desc: 'Convert JPG images to PDF' },
  { name: 'HTML Minifier', path: '/html-minifier', desc: 'Minify HTML code' },
  { name: 'CSS Minifier', path: '/css-minifier', desc: 'Minify CSS code' },
  { name: 'JS Minifier', path: '/js-minifier', desc: 'Minify JavaScript code' },
  { name: 'URL Encoder', path: '/url-encoder', desc: 'Encode URLs for safe transmission' },
  { name: 'URL Decoder', path: '/url-decoder', desc: 'Decode encoded URLs' },
  { name: 'Hex to RGB', path: '/hex-to-rgb', desc: 'Convert hex color codes to RGB' },
  { name: 'RGB to Hex', path: '/rgb-to-hex', desc: 'Convert RGB values to hex color codes' },
  { name: 'Palindrome Checker', path: '/palindrome-checker', desc: 'Check if text is a palindrome' },
  { name: 'Anagram Solver', path: '/anagram-solver', desc: 'Find anagrams of words' },
  { name: 'Word Counter', path: '/word-counter', desc: 'Count words in text' },
  { name: 'Character Counter', path: '/character-counter', desc: 'Count characters in text' },
  { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum-generator', desc: 'Generate placeholder text' },
  { name: 'Age Calculator', path: '/age-calculator', desc: 'Calculate age from birthdate' },
  { name: 'Days Between Dates', path: '/days-between-dates', desc: 'Calculate days between two dates' },
  { name: 'Prime Number Checker', path: '/prime-number-checker', desc: 'Check if a number is prime' },
  { name: 'Tip Calculator', path: '/tip-calculator', desc: 'Calculate tips and split bills' },
  { name: 'Loan Calculator', path: '/loan-calculator', desc: 'Calculate loan payments' },
  { name: 'Mortgage Calculator', path: '/mortgage-calculator', desc: 'Calculate mortgage payments' },
  { name: 'Percentage Calculator', path: '/percentage-calculator', desc: 'Calculate percentages' },
  { name: 'Discount Calculator', path: '/discount-calculator', desc: 'Calculate discounts and savings' },
  { name: 'Date to Unix', path: '/date-to-unix', desc: 'Convert dates to Unix timestamps' },
  { name: 'Unix to Date', path: '/unix-to-date', desc: 'Convert Unix timestamps to dates' },
  { name: 'Text to Speech', path: '/text-to-speech', desc: 'Convert text to speech' },
  { name: 'Speech to Text', path: '/speech-to-text', desc: 'Convert speech to text' },
  { name: 'Morse Code Translator', path: '/morse-code-translator', desc: 'Translate text to/from Morse code' },
  { name: 'Binary Translator', path: '/binary-translator', desc: 'Translate text to/from binary' },
  { name: 'Roman Numeral Converter', path: '/roman-numeral-converter', desc: 'Convert to/from Roman numerals' },
  { name: 'Number to Words', path: '/number-to-words', desc: 'Convert numbers to words' },
  { name: 'Words to Number', path: '/words-to-number', desc: 'Convert words to numbers' },
  { name: 'Temperature Converter', path: '/temperature-converter', desc: 'Convert between temperature units' },
  { name: 'Length Converter', path: '/length-converter', desc: 'Convert between length units' },
  { name: 'Weight Converter', path: '/weight-converter', desc: 'Convert between weight units' },
  { name: 'Speed Converter', path: '/speed-converter', desc: 'Convert between speed units' },
  { name: 'Area Converter', path: '/area-converter', desc: 'Convert between area units' },
  { name: 'Volume Converter', path: '/volume-converter', desc: 'Convert between volume units' },
  { name: 'Time Converter', path: '/time-converter', desc: 'Convert between time units' },
  { name: 'Data Converter', path: '/data-converter', desc: 'Convert between data storage units' },
  { name: 'Angle Converter', path: '/angle-converter', desc: 'Convert between angle units' },
];

export default function Sitemap() {
  const categories = {
    'Time Tools': tools.filter(t => ['Stopwatch', 'Timer', 'World Clock', 'Alarm Clock'].includes(t.name)),
    'Calculators': tools.filter(t => t.name.includes('Calculator')),
    'Converters': tools.filter(t => t.name.includes('Converter') && !t.name.includes('Case')),
    'Text Tools': tools.filter(t => 
      ['Text Case Converter', 'Word Counter', 'Character Counter', 'Lorem Ipsum Generator', 
       'Palindrome Checker', 'Anagram Solver', 'Text to Speech'].includes(t.name)
    ),
    'Encoders & Decoders': tools.filter(t => 
      t.name.includes('Encoder') || t.name.includes('Decoder') || t.name.includes('Minifier')
    ),
    'Translators': tools.filter(t => 
      t.name.includes('Translator') || ['Number to Words', 'Words to Number'].includes(t.name)
    ),
    'Color Tools': tools.filter(t => 
      ['Color Picker', 'Hex to RGB', 'RGB to Hex'].includes(t.name)
    ),
    'Generators': tools.filter(t => 
      ['Password Generator', 'QR Code Generator', 'UUID Generator', 'Random Number Generator'].includes(t.name)
    ),
    'Date & Time': tools.filter(t => 
      ['Age Calculator', 'Days Between Dates', 'Date to Unix', 'Unix to Date'].includes(t.name)
    ),
    'File Tools': tools.filter(t => 
      t.name.includes('PDF') || t.name.includes('JPG') || t.name.includes('Image')
    ),
    'Number Tools': tools.filter(t => 
      ['Prime Number Checker'].includes(t.name)
    ),
    'Writing Tools': tools.filter(t => 
      ['Notepad', 'Markdown Editor'].includes(t.name)
    ),
    'Other Tools': tools.filter(t => 
      ['JSON Formatter', 'IP Lookup', 'Weather', 'Speech to Text'].includes(t.name)
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-purple-700 mb-4 drop-shadow">Sitemap</h1>
          <p className="text-xl text-gray-700 mb-6">Complete list of all {tools.length} tools available on Internet Tools Hub</p>
          <Link to="/" className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg">
            ← Back to Home
          </Link>
        </div>

        {Object.entries(categories).map(([category, categoryTools]) => (
          categoryTools.length > 0 && (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 border-b-2 border-purple-300 pb-2">
                {category} ({categoryTools.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className="block bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 border border-purple-100 hover:border-purple-300"
                  >
                    <h3 className="font-bold text-lg text-purple-700 mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-600">{tool.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}
