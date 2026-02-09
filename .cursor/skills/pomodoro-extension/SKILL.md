---
name: pomodoro-extension
description: Build and modify the Pomodoro Chrome extension (Manifest V3). Use when working on background service worker, popup, options page, timer logic, Chrome storage, or message passing in this project.
---

# Pomodoro Chrome Extension

## Project layout

- **Source of truth:** `docs/PRD.md` – features, phases, tech stack, limitations.
- **Background:** `background/background.js` – timer engine, state, alarms, notifications. Service worker; no long-lived in-memory state.
- **Popup:** `popup/` – main UI (350×500px), timer display, controls, progress dots. Sends messages to background; receives `timerUpdate` and `timerComplete`.
- **Options:** `options/` – settings (durations, sound, auto-start), stats (today/week/all-time), history, clear stats. Uses `chrome.storage.sync` for settings, `chrome.storage.local` for stats.
- **Assets:** `assets/icons/` (16, 32, 48, 128px), `assets/sounds/` (tick, complete).

## Key contracts

**Timer state** (in background and popup; keep in sync):

- `isRunning`, `isPaused`, `currentTime` (seconds), `mode` (`'work'|'shortBreak'|'longBreak'`), `sessionsCompleted`, `sessionsUntilLongBreak` (1–4).

**Settings** (`chrome.storage.sync`):

- `workDuration`, `shortBreakDuration`, `longBreakDuration` (minutes), `soundEnabled`, `autoStartBreaks`, `autoStartPomodoros`.

**Message types:**

- Popup → background: `startTimer`, `pauseTimer`, `resetTimer`, `getTimerState`.
- Background → popup: `timerUpdate`, `timerComplete`.

**Session flow:** Work → Short Break (×3) → Work → Long Break; then repeat. `sessionsUntilLongBreak` counts down from 4 to 1; after 4th work session, long break and reset to 4.

## Rules

1. **State lives in background** – Popup reflects state via messages; do not run a separate timer in popup.
2. **Storage** – Settings in `chrome.storage.sync`; timer state and stats in `chrome.storage.local`.
3. **Validation** – Durations: work/long 1–60 min, short 1–30 min (see options.js). Validate in options before save.
4. **New features** – Align with PRD phases and future enhancements; update PRD and comments when behavior or setup changes.

## Quick reference

- Load unpacked: `chrome://extensions` → Developer mode → Load unpacked → project folder.
- Inspect popup/options: right-click extension icon or options page → Inspect.
- Inspect background: `chrome://extensions` → "Service worker" under the extension.
