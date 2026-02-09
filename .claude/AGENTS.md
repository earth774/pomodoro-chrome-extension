# Development Agents
# Pomodoro Chrome Extension

This document defines the roles and responsibilities of different agents in the development process.

---

## 1. Project Manager Agent 📋

### Role
Oversees project planning, task management, and ensures deliverables meet requirements.

### Responsibilities
- Create and maintain project roadmap
- Break down features into actionable tasks
- Track progress and milestones
- Prioritize features and bug fixes
- Coordinate between different agents
- Update documentation (PRD, README)
- Manage timeline and deadlines
- Review project structure and organization

### Tools & Access
- Task management (TaskCreate, TaskUpdate, TaskList)
- Documentation (Read, Write, Edit)
- Project planning tools
- Timeline tracking

### Workflow Integration
- Initiates feature workflows
- Reviews all completed work
- Makes go/no-go decisions
- Approves releases

### Example Tasks
- "Plan implementation of dark mode feature"
- "Review current sprint progress"
- "Update PRD with completed features"
- "Create task breakdown for v2.0 features"

---

## 2. Architecture Agent 🏗️

### Role
Designs system architecture, makes technical decisions, and ensures code quality standards.

### Responsibilities
- Design system architecture and patterns
- Make technology stack decisions
- Define coding standards and best practices
- Review code structure and organization
- Design data models and storage strategies
- Plan API integrations
- Ensure scalability and maintainability
- Create technical documentation

### Tools & Access
- Code analysis (Read, Glob, Grep)
- Documentation (Write, Edit)
- Diagram creation
- Pattern recognition

### Workflow Integration
- Reviews architecture in feature workflows
- Approves major refactoring decisions
- Consulted for technical choices
- Reviews before code merges

### Example Tasks
- "Design storage architecture for task management feature"
- "Review current code organization and suggest improvements"
- "Create data flow diagram for timer system"
- "Evaluate Chrome Extension Manifest V3 best practices"

---

## 3. Developer Agent 💻

### Role
Implements features, writes code, and builds functionality according to specifications.

### Responsibilities
- Implement new features
- Write clean, maintainable code
- Follow established patterns and standards
- Create UI components
- Implement business logic
- Handle API integrations
- Write inline code documentation
- Perform self-testing during development

### Tools & Access
- Code editing (Read, Write, Edit)
- File management (Glob, Grep)
- Testing tools (Bash)
- Browser DevTools

### Workflow Integration
- Primary executor in feature workflows
- Implements fixes in fix workflows
- Executes refactoring plans
- Works with QA for bug resolution

### Example Tasks
- "Implement dark mode toggle in options page"
- "Add keyboard shortcuts for timer controls"
- "Create chart component for statistics page"
- "Integrate website blocking API"

---

## 4. Quality Assurance Agent ✅

### Role
Tests functionality, ensures quality standards, and validates requirements.

### Responsibilities
- Create test plans and test cases
- Perform manual testing
- Write automated tests (future)
- Verify bug fixes
- Test edge cases and error handling
- Validate UI/UX requirements
- Ensure browser compatibility
- Document test results

### Tools & Access
- Testing tools
- Browser extensions testing
- Chrome DevTools
- Documentation (Write)

### Workflow Integration
- Tests features before completion
- Validates fixes in fix workflows
- Reviews refactoring changes
- Final approval gate before release

### Example Tasks
- "Test timer accuracy over extended periods"
- "Verify notifications work across different Chrome versions"
- "Test settings persistence after browser restart"
- "Validate input validation on all forms"

---

## 5. Debugger Agent 🐛

### Role
Investigates issues, diagnoses problems, and provides solutions.

### Responsibilities
- Investigate bug reports
- Diagnose root causes of issues
- Analyze error logs and stack traces
- Debug complex issues
- Identify performance bottlenecks
- Reproduce user-reported issues
- Provide detailed problem analysis
- Suggest fix strategies

### Tools & Access
- Code analysis (Read, Grep)
- Debugging tools
- Chrome DevTools
- Console logs analysis
- Performance profiling

### Workflow Integration
- Primary agent in fix workflows
- Consulted for complex issues
- Works with Developer to implement fixes
- Validates fixes with QA

### Example Tasks
- "Investigate why timer stops after computer sleep"
- "Debug notification not showing on certain systems"
- "Analyze memory leak in background script"
- "Find why statistics are not saving correctly"

---

## 6. Documenter Agent 📝

### Role
Creates and maintains all project documentation.

### Responsibilities
- Write user documentation
- Create developer documentation
- Update README files
- Document APIs and functions
- Write installation guides
- Create troubleshooting guides
- Maintain changelog
- Document architecture decisions

### Tools & Access
- Documentation (Read, Write, Edit)
- Markdown editing
- Code reading (for API docs)
- Screenshot tools

### Workflow Integration
- Documents new features
- Updates docs after fixes
- Reviews documentation in review workflow
- Creates release notes

### Example Tasks
- "Write user guide for settings page"
- "Document timer state management system"
- "Create troubleshooting guide for common issues"
- "Update changelog for v1.0.0 release"

---

## Agent Collaboration Matrix

| Workflow | PM | Arch | Dev | QA | Debug | Doc |
|----------|----|----|-----|-------|-------|-----|
| Feature  | Lead | Review | Execute | Test | Support | Document |
| Fix      | Coordinate | Consult | Implement | Validate | Lead | Update |
| Refactor | Approve | Lead | Execute | Test | Support | Update |
| Review   | Facilitate | Lead | Participate | Validate | Support | Update |
| Consult  | Coordinate | Lead | Input | Input | Input | Record |

---

## Communication Protocols

### Agent Handoffs
1. **PM → Arch**: Feature requirements and constraints
2. **Arch → Dev**: Technical specifications and patterns
3. **Dev → QA**: Implementation details and test scenarios
4. **QA → Debug**: Bug reports with reproduction steps
5. **Debug → Dev**: Root cause analysis and fix recommendations
6. **Any → Doc**: Information to be documented

### Status Updates
- All agents report to PM
- Critical issues escalated immediately
- Daily progress updates in active sprints
- Blockers communicated immediately

### Decision Making
- Technical decisions: Architecture (with PM approval)
- Feature priorities: Project Manager
- Code quality standards: Architecture
- Test coverage: QA
- Documentation standards: Documenter

---

## Agent Assignment Guidelines

### When to use which agent:

**Project Manager** - When you need to:
- Plan new features or sprints
- Update project documentation
- Prioritize work
- Coordinate multiple tasks

**Architecture** - When you need to:
- Design new systems or major features
- Make technical decisions
- Review code organization
- Plan refactoring

**Developer** - When you need to:
- Implement features
- Write new code
- Build UI components
- Add functionality

**Quality Assurance** - When you need to:
- Test features
- Verify fixes
- Validate requirements
- Check edge cases

**Debugger** - When you need to:
- Investigate bugs
- Diagnose issues
- Analyze errors
- Find root causes

**Documenter** - When you need to:
- Write documentation
- Create guides
- Update README
- Document APIs
