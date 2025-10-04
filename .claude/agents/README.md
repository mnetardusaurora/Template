# Agent Conventions & Coordination Guide

This directory contains specialized agent configurations for consistent, high-quality development across the project.

##  CRITICAL - CI/CD Workflow

**ALL AGENTS MUST FOLLOW THIS WORKFLOW:**

### Git Branch Strategy
- **NEVER commit directly to `main` branch**
- **ALWAYS push changes to `staging` branch first**
- Production deployments only happen after staging approval

### Workflow Steps
1. Create feature branch from `staging`
2. Make changes and commit
3. Push to `staging` branch (NOT main)
4. Automated tests run on staging
5. AWS Amplify deploys to staging environment
6. Human testing and approval required
7. Create PR from `staging` → `main`
8. After PR approval, deploy to production

**Read `docs/CI-CD-WORKFLOW.md` before making any code changes.**

### Commit Message Standards
When creating commits, **ALWAYS** follow `.claude/context/commit-message-guidelines.md`:
- Use conventional commit format (feat:, fix:, docs:, refactor:, test:, chore:)
- Write professional, technical commit messages
- NEVER include AI tool references, emojis, or informal language
- Write as a human developer would write

## Available Agents

### Development Agents
- **[Frontend Agent](./frontend-agent.md)** - React, Tailwind, shadcn/ui development
- **[Backend Agent](./backend-agent.md)** - Node.js API, database, AWS integration
- **[DevOps Agent](./devops-agent.md)** - Infrastructure, deployment, CI/CD

### Quality & Security Agents
- **[QA/Testing Agent](./qa-testing-agent.md)** - Test automation, quality assurance
- **[Cybersecurity Agent](./cybersecurity-agent.md)** - Security review, vulnerability assessment

### Support Agents
- **[Design Agent](./design-agent.md)** - UI/UX design, component design
- **[Technical Writer Agent](./technical-writer-agent.md)** - Documentation, guides, API docs

## How to Use Agents

### Invoking an Agent

When you need specialized help, invoke the appropriate agent using the Task tool in Claude Code:

```
Use the Task tool with subagent_type: "general-purpose" and provide:

"I need the [Agent Name] to [specific task].

Context:
- [Relevant information]
- [Existing code/files]
- [Requirements]

Please follow the conventions in .claude/agents/[agent-name].md"
```

### Agent Input Format

Each agent expects structured input (see individual agent files):
- **Task**: Clear, specific task description
- **Scope**: What to work on
- **Context**: Background information, related files
- **Requirements**: Functional, technical, security requirements
- **Success Criteria**: How to validate completion

### Agent Output Format

Each agent provides structured output:
- Analysis of current state
- Recommendations or implementation plan
- Code/documentation/designs
- Testing strategy
- Security/accessibility checklist
- Handoff notes for other agents

## Agent Coordination

### Multi-Agent Workflows

When a task requires multiple agents, coordinate them in sequence:

#### Example: New Feature Development
```
1. Design Agent: Create UI/UX design
   → Provides: Component specs, user flows

2. Frontend Agent: Implement UI components
   → Uses: Design specs
   → Provides: Components, API requirements

3. Backend Agent: Implement API endpoints
   → Uses: Frontend API requirements
   → Provides: API, database changes

4. QA/Testing Agent: Create test suite
   → Uses: Feature implementation
   → Provides: Tests, coverage report

5. Cybersecurity Agent: Security review
   → Uses: Complete implementation
   → Provides: Security findings, fixes

6. Technical Writer Agent: Document feature
   → Uses: Final implementation
   → Provides: User docs, API docs

7. DevOps Agent: Deploy to staging
   → Uses: Tested, documented feature
   → Provides: Deployed feature, monitoring
```

### Handoff Protocol

When one agent completes work and hands off to another:

**Provide**:
1. Summary of work completed
2. Files changed/created
3. Requirements for next agent
4. Known issues or constraints
5. References to relevant documentation

**Example Handoff**:
```
Frontend Agent to Backend Agent:

Completed: User profile component
Files: frontend/src/components/profile/UserProfile.tsx

API Requirements:
- GET /api/users/:id
  Response: { id, name, email, avatar, createdAt }
- PUT /api/users/:id
  Request: { name, avatar }
  Response: Updated user object

Authentication: Required (Clerk JWT)
Validation: Name max 100 chars, avatar must be URL

Next: Backend Agent to implement these endpoints
```

## Agent Responsibilities Matrix

| Task | Primary Agent | Review Agent | Support Agents |
|------|---------------|--------------|----------------|
| New UI Component | Frontend | Design, QA | Cybersecurity |
| API Endpoint | Backend | Cybersecurity, QA | Frontend (API design) |
| Database Schema | Backend | Cybersecurity | DevOps (migration) |
| Infrastructure | DevOps | Cybersecurity | Backend |
| Feature Design | Design | Frontend | QA (usability) |
| Security Audit | Cybersecurity | DevOps | All (remediation) |
| Documentation | Technical Writer | Relevant domain agent | - |
| Test Suite | QA/Testing | Cybersecurity (security tests) | Domain agents |
| Deployment | DevOps | QA (smoke tests) | Cybersecurity |

## Communication Standards

### File References
Always use format: `path/to/file.ts:line` for easy navigation

### Issue Creation
Use templates in `.claude/templates/` for consistency:
- `bug-report.md` - Bug reports
- `feature-request.md` - Feature requests
- `security-finding.md` - Security vulnerabilities

### Architecture Decisions
Document significant decisions in ADRs (Architecture Decision Records):
- Location: `docs/adr/`
- Template: `.claude/templates/adr-template.md`
- Naming: `YYYYMMDD-descriptive-title.md`

### Code Patterns
Follow established patterns in `.claude/patterns/`:
- `frontend-patterns.md` - Frontend code patterns
- `backend-patterns.md` - Backend code patterns
- `testing-patterns.md` - Testing patterns

## Quality Standards

All agents must ensure:
-  **TypeScript**: Strict mode, no `any` types
-  **Testing**: >80% coverage for critical paths
-  **Security**: No vulnerabilities, proper auth/validation
-  **Accessibility**: WCAG 2.1 AA compliance
-  **Performance**: Within defined budgets
-  **Documentation**: Code comments, user docs
-  **Code Review**: Follows project standards

## Best Practices for Agent Collaboration

### 1. Early Coordination
Involve relevant agents early in planning:
- Design Agent → before coding UI
- Cybersecurity Agent → during design, before deployment
- QA/Testing Agent → during development, not after

### 2. Clear Communication
When requesting agent help:
- Be specific about what you need
- Provide complete context
- Reference existing patterns
- State constraints clearly

### 3. Iterative Feedback
Agents should:
- Request clarification when needed
- Suggest improvements based on expertise
- Highlight risks or concerns
- Recommend alternatives

### 4. Knowledge Sharing
Agents should:
- Document decisions (ADRs)
- Update pattern libraries
- Share learnings
- Improve templates based on experience

### 5. Consistent Standards
All agents follow:
- Project coding standards (`.claude/workflows/code-standards.md`)
- Development process (`.claude/workflows/development-process.md`)
- Testing strategy (`.claude/workflows/testing-strategy.md`)

## Escalation Path

When agents encounter blockers:

1. **Technical Blocker**: Consult relevant domain agent
2. **Security Risk**: Escalate to Cybersecurity Agent (mandatory review)
3. **Performance Issue**: Consult DevOps + relevant domain agent
4. **Design Conflict**: Consult Design Agent + stakeholders
5. **Scope Ambiguity**: Clarify requirements with requester

## Agent Performance Metrics

Track agent effectiveness:
- **Quality**: Defect rate, review feedback
- **Efficiency**: Task completion time, rework rate
- **Collaboration**: Handoff smoothness, communication clarity
- **Standards**: Compliance with guidelines

## Updating Agent Configurations

When to update agent files:
- New tools or frameworks adopted
- Pattern improvements discovered
- Process changes
- New compliance requirements
- Lessons learned from incidents

How to update:
1. Propose change (issue or PR)
2. Get feedback from relevant agents/team
3. Update agent file
4. Document in changelog
5. Notify team

## Resources

- **Context Files**: `.claude/context/` - Project context for all agents
- **Workflows**: `.claude/workflows/` - Development processes
- **Patterns**: `.claude/patterns/` - Code patterns and examples
- **Prompts**: `.claude/prompts/` - Reusable prompt templates
- **Templates**: `.claude/templates/` - Issue and doc templates

## Quick Reference

### When to Use Which Agent

| Scenario | Agent to Use |
|----------|--------------|
| "I need a new React component" | Frontend Agent |
| "I need a new API endpoint" | Backend Agent |
| "Something looks wrong in production" | DevOps Agent |
| "Is this code secure?" | Cybersecurity Agent |
| "How do I test this?" | QA/Testing Agent |
| "What should this look like?" | Design Agent |
| "How do I document this?" | Technical Writer Agent |
| "Build is slow/failing" | DevOps Agent |
| "Database query is slow" | Backend Agent |
| "UI is not accessible" | Design + QA Agent |

### Emergency Contacts

For production issues:
1. DevOps Agent (infrastructure, deployment)
2. Cybersecurity Agent (security incidents)
3. Backend Agent (API/database issues)
4. Frontend Agent (UI critical bugs)

---

**Remember**: Agents are specialized experts. Use their expertise, follow their conventions, and coordinate effectively for best results.
