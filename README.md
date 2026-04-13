# 🛡️ StopThePwnage.com

**Cybersecurity awareness through play.** An open-source game hub that teaches real-world security skills through hands-on, interactive challenges — not lectures.

🌐 **Live at [stopthepwnage.com](https://stopthepwnage.com)**

## Games

### 🛡️ DataGuard — Scenario Challenges
*Solo · Self-paced*

Five interactive scenarios covering the fundamentals of personal cybersecurity:

- **Password Fortress** — Build strong passwords and passphrases, recover from breaches
- **Two-Factor Thinking** — Choose the right MFA method for the situation
- **Phishing Hunt** — Spot red flags in suspicious emails and identify fakes
- **App Permissions** — Decide what access apps really need
- **Data Breach Triage** — Classify sensitive vs. safe data under pressure

Includes a **proctored mode** for classroom and booth deployments — hides navigation during play, adds a reset flow between students.

### ⚡ Exploit Jeopardy
*Instructor-led · Group play*

A Jeopardy-style trivia board designed for live sessions. Project it on a screen, click through questions, reveal answers, and track team scores. Five categories, 25 questions, 200–1000 point values.

Categories: Password Sins · Phish or Legit · Lock It Down · Breach Aftermath · Social Engineering

### 🤺 Hacked Feud
*Instructor-led or Solo*

Family Feud meets cybersecurity. Two play modes:

- **Team Battle** — Facilitator reads questions, teams guess, strike system, manual scoring
- **Solo Play** — Type your guesses with fuzzy matching, track your own score

Five rounds of ranked answers based on real-world cybersecurity survey-style questions.

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JS — no frameworks, no build step, no dependencies
- **Shared theme:** CSS custom properties in `shared/theme.css` — dark cyberpunk aesthetic with animated grid background and scanline overlay
- **Fonts:** [Space Mono](https://fonts.google.com/specimen/Space+Mono) + [Syne](https://fonts.google.com/specimen/Syne) via Google Fonts CDN
- **Hosting:** AWS Amplify — auto-deploys on push to `main`
- **DNS:** Cloudflare

## Project Structure

```
stopthepwnage/
├── index.html           ← Hub page (game picker)
├── shared/
│   └── theme.css        ← Shared design tokens & base styles
├── dataguard/
│   └── index.html       ← DataGuard scenario game
├── jeopardy/
│   └── index.html       ← Exploit Jeopardy
├── feud/
│   └── index.html       ← Hacked Feud
├── CLAUDE.md            ← AI assistant context file
├── LICENSE              ← MIT
└── README.md            ← You are here
```

Each game is a single, self-contained HTML file. No bundler, no node_modules, no build step. Clone it, open it, it works.

## Customizing Content

### Exploit Jeopardy
Edit the `CATEGORIES` array at the top of `jeopardy/index.html`:

```js
const CATEGORIES = [
  {
    name: "Your Category",
    questions: [
      { value: 200, question: "Your question", answer: "Your answer" },
      // ...
    ]
  },
  // ...
];
```

### Hacked Feud
Edit the `ROUNDS` array at the top of `feud/index.html`:

```js
const ROUNDS = [
  {
    question: "Your survey question",
    answers: [
      { text: "Top answer", points: 42 },
      { text: "Second answer", points: 28 },
      // ...
    ]
  },
  // ...
];
```

## For Facilitators

Both Exploit Jeopardy and Hacked Feud are designed for projection:

- **Direct links work** — bookmark `stopthepwnage.com/jeopardy/` or `stopthepwnage.com/feud/` and go straight to the game
- **No setup required** — open the URL, start playing
- **Big-screen optimized** — large text, high contrast, readable from across a room
- **Click-to-reveal answers** — no separate control view needed

## Development

```bash
# Clone
git clone https://github.com/skoz50/stopthepwnage.git
cd stopthepwnage

# Edit any HTML file directly — no build step

# Deploy (if you have Amplify connected)
git add . && git commit -m "your change" && git push origin main
# Auto-deploys in ~1 minute
```

## Contributing

Contributions welcome! The easiest ways to help:

- **Write questions** for Exploit Jeopardy or Hacked Feud
- **Report bugs** via [GitHub Issues](https://github.com/skoz50/stopthepwnage/issues)
- **Suggest new scenarios** for DataGuard
- **Test on different devices** and report what breaks

## License

[MIT](LICENSE) — StopThePwnage Contributors