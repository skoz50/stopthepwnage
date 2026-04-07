# StopThePwnage.com — Claude Code Context

## Project Overview
A single-page, self-contained cybersecurity awareness game deployed at **stopthepwnage.com**.
Players navigate five interactive scenarios that teach real-world security skills through
hands-on decisions rather than passive reading. No frameworks, no backend, no build step.

## Stack
- **Frontend:** Vanilla HTML/CSS/JS — everything lives in `index.html`
- **Fonts:** Google Fonts CDN — Space Mono (monospace/code feel) + Syne (display headings)
- **Hosting:** AWS Amplify (manual deploy or GitHub-connected auto-deploy)
- **DNS:** Cloudflare — CNAME pointing to Amplify-generated domain
- **Repo:** GitHub → connected to Amplify for auto-deploy on push to `main`

## File Structure
```
stopthepwnage/
├── CLAUDE.md       ← you are here
├── index.html      ← entire application (single file)
└── README.md       ← public-facing project description
```

## Design System
All design tokens are CSS custom properties defined in `:root`. Always use these — never
hardcode colors or values.

| Variable      | Value       | Usage                        |
|---------------|-------------|------------------------------|
| `--bg`        | `#0a0e1a`   | Page background              |
| `--panel`     | `#111827`   | Cards, zones                 |
| `--border`    | `#1e2d4a`   | Borders, dividers            |
| `--accent`    | `#00e5ff`   | Primary accent (cyan)        |
| `--danger`    | `#ff3b5c`   | Errors, threats, bad choices |
| `--warn`      | `#ffb800`   | Warnings, partial credit     |
| `--good`      | `#00e676`   | Success, correct answers     |
| `--text`      | `#e2e8f0`   | Body text                    |
| `--muted`     | `#64748b`   | Secondary/label text         |
| `--glow`      | cyan shadow | Hover glow on interactive elements |

**Aesthetic:** Dark cyberpunk/terminal. Animated grid background. Scanline overlay.
Space Mono for all labels, code, and monospaced elements. Syne for headings and UI text.

## Architecture — How the Game Works

### Screens
Three screens toggled via `showScreen(id)` — only one `.active` at a time:
- `splashScreen` — scenario selection grid
- `gameScreen` — active scenario with step progress dots
- `scoreScreen` — results ring, breakdown, key takeaways

### Scenario Flow
1. User picks a scenario card → `startScenario(id)` resets all state
2. `renderStep()` dispatches to the correct scenario renderer based on `currentScenario`
3. User interacts with the rendered UI (typing, clicking, toggling)
4. `handleMainAction()` evaluates the interaction, updates `gameScore` and `health`, shows feedback
5. After last step → score screen with animated ring, per-step breakdown, and key learnings

### State Variables
```js
currentScenario  // string key: 'password' | 'phishing' | 'permissions' | 'breach' | 'mfa'
currentStep      // int, 0-indexed within current scenario
gameScore        // { total, max, details[] } — accumulated across steps
health           // 0–100, displayed in header bar
stepData         // freeform object for per-step interaction state
lastScenario     // used by retryScenario()
```

### Adding a New Scenario
1. Add entry to `SCENARIOS` object with `icon`, `meta`, `title`, `desc`, `steps`, `learnings[]`
2. Add a scenario card in the splash grid HTML calling `startScenario('yourkey')`
3. Add a render function: `renderYourScenarioStep(container, btn)`
4. Add a handler function: `handleYourScenarioAction(isLastStep)`
5. Wire both into the `renderStep()` and `handleMainAction()` dispatch blocks

## Scenarios (Current)
| # | Key | Title | Difficulty | Steps |
|---|-----|-------|------------|-------|
| 1 | `password` | Password Fortress | Easy | 3 |
| 2 | `phishing` | Phishing Hunt | Medium | 2 |
| 3 | `permissions` | App Permissions | Medium | 2 |
| 4 | `breach` | Data Breach Triage | Hard | 2 |
| 5 | `mfa` | Two-Factor Thinking | Easy | 2 |

## Scoring
- Each step contributes `{ score, max }` to `gameScore.details`
- Final percentage = `total / max * 100`
- Grade thresholds: 90%+ = Expert, 75%+ = Savvy, 55%+ = Getting There, <55% = Needs Work
- `health` bar is cosmetic feedback only — does not affect final score

## Initial Repo Setup (First Time Only)

### 1. Create GitHub repo and push
```bash
# Install gh CLI if not already: https://cli.github.com
gh auth login                          # if not already authenticated

mkdir stopthepwnage && cd stopthepwnage
git init
git checkout -b main

# Add your files (index.html, CLAUDE.md, README.md)

git add .
git commit -m "initial commit"

gh repo create stopthepwnage \
  --public \
  --source=. \
  --remote=origin \
  --push
```

### 2. Connect GitHub repo to AWS Amplify
1. AWS Amplify Console → **New app → Host web app**
2. Choose **GitHub** → authorize → select `stopthepwnage` repo, branch `main`
3. Build settings — override with:
   - Build command: *(leave blank)*
   - Output directory: `/` (or `.`)
4. Deploy — note the generated URL (`https://main.xxxxxx.amplifyapp.com`)

### 3. Add custom domain in Amplify
1. Amplify Console → App settings → **Domain management → Add domain**
2. Enter `stopthepwnage.com`
3. Amplify will provide a CNAME record to add in Cloudflare

### 4. Configure Cloudflare DNS
- Add CNAME: `@` (or `www`) → Amplify domain
- Proxy status: **DNS only** (gray cloud) — do not orange-cloud Amplify domains
- HTTPS cert auto-provisions via ACM (~2 min)

## Ongoing Deploy Process
```bash
# After any change to index.html:
git add . && git commit -m "describe your change" && git push origin main
# Amplify auto-deploys on push — ~1 min build time
# Verify at stopthepwnage.com
```

### Manual Deploy (fallback, no Git)
1. Zip `index.html` → `deploy.zip`
2. Amplify Console → app → **Deploy** → drag zip file

## Coding Conventions
- **No frameworks.** Keep it vanilla — no React, no Vue, no bundler.
- **No external JS.** Google Fonts CDN is the only external dependency allowed.
- **Single file.** All CSS in `<style>`, all JS in `<script>` — do not split into separate files.
- **CSS variables only.** Never hardcode a color value — always reference a `--variable`.
- **Mobile-first.** All new UI must be tested at 375px width. Use `clamp()` for font sizes.
- **Accessibility.** Interactive elements need visible focus states. Use semantic HTML where possible.
- **No localStorage.** All state lives in JS variables — no browser storage APIs.

## Backlog / Future Ideas
- [ ] Scenario 6: Public Wi-Fi risks (connecting to rogue hotspots)
- [ ] Scenario 7: Social engineering / vishing phone call simulation
- [ ] Shareable score card (generate a PNG or URL with result)
- [ ] Leaderboard (would require a lightweight backend or Cloudflare Worker + KV)
- [ ] About/info page wrapper with nav (currently pure game, no chrome)
- [ ] Connect Amplify to GitHub for auto-deploy (currently manual zip upload)
- [ ] Add Buy Me a Coffee or attribution footer

## Owner
Brandon (skoz) — stopthepwnage.com
Related project: skozshouse.net (TCG storefront, same Amplify + Cloudflare stack)
