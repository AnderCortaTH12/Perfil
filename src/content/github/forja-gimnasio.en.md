---
slug: "forja-gimnasio"
idioma: "en"
titulo: "Gym - FORJA"
descripcion: "Offline-first workout tracking PWA with exercise library, session logging, progress analytics and body metrics."
repo: "https://github.com/AnderCortaTH12/Gimnasio"
demo: "https://gimnasio-seven-khaki.vercel.app/"
lenguaje: "React + TypeScript"
tags: ["PWA", "Fitness", "Tracking", "IndexedDB", "Offline-first"]
skills: ["React 18", "TypeScript", "Tailwind CSS 3", "Dexie", "IndexedDB", "Zustand", "Recharts", "framer-motion"]
destacado: true
---

**FORJA** is a single-user progressive web app (PWA) for strength training tracking. All data is persisted in the browser using IndexedDB—no backend, no login, no cloud. Your data stays on your device.

> ⚠️ **Compatibility note:** The app is optimized for mobile and works perfectly on Android and iOS devices. Desktop browsers may experience rendering issues. It is recommended to access from a mobile device or use Chrome DevTools with mobile device mode enabled.

## Offline-first architecture

The entire data layer is isolated in `src/db/`, built on Dexie and IndexedDB with a normalized schema. The UI is data-agnostic, so the app works offline with the same responsiveness as online. Global state is centralized in Zustand, and all routing and code-splitting happens automatically at build time.

## Key features

- **Personalized onboarding**: set your height, weight, gender and fitness goals.
- **Exercise library** with ~1,324 movements and GIF demonstrations, organized by muscle group.
- **Weekly training templates** with pre-configured workout days.
- **Live session logging** with touch gestures, automatic rest timers and personal record detection.
- **Progress analytics** with total volume graphs (kg × reps), max strength and trend lines.
- **Body metrics tracking**: weight, height, BMI and historical progression.
- **Backup and restore**: export/import workouts as JSON to switch devices or restore data.
