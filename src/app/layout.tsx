import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ultimate Online Tools Hub | Free Online Tools (Stopwatch, Timer, Calculator, Converters, and More)",
  description: "A massive collection of free, fast, and beautiful online tools. Stopwatch, timer, calculator, converters, password generator, QR code, color picker, and more. All tools are fully functional and SEO optimized.",
  keywords: [
    "online tools",
    "stopwatch",
    "timer",
    "calculator",
    "unit converter",
    "currency converter",
    "password generator",
    "bmi calculator",
    "qr code generator",
    "color picker",
    "free tools",
    "web tools",
    "SEO tools"
  ],
  openGraph: {
    title: "Ultimate Online Tools Hub",
    description: "A massive collection of free, fast, and beautiful online tools. Stopwatch, timer, calculator, converters, password generator, QR code, color picker, and more.",
    url: "https://vincentrasskazov.github.io/tools/",
    siteName: "Ultimate Online Tools Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ultimate Online Tools Hub"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Online Tools Hub",
    description: "A massive collection of free, fast, and beautiful online tools. Stopwatch, timer, calculator, converters, password generator, QR code, color picker, and more.",
    images: ["/og-image.png"]
  },
  metadataBase: new URL("https://vincentrasskazov.github.io/tools/")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
