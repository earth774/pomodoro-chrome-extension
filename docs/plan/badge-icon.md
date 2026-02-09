# Plan: Badge แสดงเวลาบนไอคอน

แสดงเวลาที่เหลือ (countdown) บน extension icon ใน toolbar เพื่อให้ผู้ใช้เห็นสถานะ timer โดยไม่ต้องเปิด popup

## Goals

- แสดงเวลาที่เหลือ (MM:SS) บน badge ของ extension action icon
- อัปเดต badge ทุกวินาทีขณะ timer ทำงาน
- ล้างหรือซ่อน badge เมื่อ pause / reset / ไม่ได้รัน
- ใช้สีให้สอดคล้องกับ Vintage Retro Clean (cream/gold)

## Scope

### In scope

- ใช้ Chrome API: `chrome.action.setBadgeText`, `chrome.action.setBadgeBackgroundColor`
- อัปเดต badge ใน background ทุก tick (ทุก 1 วินาที) เมื่อ `timerState.isRunning === true`
- รูปแบบข้อความ: นาที:วินาที (เช่น `25:00`, `5:30`) — **หมายเหตุ:** Chrome จำกัด badge text ไว้ที่ **4 ตัวอักษร** ดังนั้นอาจต้องใช้รูปแบบย่อ เช่น `25:0` หรือ `m:ss` เมื่อนาที < 10 (เช่น `9:59`)
- ล้าง badge เมื่อ pause, reset, หรือ timer ไม่รัน
- ตั้งค่า optional ใน Options: เปิด/ปิดการแสดง badge (default: เปิด)

### Out of scope

- ไม่เปลี่ยน icon ตามโหมด (work/break) ในแผนนี้
- ไม่แสดงข้อความอื่นบน badge (เช่น "BREAK") — เฉพาะเวลา

## Technical Notes

### Chrome API (Manifest V3)

- `chrome.action.setBadgeText({ text: string })` — ข้อความบน badge (แนะนำไม่เกิน 4 ตัวอักษร)
- `chrome.action.setBadgeBackgroundColor({ color: string })` — สีพื้นหลัง badge (เช่น `"#1a1a1a"`, `"#ffd700"`)
- ล้าง badge: `chrome.action.setBadgeText({ text: "" })`

### Badge text format

- เป้าหมาย: แสดง MM:SS หรือ M:SS
- ข้อจำกัด: 4 ตัวอักษร → ใช้รูปแบบ **M:SS** เมื่อนาที < 10 (เช่น `9:59`, `5:00`) และ **ตัดเป็น 4 ตัว** สำหรับ ≥ 10 นาที (เช่น `25:0` แทน `25:00`) หรือใช้ **MM:S** (เช่น `25:0`) เพื่อให้พอดี 4 ตัว
- แนะนำ: ใช้ฟังก์ชัน `formatBadgeTime(seconds)` → คืนค่า string ความยาว 4 ตัว เช่น `"25:0"`, `"9:59"`, `"0:05"`

### Settings

- เพิ่มใน `defaultSettings`: `badgeEnabled: true`
- เก็บใน `chrome.storage.sync` คู่กับ settings อื่น
- Options page: checkbox "Show time on extension icon"

## Implementation Steps

1. **Settings**
   - เพิ่ม `badgeEnabled: true` ใน `defaultSettings` (background + options)
   - ใน options: เพิ่ม checkbox "Show time on extension icon" และ bind กับ `settings.badgeEnabled`
   - โหลด/บันทึกค่าใน options.js เหมือน soundEnabled

2. **Background: helper และการอัปเดต badge**
   - สร้างฟังก์ชัน `formatBadgeTime(seconds)` → string 4 ตัว (เช่น `25:0`, `9:59`, `0:00`)
   - สร้างฟังก์ชัน `updateBadge(state, settings)`:
     - ถ้า `!state.isRunning` หรือ `!settings.badgeEnabled` → `setBadgeText({ text: "" })`
     - ถ้ารันอยู่ → คำนวณนาที/วินาที จาก `state.currentTime` → `setBadgeText({ text: formatBadgeTime(...) })`, `setBadgeBackgroundColor` ตาม vintage (เช่น #1a1a1a หรือ #c9a227)
   - เรียก `updateBadge` ในที่ที่เหมาะสม:
     - ใน `setInterval` tick (ทุกวินาที) หลังอัปเดต state
     - ตอน start / pause / reset / complete (หลังอัปเดต state)
   - ตอนโหลด state จาก storage (on startup): เรียก `updateBadge` ครั้งหนึ่งตาม state ปัจจุบัน

3. **โหมด Pause / Reset / ไม่รัน**
   - เรียก `updateBadge` หลัง pause / reset → badge จะถูกล้างเพราะ `!isRunning`
   - หลัง complete: อัปเดต state แล้วเรียก `updateBadge` (จะแสดงเวลาของ session ใหม่ถ้ามี auto-start ไม่ก็ล้าง)

4. **ทดสอบ**
   - เปิด badge → Start → ดูเวลาลดบน icon; Pause/Reset → badge หาย
   - ปิด "Show time on extension icon" → badge ไม่แสดงแม้ timer รัน
   - Reload extension → badge สอดคล้องกับ state ที่โหลดจาก storage

## Acceptance Criteria

- [ ] เมื่อ timer กำลังรัน จะมีข้อความเวลาที่เหลือ (รูปแบบสั้น 4 ตัว) แสดงบน extension icon
- [ ] Badge อัปเดตทุกวินาที
- [ ] เมื่อ Pause หรือ Reset badge จะหายหรือว่าง
- [ ] มีตัวเลือกใน Options เปิด/ปิดการแสดง badge ได้
- [ ] สี badge สอดคล้องกับ theme (หรืออ่านได้ชัด)
- [ ] หลัง reload extension badge แสดงถูกต้องตาม state ปัจจุบัน

## References

- [Chrome action API](https://developer.chrome.com/docs/extensions/reference/api/action) — setBadgeText, setBadgeBackgroundColor
- PRD: Planned features, Current Limitations (badge)
- โครงสร้างปัจจุบัน: `background/background.js` (timer state, defaultSettings), `options/options.html` + `options.js`
