# StopThePwnage.com

A hands-on cybersecurity awareness game that teaches real-world security skills through interactive scenarios. Instead of reading about threats, players make decisions, spot red flags, and learn from immediate feedback.

**Play it now:** [stopthepwnage.com](https://stopthepwnage.com)

## Scenarios

| # | Scenario | What You'll Learn | Difficulty |
|---|----------|-------------------|------------|
| 1 | Password Fortress | Crafting strong passwords and passphrases that resist brute-force attacks | Easy |
| 2 | Phishing Hunt | Identifying red flags in suspicious emails before clicking anything | Medium |
| 3 | App Permissions | Deciding which permissions to grant or deny when installing apps | Medium |
| 4 | Data Breach Triage | Prioritizing the right response steps when your data is compromised | Hard |
| 5 | Two-Factor Thinking | Choosing the most secure MFA methods to protect your accounts | Easy |

## How It Works

Players select a scenario from the main screen and work through interactive steps — typing passwords, clicking suspicious elements in a mock email, toggling app permissions, and more. Each action is scored in real time with feedback explaining *why* a choice was good or bad. At the end, a score breakdown highlights what you got right and what to watch for next time.

## Tech Stack

- **Frontend:** Single-file vanilla HTML/CSS/JS — no frameworks, no build step
- **Fonts:** Space Mono + Syne via Google Fonts CDN
- **Hosting:** AWS Amplify with auto-deploy on push to `main`
- **DNS:** Cloudflare

## License

MIT
