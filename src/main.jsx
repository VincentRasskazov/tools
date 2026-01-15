import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// Tool pages
import Stopwatch from './pages/stopwatch.jsx';
import Timer from './pages/timer.jsx';
import WorldClock from './pages/world-clock.jsx';
import AlarmClock from './pages/alarm-clock.jsx';
import UnitConverter from './pages/unit-converter.jsx';
import CurrencyConverter from './pages/currency-converter.jsx';
import Calculator from './pages/calculator.jsx';
import BMICalculator from './pages/bmi-calculator.jsx';
import PasswordGenerator from './pages/password-generator.jsx';
import QRCodeGenerator from './pages/qr-code-generator.jsx';
import ColorPicker from './pages/color-picker.jsx';
import TextCaseConverter from './pages/text-case-converter.jsx';
import Base64Encoder from './pages/base64-encoder.jsx';
import Base64Decoder from './pages/base64-decoder.jsx';
import JSONFormatter from './pages/json-formatter.jsx';
import UUIDGenerator from './pages/uuid-generator.jsx';
import IPLookup from './pages/ip-lookup.jsx';
import Weather from './pages/weather.jsx';
import RandomNumberGenerator from './pages/random-number-generator.jsx';
import Notepad from './pages/notepad.jsx';
import MarkdownEditor from './pages/markdown-editor.jsx';
import ImageCompressor from './pages/image-compressor.jsx';
import PDFtoJPG from './pages/pdf-to-jpg.jsx';
import JPGtoPDF from './pages/jpg-to-pdf.jsx';
import HTMLMinifier from './pages/html-minifier.jsx';
import CSSMinifier from './pages/css-minifier.jsx';
import JSMinifier from './pages/js-minifier.jsx';
import URLEncoder from './pages/url-encoder.jsx';
import URLDecoder from './pages/url-decoder.jsx';
import HexToRGB from './pages/hex-to-rgb.jsx';
import RGBToHex from './pages/rgb-to-hex.jsx';
import PalindromeChecker from './pages/palindrome-checker.jsx';
import AnagramSolver from './pages/anagram-solver.jsx';
import WordCounter from './pages/word-counter.jsx';
import CharacterCounter from './pages/character-counter.jsx';
import LoremIpsumGenerator from './pages/lorem-ipsum-generator.jsx';
import AgeCalculator from './pages/age-calculator.jsx';
import DaysBetweenDates from './pages/days-between-dates.jsx';
import PrimeNumberChecker from './pages/prime-number-checker.jsx';
import TipCalculator from './pages/tip-calculator.jsx';
import LoanCalculator from './pages/loan-calculator.jsx';
import MortgageCalculator from './pages/mortgage-calculator.jsx';
import PercentageCalculator from './pages/percentage-calculator.jsx';
import DiscountCalculator from './pages/discount-calculator.jsx';
import DateToUnix from './pages/date-to-unix.jsx';
import UnixToDate from './pages/unix-to-date.jsx';
import TextToSpeech from './pages/text-to-speech.jsx';
import SpeechToText from './pages/speech-to-text.jsx';
import MorseCodeTranslator from './pages/morse-code-translator.jsx';
import BinaryTranslator from './pages/binary-translator.jsx';
import RomanNumeralConverter from './pages/roman-numeral-converter.jsx';
import NumberToWords from './pages/number-to-words.jsx';
import WordsToNumber from './pages/words-to-number.jsx';
import TemperatureConverter from './pages/temperature-converter.jsx';
import LengthConverter from './pages/length-converter.jsx';
import WeightConverter from './pages/weight-converter.jsx';
import SpeedConverter from './pages/speed-converter.jsx';
import AreaConverter from './pages/area-converter.jsx';
import VolumeConverter from './pages/volume-converter.jsx';
import TimeConverter from './pages/time-converter.jsx';
import DataConverter from './pages/data-converter.jsx';
import AngleConverter from './pages/angle-converter.jsx';
import Sitemap from './pages/sitemap.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/world-clock" element={<WorldClock />} />
        <Route path="/alarm-clock" element={<AlarmClock />} />
        <Route path="/unit-converter" element={<UnitConverter />} />
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
        <Route path="/color-picker" element={<ColorPicker />} />
        <Route path="/text-case-converter" element={<TextCaseConverter />} />
        <Route path="/base64-encoder" element={<Base64Encoder />} />
        <Route path="/base64-decoder" element={<Base64Decoder />} />
        <Route path="/json-formatter" element={<JSONFormatter />} />
        <Route path="/uuid-generator" element={<UUIDGenerator />} />
        <Route path="/ip-lookup" element={<IPLookup />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/random-number-generator" element={<RandomNumberGenerator />} />
        <Route path="/notepad" element={<Notepad />} />
        <Route path="/markdown-editor" element={<MarkdownEditor />} />
        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/pdf-to-jpg" element={<PDFtoJPG />} />
        <Route path="/jpg-to-pdf" element={<JPGtoPDF />} />
        <Route path="/html-minifier" element={<HTMLMinifier />} />
        <Route path="/css-minifier" element={<CSSMinifier />} />
        <Route path="/js-minifier" element={<JSMinifier />} />
        <Route path="/url-encoder" element={<URLEncoder />} />
        <Route path="/url-decoder" element={<URLDecoder />} />
        <Route path="/hex-to-rgb" element={<HexToRGB />} />
        <Route path="/rgb-to-hex" element={<RGBToHex />} />
        <Route path="/palindrome-checker" element={<PalindromeChecker />} />
        <Route path="/anagram-solver" element={<AnagramSolver />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/character-counter" element={<CharacterCounter />} />
        <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
        <Route path="/age-calculator" element={<AgeCalculator />} />
        <Route path="/days-between-dates" element={<DaysBetweenDates />} />
        <Route path="/prime-number-checker" element={<PrimeNumberChecker />} />
        <Route path="/tip-calculator" element={<TipCalculator />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="/percentage-calculator" element={<PercentageCalculator />} />
        <Route path="/discount-calculator" element={<DiscountCalculator />} />
        <Route path="/date-to-unix" element={<DateToUnix />} />
        <Route path="/unix-to-date" element={<UnixToDate />} />
        <Route path="/text-to-speech" element={<TextToSpeech />} />
        <Route path="/speech-to-text" element={<SpeechToText />} />
        <Route path="/morse-code-translator" element={<MorseCodeTranslator />} />
        <Route path="/binary-translator" element={<BinaryTranslator />} />
        <Route path="/roman-numeral-converter" element={<RomanNumeralConverter />} />
        <Route path="/number-to-words" element={<NumberToWords />} />
        <Route path="/words-to-number" element={<WordsToNumber />} />
        <Route path="/temperature-converter" element={<TemperatureConverter />} />
        <Route path="/length-converter" element={<LengthConverter />} />
        <Route path="/weight-converter" element={<WeightConverter />} />
        <Route path="/speed-converter" element={<SpeedConverter />} />
        <Route path="/area-converter" element={<AreaConverter />} />
        <Route path="/volume-converter" element={<VolumeConverter />} />
        <Route path="/time-converter" element={<TimeConverter />} />
        <Route path="/data-converter" element={<DataConverter />} />
        <Route path="/angle-converter" element={<AngleConverter />} />
        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
