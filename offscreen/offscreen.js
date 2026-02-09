// Offscreen document: plays notification sound when requested by background.
const audio = document.getElementById('notification-sound');
audio.src = chrome.runtime.getURL('assets/sounds/complete.wav');

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'playNotificationSound') {
    audio.currentTime = 0;
    audio.play().then(() => sendResponse({ success: true })).catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // keep channel open for async sendResponse
  }
});
