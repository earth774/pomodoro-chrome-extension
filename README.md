# 🍅 Pomodoro Chrome Extension

A beautiful and functional Chrome extension to help you manage your work using the Pomodoro Technique.

## Features

- ⏱️ **Pomodoro Timer** - 25-minute work sessions with 5-minute short breaks and 15-minute long breaks
- 🔔 **Notifications** - Get notified when sessions complete
- 📊 **Statistics** - Track your daily, weekly, and all-time productivity
- ⚙️ **Customizable** - Adjust timer durations to fit your workflow
- 🎨 **Beautiful UI** - Clean and modern interface with smooth animations
- 💾 **Persistent State** - Timer state persists even if you close the browser

## Installation

### Development Mode

1. Clone or download this repository
2. Add icon images to the `assets/icons/` folder:
   - `icon16.png` (16x16)
   - `icon32.png` (32x32)
   - `icon48.png` (48x48)
   - `icon128.png` (128x128)
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the project folder
6. The extension should now appear in your extensions list

### Chrome Web Store (Coming Soon)

Once published, you'll be able to install directly from the Chrome Web Store.

## Usage

### Basic Timer

1. Click the extension icon in your toolbar
2. Click "Start" to begin a 25-minute work session
3. Work until the timer completes and you receive a notification
4. Take a 5-minute break when prompted
5. After 4 work sessions, take a 15-minute long break

### Settings

Click the settings icon (⚙️) in the popup to customize:

- **Timer Durations**: Adjust work session, short break, and long break lengths
- **Notifications**: Enable/disable notification sounds
- **Auto-start**: Automatically start breaks or work sessions
- **Statistics**: View your productivity stats and clear history

## Project Structure

```
pomodoro-chrome-extension/
├── manifest.json           # Extension configuration (Manifest V3)
├── popup/                  # Extension popup interface
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── options/                # Settings page
│   ├── options.html
│   ├── options.css
│   └── options.js
├── background/             # Background service worker
│   └── background.js
├── assets/                 # Static assets
│   ├── icons/             # Extension icons (16, 32, 48, 128)
│   └── sounds/            # Notification sounds
└── docs/                   # Documentation
    └── PRD.md             # Product Requirements Document
```

## Technical Details

- **Manifest Version**: V3
- **Permissions**:
  - `storage` - Save settings and statistics
  - `notifications` - Show completion notifications
  - `alarms` - Reliable timer functionality
- **Storage**:
  - `chrome.storage.sync` - Settings (synced across devices)
  - `chrome.storage.local` - Timer state and statistics

## Development

### Making Changes

1. Edit the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Test your changes

### Testing

- Test timer functionality in different scenarios
- Verify notifications work correctly
- Check that statistics are tracked properly
- Test settings persistence
- Verify state restoration after browser restart

## Roadmap

See [docs/PRD.md](docs/PRD.md) for the full product roadmap.

### Phase 1: Core Timer Functionality ✅
- Basic Pomodoro timer
- Session management
- Notifications

### Phase 2: Statistics & Tracking (In Progress)
- Daily/weekly/monthly stats
- Session history
- Visual charts

### Phase 3: Customization Features (Planned)
- Theme options
- Sound customization
- Advanced timer settings

### Phase 4: Future Enhancements
- Task list integration
- Cloud sync
- Dark mode
- Website blocking during work sessions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Built with ❤️ by amieart for productivity enthusiasts everywhere.

---

**Note**: You need to add icon images before loading the extension. Create or download PNG icons in the required sizes (16x16, 32x32, 48x48, 128x128) and place them in the `assets/icons/` folder.
