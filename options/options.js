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

// Task DOM Elements
const taskInput = document.getElementById('taskInput');
const taskLinkInput = document.getElementById('taskLinkInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskListEl = document.getElementById('taskList');
const hideCompletedCheckbox = document.getElementById('hideCompleted');
const taskStatsList = document.getElementById('taskStatsList');

const MAX_TASKS = 10;

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
loadTasks();

// Event Listeners
saveBtn.addEventListener('click', saveSettings);
resetBtn.addEventListener('click', resetSettings);
clearStatsBtn.addEventListener('click', clearStats);
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});
hideCompletedCheckbox.addEventListener('change', renderTasks);

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

    // Display per-task stats
    loadTaskStats(dailyStats);
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

// ===== Task Management =====

let tasks = [];

function loadTasks() {
  chrome.storage.sync.get({ tasks: [] }, (result) => {
    tasks = result.tasks || [];
    renderTasks();
  });
}

function saveTasks(callback) {
  chrome.storage.sync.set({ tasks }, callback);
}

function addTask() {
  const title = taskInput.value.trim();
  if (!title) return;
  if (title.length > 80) {
    alert('Task title must be 80 characters or less.');
    return;
  }
  if (tasks.length >= MAX_TASKS) {
    alert(`Maximum ${MAX_TASKS} tasks allowed. Please remove a task first.`);
    return;
  }

  const link = taskLinkInput.value.trim();
  if (link && !/^https?:\/\/.+/i.test(link)) {
    alert('Link must start with http:// or https://');
    return;
  }

  const task = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    title,
    status: 'todo',
    createdAt: Date.now()
  };
  if (link) task.link = link;

  tasks.push(task);
  taskInput.value = '';
  taskLinkInput.value = '';
  saveTasks(() => renderTasks());
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(() => renderTasks());
}

function toggleTaskStatus(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  if (task.status === 'todo') {
    task.status = 'doing';
    delete task.completedAt;
  } else if (task.status === 'doing') {
    task.status = 'done';
    task.completedAt = Date.now();
  } else {
    task.status = 'todo';
    delete task.completedAt;
  }

  saveTasks(() => renderTasks());
}

function renderTasks() {
  taskListEl.innerHTML = '';
  const hideCompleted = hideCompletedCheckbox.checked;
  const filtered = hideCompleted ? tasks.filter(t => t.status !== 'done') : tasks;

  if (filtered.length === 0) {
    taskListEl.innerHTML = '<div class="task-empty">No tasks yet. Add one above!</div>';
    return;
  }

  filtered.forEach(task => {
    const item = document.createElement('div');
    item.className = 'task-item' + (task.status === 'done' ? ' task-done' : '');

    const statusBtn = document.createElement('button');
    statusBtn.className = 'task-status-btn' + (task.status === 'done' ? ' done' : '');
    statusBtn.textContent = task.status === 'done' ? '✓' : task.status === 'doing' ? '▶' : '';
    statusBtn.title = `Status: ${task.status} (click to cycle)`;
    statusBtn.addEventListener('click', () => toggleTaskStatus(task.id));

    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;

    item.appendChild(statusBtn);
    item.appendChild(title);

    if (task.link) {
      const linkBtn = document.createElement('a');
      linkBtn.className = 'task-link-btn';
      linkBtn.href = task.link;
      linkBtn.target = '_blank';
      linkBtn.rel = 'noopener noreferrer';
      linkBtn.textContent = '🔗';
      linkBtn.title = task.link;
      linkBtn.addEventListener('click', (e) => e.stopPropagation());
      item.appendChild(linkBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task-delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    item.appendChild(deleteBtn);
    taskListEl.appendChild(item);
  });
}

// ===== Per-Task Statistics =====

function loadTaskStats(dailyStats) {
  const taskTotals = {};

  Object.values(dailyStats).forEach(day => {
    if (day.byTask) {
      Object.entries(day.byTask).forEach(([taskId, data]) => {
        if (!taskTotals[taskId]) taskTotals[taskId] = 0;
        taskTotals[taskId] += data.workSessions || 0;
      });
    }
  });

  // Match task IDs to titles
  chrome.storage.sync.get({ tasks: [] }, (result) => {
    const allTasks = result.tasks || [];
    const taskMap = {};
    allTasks.forEach(t => { taskMap[t.id] = t.title; });

    taskStatsList.innerHTML = '';

    const entries = Object.entries(taskTotals)
      .map(([id, count]) => ({ id, title: taskMap[id] || '(Deleted task)', count }))
      .sort((a, b) => b.count - a.count);

    if (entries.length === 0) {
      taskStatsList.innerHTML = '<div style="text-align: center; color: #999;">No task sessions yet</div>';
      return;
    }

    entries.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'task-stat-item';

      const titleEl = document.createElement('div');
      titleEl.className = 'task-stat-title';
      titleEl.textContent = entry.title;

      const countEl = document.createElement('div');
      countEl.className = 'task-stat-count';
      countEl.textContent = `${entry.count} session${entry.count !== 1 ? 's' : ''}`;

      item.appendChild(titleEl);
      item.appendChild(countEl);
      taskStatsList.appendChild(item);
    });
  });
}
