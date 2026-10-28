# 🔥 GitRoast

> **Your GitHub profile, roasted by the numbers.**

GitRoast turns any public GitHub profile into a fast, shareable roast based on real repository stats — stars, stale repos, descriptions, forks, languages and followers.

**No login. No backend. No paid AI API. No tracking.**

## Why this exists

Developer tools are often useful but visually boring. GitRoast is deliberately built to be the opposite: one input, one instant result, one shareable card.

## Features

- 🔥 Deterministic roast engine based on public GitHub data
- 📊 Profile heat score and useful repo statistics
- 🧟 Detects stale repositories
- 🫥 Finds repositories with missing descriptions
- 🧬 Shows language “DNA”
- 🖼️ Exports a shareable SVG roast card
- 🔗 Share button with a permalink (`?u=username`)
- ⚡ Client-side only — zero server cost
- 🔐 No GitHub login or token required

## Run locally

Open `index.html` directly, or serve the repository with any static server. If you already have Node installed, `npm run dev` also works with the included Vite setup.

## How it works

GitRoast calls GitHub's public REST API directly from the browser and computes the result locally. The roast is intentionally playful; the score is not an assessment of professional ability.

Unauthenticated GitHub API rate limits apply.

## Stack

Vanilla JavaScript · HTML/CSS · GitHub REST API

## Privacy

GitRoast only reads public GitHub information requested by the visitor. It has no database, analytics, cookies or backend.

## License

MIT