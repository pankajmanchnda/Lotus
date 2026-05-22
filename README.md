# Ananta Ayurveda Engine Prototype

This folder contains a Vite/React TypeScript prototype for Ananta Ayurveda Engine, an Ayurvedic intake and wellness guidance app.

## What It Does

- Collects user/patient context: location, age, weight, height, routine, symptoms, body tendency, health goals, allergies, medications, and risk notes.
- Simulates step-data import for an eventual Apple HealthKit, Google Fit, or Pacer integration.
- Searches a seed Ayurvedic knowledge base.
- Generates educational lifestyle, food rhythm, and botanical-support guidance.
- Screens for red flags and pauses recommendations when clinician review is safer.
- Includes a U.S. market and compliance brief.

## Important Boundary

This prototype is not medical software and does not diagnose, treat, cure, mitigate, or prevent disease. It is designed as a safer product scaffold for wellness education, practitioner review, and compliance planning.

## Files

- `index.html` is the Vite shell.
- `vite.config.ts` configures the build for static hosting.
- `src/App.tsx` is the app UI.
- `src/engine.ts` contains the prototype recommendation and safety logic.
- `src/libraryData.ts` is the editable seed knowledge base.
- `src/types.ts` contains shared TypeScript types.
- `docs/vibe-coding-prompt.md` is the build prompt.
- `docs/us-market-compliance.md` is the U.S. compliance brief.

## Running Locally

Install dependencies and run the Vite dev server.

```text
npm install
npm run dev
```
