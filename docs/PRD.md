# Product Requirements Document (PRD)
# Pomodoro Chrome Extension

**Version:** 1.0.0
**Status:** In Development
**Last Updated:** February 8, 2026

## Overview
Pomodoro Chrome Extension เป็น Chrome Extension ที่ช่วยจัดการการทำงานโดยใช้ Pomodoro Technique เพื่อเพิ่มประสิทธิภาพในการทำงานและการจัดการเวลา

Extension นี้ถูกพัฒนาด้วย Manifest V3 และมี **UI สไตล์ Vintage Retro Clean** ที่เป็นเอกลักษณ์ ใช้งานง่าย พร้อมระบบติดตามสถิติการทำงานแบบครบวงจร ดีไซน์ในสไตล์ newspaper/menu แบบ vintage ที่ชวนให้หวนคิดถึงยุคทองของสิ่งพิมพ์ ด้วยสี cream/beige อบอุ่น typography แบบ monospace และ clean borders

## Objectives
- ช่วยให้ผู้ใช้จัดการเวลาการทำงานได้อย่างมีประสิทธิภาพ
- นำ Pomodoro Technique มาใช้ในการทำงานผ่าน Chrome Browser
- ลดการรบกวนและเพิ่มสมาธิในการทำงาน

## Target Users
- นักศึกษาที่ต้องการจัดการเวลาเรียน
- Professional workers ที่ทำงานผ่าน Browser
- ผู้ที่ต้องการเพิ่มประสิทธิภาพในการทำงาน
- Vintage design enthusiasts ที่ชื่นชอบสไตล์ retro และ classic aesthetic
- ผู้ที่ต้องการ productivity tool ที่มีดีไซน์แตกต่างและดูอบอุ่น
- คนที่ชอบความ clean และ timeless design

## Core Features

### 1. Pomodoro Timer ✅ (Implemented)
- Timer แบบ 25 นาที (Work Session) ตามหลักการ Pomodoro Technique
- Short Break 5 นาที
- Long Break 15 นาที
- สามารถ Start, Pause, และ Reset Timer ได้
- แสดง Timer แบบ Countdown แบบเรียลไทม์
- Visual feedback ด้วย animation เมื่อ timer กำลังทำงาน
- Timer state ถูกบันทึกและกู้คืนได้แม้ปิด browser

### 2. Session Management ✅ (Implemented)
- แสดงจำนวน Pomodoro Sessions ที่ทำสำเร็จ
- ระบบนับจำนวน Sessions อัตโนมัติ
- แสดงประวัติการทำงาน
- Progress dots indicator แสดงจำนวน sessions จนถึง long break
- Auto-switch ระหว่าง work/break modes
- ระบบ 4 work sessions = 1 long break

### 3. Notifications ✅ (Implemented)
- แจ้งเตือนเมื่อ Work Session สิ้นสุด
- แจ้งเตือนเมื่อ Break Time สิ้นสุด
- ข้อความแจ้งเตือนแตกต่างกันตาม session type
- เสียงแจ้งเตือน (optional) - ใช้ complete.wav ผ่าน Offscreen API ✅
- ใช้ Chrome Notifications API

### 4. Customization ✅ (Implemented)
- ปรับเวลา Work Session ได้ (1-60 นาที)
- ปรับเวลา Short Break ได้ (1-30 นาที)
- ปรับเวลา Long Break ได้ (1-60 นาที)
- เปิด/ปิดเสียงแจ้งเตือน
- Auto-start breaks option
- Auto-start work sessions option
- การตั้งค่า sync ข้าม devices ผ่าน Chrome Sync

### 5. Statistics & Tracking ✅ (Implemented)
- แสดงจำนวน Pomodoro ที่ทำในแต่ละวัน
- สถิติการทำงานรายสัปดาห์
- สถิติ All-time sessions
- แสดงประวัติ 7 วันย้อนหลัง
- ฟังก์ชัน Clear statistics
- Data persistence ผ่าน Chrome Storage API

### 6. Badge Counter ✅ (Implemented)
- แสดงเวลาที่เหลือ (countdown) บน extension icon ใน toolbar
- อัพเดต badge ทุกวินาที เมื่อ timer กำลังทำงาน
- รูปแบบ 4 ตัวอักษร: `25:0` (≥10 นาที) หรือ `9:59` (<10 นาที)
- ล้าง badge เมื่อ pause/reset หรือ timer ไม่ได้รัน
- สี badge: black (#1a1a1a) สอดคล้องกับ vintage theme
- มีการตั้งค่าเปิด/ปิดใน Options (default: เปิด)
- Badge แสดงถูกต้องแม้หลัง reload browser

## User Interface

### Design Philosophy
Extension นี้ใช้ **Vintage Retro Clean Aesthetic** แรงบันดาลใจจาก newspaper และ vintage menu design เพื่อ:
- **สร้างประสบการณ์ที่อบอุ่น**: แยกตัวจาก productivity tools ทั่วไปด้วยสีสันที่อบอุ่นและเป็นมิตร
- **เน้นความชัดเจน**: Typography และ layout ที่อ่านง่าย เข้าใจง่าย
- **สร้างความคิดถึง (Nostalgia)**: เรียกคืนความรู้สึกดีๆ จากยุคทองของสิ่งพิมพ์แบบ classic
- **Timeless Design**: ดีไซน์ที่ไม่มีวันล้าสมัย เหนือกาลเวลา
- **Professional yet Playful**: ดูมืออาชีพแต่ไม่เครียด มีความสนุกสนานแฝงอยู่

**สี Palette:**
- Cream/Beige (#f5e6d3, #fff9f0) - พื้นหลังอบอุ่น
- Black (#1a1a1a) - Text และ borders
- Yellow/Gold (#ffd700, #ffed4e) - Accents และ primary actions
- Gray (#555, #333) - Secondary text
- White (#ffffff) - Highlights

### Extension Popup (350x500px)
- **Timer Display**: Circular vintage timer display ขนาดใหญ่แบบ countdown (MM:SS) พร้อม double border outline
- **Session Type Indicator**: แสดงประเภท session ในกล่องแบบ newspaper style พร้อม uppercase text
- **Control Buttons**:
  - Start button (yellow/gold) - primary action พร้อม vintage shadows
  - Pause button (black) - แสดงเมื่อกำลัง run
  - Reset button (cream) - secondary action
  - Settings icon button (black ด้วย hover effects)
- **Session Counter**: แสดงจำนวน Pomodoros ในกล่อง bordered box
- **Progress Dots**: 4 circular dots indicator แบบ vintage style
- **Design**: Vintage retro clean aesthetic พร้อม:
  - Cream/beige background (#f5e6d3, #fff9f0)
  - Newspaper-style double borders
  - Courier New monospace font
  - Clean box shadows
  - Yellow/gold accents (#ffd700)
  - Smooth transitions
  - Professional typography

### Options Page
- **Timer Duration Settings**:
  - Number inputs แบบ vintage style สำหรับปรับเวลาแต่ละ mode
  - Input validation (min/max values)
  - Cream background with black text
- **Notifications Settings**:
  - Clean vintage checkbox สำหรับเปิด/ปิดเสียง
- **Behavior Settings**:
  - Vintage-style auto-start toggles
- **Statistics Dashboard**:
  - 3 stat cards แบบ vintage style (yellow/gold background)
  - Recent history list ในกล่อง bordered box
  - Clear statistics button (black)
- **Actions**: Save (yellow/gold), Reset to defaults (cream) buttons แบบ vintage style
- **Design**: Vintage retro clean aesthetic พร้อม:
  - Cream/beige background (#f5e6d3)
  - Newspaper-style borders และ shadows
  - Courier New monospace font
  - Yellow/gold color scheme
  - Vintage scrollbars
  - Smooth slide-in animation สำหรับ success messages
  - Double border container
  - Professional typography

## Technical Requirements

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Design**:
  - Courier New - Vintage monospace font (system font)
  - Vintage color palette (cream, beige, black, gold)
  - Newspaper/menu inspired aesthetic
  - Clean retro design principles
- **Extension Framework**: Chrome Extension Manifest V3
- **Storage**:
  - `chrome.storage.sync` - Settings (synced across devices)
  - `chrome.storage.local` - Timer state and statistics
- **APIs**:
  - Chrome Notifications API - แจ้งเตือน
  - Chrome Runtime API - Message passing
  - Chrome Alarms API (prepared for future use)
- **Architecture**:
  - Service Worker (background.js) - Timer engine
  - Popup UI (popup.html/js/css) - Main interface
  - Options Page (options.html/js/css) - Settings

### File Structure
```
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── options/
│   ├── options.html
│   ├── options.css
│   └── options.js
├── background/
│   └── background.js
└── assets/
    ├── icons/        (icon16, 32, 48, 128px)
    └── sounds/       (complete.wav, tick.wav)
```

### Browser Compatibility
- Chrome Browser version 88+
- Edge Browser (Chromium-based)
- Any Chromium-based browser with Manifest V3 support

### Permissions
- `storage` - บันทึก settings และ statistics
- `notifications` - แสดง notifications
- `alarms` - สำหรับ timer functionality

## Success Metrics
- จำนวนผู้ใช้งาน Active Users
- จำนวน Pomodoro Sessions เฉลี่ยต่อผู้ใช้
- User Retention Rate
- User Ratings on Chrome Web Store

## Future Enhancements (v2.0+)

### High Priority
- 📊 **Visual Charts** - Vintage-style graphs สำหรับแสดงสถิติ (Chart.js with retro styling)
- 🎨 **Theme Switcher** - เปลี่ยนสี palette (Newspaper, Parchment, Sepia, etc.)
- 🔊 **Custom Sounds** - เลือกเสียงแจ้งเตือนแบบ classic bell tones ได้
- 🎨 **Alternative Vintage Themes** - Typewriter, Library, Cafe menu styles

### Medium Priority
- ✅ **Task List Integration** - รายการงานแบบเบาๆ ผูกกับ Pomodoro sessions (เลือก "Current Task" และดูจำนวน Pomodoro ต่อ task)
- 🚫 **Website Blocking** - บล็อกเว็บไซต์ระหว่าง work session
- 📅 **Calendar Integration** - Sync กับ Google Calendar
- 🏆 **Achievements & Streaks** - Gamification elements
- 📊 **Advanced Analytics** - Productivity insights

### Low Priority
- ☁️ **Cloud Sync** - Sync ข้อมูลผ่าน cloud (ปัจจุบันใช้ Chrome Sync)
- 👥 **Team Features** - Shared statistics
- 🌍 **Internationalization** - Multi-language support
- 🎵 **Background Music** - Focus music player
- ⌨️ **Keyboard Shortcuts** - Quick controls

## Task List Integration – Feature Requirements (v2.0)

### Goals
- ผูก Pomodoro timer กับ "งานจริง" แทนการจับเวลาลอยๆ
- ให้ผู้ใช้เห็นว่าลงเวลาไปกับ task ไหนบ้างผ่าน statistics ที่มีอยู่แล้ว
- รักษาความเรียบง่ายและ vintage aesthetic ไม่ให้กลายเป็น full task manager

### User Stories
- ในฐานะผู้ใช้ ฉันอยากสร้างรายการงานสั้นๆ สำหรับวันนี้ เพื่อเลือกงานก่อนเริ่ม Pomodoro แต่ละรอบ
- ในฐานะผู้ใช้ ฉันอยากเลือก "Current Task" จาก popup เพื่อให้แต่ละ Pomodoro ถูกบันทึกให้ task นั้น
- ในฐานะผู้ใช้ ฉันอยากเห็นสรุปว่าแต่ละ task ใช้ไปกี่ Pomodoro แล้ว

### Scope

#### In scope (v2.0)
- Task list แบบ lightweight:
  - ฟิลด์: `title`, `status` (`todo`/`doing`/`done`)
  - จำกัดจำนวน tasks ต่อผู้ใช้ (เช่น 5–10 งาน) เพื่อให้ UI เบาและอ่านง่าย
  - การเพิ่ม/ลบ/เปลี่ยนสถานะ task ผ่าน options page
- Current task selection ใน popup:
  - แสดงกล่อง "WORKING ON: {taskTitle}" หรือ "NO TASK SELECTED"
  - เลือก task ปัจจุบันจาก dropdown / list
  - Quick-add task แบบชื่อสั้นๆ จาก popup (optional, ถ้าทำได้ง่าย)
- การผูก Pomodoro sessions กับ task:
  - เมื่อ work session จบและมี current task → บันทึกว่า session นั้นนับให้ task นั้น
  - ขยาย statistics ให้แสดงจำนวน Pomodoro ต่อ task (อย่างน้อย top tasks)

#### Out of scope (v2.0)
- ระบบ task management เต็มรูปแบบ เช่น projects, due date, priority หลายระดับ, subtasks
- Integration กับ task tools ภายนอก (เช่น Todoist, Notion, Jira)
- Drag & drop reorder ที่ซับซ้อน (ถ้าทำได้ง่ายค่อยพิจารณาเพิ่มทีหลัง)

### UX & UI

#### Options Page
- เพิ่ม section `Tasks`:
  - รายการ tasks ในรูปแบบ list vintage (เส้นแบ่ง, checkbox, monospace)
  - Input สำหรับเพิ่ม task ใหม่ (title อย่างเดียว)
  - ปุ่ม mark as done และลบ task
  - ตัวเลือก filter ซ่อน tasks ที่ done แล้ว (optional)
- Tasks เก็บใน `chrome.storage.sync` ร่วมกับ settings อื่น (sync ข้าม devices)

#### Popup
- แสดง "Current Task" ใต้ timer:
  - กล่อง bordered แบบ newspaper: `WORKING ON: {TASK}` หรือ `NO TASK SELECTED`
- UI เลือก task:
  - dropdown / เมนูเล็กๆ เปิดมาจาก current task box หรือ icon เล็ก
  - ถ้ามีไม่เกิน 5–10 tasks จะยังอ่านง่ายบน 350×500px
- สไตล์สอดคล้อง vintage (cream/beige, black, gold, Courier New, double borders)

### Data Model & Storage

- **Tasks (chrome.storage.sync)**
  - key แนะนำ: `tasks`
  - รูปแบบ (เบื้องต้น):
    - `id: string`
    - `title: string`
    - `status: 'todo' | 'doing' | 'done'`
    - `createdAt: number` (timestamp)
    - `completedAt?: number`
- **Current task**
  - เก็บ `currentTaskId`:
    - ใน `chrome.storage.local` หรือใน timer state ที่ background ใช้
    - อัปเดตผ่าน message จาก popup
- **Statistics linkage (chrome.storage.local)**
  - ขยาย schema statistics เดิม (daily/weekly/all-time) ให้รองรับการอ้างอิง `taskId`:
    - เช่น log per-session ที่มี `taskId` หรือ
    - ตัวนับรวมต่อ task ต่อวัน (`byTask[taskId].workSessions`)
  - ต้อง backward-compatible กับข้อมูลเดิม (ตรวจ null/undefined ก่อนอ่าน `taskId`)

### Messaging & Architecture

- Popup → background:
  - ข้อความใหม่เช่น:
    - `setCurrentTask` (payload: `taskId | null`)
    - (optional) `createQuickTask` สำหรับ quick-add จาก popup
- Background:
  - เก็บ `currentTaskId` ใน state
  - เมื่อ work session จบ:
    - ถ้ามี `currentTaskId` → บันทึกลง statistics ว่า task นั้นได้ +1 Pomodoro
- Options:
  - อ่าน/เขียน `tasks` จาก `chrome.storage.sync`
  - ไม่ยุ่งเกี่ยวกับ timer state โดยตรง

### Acceptance Criteria (v2.0 Task List Integration)

- [ ] ผู้ใช้เพิ่ม/ลบ/แก้สถานะ tasks ได้จาก options page
- [ ] ผู้ใช้เลือก current task จาก popup ได้ และข้อความแสดงชัดเจน
- [ ] เมื่อ work session จบ ขณะที่มี current task, statistics จะนับ session นั้นให้ task นั้น
- [ ] ผู้ใช้สามารถเห็นอย่างน้อย summary จำนวน Pomodoro ต่อ task ใน statistics section
- [ ] ไม่มี breaking change กับผู้ใช้เก่า (extension อัปเดตแล้วข้อมูลเดิมยังใช้ได้)
- [ ] Task list และ current task sync ข้าม devices ตาม behavior ของ `chrome.storage.sync`

## Development Timeline

### Phase 1: Core Timer Functionality ✅ (Completed)
- ✅ Basic Pomodoro timer (25/5/15 minutes)
- ✅ Start/Pause/Reset controls
- ✅ Timer state persistence
- ✅ Session management system
- ✅ Chrome notifications
- ✅ Background service worker
- ✅ Beautiful UI design with animations

### Phase 2: Statistics & Tracking ✅ (Completed)
- ✅ Daily session counter
- ✅ Weekly statistics
- ✅ All-time statistics
- ✅ History tracking (7 days)
- ✅ Clear statistics function
- ✅ Stats persistence in local storage

### Phase 3: Customization Features ✅ (Completed)
- ✅ Adjustable timer durations
- ✅ Auto-start options
- ✅ Sound toggle
- ✅ Settings sync across devices
- ✅ Settings validation
- ✅ Reset to defaults

### Phase 4: UI Redesign & Polish ✅ (Completed)
- ✅ Icon design and implementation (16, 32, 48, 128px)
- ✅ **Vintage Retro Clean UI Redesign** - เปลี่ยน UI ทั้งหมดเป็นสไตล์ newspaper/menu vintage
- ✅ Courier New monospace font implementation (system font)
- ✅ Cream/beige และ gold color palette implementation
- ✅ Newspaper-style borders, clean shadows, และ smooth animations
- ✅ Double border containers และ vintage typography
- ✅ Sound effects implementation (complete.wav ผูกกับ notification แล้ว; tick.wav ยังไม่ใช้)

### Phase 5: Badge Counter & Polish ✅ (Completed)
- ✅ **Badge Counter Implementation** - แสดงเวลาบน extension icon
- ✅ formatBadgeTime() - รูปแบบ 4 ตัวอักษร (MM:S หรือ M:SS)
- ✅ updateBadge() - อัพเดตทุกวินาทีเมื่อ timer รัน
- ✅ Badge settings - เปิด/ปิดใน Options page
- ✅ Badge color - black (#1a1a1a) สอดคล้องกับ vintage theme
- ✅ State persistence - แสดงถูกต้องหลัง reload

### Phase 6: Testing & Distribution (Current Phase)
- 🔄 Cross-browser testing
- 🔄 Performance optimization
- 🔄 Bug fixes and refinements
- 🔄 Documentation updates
- ⏳ Chrome Web Store preparation

## Known Issues & Limitations

### Current Limitations
- Custom notification: complete.wav ใช้แล้ว; tick.wav (เสียงติ๊กทุกวินาที) ยังไม่ implement
- Statistics ไม่มี visual charts (แสดงเป็นตัวเลขเท่านั้น)
- ไม่มี theme switching (ใช้ vintage cream theme เดียว)
- Monospace font (Courier New) อาจดูเก่าเกินไปสำหรับบางคน
- สี cream/beige อาจดูเหลืองเกินไปบนจอบางเครื่อง
- Badge text จำกัดที่ 4 ตัวอักษร (Chrome limitation) - ใช้รูปแบบย่อ เช่น `25:0` แทน `25:00`

### Browser Limitations
- Timer อาจหยุดชั่วคราวเมื่อ computer sleep
- Notifications ต้องได้รับ permission จาก user
- Service worker อาจถูก suspend โดย browser

## Out of Scope (v1.0)
- Mobile Application (iOS/Android)
- Desktop Application (Electron)
- Team/Collaboration Features
- Third-party Cloud Sync
- Website Blocking
- Full Task Management system (projects, deadlines, subtasks ฯลฯ) — v2.0 มีเพียง Task List Integration แบบ lightweight เท่านั้น
- Calendar Integration

## Installation & Setup

### For Development
1. Clone repository
2. Open `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select project folder

### For Distribution (Future)
1. Create icons
2. Test thoroughly
3. Package extension
4. Submit to Chrome Web Store
5. Review and approval process

## Support & Maintenance

### Documentation
- README.md - Setup และ usage instructions
- PRD.md - Product requirements (this file)
- Inline code comments

### Testing Requirements
- Manual testing on Chrome
- Timer accuracy testing
- Storage persistence testing
- Notifications testing
- Settings validation testing

### Monitoring
- User feedback collection
- Bug tracking
- Feature requests
- Chrome Web Store ratings
