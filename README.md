
# Ultimate Online Tools Hub

>A massive, SEO-friendly website with every online tool you need—fully functional, beautiful, and blazing fast.

## ✨ Features

- **Landing Page:** Modern, SEO-optimized, and links to all tools
- **Stopwatch:** Simple, accurate, and stylish
- **Timer:** Countdown with custom input
- **Calculator:** Basic math operations
- **Unit Converter:** Convert between meters, kilometers, miles, feet, inches, centimeters
- **Currency Converter:** Convert between USD, EUR, GBP, JPY, INR (rates are static for demo)
- **Password Generator:** Customizable, strong passwords
- **BMI Calculator:** Calculate Body Mass Index
- **QR Code Generator:** Generate QR codes for any text or URL
- **Color Picker:** Pick and copy any color
- **SEO Optimized:** Meta tags, OpenGraph, Twitter cards, accessibility, and fast loading
- **Beautiful UI:** Built with Tailwind CSS and Next.js

## 🚀 Getting Started (Local)

```bash
npm install
npm run dev
# Open http://localhost:3000
```


## 🌍 Deploying to GitHub Pages

This project is configured for static export and automatic deployment to GitHub Pages using GitHub Actions.

### How it works

- On every push to `main`, the site is built and exported to static HTML in the `out/` directory.
- The static site is published to the `gh-pages` branch and served at:
	- `https://<your-username>.github.io/tools/`

### Local static export

```bash
export GITHUB_PAGES=true
npm run build
npm run export
# The static site will be in the out/ folder
```

### Notes
- All routes use trailing slashes and static export (no SSR).
- Some Next.js features (API routes, SSR, dynamic server functions) are not available with static export.
- The site is served from the `/tools` base path on GitHub Pages.

---

## 🛠️ Add More Tools

Add new tools by creating a new folder in `src/app/tools/` and adding a `page.tsx` file for your tool. Link it from `src/app/tools/page.tsx`.

## 📄 License

MIT
