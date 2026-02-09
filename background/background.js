// Timer state management
let timerState = {
  isRunning: false,
  isPaused: false,
  currentTime: 25 * 60,
  mode: 'work',
  sessionsCompleted: 0,
  sessionsUntilLongBreak: 4
};

let timerInterval = null;

const OFFSCREEN_DOCUMENT_PATH = 'offscreen/offscreen.html';

// Default settings
const defaultSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  badgeEnabled: true
};

// Initialize on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(defaultSettings);
  chrome.storage.local.set({ timerState });
});

// Load state on startup
chrome.storage.local.get(['timerState'], (result) => {
  if (result && result.timerState) {
    timerState = result.timerState;
    // Don't auto-restart timer after browser restart
    timerState.isRunning = false;
    timerState.isPaused = true;
    saveState();
  }
  // Update badge on startup
  chrome.storage.sync.get(defaultSettings, (settings) => {
    updateBadge(timerState, settings);
  });
});

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'startTimer':
      startTimer(message.state);
      sendResponse({ success: true });
      break;
    case 'pauseTimer':
      pauseTimer();
      sendResponse({ success: true });
      break;
    case 'resetTimer':
      resetTimer();
      sendResponse({ success: true });
      break;
    case 'getTimerState':
      sendResponse({ state: timerState });
      break;
  }
  return true;
});

function startTimer(state) {
  if (state) {
    timerState = state;
  }

  timerState.isRunning = true;
  timerState.isPaused = false;

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  // Update badge immediately when starting
  chrome.storage.sync.get(defaultSettings, (settings) => {
    updateBadge(timerState, settings);
  });

  timerInterval = setInterval(() => {
    if (timerState.currentTime > 0) {
      timerState.currentTime--;
      saveState();

      // Update badge every second
      chrome.storage.sync.get(defaultSettings, (settings) => {
        updateBadge(timerState, settings);
      });

      // Notify popup of update (no receiver when popup is closed)
      chrome.runtime.sendMessage({
        type: 'timerUpdate',
        state: timerState
      }).catch(() => {});
    } else {
      completeTimer();
    }
  }, 1000);
}

function pauseTimer() {
  timerState.isRunning = false;
  timerState.isPaused = true;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  saveState();

  // Clear badge when paused
  chrome.storage.sync.get(defaultSettings, (settings) => {
    updateBadge(timerState, settings);
  });
}

function resetTimer() {
  timerState.isRunning = false;
  timerState.isPaused = false;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  chrome.storage.sync.get(defaultSettings, (settings) => {
    timerState.currentTime = getModeDuration(timerState.mode, settings);
    saveState();

    // Clear badge when reset
    updateBadge(timerState, settings);
  });
}

function completeTimer() {
  timerState.isRunning = false;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  // Show notification
  showNotification();

  // Update state for next session
  if (timerState.mode === 'work') {
    timerState.sessionsCompleted++;

    // Save session to daily stats
    saveDailyStats();

    // Determine next mode
    const sessionsBeforeLongBreak = timerState.sessionsCompleted % 4;
    if (sessionsBeforeLongBreak === 0) {
      timerState.mode = 'longBreak';
    } else {
      timerState.mode = 'shortBreak';
    }
  } else {
    timerState.mode = 'work';
  }

  chrome.storage.sync.get(defaultSettings, (settings) => {
    timerState.currentTime = getModeDuration(timerState.mode, settings);
    saveState();

    // Notify popup (no receiver when popup is closed)
    chrome.runtime.sendMessage({
      type: 'timerComplete',
      state: timerState
    }).catch(() => {});

    // Auto-start next session if enabled
    if (
      (timerState.mode === 'work' && settings.autoStartPomodoros) ||
      (timerState.mode !== 'work' && settings.autoStartBreaks)
    ) {
      startTimer();
    } else {
      // Clear badge if not auto-starting
      updateBadge(timerState, settings);
    }
  });
}

function showNotification() {
  chrome.storage.sync.get(defaultSettings, (settings) => {
    let title, message;

    if (timerState.mode === 'work') {
      title = '🎉 Work Session Complete!';
      message = 'Great job! Time for a break.';
    } else if (timerState.mode === 'shortBreak') {
      title = '☕ Break Complete!';
      message = 'Ready to get back to work?';
    } else {
      title = '🌟 Long Break Complete!';
      message = 'Refreshed and ready for more productive work!';
    }

    chrome.notifications.create({
      type: 'basic',
      iconUrl: '../assets/icons/icon128.png',
      title: title,
      message: message,
      priority: 2
    });

    // Play sound if enabled
    if (settings.soundEnabled) {
      playNotificationSound();
    }
  });
}

async function setupOffscreenDocument() {
  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH);
  const existing = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [offscreenUrl]
  });
  if (existing.length > 0) return;
  await chrome.offscreen.createDocument({
    url: OFFSCREEN_DOCUMENT_PATH,
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Play notification sound when timer completes.'
  });
}

function playNotificationSound() {
  setupOffscreenDocument()
    .then(() => {
      // Brief delay so offscreen document has registered its message listener
      return new Promise((r) => setTimeout(r, 50));
    })
    .then(() => {
      chrome.runtime.sendMessage({ type: 'playNotificationSound' }).catch(() => {});
    })
    .catch(() => {});
}

function saveDailyStats() {
  const today = new Date().toISOString().split('T')[0];

  chrome.storage.local.get(['dailyStats'], (result) => {
    let dailyStats = result.dailyStats || {};

    if (!dailyStats[today]) {
      dailyStats[today] = {
        sessions: 0,
        date: today
      };
    }

    dailyStats[today].sessions++;

    chrome.storage.local.set({ dailyStats });
  });
}

function getModeDuration(mode, settings) {
  switch (mode) {
    case 'work':
      return settings.workDuration * 60;
    case 'shortBreak':
      return settings.shortBreakDuration * 60;
    case 'longBreak':
      return settings.longBreakDuration * 60;
    default:
      return 25 * 60;
  }
}

function saveState() {
  chrome.storage.local.set({ timerState });
}

// Badge Functions
function formatBadgeTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // Chrome badge text limited to 4 characters
  if (minutes >= 10) {
    // Format: "25:0" (4 chars)
    return `${minutes}:${Math.floor(secs / 10)}`;
  } else {
    // Format: "9:59" (4 chars)
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

function updateBadge(state, settings) {
  // Clear badge if not running or badge disabled
  if (!state.isRunning || !settings.badgeEnabled) {
    chrome.action.setBadgeText({ text: '' });
    return;
  }

  // Set badge text and color
  const badgeText = formatBadgeTime(state.currentTime);
  chrome.action.setBadgeText({ text: badgeText });

  // Set vintage retro color - black background
  chrome.action.setBadgeBackgroundColor({ color: '#1a1a1a' });
}
