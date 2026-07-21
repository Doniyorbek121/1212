# IELTS Master

A complete, professional IELTS preparation website — fully static, responsive, and 100% working in the browser. No build step, no backend required.

Inspired by sites like ielts.gg, but with an original design system, richer interactivity, and an optional **Gemini-powered AI tutor**.

## ✨ Features

| Module | What it does |
|--------|--------------|
| **Home** | Modern landing page with hero, features, pricing, testimonials, FAQ |
| **Courses** | Strategy lessons for all four skills |
| **Reading** | **Full mock library** — multiple 3-passage / 40-question tests, every question type, 60-min timer, per-passage breakdown, official band curve |
| **Listening** | **Full mock library** — multiple 4-section / 40-question tests with **real audio playback** (speech synthesis) and per-section scoring |
| **Writing** | Task 1 & 2 prompts, live word/sentence counter, band-9 model answers, **AI feedback** |
| **Speaking** | Parts 1–3 questions, cue cards, prep/talk timer, **microphone recording**, **speech-to-text dictation** and AI feedback |
| **Dashboard** | Band-trend SVG chart, KPIs, skill breakdown, study-goal tracking, full test history & day-streak |
| **AI Tutor** | Chat with a Gemini-powered IELTS tutor (bring your own API key) |
| **Vocabulary** | Interactive flashcards across 5 topics with pronunciation |
| **Band Calculator** | Overall band (official rounding) + raw-score → band conversion |
| **Resources** | Study plans, essay templates, linking-word banks, grammar & time-management guides |
| **AI Tutor personas** | Switch the tutor's personality — 👩‍🏫 Teacher, 🌸 Gentle, 😎 Casual buddy (street talk), 💙 Caring, 🔥 Strict coach |
| **Admin panel** | Password-gated `/admin.html` to add vocabulary & writing prompts (they flow into the live pages), rename the brand, view stats, and export/import/wipe data |
| **About / Contact** | Mission page and a working contact form |

### Admin panel
Open `admin.html` (also linked in the footer). Default password: **`admin123`** — change it under **Settings**. It manages content stored in the browser: custom flashcards appear on the Vocabulary page, custom prompts appear in the Writing lab, and the brand name updates the header everywhere. Use **Data → Export** for a JSON backup.

Extras: light/dark theme (persisted), **installable PWA with offline support**, progress tracking & history (localStorage), SEO (Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt), a custom 404 page, scroll animations, animated counters, fully responsive, keyboard shortcuts, accessible markup.

### Adding more tests
Reading and Listening are data-driven. To add another mock, append an entry to
`window.READING_TESTS` in `assets/js/reading-data.js` (or `window.LISTENING_TESTS`
in `assets/js/listening-data.js`) — the selector and grading engine pick it up automatically.

## 🤖 Gemini AI setup

The AI Tutor and Writing feedback use **your own** Google Gemini API key:

1. Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open **AI Tutor** (or the Writing lab) and paste the key.
3. The key is stored **only in your browser** (`localStorage`) and sent **directly to Google** — never to any other server.

You can switch models (Gemini 2.5 Flash / Pro, 2.0 Flash) in the same panel.

## 🚀 Running it

It's pure HTML/CSS/JS. Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 📁 Structure

```
index.html            courses.html      practice.html
reading.html          listening.html    writing.html
speaking.html         ai-tutor.html     vocabulary.html
calculator.html       about.html
assets/
  css/style.css       — design system
  js/main.js          — shared header/footer, theme, reveals
  js/ai.js            — Gemini client + key panel
  js/reading.js  listening.js  writing.js  speaking.js
  js/vocabulary.js  calculator.js  practice.js  tutor.js
```

## ⚠️ Note

IELTS Master is an independent study tool. It is **not affiliated** with the British Council, IDP, or Cambridge Assessment English. AI band estimates are a helpful guide, not an official examiner score.
