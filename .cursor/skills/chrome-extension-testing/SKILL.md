---
name: chrome-extension-testing
description: Manual testing and debugging for the Pomodoro Chrome extension. Use when testing timer, storage, notifications, popup, options, or service worker behavior.
---

# Chrome Extension Testing (Pomodoro)

## Load and inspect

1. **Load:** `chrome://extensions` → Developer mode → Load unpacked → select project folder. Ensure icons exist in `assets/icons/` (16, 32, 48, 128px).
2. **Popup:** Click extension icon; right-click inside popup → Inspect (DevTools for popup).
3. **Options:** Right-click icon → Options, or open `options/options.html`; right-click page → Inspect.
4. **Background:** `chrome://extensions` → find extension → "Service worker" link (opens DevTools for service worker).

## What to test

- **Timer:** Start, pause, reset. Close popup and reopen – time should match (state in background). Reload extension – timer should be paused, time preserved (or as per PRD).
- **Sessions:** Complete work → short break; complete 4 work sessions → long break. Progress dots and session counter match.
- **Settings:** Change durations and options in Options → Save. Reopen popup – new durations used for next start. Check `chrome.storage.sync` in DevTools → Application → Storage.
- **Stats:** Today / week / all-time and history. Clear stats – counts and history reset. Data in `chrome.storage.local`.
- **Notifications:** Allow when prompted. Complete work or break – correct notification appears. Toggle sound in options if implemented.

## Debugging

- **Popup/options:** Console and Network in their DevTools. Check for JS errors and failed `chrome.runtime.sendMessage` or storage calls.
- **Background:** Console in service worker DevTools. Log message types and state; check for `clearInterval` on pause/reset so timer stops.
- **Storage:** Application → Storage → Extension storage. Inspect `sync` (settings) and `local` (timer state, stats). Corrupt or stale keys can cause odd behavior – suggest clearing or resetting in options.
- **Messages:** Ensure popup and background agree on message types and payloads. Missing or late `timerUpdate` can make UI out of sync.

## Checklist (after changes)

- [ ] Timer start/pause/reset and persistence across popup close/reopen.
- [ ] Work → short/long break transitions and progress dots.
- [ ] Settings save and apply; sync storage updated.
- [ ] Stats update and clear correctly.
- [ ] Notifications (and sound if enabled) work; no console errors in popup, options, or background.
