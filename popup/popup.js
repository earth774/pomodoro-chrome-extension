// DOM Elements
const timerText = document.getElementById('timerText');
const timerCircle = document.getElementById('timerCircle');
const sessionType = document.getElementById('sessionType');
const sessionCount = document.getElementById('sessionCount');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const settingsBtn = document.getElementById('settingsBtn');
const dots = [
  document.getElementById('dot1'),
  document.getElementById('dot2'),
  document.getElementById('dot3'),
  document.getElementById('dot4')
];

// Timer state
let timerState = {
  isRunning: false,
  isPaused: false,
  currentTime: 25 * 60, // 25 minutes in seconds
  mode: 'work', // 'work', 'shortBreak', 'longBreak'
  sessionsCompleted: 0,
  sessionsUntilLongBreak: 4
};

// Default settings
const defaultSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true
};

// Initialize
loadState();
updateDisplay();
updateProgressDots();

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
settingsBtn.addEventListener('click', openSettings);

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'timerUpdate') {
    timerState = message.state;
    updateDisplay();
  } else if (message.type === 'timerComplete') {
    handleTimerComplete();
  }
});

function startTimer() {
  timerState.isRunning = true;
  timerState.isPaused = false;

  chrome.runtime.sendMessage({
    type: 'startTimer',
    state: timerState
  });

  startBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
  timerCircle.classList.add('active');

  saveState();
}

function pauseTimer() {
  timerState.isRunning = false;
  timerState.isPaused = true;

  chrome.runtime.sendMessage({
    type: 'pauseTimer'
  });

  pauseBtn.style.display = 'none';
  startBtn.style.display = 'block';
  timerCircle.classList.remove('active');

  saveState();
}

function resetTimer() {
  chrome.storage.sync.get(defaultSettings, (settings) => {
    timerState.isRunning = false;
    timerState.isPaused = false;
    timerState.currentTime = getModeDuration(timerState.mode, settings);

    chrome.runtime.sendMessage({
      type: 'resetTimer'
    });

    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    timerCircle.classList.remove('active');

    updateDisplay();
    saveState();
  });
}

function handleTimerComplete() {
  if (timerState.mode === 'work') {
    timerState.sessionsCompleted++;
    sessionCount.textContent = timerState.sessionsCompleted;

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
    timerState.isRunning = false;
    timerState.isPaused = false;

    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    timerCircle.classList.remove('active');

    updateDisplay();
    updateProgressDots();
    saveState();
  });
}

function updateDisplay() {
  const minutes = Math.floor(timerState.currentTime / 60);
  const seconds = timerState.currentTime % 60;
  timerText.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Update session type display
  if (timerState.mode === 'work') {
    sessionType.textContent = 'Work Session';
  } else if (timerState.mode === 'shortBreak') {
    sessionType.textContent = 'Short Break';
  } else {
    sessionType.textContent = 'Long Break';
  }

  sessionCount.textContent = timerState.sessionsCompleted;
}

function updateProgressDots() {
  const sessionsBeforeLongBreak = timerState.sessionsCompleted % 4;
  dots.forEach((dot, index) => {
    if (index < sessionsBeforeLongBreak) {
      dot.classList.add('completed');
    } else {
      dot.classList.remove('completed');
    }
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

function loadState() {
  chrome.storage.local.get(['timerState'], (result) => {
    if (result.timerState) {
      timerState = result.timerState;

      if (timerState.isRunning) {
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        timerCircle.classList.add('active');
      }

      updateDisplay();
      updateProgressDots();
    }
  });
}

function openSettings() {
  chrome.runtime.openOptionsPage();
}

// Request timer update every second when popup is open
setInterval(() => {
  if (timerState.isRunning) {
    chrome.runtime.sendMessage({ type: 'getTimerState' }, (response) => {
      if (response && response.state) {
        timerState = response.state;
        updateDisplay();
      }
    });
  }
}, 1000);
