# Task List Integration – Plan for Doing

Checklist สำหรับลงมือทำ (หรือตรวจว่าเสร็จแล้ว) ฟีเจอร์ Task List Integration อ้างอิงจาก `task-list-integration.md` และ `docs/PRD.md` (Task List Integration – Feature Requirements v2.0).

---

## Phase A: Storage & background

| # | Task | File(s) | Done? |
|---|------|---------|--------|
| A1 | กำหนด schema: `tasks` array ใน `chrome.storage.sync` (id, title, status, createdAt, completedAt?) | — | ✅ |
| A2 | กำหนด key `currentTaskId` ใน `chrome.storage.local` | — | ✅ |
| A3 | โหลด/เซฟ `currentTaskId` ตอน background startup และเมื่อเปลี่ยนค่า | `background/background.js` | ✅ |
| A4 | เพิ่ม message handler `setCurrentTask` (payload: taskId \| null) | `background/background.js` | ✅ |
| A5 | เพิ่ม message handler `getCurrentTask` (response: currentTaskId) | `background/background.js` | ✅ |
| A6 | เมื่อ work session จบ: ถ้ามี currentTaskId → อัปเดต dailyStats.byTask[taskId].workSessions | `background/background.js` (saveDailyStats) | ✅ |

---

## Phase B: Options page – Tasks

| # | Task | File(s) | Done? |
|---|------|---------|--------|
| B1 | เพิ่ม section **TASKS** ใน options (heading, container) | `options/options.html` | ✅ |
| B2 | Input เพิ่ม task (title, max 80 chars) + ปุ่ม "Add Task" | `options/options.html`, `options.js` | ✅ |
| B3 | จำกัดจำนวน tasks (เช่น MAX_TASKS = 10), แสดงข้อความเมื่อเกิน | `options/options.js` | ✅ |
| B4 | Helper loadTasks() / saveTasks() อ่านเขียน `chrome.storage.sync` key `tasks` | `options/options.js` | ✅ |
| B5 | Render รายการ tasks: checkbox/status, title, ปุ่มลบ | `options/options.js` (renderTasks) | ✅ |
| B6 | Toggle status: todo → doing → done → todo (และ completedAt เมื่อ done) | `options/options.js` (toggleTaskStatus) | ✅ |
| B7 | ลบ task (deleteTask) | `options/options.js` | ✅ |
| B8 | Checkbox "Hide completed tasks" | `options/options.html`, `options.js` | ✅ |
| B9 | Empty state: ข้อความเมื่อยังไม่มี task (เช่น "No tasks yet. Add one above!") | `options/options.js` (renderTasks) | ✅ |
| B10 | สไตล์ vintage (cream, borders, Courier New) สำหรับ task list | `options/options.css` | ✅ |

---

## Phase C: Popup – Current task

| # | Task | File(s) | Done? |
|---|------|---------|--------|
| C1 | กล่อง "WORKING ON:" + แสดงชื่อ task หรือ "NO TASK SELECTED" | `popup/popup.html`, `popup.js` | ✅ |
| C2 | โหลด currentTaskId ตอนเปิด popup (getCurrentTask หรือ storage) | `popup/popup.js` | ✅ |
| C3 | โหลดรายการ tasks จาก sync (filter ไม่แสดง done) สำหรับ selector | `popup/popup.js` (loadTasksForSelector) | ✅ |
| C4 | คลิกกล่อง → เปิด dropdown/list เลือก task | `popup/popup.js` (toggleTaskSelector, openTaskSelector) | ✅ |
| C5 | ตัวเลือก "— None —" เพื่อเคลียร์ current task | `popup/popup.js` (renderTaskSelector) | ✅ |
| C6 | เมื่อเลือก task → ส่ง setCurrentTask ไป background + อัปเดต UI | `popup/popup.js` (selectTask) | ✅ |
| C7 | ถ้า currentTaskId ชี้ไปที่ task ที่ถูกลบ/ทำแล้ว → เคลียร์และแสดง NO TASK SELECTED | `popup/popup.js` (updateCurrentTaskDisplay) | ✅ |
| C8 | สไตล์ vintage สำหรับ current task box และ selector | `popup/popup.css` | ✅ |

---

## Phase D: Statistics – Per-task

| # | Task | File(s) | Done? |
|---|------|---------|--------|
| D1 | ใน options: section แสดง "Pomodoros Per Task" (หรือ Top Tasks) | `options/options.html` | ✅ |
| D2 | โหลด dailyStats แล้วรวม byTask ข้ามวัน (taskTotals) | `options/options.js` (loadTaskStats) | ✅ |
| D3 | แสดง list task title + จำนวน work sessions (เรียงจากมากไปน้อย) | `options/options.js` (loadTaskStats) | ✅ |
| D4 | กรณี task ถูกลบ: แสดง "(Deleted task)" หรือไม่แสดงชื่อ | `options/options.js` (taskMap[id] \|\| '(Deleted task)') | ✅ |

---

## Phase E: Optional & polish

| # | Task | File(s) | Done? |
|---|------|---------|--------|
| E1 | **Quick-add จาก popup**: ช่องใส่ชื่อสั้น + ปุ่ม Add → สร้าง task ใน sync + ตั้งเป็น current task | `popup/popup.html`, `popup.js`; optional ใน background `createQuickTask` | ☐ |
| E2 | ข้อความเมื่อถึง limit tasks ใน options (นอกจาก alert): ข้อความใต้ปุ่มหรือใต้ input | `options/options.html` / `options.js` | ☐ |
| E3 | Optional: ลิงก์ต่อ task (เปิด URL จาก popup) – ถ้ามี field link ใน task | `popup` (current task link icon) | ✅ (ถ้ามีแล้ว) |

---

## Phase F: Backward compatibility & edge cases

| # | Task | Done? |
|---|------|--------|
| F1 | ถ้า storage ไม่มี `tasks` → ใช้ `[]` | ✅ |
| F2 | ถ้าไม่มี `currentTaskId` → ใช้ null | ✅ |
| F3 | อ่าน dailyStats.byTask แบบปลอดภัย (ตรวจว่ามีก่อนใช้) | ✅ |
| F4 | onInstalled: ไม่ต้องเซต tasks (default เป็น [] ตอน get) | ✅ |

---

## Testing checklist

ใช้ตรวจหลังทำครบทุก phase:

- [ ] **Options – Tasks**
  - เพิ่ม task → ปรากฏใน list
  - เปลี่ยน status (todo → doing → done → todo)
  - ลบ task
  - ซ่อน completed tasks ทำงาน
  - เพิ่มครบ MAX_TASKS → ขึ้นข้อความ/alert ไม่ให้เพิ่มต่อ
- [ ] **Popup – Current task**
  - เปิด popup → แสดง current task หรือ NO TASK SELECTED
  - คลิกกล่อง → เลือก task ได้
  - เลือก None → current task ถูกล้าง
  - ลบ task ที่เป็น current อยู่ (จาก options) → เปิด popup ใหม่ แสดง NO TASK SELECTED
- [ ] **Session linkage**
  - ตั้ง current task → Start work → ให้จบ → เปิด Options → Pomodoros Per Task ของ task นั้นเพิ่ม
  - ไม่มี current task → จบ work session → สถิติรวมเพิ่มแต่ไม่มี byTask
- [ ] **Persistence**
  - ปิด browser / reload extension → เปิด popup → current task ยังเดิม (จาก local)
  - Tasks ใน options ยังอยู่ (sync)
- [ ] **Clear stats**
  - Clear All Statistics → dailyStats รวม byTask ถูกล้าง, Pomodoros Per Task ว่าง

---

## Order of work (ถ้าทำจากศูนย์)

1. Phase A (storage + background)
2. Phase B (options – tasks)
3. Phase C (popup – current task)
4. Phase D (options – per-task stats)
5. Phase E (optional/polish ตามต้องการ)
6. Phase F (ตรวจ edge cases)
7. รัน Testing checklist

---

## References

- Spec & design: `docs/plan/task-list-integration.md`
- PRD: `docs/PRD.md` – "Task List Integration – Feature Requirements (v2.0)"
- Code: `background/background.js`, `options/options.html|js|css`, `popup/popup.html|js|css`
