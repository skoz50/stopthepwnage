# CyberInspire — Demo Landing Page

A proof-of-concept landing page demonstrating what a custom-built site could look like for **CyberInspire**, a cybersecurity awareness outreach program created by Aflac Global Security.

**Live demo:** https://stopthepwnage.com/cyberinspire_test/

## Not Affiliated

This is an **independent, unsolicited demo** built to showcase web design and development capabilities. It is **not affiliated with, endorsed by, or commissioned by Aflac, Aflac Global Security, or the CyberInspire program**. All CyberInspire branding, program names, event details, and content references are property of their respective owners and are used here solely for the purpose of demonstrating a hypothetical custom landing page.

If you are affiliated with CyberInspire or Aflac and have concerns about this demo, please open an issue on this repository.

## What's Here

A single self-contained `index.html` file plus a small `assets/` directory of self-authored SVG illustrations (each marked with an inline DEMO watermark to make their placeholder status unambiguous).

The page demonstrates:

- A full hero, three-track program tabbed section, program spotlights, activity catalog, impact stats, event timeline, and contact section
- Mobile-first responsive layout with deep-linking and ARIA-compliant tabs
- A clean editorial aesthetic distinct from the parent repository's StopThePwnage cyberpunk theme

## Stack

- Vanilla HTML, CSS, and JavaScript — no frameworks, no build step
- Google Fonts CDN (Inter, Poppins, Montserrat)
- Own color palette defined as CSS custom properties
- Self-authored SVG illustrations for placeholder visuals

## Status

Demo is live and stable as of April 2026. Pending feedback from the CyberInspire team. See the parent repository's deploy workflow (AWS Amplify auto-deploy on push to `main`, Cloudflare DNS) for hosting details.

## Parent Repository

This folder lives inside the [`stopthepwnage`](https://github.com/skoz50/stopthepwnage) repository, which primarily hosts a separate cybersecurity awareness game at [stopthepwnage.com](https://stopthepwnage.com). The CyberInspire demo is parked here as an unlinked subfolder and shares the same deploy pipeline.
