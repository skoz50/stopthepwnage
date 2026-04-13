# StopThePwnage.com

A hands-on cybersecurity awareness game that teaches real-world security skills through interactive scenarios. Instead of reading about threats, players make decisions, spot red flags, and learn from immediate feedback.

**Play it now:** [stopthepwnage.com](https://stopthepwnage.com)

## Scenarios

Scenarios are ordered from Easy to Hard to guide players through a natural progression:

| # | Scenario | What You'll Learn | Difficulty |
|---|----------|-------------------|------------|
| 1 | Password Fortress | Crafting strong passwords and passphrases that resist brute-force attacks | Easy |
| 2 | Two-Factor Thinking | Choosing the most secure MFA methods to protect your accounts | Easy |
| 3 | Phishing Hunt | Identifying red flags in suspicious emails before clicking anything | Medium |
| 4 | App Permissions | Deciding which permissions to grant or deny when installing apps | Medium |
| 5 | Data Breach Triage | Classifying sensitive vs. safe data when your information is compromised | Hard |

## How It Works

Players select a scenario from the main screen and work through interactive steps — typing passwords, clicking suspicious elements in a mock email, toggling app permissions, and more. Each action is scored in real time with feedback explaining *why* a choice was good or bad. At the end, a score breakdown highlights what you got right and what to watch for next time.

### Key Features

- **Strength-gated password scoring** — Length is the primary factor. Short passwords can never rate above "Weak" regardless of character variety. Includes confirm-password validation and breached password reuse detection.
- **Dedicated passphrase evaluator** — The passphrase step validates word count, separators, total length, and detects common sentences rather than reusing traditional password scoring.
- **Fair challenge design** — Answers are never revealed before submission. MFA rankings are hidden during selection, phishing red flags don't change cursor on hover, and the Real vs. Fake email step defers its reveal.
- **Data Breach classification** — Explicit "Sensitive" / "Safe" buttons per item (not click-to-cycle). All items must be classified before submission.
- **Completion tracking** — Completed scenarios show a score badge on the card. Cards remain replayable and track your best score.
- **Proctored mode** — A subtle toggle at the bottom of the splash screen enables classroom use. Hides navigation during gameplay and requires confirmation before resetting progress for the next student.

## Tech Stack

- **Frontend:** Single-file vanilla HTML/CSS/JS — no frameworks, no build step
- **Fonts:** Space Mono + Syne via Google Fonts CDN
- **Hosting:** AWS Amplify with auto-deploy on push to `main`
- **DNS:** Cloudflare
- **Design:** Dark cyberpunk/terminal aesthetic with CSS custom properties, animated grid background, and scanline overlay

## License

MIT
