---
name: pomodoro-timer-logic
description: Implements or debugs Pomodoro timer and session logic (work, short break, long break, session count, progress dots). Use when changing timer flow, session transitions, or 4-sessions-to-long-break behavior.
---

# Pomodoro Timer & Session Logic

## Session flow

1. **Work** (default) → when `currentTime` hits 0 → increment `sessionsCompleted`, decrement `sessionsUntilLongBreak`.
2. **Next mode:** If `sessionsUntilLongBreak === 0` → **Long Break** and set `sessionsUntilLongBreak = 4`. Else → **Short Break**.
3. **Short Break** or **Long Break** → when time hits 0 → switch to **Work** (and optionally auto-start if settings say so).
4. **Progress dots:** 4 dots = next 4 work sessions until long break. Typically dot N filled when `sessionsUntilLongBreak <= (4 - N)` or equivalent.

## Durations (minutes, from settings)

- Work: `workDuration` (default 25).
- Short break: `shortBreakDuration` (default 5).
- Long break: `longBreakDuration` (default 15).

Initial `currentTime` = duration × 60 (seconds). Load from settings when starting a session or when mode changes.

## State invariants

- `sessionsUntilLongBreak`: 1–4. Becomes 4 after a long break; decremented after each completed work session.
- `sessionsCompleted`: total completed work sessions (used for stats and “today” count).
- On **reset:** typically reset to work mode, full work duration, `sessionsUntilLongBreak = 4`; do not reset `sessionsCompleted` (or follow PRD if “reset” should clear session count).

## Where logic lives

- **background.js:** `setInterval` tick, decrement `currentTime`, save state, on 0 → show notification, compute next mode, set new duration, optionally start next session (auto-start).
- **popup.js:** Display only; receives `timerUpdate` and `timerComplete`, updates UI and progress dots. Start/pause/reset send messages to background.

When changing session rules (e.g. number of work sessions before long break), update both background logic and any dot/UI logic in popup.
