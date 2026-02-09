# Development Workflows
# Pomodoro Chrome Extension

This document defines standard workflows for different types of development work.

---

## 1. Feature Workflow 🚀

### Purpose
Implement new functionality or enhancement to the extension.

### Process

#### Phase 1: Planning
**Agent**: Project Manager
1. Review feature request/requirement
2. Create feature specification
3. Break down into tasks
4. Estimate timeline
5. Create task list

**Outputs**:
- Feature specification document
- Task breakdown
- Timeline estimate

#### Phase 2: Architecture Review
**Agent**: Architecture
1. Review feature specification
2. Design technical approach
3. Identify impacted components
4. Plan data models/storage
5. Define integration points
6. Document architectural decisions

**Outputs**:
- Technical design document
- Component diagram
- API specifications

#### Phase 3: Implementation
**Agent**: Developer
1. Set up development environment
2. Implement feature according to design
3. Write code following standards
4. Add inline documentation
5. Perform self-testing
6. Handle edge cases

**Outputs**:
- Implemented feature code
- Unit tests (if applicable)
- Code documentation

#### Phase 4: Quality Assurance
**Agent**: QA
1. Review implementation against requirements
2. Create test plan
3. Execute test cases
4. Test edge cases
5. Verify browser compatibility
6. Document test results

**Outputs**:
- Test report
- Bug list (if any)
- QA sign-off

#### Phase 5: Documentation
**Agent**: Documenter
1. Update user documentation
2. Add to changelog
3. Update README if needed
4. Create usage examples

**Outputs**:
- Updated documentation
- Changelog entry

#### Phase 6: Review & Merge
**Agent**: Project Manager + Architecture
1. Final code review
2. Verify all tasks complete
3. Check documentation
4. Approve merge
5. Update project status

**Outputs**:
- Merged feature
- Updated project status

---

## 2. Fix Workflow 🔧

### Purpose
Resolve bugs, issues, or defects in the extension.

### Process

#### Phase 1: Issue Identification
**Agent**: Project Manager or QA
1. Document bug report
2. Assign priority/severity
3. Assign to Debugger
4. Create tracking task

**Outputs**:
- Bug report
- Priority classification
- Tracking task

#### Phase 2: Investigation
**Agent**: Debugger
1. Reproduce the issue
2. Analyze root cause
3. Identify affected components
4. Document findings
5. Propose solution approach

**Outputs**:
- Root cause analysis
- Reproduction steps
- Solution proposal

#### Phase 3: Architecture Review (if needed)
**Agent**: Architecture
1. Review proposed solution
2. Validate approach
3. Suggest alternatives if needed
4. Approve fix strategy

**Outputs**:
- Approved fix strategy

#### Phase 4: Implementation
**Agent**: Developer
1. Implement the fix
2. Add error handling
3. Add defensive code
4. Test the fix locally
5. Document changes

**Outputs**:
- Fix implementation
- Test results

#### Phase 5: Verification
**Agent**: QA
1. Verify fix resolves issue
2. Test regression scenarios
3. Ensure no new issues introduced
4. Validate in multiple environments

**Outputs**:
- Verification report
- QA approval

#### Phase 6: Documentation
**Agent**: Documenter
1. Update changelog
2. Add to known issues (if workaround)
3. Update troubleshooting guide

**Outputs**:
- Updated documentation

---

## 3. Refactor Workflow ♻️

### Purpose
Improve code quality, structure, or performance without changing functionality.

### Process

#### Phase 1: Identification
**Agent**: Architecture or Developer
1. Identify code smell or improvement opportunity
2. Document current issues
3. Define refactoring goals
4. Get PM approval

**Outputs**:
- Refactoring proposal
- Goals and benefits

#### Phase 2: Planning
**Agent**: Architecture
1. Design refactored structure
2. Plan migration strategy
3. Identify risks
4. Define success criteria
5. Create implementation plan

**Outputs**:
- Refactoring plan
- Risk assessment
- Success criteria

#### Phase 3: Implementation
**Agent**: Developer
1. Create backup/branch
2. Implement refactoring incrementally
3. Ensure no functionality changes
4. Update related code
5. Test continuously

**Outputs**:
- Refactored code
- Test results

#### Phase 4: Validation
**Agent**: QA
1. Verify functionality unchanged
2. Test all affected features
3. Check performance metrics
4. Validate against success criteria

**Outputs**:
- Validation report
- Performance comparison

#### Phase 5: Review
**Agent**: Architecture + PM
1. Review code quality improvement
2. Verify goals achieved
3. Document lessons learned
4. Approve merge

**Outputs**:
- Review approval
- Lessons learned

#### Phase 6: Documentation
**Agent**: Documenter
1. Update code documentation
2. Document new patterns used
3. Update architecture docs

**Outputs**:
- Updated documentation

---

## 4. Review Workflow 🔍

### Purpose
Comprehensive review of code, architecture, or documentation.

### Process

#### Phase 1: Review Request
**Agent**: Project Manager
1. Define review scope
2. Assign reviewers
3. Set review criteria
4. Schedule review

**Outputs**:
- Review scope
- Review checklist

#### Phase 2: Code Review
**Agent**: Architecture + Developer
1. Review code quality
2. Check coding standards compliance
3. Identify potential issues
4. Suggest improvements
5. Verify best practices

**Outputs**:
- Code review comments
- Improvement suggestions

#### Phase 3: Architecture Review
**Agent**: Architecture
1. Review system design
2. Check scalability
3. Verify patterns usage
4. Assess maintainability
5. Identify technical debt

**Outputs**:
- Architecture assessment
- Technical debt items

#### Phase 4: Security Review
**Agent**: Architecture + Debugger
1. Check for security vulnerabilities
2. Verify input validation
3. Check permission usage
4. Review data handling
5. Assess privacy compliance

**Outputs**:
- Security assessment
- Vulnerability report

#### Phase 5: Documentation Review
**Agent**: Documenter
1. Review documentation completeness
2. Check accuracy
3. Verify examples
4. Ensure clarity

**Outputs**:
- Documentation review
- Update recommendations

#### Phase 6: Summary & Action Items
**Agent**: Project Manager
1. Compile all feedback
2. Prioritize action items
3. Create improvement tasks
4. Schedule follow-up

**Outputs**:
- Review summary
- Action items
- Improvement tasks

---

## 5. Consult Workflow 💡

### Purpose
Get expert advice on technical decisions, architectural choices, or problem-solving.

### Process

#### Phase 1: Consultation Request
**Agent**: Any agent
1. Define the problem/question
2. Provide context
3. State constraints
4. Identify decision criteria
5. Request specific expertise

**Outputs**:
- Consultation request
- Context document

#### Phase 2: Analysis
**Agent**: Architecture + relevant experts
1. Analyze the situation
2. Research options
3. Evaluate alternatives
4. Consider trade-offs
5. Assess risks

**Outputs**:
- Analysis report
- Options comparison

#### Phase 3: Recommendation
**Agent**: Architecture (lead)
1. Provide expert recommendation
2. Explain reasoning
3. Document pros/cons
4. Suggest implementation approach
5. Highlight risks

**Outputs**:
- Expert recommendation
- Implementation guidance

#### Phase 4: Discussion
**Agent**: All relevant agents
1. Discuss recommendation
2. Ask clarifying questions
3. Challenge assumptions
4. Reach consensus

**Outputs**:
- Discussion notes
- Consensus decision

#### Phase 5: Decision
**Agent**: Project Manager
1. Make final decision
2. Document decision rationale
3. Create action items
4. Assign owners

**Outputs**:
- Decision document
- Action items

#### Phase 6: Documentation
**Agent**: Documenter
1. Document decision
2. Record rationale
3. Add to architecture decision log
4. Update relevant docs

**Outputs**:
- Decision record
- Updated documentation

---

## Workflow Quick Reference

### When to use each workflow:

| Scenario | Workflow | Primary Agent |
|----------|----------|---------------|
| Add new feature | Feature | PM → Dev |
| Fix a bug | Fix | Debugger → Dev |
| Improve code | Refactor | Architecture → Dev |
| Assess quality | Review | Architecture |
| Need advice | Consult | Architecture |
| Add dark mode | Feature | PM |
| Timer not working | Fix | Debugger |
| Cleanup code | Refactor | Architecture |
| Pre-release check | Review | PM |
| Choose library | Consult | Architecture |

---

## Workflow Templates

### Feature Template
```markdown
## Feature: [Feature Name]

### Specification
- **Description**: [What the feature does]
- **User Story**: As a [user], I want [goal] so that [benefit]
- **Requirements**: [List requirements]
- **Acceptance Criteria**: [List criteria]

### Technical Design
- **Components**: [List affected components]
- **Storage**: [Data storage needs]
- **APIs**: [External APIs needed]
- **UI Changes**: [UI modifications]

### Tasks
- [ ] Design UI mockups
- [ ] Implement backend logic
- [ ] Create UI components
- [ ] Add error handling
- [ ] Write tests
- [ ] Update documentation

### Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] Cross-browser testing
```

### Bug Fix Template
```markdown
## Bug: [Bug Title]

### Description
[Detailed description of the bug]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Root Cause
[Analysis of the problem]

### Solution
[How the fix works]

### Testing
- [ ] Bug no longer reproduces
- [ ] Regression tests pass
- [ ] Edge cases handled
```

### Refactor Template
```markdown
## Refactor: [Component/Area]

### Current Issues
- [Issue 1]
- [Issue 2]

### Goals
- [Goal 1]
- [Goal 2]

### Approach
[Description of refactoring approach]

### Benefits
- [Benefit 1]
- [Benefit 2]

### Risks
- [Risk 1 and mitigation]
- [Risk 2 and mitigation]

### Success Criteria
- [ ] Code is more readable
- [ ] Performance improved
- [ ] Tests still pass
- [ ] No functionality changes
```

---

## Workflow Best Practices

### General
1. Always create a task or issue first
2. Get appropriate approvals before starting
3. Communicate blockers immediately
4. Update status regularly
5. Document decisions and rationale

### Feature Development
1. Start with clear requirements
2. Design before coding
3. Test continuously
4. Get early feedback
5. Document as you go

### Bug Fixes
1. Reproduce first
2. Understand root cause
3. Fix the cause, not symptoms
4. Add tests to prevent regression
5. Verify thoroughly

### Refactoring
1. Have a clear goal
2. Make small, incremental changes
3. Keep tests green
4. Don't mix refactoring with features
5. Review before and after

### Code Review
1. Review promptly
2. Be constructive
3. Focus on important issues
4. Suggest alternatives
5. Approve when ready

### Consultation
1. Provide full context
2. Be specific about what you need
3. Come with research done
4. Be open to alternatives
5. Document the outcome
