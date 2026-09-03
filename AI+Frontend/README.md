# Heritage India — SIH Prototype

Interactive cultural exploration platform built around the journey **India → state selection → Maharashtra → category-driven landmark map → cultural stories**.

## Current frontend flow
- Home: immersive introduction and rotating cultural-event flashcards
- India: geographic state-boundary layer; Maharashtra is the deep prototype
- Maharashtra: category slicer updates active landmarks immediately
- Landmark selection: contextual detail panel, followed by existing cultural-item routes
- Existing AI, multilingual and accessibility systems are retained

## Stack
React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, D3 Geo, Three.js.

## Important next phase
The frontend should now be connected to a real content layer rather than expanded with more hard-coded data.

Recommended architecture:

```
React frontend
   ↓
API / service layer
   ↓
Supabase (PostgreSQL + Storage)
   ├── states
   ├── districts
   ├── cultural_items
   ├── categories
   ├── monuments
   ├── festivals
   ├── sources
   └── translations
```

Keep source URLs, image attribution, verification dates and editorial status for every factual cultural record. Do not let the AI generate historical facts into the database without human verification.

## Map data
The new map components fetch a web-friendly India boundary GeoJSON at runtime. For production, download and commit a reviewed, licensed map dataset into `public/maps/` so the application is not dependent on a third-party runtime URL.

## Run

```bash
npm install
npm run dev
```

On Windows PowerShell, if `npm.ps1` is blocked, run `npm.cmd run dev` or use Command Prompt.
