# Development Guide
# Pomodoro Chrome Extension

Quick reference guide for development workflow and team collaboration.

---

## 🚀 Quick Start

### For New Tasks
1. **Identify type**: Feature, Fix, Refactor, Review, or Consult?
2. **Choose agent**: Which agent should handle this?
3. **Follow workflow**: Use the appropriate workflow process
4. **Apply skills**: Leverage relevant project skills

### Quick Decision Tree

```
New Request
├─ Is it adding something new?
│  └─ YES → Feature Workflow → Developer Agent
│
├─ Is it fixing a problem?
│  └─ YES → Fix Workflow → Debugger Agent
│
├─ Is it improving existing code?
│  └─ YES → Refactor Workflow → Architecture Agent
│
├─ Is it checking quality?
│  └─ YES → Review Workflow → QA Agent
│
└─ Need advice/decision?
   └─ YES → Consult Workflow → Architecture Agent
```

---

## 👥 Agent Quick Reference

| Agent | Role | When to Use | Primary Skills |
|-------|------|-------------|----------------|
| **Project Manager** 📋 | Planning & coordination | Starting features, tracking progress | Project management, task breakdown |
| **Architecture** 🏗️ | System design | Technical decisions, major changes | System design, best practices |
| **Developer** 💻 | Implementation | Writing code, building features | Coding, Chrome APIs, Frontend |
| **Quality Assurance** ✅ | Testing | Verifying features, finding bugs | Testing, validation, edge cases |
| **Debugger** 🐛 | Problem solving | Investigating issues, finding root causes | Debugging, analysis, Chrome DevTools |
| **Documenter** 📝 | Documentation | Writing docs, updating guides | Technical writing, clarity |

---

## 📋 Workflow Quick Reference

### 1. Feature Workflow 🚀
**When**: Adding new functionality
**Steps**: Plan → Design → Implement → Test → Document → Merge
**Agents**: PM → Arch → Dev → QA → Doc
**Duration**: 1-5 days

### 2. Fix Workflow 🔧
**When**: Resolving bugs
**Steps**: Identify → Investigate → Design → Fix → Verify → Document
**Agents**: PM/QA → Debug → Arch → Dev → QA → Doc
**Duration**: 1 hour - 2 days

### 3. Refactor Workflow ♻️
**When**: Improving code quality
**Steps**: Identify → Plan → Implement → Validate → Review → Document
**Agents**: Arch/Dev → Arch → Dev → QA → Arch → Doc
**Duration**: 2-7 days

### 4. Review Workflow 🔍
**When**: Assessing quality
**Steps**: Request → Code Review → Architecture Review → Security → Documentation → Summary
**Agents**: PM → Arch/Dev → Arch → Arch/Debug → Doc → PM
**Duration**: 1-3 days

### 5. Consult Workflow 💡
**When**: Need expert advice
**Steps**: Request → Analyze → Recommend → Discuss → Decide → Document
**Agents**: Any → Arch → Arch → All → PM → Doc
**Duration**: 1 hour - 1 day

---

## 🎯 Common Scenarios

### Scenario 1: "Add Dark Mode"
1. **Type**: Feature
2. **Agent**: Start with Project Manager
3. **Workflow**: Feature Workflow
4. **Skills**: UI Design, CSS Variables, State Management
5. **Steps**:
   - PM: Create feature spec and tasks
   - Arch: Design theme system architecture
   - Dev: Implement theme toggle and styles
   - QA: Test in both modes
   - Doc: Update user guide

### Scenario 2: "Timer Stops After Sleep"
1. **Type**: Fix
2. **Agent**: Start with Debugger
3. **Workflow**: Fix Workflow
4. **Skills**: Timer Logic, Browser APIs, Debugging
5. **Steps**:
   - Debug: Reproduce and analyze
   - Arch: Review solution approach
   - Dev: Implement fix
   - QA: Verify fix works
   - Doc: Update known issues

### Scenario 3: "Clean Up Background.js"
1. **Type**: Refactor
2. **Agent**: Start with Architecture
3. **Workflow**: Refactor Workflow
4. **Skills**: Code Quality, JavaScript Best Practices
5. **Steps**:
   - Arch: Plan refactoring approach
   - Dev: Implement changes incrementally
   - QA: Verify no functionality changes
   - Arch: Review improvements
   - Doc: Update code docs

### Scenario 4: "Pre-Release Check"
1. **Type**: Review
2. **Agent**: Start with Project Manager
3. **Workflow**: Review Workflow
4. **Skills**: Testing, Security, Quality Assurance
5. **Steps**:
   - PM: Define review scope
   - Arch/Dev: Code review
   - Arch: Architecture assessment
   - Arch/Debug: Security check
   - Doc: Documentation review
   - PM: Compile action items

### Scenario 5: "Choose Chart Library"
1. **Type**: Consult
2. **Agent**: Start with Architecture
3. **Workflow**: Consult Workflow
4. **Skills**: Data Visualization, Library Evaluation
5. **Steps**:
   - Dev: Request consultation with options
   - Arch: Analyze alternatives (Chart.js vs D3.js)
   - Arch: Recommend Chart.js (simpler, smaller)
   - All: Discuss trade-offs
   - PM: Approve Chart.js
   - Doc: Document decision

---

## 🛠️ Essential Skills by Task Type

### Implementing Features
**Primary Skills**: Chrome Extension Dev, Frontend Dev, State Management
**Nice to Have**: UI Design, Animation

### Fixing Bugs
**Primary Skills**: Debugging, Chrome DevTools, Problem Solving
**Nice to Have**: Browser APIs, Testing

### Refactoring Code
**Primary Skills**: Code Quality, JavaScript Best Practices, Architecture
**Nice to Have**: Testing, Documentation

### Writing Tests
**Primary Skills**: Testing, QA, Edge Case Identification
**Nice to Have**: Automation, Performance

### Writing Documentation
**Primary Skills**: Technical Writing, Documentation Structure
**Nice to Have**: Visual Design, Examples

---

## 📁 Project Structure Reference

```
pomodoro-chrome-extension/
├── manifest.json              # Extension config
├── README.md                  # User documentation
├── .gitignore                 # Git ignore rules
│
├── popup/                     # Main UI
│   ├── popup.html            # Timer interface
│   ├── popup.css             # Styling
│   └── popup.js              # Timer logic
│
├── options/                   # Settings
│   ├── options.html          # Settings UI
│   ├── options.css           # Settings styling
│   └── options.js            # Settings logic
│
├── background/                # Service worker
│   └── background.js         # Background logic
│
├── assets/                    # Static files
│   ├── icons/                # Extension icons
│   └── sounds/               # Notification sounds
│
└── docs/                      # Documentation
    ├── PRD.md                # Product requirements
    ├── AGENTS.md             # Agent definitions
    ├── WORKFLOWS.md          # Workflow processes
    ├── SKILLS.md             # Skill catalog
    └── DEVELOPMENT_GUIDE.md  # This file
```

---

## 🔄 Standard Development Process

### 1. Starting Work
```bash
# 1. Understand the task
- Read requirements carefully
- Identify task type (feature/fix/refactor)
- Check related documentation

# 2. Plan approach
- Choose appropriate workflow
- Identify required agents
- List necessary skills

# 3. Set up environment
- Ensure extension is loaded in Chrome
- Open DevTools if needed
- Have documentation ready
```

### 2. During Development
```bash
# 1. Follow the workflow
- Complete each phase
- Get necessary approvals
- Communicate blockers

# 2. Test continuously
- Test as you code
- Check edge cases
- Verify in browser

# 3. Document changes
- Add code comments
- Update relevant docs
- Note important decisions
```

### 3. Before Completion
```bash
# 1. Self-review
- Check code quality
- Ensure tests pass
- Review requirements

# 2. Get reviews
- Code review by Architecture
- Testing by QA
- Documentation by Documenter

# 3. Finalize
- Address feedback
- Update changelog
- Mark task complete
```

---

## 🎯 Quality Checklist

### Code Quality ✅
- [ ] Follows project coding standards
- [ ] No console errors
- [ ] Proper error handling
- [ ] Efficient and readable
- [ ] Comments for complex logic

### Functionality ✅
- [ ] Meets all requirements
- [ ] Works in Chrome
- [ ] Handles edge cases
- [ ] No regressions
- [ ] Tested manually

### User Experience ✅
- [ ] Intuitive UI
- [ ] Responsive design
- [ ] Smooth animations
- [ ] Clear feedback
- [ ] Accessible

### Security ✅
- [ ] Input validation
- [ ] Minimal permissions
- [ ] No XSS vulnerabilities
- [ ] Safe data handling
- [ ] Privacy compliant

### Documentation ✅
- [ ] Code is documented
- [ ] README updated
- [ ] Changelog updated
- [ ] Examples provided
- [ ] Known issues noted

---

## 🚨 Common Issues & Solutions

### Issue: Timer Drift
**Workflow**: Fix
**Agent**: Debugger → Developer
**Skills**: Timer Logic, JavaScript
**Solution**: Use performance.now() for accuracy

### Issue: State Not Persisting
**Workflow**: Fix
**Agent**: Debugger → Developer
**Skills**: State Management, Chrome Storage API
**Solution**: Verify chrome.storage.local.set() calls

### Issue: Notifications Not Showing
**Workflow**: Fix
**Agent**: Debugger → QA
**Skills**: Chrome Notifications API, Permissions
**Solution**: Check notification permissions

### Issue: Background Script Suspended
**Workflow**: Consult → Fix
**Agent**: Architecture → Developer
**Skills**: Service Workers, Browser APIs
**Solution**: Use chrome.alarms for persistent timers

### Issue: Code is Messy
**Workflow**: Refactor
**Agent**: Architecture → Developer
**Skills**: Code Quality, Best Practices
**Solution**: Systematic refactoring

---

## 📊 Project Metrics

### Development Velocity
- **Feature**: 1-5 days average
- **Bug Fix**: 1 hour - 2 days average
- **Refactor**: 2-7 days average
- **Review**: 1-3 days average

### Code Quality Targets
- **Test Coverage**: Manual testing for all features
- **Documentation**: All public APIs documented
- **Code Review**: All code reviewed before merge
- **Bug Rate**: < 1 bug per feature

---

## 🎓 Learning Path

### Week 1: Basics
- Chrome Extension fundamentals
- Project structure
- Development workflows
- Code standards

### Week 2: Core Skills
- Timer implementation
- State management
- Chrome APIs
- Testing strategies

### Week 3: Advanced
- Performance optimization
- Security best practices
- Architecture patterns
- Advanced debugging

### Week 4: Mastery
- Feature development end-to-end
- Code review skills
- Documentation writing
- Team collaboration

---

## 📞 Getting Help

### When Stuck
1. **Check Documentation**: README, PRD, workflow docs
2. **Review Code**: Look at existing implementations
3. **Use DevTools**: Debug step by step
4. **Ask for Help**: Consult workflow with Architecture

### Escalation Path
1. **Technical Issues**: Developer → Architecture
2. **Quality Issues**: QA → Developer → Architecture
3. **Process Issues**: Any agent → Project Manager
4. **Urgent Bugs**: Directly to Debugger

---

## 🎉 Success Criteria

### Feature is Complete When:
- ✅ All requirements met
- ✅ Code reviewed and approved
- ✅ Tests passing
- ✅ Documentation updated
- ✅ QA signed off
- ✅ Merged to main

### Bug is Fixed When:
- ✅ Root cause identified
- ✅ Fix implemented
- ✅ Bug no longer reproduces
- ✅ Regression tests pass
- ✅ QA verified
- ✅ Known issues updated

### Refactor is Complete When:
- ✅ Goals achieved
- ✅ Code improved
- ✅ Tests still pass
- ✅ No functionality changes
- ✅ Reviewed and approved
- ✅ Documentation updated

---

## 📚 Additional Resources

### Documentation
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)

### Project Docs
- `README.md` - Setup and usage
- `docs/PRD.md` - Product requirements
- `docs/AGENTS.md` - Agent roles
- `docs/WORKFLOWS.md` - Development workflows
- `docs/SKILLS.md` - Skill catalog

### Tools
- Chrome DevTools
- VS Code
- Git
- GitHub

---

**Last Updated**: February 8, 2026
**Version**: 1.0.0
