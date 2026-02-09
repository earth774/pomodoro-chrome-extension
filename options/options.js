// DOM Elements
const workDuration = document.getElementById('workDuration');
const shortBreakDuration = document.getElementById('shortBreakDuration');
const longBreakDuration = document.getElementById('longBreakDuration');
const soundEnabled = document.getElementById('soundEnabled');
const badgeEnabled = document.getElementById('badgeEnabled');
const autoStartBreaks = document.getElementById('autoStartBreaks');
const autoStartPomodoros = document.getElementById('autoStartPomodoros');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const clearStatsBtn = document.getElementById('clearStats');
const saveMessage = document.getElementById('saveMessage');
const todayCount = document.getElementById('todayCount');
const weekCount = document.getElementById('weekCount');
const totalCount = document.getElementById('totalCount');
const historyList = document.getElementById('historyList');

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

// Load settings on page load
loadSettings();
loadStats();

// Event Listeners
saveBtn.addEventListener('click', saveSettings);
resetBtn.addEventListener('click', resetSettings);
clearStatsBtn.addEventListener('click', clearStats);

function loadSettings() {
  chrome.storage.sync.get(defaultSettings, (settings) => {
    workDuration.value = settings.workDuration;
    shortBreakDuration.value = settings.shortBreakDuration;
    longBreakDuration.value = settings.longBreakDuration;
    soundEnabled.checked = settings.soundEnabled;
    badgeEnabled.checked = settings.badgeEnabled;
    autoStartBreaks.checked = settings.autoStartBreaks;
    autoStartPomodoros.checked = settings.autoStartPomodoros;
  });
}

function saveSettings() {
  const settings = {
    workDuration: parseInt(workDuration.value),
    shortBreakDuration: parseInt(shortBreakDuration.value),
    longBreakDuration: parseInt(longBreakDuration.value),
    soundEnabled: soundEnabled.checked,
    badgeEnabled: badgeEnabled.checked,
    autoStartBreaks: autoStartBreaks.checked,
    autoStartPomodoros: autoStartPomodoros.checked
  };

  // Validate settings
  if (settings.workDuration < 1 || settings.workDuration > 60) {
    alert('Work duration must be between 1 and 60 minutes');
    return;
  }
  if (settings.shortBreakDuration < 1 || settings.shortBreakDuration > 30) {
    alert('Short break duration must be between 1 and 30 minutes');
    return;
  }
  if (settings.longBreakDuration < 1 || settings.longBreakDuration > 60) {
    alert('Long break duration must be between 1 and 60 minutes');
    return;
  }

  chrome.storage.sync.set(settings, () => {
    showSaveMessage();
  });
}

function resetSettings() {
  if (confirm('Are you sure you want to reset all settings to defaults?')) {
    chrome.storage.sync.set(defaultSettings, () => {
      loadSettings();
      showSaveMessage();
    });
  }
}

function showSaveMessage() {
  saveMessage.classList.add('show');
  setTimeout(() => {
    saveMessage.classList.remove('show');
  }, 3000);
}

function loadStats() {
  chrome.storage.local.get(['dailyStats', 'timerState'], (result) => {
    const dailyStats = result.dailyStats || {};
    const timerState = result.timerState || { sessionsCompleted: 0 };

    // Calculate today's count
    const today = new Date().toISOString().split('T')[0];
    const todaySessions = dailyStats[today]?.sessions || 0;
    todayCount.textContent = todaySessions;

    // Calculate this week's count
    const weekStart = getWeekStart();
    let weekSessions = 0;
    Object.keys(dailyStats).forEach(date => {
      if (new Date(date) >= weekStart) {
        weekSessions += dailyStats[date].sessions;
      }
    });
    weekCount.textContent = weekSessions;

    // Calculate total count
    let totalSessions = 0;
    Object.keys(dailyStats).forEach(date => {
      totalSessions += dailyStats[date].sessions;
    });
    totalCount.textContent = totalSessions;

    // Display history
    displayHistory(dailyStats);
  });
}

function displayHistory(dailyStats) {
  historyList.innerHTML = '';

  // Sort dates in descending order
  const sortedDates = Object.keys(dailyStats).sort((a, b) =>
    new Date(b) - new Date(a)
  ).slice(0, 7); // Show last 7 days

  if (sortedDates.length === 0) {
    historyList.innerHTML = '<div style="text-align: center; color: #999;">No history yet</div>';
    return;
  }

  sortedDates.forEach(date => {
    const item = document.createElement('div');
    item.className = 'history-item';

    const dateLabel = document.createElement('div');
    dateLabel.className = 'history-date';
    dateLabel.textContent = formatDate(date);

    const countLabel = document.createElement('div');
    countLabel.className = 'history-count';
    countLabel.textContent = `${dailyStats[date].sessions} sessions`;

    item.appendChild(dateLabel);
    item.appendChild(countLabel);
    historyList.appendChild(item);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (dateString === today) {
    return 'Today';
  } else if (dateString === yesterday) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  }
}

function getWeekStart() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Monday is first day
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

function clearStats() {
  if (confirm('Are you sure you want to clear all statistics? This cannot be undone.')) {
    chrome.storage.local.set({ dailyStats: {} }, () => {
      // Reset session count in timer state
      chrome.storage.local.get(['timerState'], (result) => {
        if (result.timerState) {
          result.timerState.sessionsCompleted = 0;
          chrome.storage.local.set({ timerState: result.timerState }, () => {
            loadStats();
            showSaveMessage();
          });
        } else {
          loadStats();
          showSaveMessage();
        }
      });
    });
  }
}
