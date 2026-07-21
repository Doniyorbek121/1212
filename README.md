# IELTS Master

A complete, professional IELTS preparation website — fully static, responsive, and 100% working in the browser. No build step, no backend required.

Inspired by sites like ielts.gg, but with an original design system, richer interactivity, and an optional **Gemini-powered AI tutor**.

## ✨ Features

| Module | What it does |
|--------|--------------|
| **Home** | Modern landing page with hero, features, pricing, testimonials, FAQ |
| **Courses** | Strategy lessons for all four skills |
| **Reading** | Full Academic passage, 13 self-marking questions (TFNG, gap-fill, matching), timer, band estimate |
| **Listening** | Section 1 with **real audio playback** (browser speech synthesis), note completion + MCQs |
| **Writing** | Task 1 & 2 prompts, live word/sentence counter, band-9 model answers, **AI feedback** |
| **Speaking** | Parts 1–3 questions, Part 2 cue cards, prep/talk timer, spoken questions |
| **AI Tutor** | Chat with a Gemini-powered IELTS tutor (bring your own API key) |
| **Vocabulary** | Interactive flashcards across 5 topics with pronunciation |
| **Band Calculator** | Overall band (official rounding) + raw-score → band conversion |
| **About / Contact** | Mission page and a working contact form |

Extras: light/dark theme (persisted), progress tracking (localStorage), scroll animations, animated counters, fully responsive, keyboard shortcuts, accessible markup.

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
