# StopThePwnage.com — Claude Code Context

## Project Overview
A cybersecurity awareness **game hub** deployed at **stopthepwnage.com**.
Multiple self-contained games teach real-world security skills through hands-on interaction.
No frameworks, no backend, no build step.

## Stack
- **Frontend:** Vanilla HTML/CSS/JS — each game is a single `index.html` in its own directory
- **Shared styles:** `shared/theme.css` — design tokens, grid background, scanline overlay, fonts
- **Fonts:** Google Fonts CDN — Space Mono (monospace/code feel) + Syne (display headings)
- **Hosting:** AWS Amplify — GitHub-connected, auto-deploys on push to `main`
- **DNS:** Cloudflare — CNAME pointing to Amplify-generated domain
- **Repo:** https://github.com/skoz50/stopthepwnage
- **Status:** 🟢 Live

## File Structure
```
stopthepwnage/
├── CLAUDE.md                ← you are here
├── LICENSE                  ← MIT (StopThePwnage Contributors)
├── README.md                ← public-facing project description
├── index.html               ← hub page (game picker)
├── shared/
│   └── theme.css            ← shared design tokens & base styles
├── dataguard/
│   └── index.html           ← DataGuard scenario game (solo, self-paced)
├── jeopardy/
│   └── index.html           ← Exploit Jeopardy (instructor-led, group)
└── feud/
    └── index.html           ← Hacked Feud (instructor-led, group or solo)
```

## Games

### Hub (root index.html)
- Game card grid linking to each game
- Visual badges on cards: "Solo" / "Instructor-Led"
- Coming Soon placeholder cards for future games
- Same cyberpunk aesthetic as all sub-games

### DataGuard (`/dataguard/`) — Scenario Game
- **Type:** Solo, self-paced
- **Name:** DataGuard *(placeholder — will be renamed later)*
- Five interactive scenarios covering passwords, phishing, app permissions, data breach triage, and MFA
- Three screens toggled via `showScreen(id)`: splashScreen, gameScreen, scoreScreen
- Flow: scenario card → `startScenario(id)` → `renderStep()` → user interacts → `handleMainAction()` → score screen
- State vars: `currentScenario`, `currentStep`, `gameScore`, `health`, `stepData`, `lastScenario`
- Proctored mode toggle available on splash screen

#### Scenarios
| # | Key           | Title               | Difficulty | Steps |
|---|---------------|---------------------|------------|-------|
| 1 | `password`    | Password Fortress   | Easy       | 3     |
| 2 | `mfa`         | Two-Factor Thinking | Easy       | 2     |
| 3 | `phishing`    | Phishing Hunt       | Medium     | 2     |
| 4 | `permissions` | App Permissions     | Medium     | 2     |
| 5 | `breach`      | Data Breach Triage  | Hard       | 2     |

#### Adding a New Scenario
1. Add entry to `SCENARIOS` object with `icon`, `meta`, `title`, `desc`, `steps`, `learnings[]`
2. Add a scenario card in the splash grid HTML calling `startScenario('yourkey')`
3. Add a render function: `renderYourScenarioStep(container, btn)`
4. Add a handler function: `handleYourScenarioAction(isLastStep)`
5. Wire both into the `renderStep()` and `handleMainAction()` dispatch blocks

#### Scoring
- Each step contributes `{ score, max }` to `gameScore.details`
- Final percentage = `total / max * 100`
- Grade thresholds: 90%+ = Expert, 75%+ = Savvy, 55%+ = Getting There, <55% = Needs Work
- `health` bar is cosmetic feedback only — does not affect final score

### Exploit Jeopardy (`/jeopardy/`) — Jeopardy Game
- **Type:** Instructor-led, group play
- Facilitator projects on screen, clicks through the board
- Standard Jeopardy grid: categories across top, point values down
- Click tile → show question → "Reveal Answer" button for facilitator
- No separate control view — single-screen click-to-reveal flow
- Direct URL bookmarkable for facilitators

### Hacked Feud (`/feud/`) — Family Feud Game
- **Type:** Instructor-led, group play (or solo)
- "Survey says" format with cybersecurity topics
- Click-to-reveal answer mechanic

## Design System

### Shared Theme (shared/theme.css)
All design tokens are CSS custom properties defined in `:root`. Always use these — never hardcode colors.

| Variable   | Value       | Usage                             |
|------------|-------------|-----------------------------------|
| `--bg`     | `#0a0e1a`   | Page background                   |
| `--panel`  | `#111827`   | Cards, zones                      |
| `--border` | `#1e2d4a`   | Borders, dividers                 |
| `--accent` | `#00e5ff`   | Primary accent (cyan)             |
| `--danger` | `#ff3b5c`   | Errors, threats, bad choices      |
| `--warn`   | `#ffb800`   | Warnings, partial credit          |
| `--good`   | `#00e676`   | Success, correct answers          |
| `--text`   | `#e2e8f0`   | Body text                         |
| `--muted`  | `#64748b`   | Secondary/label text              |
| `--glow`   | cyan shadow | Hover glow on interactive elements|

**Aesthetic:** Dark cyberpunk/terminal. Animated grid background. Scanline overlay.
Space Mono for all labels, code, monospaced elements. Syne for headings and UI text.

### Per-Game Styles
Each game keeps its own component CSS inline in its `<style>` block.
Link the shared theme first: `<link rel="stylesheet" href="/shared/theme.css">`

## Coding Conventions
- **No frameworks.** Vanilla only — no React, no Vue, no bundler.
- **No external JS.** Google Fonts CDN is the only external dependency allowed.
- **Single file per game.** All game-specific CSS in `<style>`, all JS in `<script>` within that game's `index.html`.
- **Shared theme via CSS file.** Base tokens and visual identity in `shared/theme.css`, linked from every page.
- **CSS variables only.** Never hardcode a color — always use a `--variable`.
- **Mobile-first.** All new UI must work at 375px. Use `clamp()` for font sizes.
- **Accessibility.** Interactive elements need visible focus states. Semantic HTML where possible.
- **No localStorage.** All state lives in JS variables only.
- **Paths use leading slash.** Link shared assets as `/shared/theme.css` so they resolve from any subdirectory.

## Deploy Process
```bash
# After any changes:
git add . && git commit -m "describe your change" && git push origin main
# Amplify auto-deploys on push — ~1 min build time
# Verify at stopthepwnage.com

# To quit Claude Code cleanly:
/exit
```

### Mac path
```bash
cd ~/ClaudeCode/stopthepwnage && claude
```

### Windows path
```bash
cd C:\Users\skoz5\ClaudeCode\stopthepwnage && claude
```

### Manual Deploy (fallback)
1. Zip all files → `deploy.zip`
2. Amplify Console → app → **Deploy** → drag zip file

## Initial Repo Setup (First Time Only)

### 1. Create GitHub repo and push
```bash
gh auth login
mkdir stopthepwnage && cd stopthepwnage
git init && git checkout -b main
git add . && git commit -m "initial commit"
gh repo create stopthepwnage --public --source=. --remote=origin --push
```

### 2. Connect to AWS Amplify
1. Amplify Console → New app → Host web app → GitHub → select repo, branch `main`
2. Build command: *(blank)* / Output directory: `/`
3. Deploy

### 3. Custom domain
1. Amplify → Domain management → Add `stopthepwnage.com`
2. Cloudflare DNS: CNAME `@` → Amplify domain, DNS only (gray cloud)
3. HTTPS auto-provisions via ACM

## Backlog

### New DataGuard Scenarios
- [ ] Wi-Fi Safety — choose safe networks, VPN decisions, public Wi-Fi risks
- [ ] Vishing/Smishing — identify manipulation tactics in phone calls or texts
- [ ] Deepfake Detection — spot fake requests "from your boss" across channels
- [ ] Lock It Down — device security checklist (screen lock, encryption, auto-updates)
- [ ] Clean Desk Audit — spot sensitive items exposed in a workspace
- [ ] You've Been Hacked — first 5 things to do after account compromise
- [ ] Pretexting Panic — evaluate social engineering attempts (comply, verify, refuse)
- [ ] Social Media Leak — flag posts revealing security answers, location patterns, employer info
- [ ] Update or Regret — triage update notifications, spot fake update prompts
- [ ] USB Drop — decision tree for finding a USB drive
- [ ] Link Detective — examine URLs, spot disguised malicious links
- [ ] Ransomware Response — step through the first 10 minutes after a ransomware attack
- [ ] Insider Threat Spotter — flag potential insider threat indicators vs normal activity

### Future Games
- [ ] Spot the Deepfake — next game after Exploit Jeopardy and Hacked Feud

### Features & Enhancements
- [ ] Randomized scenario content for replayability (FR-003)
- [ ] Font size controls (FR-001)
- [ ] Shareable score card (PNG or encoded URL)
- [ ] Leaderboard (Cloudflare Worker + KV, or lightweight backend)
- [ ] Buy Me a Coffee or attribution footer

## Owner
Brandon (skoz) — stopthepwnage.com
Related project: skozshouse.net (TCG storefront, same Amplify + Cloudflare stack)
