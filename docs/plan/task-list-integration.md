# Plan: Task List Integration

Task List Integration เพิ่ม “รายการงานแบบเบาๆ” ที่ผูกกับ Pomodoro sessions เพื่อให้ผู้ใช้เห็นว่าใช้เวลาทำงานกับ task ไหนบ้าง โดยยังคงความเรียบง่ายและสไตล์ Vintage Retro Clean

## Goals

- ให้ผู้ใช้สร้าง/จัดการรายการงานขนาดเล็ก (lightweight tasks) ภายใน extension
- ให้ผู้ใช้เลือก **Current Task** ก่อนหรือระหว่างการรัน Pomodoro
- เมื่อ work session จบ ให้บันทึกว่า session นั้นนับให้ task ไหน และสะท้อนใน statistics
- ไม่กลายเป็น full task manager แต่เป็น “Task + Pomodoro bridge” ที่เรียบง่าย

## Scope

### In scope

- Task list แบบ lightweight:
  - ฟิลด์หลัก: `id`, `title`, `status` (`todo`/`doing`/`done`)
  - จำกัดจำนวน tasks ต่อผู้ใช้ (เช่น 5–10 งาน) เพื่อให้ UI เบาและอ่านง่าย
  - เพิ่ม/ลบ/เปลี่ยนสถานะ task จาก options page
- Current Task:
  - เลือก task ปัจจุบันใน popup (เช่น dropdown / simple list)
  - แสดงข้อความ “WORKING ON: {taskTitle}” หรือ “NO TASK SELECTED”
- Session linkage:
  - เมื่อ work session จบ และมี current task → นับ session นั้นให้ task นั้น
  - ขยาย statistics เพื่อแสดงจำนวน Pomodoro ต่อ task (อย่างน้อย summary หรือ top tasks)
- Data persistence:
  - Tasks เก็บใน `chrome.storage.sync` (sync ข้าม devices)
  - Link ข้อมูลงานกับ statistics ใน `chrome.storage.local`

### Out of scope (สำหรับเวอร์ชันนี้)

- ระบบ task management เต็มรูปแบบ: projects, due date, tags, priority หลายระดับ, subtasks
- Integration กับ task tools ภายนอก (เช่น Todoist, Notion, Jira, Trello)
- ระบบ drag & drop reorder ที่ซับซ้อน (อาจเพิ่มทีหลังถ้าง่าย)
- Calendar integration และ scheduling ตามเวลา

## Design Touchpoints

- `background/background.js`
  - เก็บและอัปเดต `currentTaskId`
  - เมื่อ work session จบ → บันทึกสถิติให้ task นั้น (ถ้ามี)
- `options/options.html` + `options.js`
  - UI สำหรับจัดการ task list (add/remove/status)
  - อ่าน/เขียน `tasks` จาก `chrome.storage.sync`
- `popup/popup.html` + `popup.js`
  - UI แสดง current task
  - UI เลือก task ปัจจุบัน
  - ส่ง message ไป background เพื่ออัปเดต `currentTaskId`
- `docs/PRD.md`
  - สเปกฟีเจอร์ตามที่อัปเดตแล้ว (อ้างอิงเป็น source of truth)

## Data Model

### Tasks (`chrome.storage.sync`)

```js
// key: "tasks"
[
  {
    id: string,          // เช่น uuid / timestamp-based
    title: string,       // ชื่องานสั้นๆ
    status: 'todo' | 'doing' | 'done',
    createdAt: number,   // Date.now()
    completedAt?: number // เฉพาะเมื่อ status === 'done'
  },
  ...
]
```

- ควรมี helper ใน options.js สำหรับ:
  - โหลด tasks (fallback เป็น array ว่าง)
  - เซฟ tasks (เขียนกลับไปที่ `chrome.storage.sync`)

### Current Task

- เก็บเป็น `currentTaskId: string | null`
  - ตัวเลือก:
    - เก็บใน `chrome.storage.local` แยก key เช่น `"currentTaskId"`
    - หรือเก็บใน state ภายใน `background.js` แล้ว sync กับ storage ตามความเหมาะสม
- background เป็น source of truth ของ current task (popup อ่านผ่าน message หรือ storage)

### Statistics linkage (`chrome.storage.local`)

> ไม่บังคับรูปแบบตายตัว เพราะขึ้นกับ schema ปัจจุบัน แต่ควรเป็น **ส่วนขยาย** แบบ backward-compatible

แนวทางหนึ่ง:

```js
// ตัวอย่างขยาย per-day stats
{
  // เดิมมี today / week / allTime ฯลฯ
  today: {
    totalWorkSessions: number,
    // เพิ่ม per-task breakdown
    byTask: {
      [taskId: string]: {
        workSessions: number
      }
    }
  },
  // ...
}
```

หรือเก็บเป็น session logs (ถ้าโครงสร้างเดิมเอื้อ):

```js
[
  {
    timestamp: number,
    type: 'work' | 'shortBreak' | 'longBreak',
    taskId?: string
  },
  ...
]
```

ข้อกำหนดสำคัญ:

- ข้อมูลเดิมต้องยังอ่านได้ (ตรวจ `taskId`/`byTask` ก่อนใช้)
- ถ้าไม่มี current task → ไม่ผูก session กับ task ใดๆ

## Messaging Contracts

### Popup → Background

เพิ่ม message types:

- `setCurrentTask`
  - payload: `{ taskId: string | null }`
  - ใช้เมื่อผู้ใช้เลือก/เปลี่ยน/ล้าง current task

optional:

- `getCurrentTask`
  - payload: none
  - response: `{ taskId: string | null }` หรือข้อมูล task เพิ่มเติม (เช่น title)

- (ถ้าต้องการ quick-add จาก popup) `createQuickTask`
  - payload: `{ title: string }`
  - background สามารถสร้าง task ใหม่และตั้งเป็น current task ทันที หรือสั่ง options ให้ sync ผ่าน storage

### Background Behavior

- เก็บ `currentTaskId` ใน state ของ background
- เมื่อ work session จบ (logic ที่อัปเดต statistics ปัจจุบัน):
  - ถ้า `currentTaskId` มีค่า:
    - อัปเดต statistics ให้ task นั้น +1 work session
  - ถ้าไม่มี → ทำงานเหมือนเดิม (นับเป็น session ทั่วไปไม่ผูก task)

## UI/UX Details

### Options Page – Tasks Section

- Section ใหม่: **TASKS**
  - รายการ tasks แบบ vintage list:
    - Checkbox / status indicator
    - ชื่อ task (title) ใน monospace
    - ปุ่มลบ (เล็ก, ขวาสุด)
  - Input เพิ่ม task ใหม่:
    - Text input + ปุ่ม "ADD TASK"
    - validation: ไม่ว่าง, ความยาวไม่เกิน X ตัวอักษร (เช่น 80)
  - สถานะ:
    - `todo` (default)
    - `doing` (optional, ใช้เป็น highlight ว่าโฟกัสช่วงนี้)
    - `done` (แสดงแบบขีดฆ่าหรือจางลง)
  - Optional: checkbox "Hide completed tasks"

สไตล์:

- ใช้ cream/beige background, black borders และ Courier New ให้เข้ากับส่วนอื่นๆ
- ใช้ double border container เหมือน sections อื่น

### Popup – Current Task

- แสดงกล่องใต้ timer:

```text
WORKING ON:
Write project report
```

- เมื่อไม่มี current task:

```text
WORKING ON:
NO TASK SELECTED
```

- Interaction:
  - คลิกกล่อง หรือ icon เล็ก → เปิดเมนูเลือก task (dropdown / simple list)
  - เลือก `None` เพื่อเคลียร์ current task
  - ถ้าทำ quick-add: field ชื่อสั้นๆ + ปุ่ม `+` ที่มุมล่างของกล่อง

ข้อจำกัด:

- ต้องไม่ทำให้ popup แน่นเกินไปบน 350×500px
- ใส่ hover/active state แบบ vintage (border หนา/สีเข้มขึ้น)

## Implementation Steps

1. **Define storage schema**
   - ตกลงรูปแบบ `tasks` และตัวเลือกที่ใช้ (`status`, limit จำนวน, ฯลฯ)
   - เพิ่ม helper ใน `options.js` สำหรับ load/save tasks

2. **Implement options UI**
   - ปรับ `options.html`:
     - เพิ่ม section `TASKS`
     - เพิ่ม template สำหรับรายการ tasks และ input เพิ่ม task
   - ปรับ `options.css`:
     - สไตล์ list, ปุ่ม, input ให้เข้ากับ vintage theme
   - ปรับ `options.js`:
     - โหลด tasks จาก `chrome.storage.sync`
     - render list
     - event handlers: add, delete, toggle status

3. **Implement current task state in background**
   - เพิ่มตัวแปร/field `currentTaskId` ใน background state
   - เพิ่ม message handler `setCurrentTask`
   - (optional) handler `getCurrentTask`
   - persist `currentTaskId` ลง `chrome.storage.local` (ถ้าต้องการให้รอด reload)

4. **Wire popup UI กับ background**
   - ปรับ `popup.html` ให้มี current task box
   - ปรับ `popup.css` สำหรับสไตล์กล่องและเมนูเลือก
   - ปรับ `popup.js`:
     - โหลดรายการ tasks (ผ่าน `chrome.storage.sync` หรือ message/`chrome.storage` API)
     - แสดง current task (ผ่าน message `getCurrentTask` หรืออ่านจาก storage)
     - เมื่อผู้ใช้เลือก/ล้าง task → ส่ง message `setCurrentTask`

5. **Extend statistics update logic**
   - ใน background logic ที่ใช้เมื่อ work session จบ:
     - อ่าน `currentTaskId`
     - ถ้าไม่ null → อัปเดต statistics สำหรับ task นั้น
   - เพิ่ม helper เช่น `incrementTaskStats(taskId)` เพื่อไม่ปนกับโค้ดเดิมมากเกินไป

6. **Migration / backward compatibility**
   - เมื่อไม่มีค่า `tasks` / `currentTaskId` ใน storage:
     - ใช้ default: `[]` และ `null`
   - ตรวจเช็ค field ใหม่ใน stats (เช่น `byTask`) ด้วยการเช็ค null/undefined

7. **Testing**
   - ทดสอบ:
     - สร้าง tasks, ปิด/เปิด extension → tasks ยังอยู่ (sync)
     - ตั้ง current task → เริ่ม work session → ให้จบ → stats ของ task เพิ่มขึ้น
     - เปลี่ยน current task ระหว่างวัน → stats แต่ละ task แยกกันถูกต้อง
     - ไม่มี task เลือกอยู่ → stats เดิมยังทำงานปกติ
     - รีโหลด extension / browser → current task และ stats ไม่พัง

## Acceptance Criteria

- [ ] ผู้ใช้สามารถเพิ่ม/ลบ/แก้สถานะ tasks จาก options page ได้อย่างราบรื่น
- [ ] Popup แสดง current task ชัดเจน และผู้ใช้สามารถเลือก/ล้าง task ได้
- [ ] เมื่อ work session จบและมี current task, statistics จะนับ session นั้นให้ task นั้น
- [ ] สถิติ per-task แสดงผลในรูปแบบที่อ่านง่าย (อย่างน้อย summary หรือ top tasks)
- [ ] ข้อมูลเดิมของผู้ใช้ไม่เสียหายหลังอัปเดต (ไม่มี error จาก field ใหม่)
- [ ] Tasks และ current task sync ข้าม devices ตาม behavior ของ `chrome.storage.sync`

## References

- `docs/PRD.md` – Section **Task List Integration – Feature Requirements (v2.0)**
- `docs/SUMMARY.md` – Future Enhancements (v2.0+)
- `background/background.js` – Timer engine, statistics, storage
- `options/options.html` + `options.js` – Settings & statistics UI
- `popup/popup.html` + `popup.js` – Timer controls & main UI

