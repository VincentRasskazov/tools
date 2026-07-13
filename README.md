# Vincent's Tools Hub

A collection of 5,044 browser-based tools for developers, creators, and everyday tasks.

## Highlights

- Category-first homepage loading for faster first paint
- Privacy-first browser execution (no backend required)
- Unified responsive UI and tool-page template style
- Jekyll frontmatter + SEO metadata on every tool page
- Daily automation to generate new tools and refresh manifests
- Copilot generation timeline at `/tools/copilot-timeline.html`

## Tool Organization

Tool pages are stored by category:

- `tools/<category-slug>/<tool-file>.html`

Homepage browsing uses generated manifests:

- `tools/category-manifests/index.json`
- `tools/category-manifests/<category>.json`

## Local Development

Serve quickly with Python:

```bash
python3 -m http.server 8000
```

Or use Node/Jekyll:

```bash
npx http-server
# or
bundle exec jekyll serve
```

If you need permalink behavior identical to production, use Jekyll.

## Automation

Daily generation is handled by:

- `.github/workflows/daily-copilot-tool-growth.yml`

Key behavior:

- Installs GitHub Copilot CLI in CI
- Selects model by premium threshold (default 50%)
- Generates 25 tools per run
- Enforces unique Copilot-generated ideas and avoids repeating prior daily concepts
- Spreads generated tools across many categories (for example: Games, Security, Finance, Developer, Data, Health, Writing, and more)
- Rebuilds category manifests
- Commits and pushes generated changes

## Maintenance Scripts

Run from repo root:

```bash
# one-time migration from flat tools/ to category folders
node .github/scripts/reorganize-tools-by-category.js

# rebuild homepage category manifests
node .github/scripts/build-category-manifests.js

# rebuild Copilot generation timeline JSON
node .github/scripts/build-copilot-timeline.js
```

## License

MIT
