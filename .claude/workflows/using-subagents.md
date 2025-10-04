# Using Claude Code Sub-Agents

This guide explains how to effectively use Claude Code sub-agents for various development tasks in this project.

## When to Use Sub-Agents

Sub-agents are autonomous agents that can handle complex, multi-step tasks. Use them when:

1. **Searching for code patterns** - Finding specific implementations across large codebases
2. **Complex refactoring** - Multi-file changes requiring context gathering
3. **Bug investigation** - Searching for root causes across multiple files
4. **Feature implementation** - Multi-step feature additions
5. **Documentation generation** - Creating comprehensive docs from code
6. **Test generation** - Creating test suites for existing code

## Available Sub-Agent Types

### General Purpose Agent
**When to use:**
- Researching complex questions across the codebase
- Finding specific code patterns or implementations
- Multi-step investigations
- When you need to search multiple files and aren't confident you'll find the match quickly

**Example prompts:**
```
"Find all components that use the useAuth hook and check if they handle loading states properly"

"Search for any instances where we make API calls without error handling"

"Investigate why users are experiencing slow page loads on the dashboard"
```

## Specialized Agents

This project has specialized agent configurations that provide expert guidance for specific domains. While you invoke them using the general-purpose agent in Claude Code, these configurations ensure consistent, high-quality outputs.

**Location**: `.claude/agents/`

**Available Specialized Agents**:

### 1. Frontend Agent
**Expertise**: React, Tailwind CSS, shadcn/ui, accessibility, performance
**Configuration**: `.claude/agents/frontend-agent.md`

**When to invoke:**
- Building React components
- Implementing UI/UX designs
- Optimizing frontend performance
- Ensuring accessibility compliance
- Integrating APIs from frontend

**Example invocation:**
```
"I need help from the Frontend Agent to create a new user profile component.

Task: Create UserProfile component
Requirements:
- Display user info (name, email, avatar)
- Edit mode with form validation
- Responsive design
- Accessible (WCAG 2.1 AA)
- Loading and error states

Please follow the conventions in .claude/agents/frontend-agent.md"
```

---

### 2. Backend Agent
**Expertise**: Node.js, NestJS, Prisma, PostgreSQL, API design, authentication
**Configuration**: `.claude/agents/backend-agent.md`

**When to invoke:**
- Creating API endpoints
- Database schema design
- Authentication/authorization logic
- Third-party API integrations
- Performance optimization

**Example invocation:**
```
"I need help from the Backend Agent to implement a new API endpoint.

Task: Create endpoint to update user profile
Endpoint: PUT /api/users/:id
Requirements:
- Validate input (name, email)
- Check authorization (user can only update own profile)
- Update database via Prisma
- Return updated user
- Comprehensive error handling

Please follow the conventions in .claude/agents/backend-agent.md"
```

---

### 3. DevOps Agent
**Expertise**: AWS Amplify, GitHub Actions, infrastructure, deployment, monitoring
**Configuration**: `.claude/agents/devops-agent.md`

**When to invoke:**
- Infrastructure optimization
- CI/CD pipeline issues
- Deployment automation
- Performance monitoring setup
- Scaling analysis

**Example invocation:**
```
"I need help from the DevOps Agent to optimize our build process.

Task: Reduce CI/CD build time
Current: 12 minutes for full pipeline
Target: Under 7 minutes
Focus areas:
- Build caching
- Parallel execution
- Dependency optimization

Please follow the conventions in .claude/agents/devops-agent.md"
```

---

### 4. QA/Testing Agent
**Expertise**: Playwright E2E, Vitest, Jest, test automation, coverage analysis
**Configuration**: `.claude/agents/qa-testing-agent.md`

**When to invoke:**
- Writing test suites
- Improving test coverage
- Bug reproduction
- Accessibility testing
- Performance testing

**Example invocation:**
```
"I need help from the QA/Testing Agent to create E2E tests.

Task: E2E test suite for user authentication flow
User flow:
1. Navigate to sign-up page
2. Fill registration form
3. Verify email (mock)
4. Sign in
5. Access protected page

Requirements:
- Test happy path
- Test validation errors
- Test on mobile viewport
- Accessibility checks

Please follow the conventions in .claude/agents/qa-testing-agent.md"
```

---

### 5. Cybersecurity Agent
**Expertise**: Security review, vulnerability assessment, AWS security, compliance
**Configuration**: `.claude/agents/cybersecurity-agent.md`

**When to invoke:**
- Security code reviews
- Vulnerability assessments
- Authentication/authorization review
- Data protection audit
- Compliance verification

**Example invocation:**
```
"I need help from the Cybersecurity Agent to review authentication security.

Task: Security audit of Clerk authentication integration
Scope:
- JWT token handling
- Session management
- Protected route implementation
- Logout security

Please follow the conventions in .claude/agents/cybersecurity-agent.md"
```

---

### 6. Design Agent
**Expertise**: UI/UX design, shadcn/ui, accessibility, responsive design, security UX
**Configuration**: `.claude/agents/design-agent.md`

**When to invoke:**
- Component design specs
- User flow design
- Accessibility design review
- Responsive design specifications
- Design system updates

**Example invocation:**
```
"I need help from the Design Agent to design a new dashboard.

Task: Design security dashboard for admin users
Purpose: Monitor system security status
Key metrics:
- Active threats count
- User login activity
- System health status
- Recent security events

Requirements:
- Scannable layout
- Real-time updates
- Responsive
- Accessible
- Security industry UX patterns

Please follow the conventions in .claude/agents/design-agent.md"
```

---

### 7. Technical Writer Agent
**Expertise**: Documentation, API docs, user guides, tutorials, Confluence
**Configuration**: `.claude/agents/technical-writer-agent.md`

**When to invoke:**
- Writing API documentation
- Creating user guides
- Integration documentation
- Architecture docs
- Release notes

**Example invocation:**
```
"I need help from the Technical Writer Agent to document our API.

Task: Document user management API endpoints
Endpoints: GET/POST/PUT/DELETE /api/users/*
Audience: External developers integrating with our API
Format: Markdown with code examples

Please follow the conventions in .claude/agents/technical-writer-agent.md"
```

---

## Using Specialized Agents

### How to Invoke

1. **Reference the agent configuration** in your prompt
2. **Provide structured input** as defined in the agent file
3. **Specify expected output format**
4. **Include relevant context**

### Agent Coordination

For multi-agent workflows (e.g., new feature development):

```
"I'm building a new feature for user notifications.

Step 1 - Design Agent: Design the notification UI component and user flow
Step 2 - Frontend Agent: Implement the notification component
Step 3 - Backend Agent: Create API endpoint for notifications
Step 4 - QA/Testing Agent: Create test suite
Step 5 - Cybersecurity Agent: Security review
Step 6 - Technical Writer Agent: Document the feature
Step 7 - DevOps Agent: Deploy to staging

Let's start with Step 1. Please reference .claude/agents/design-agent.md for conventions."
```

### Handoffs Between Agents

When one agent completes work for another:
- Provide summary of work completed
- List files changed
- Specify requirements for next agent
- Reference relevant docs/ADRs

Example:
```
"Frontend Agent to Backend Agent handoff:

Completed: UserNotification component (frontend/src/components/notifications/)
API Requirements for Backend Agent:
- GET /api/notifications - fetch user notifications
- POST /api/notifications/mark-read - mark as read
- Response format: { id, message, type, read, createdAt }

Please implement following .claude/agents/backend-agent.md conventions"
```

## Best Practices for Sub-Agent Usage

### 1. Be Specific in Your Prompts

**Good:**
```
"Search the frontend codebase for all components that make direct API calls
without using the centralized api.ts client. List each occurrence with the
file path and line number, and suggest how to refactor them."
```

**Bad:**
```
"Find API problems"
```

### 2. Provide Context

Include relevant information:
- What you've already tried
- What the expected behavior should be
- Any error messages you're seeing
- Related files or components

**Example:**
```
"The user profile page is showing stale data after updates. I've checked the
useAuth hook and it seems fine. Search for components that display user data
and check if they're properly invalidating cache or refetching after mutations."
```

### 3. Use Sub-Agents for Parallel Tasks

When you have multiple independent investigations:
```
"Launch two sub-agents in parallel:
1. Search for all TODO comments in the codebase and categorize by priority
2. Find all console.log statements and suggest which should be converted to proper logging"
```

### 4. Specify Output Format

Tell the agent exactly what information you need:
```
"Search for all components using deprecated React lifecycle methods.
Return a table with: Component Name, File Path, Lifecycle Method Used,
Suggested Modern Hook"
```

## Common Use Cases

### Security Audit
```
"Perform a security audit of the authentication system:
1. Check for proper input validation
2. Verify secrets are not hardcoded
3. Ensure all API endpoints have auth middleware
4. Look for SQL injection vulnerabilities
5. Return findings categorized by severity"
```

### Performance Optimization
```
"Analyze the application for performance issues:
1. Find components with expensive re-renders
2. Identify missing React.memo opportunities
3. Check for large bundle imports
4. Look for N+1 database queries
5. Provide specific optimization recommendations"
```

### Code Quality Check
```
"Review the codebase for code quality issues:
1. Find duplicated code that could be extracted
2. Identify overly complex functions (>50 lines)
3. Look for missing error handling
4. Check for proper TypeScript types (no 'any')
5. Suggest refactoring opportunities"
```

### Migration Tasks
```
"Help migrate from React Router v5 to v6:
1. Find all route definitions
2. Identify deprecated APIs being used
3. Create a migration checklist
4. Suggest the migration order"
```

### Test Coverage Gaps
```
"Identify testing gaps:
1. Find all services without unit tests
2. List critical user flows without E2E tests
3. Find components with complex logic but no tests
4. Prioritize by risk/importance"
```

## Sub-Agent Workflow Examples

### Feature Implementation Workflow

```
Step 1: Research
"Search the codebase to understand how similar features are implemented.
Look for: form handling patterns, API integration patterns, state management
approaches. Return examples of each."

Step 2: Implementation Planning
"Based on the examples, create a detailed implementation plan for adding
a new user settings page with these requirements: [list requirements]"

Step 3: Code Generation
(Regular Claude Code can implement based on the plan)

Step 4: Review
"Review the new user settings implementation for:
- Consistency with existing patterns
- Proper error handling
- Accessibility compliance
- Performance considerations"
```

### Bug Investigation Workflow

```
Step 1: Reproduce
"Search for all code paths that could lead to [bug description].
Include component tree, API calls, and state management."

Step 2: Root Cause
"Analyze the code paths identified and determine the most likely root cause.
Consider: race conditions, state inconsistencies, data validation issues."

Step 3: Impact Analysis
"Find all places affected by this bug. Check for similar patterns that might
have the same issue."

Step 4: Fix Verification
(After implementing fix)
"Verify the fix by checking:
1. The original bug scenario
2. Edge cases
3. Related functionality
4. No regressions introduced"
```

## Tips for Effective Sub-Agent Use

### 1. Scope Appropriately
-  Use for complex, multi-file searches
-  Use for analysis requiring context from many files
-  Don't use for simple file reads (use Read tool instead)
-  Don't use for known specific locations (use Glob + Read)

### 2. Iteration
If the first sub-agent result isn't complete:
```
"Continue the previous search but also check:
- The hooks directory
- Any utility files
- Type definitions"
```

### 3. Combine with Other Tools
```
"After the sub-agent finds the relevant files, use the Edit tool to
apply the refactoring to each file"
```

### 4. Progressive Refinement
Start broad, then narrow down:
```
Round 1: "Find all authentication-related files"
Round 2: "From those files, identify which ones handle JWT tokens"
Round 3: "Show me how JWT expiration is currently handled"
```

## Anti-Patterns to Avoid

###  Using Sub-Agents for Simple Tasks
```
Bad: "Use sub-agent to read App.tsx"
Good: Use Read tool directly
```

###  Vague Requests
```
Bad: "Find problems in the code"
Good: "Find all API calls missing try-catch blocks and proper error handling"
```

###  No Success Criteria
```
Bad: "Look at the authentication"
Good: "Verify authentication implements these security requirements: [list]"
```

###  Too Many Simultaneous Sub-Agents
```
Bad: Launching 10 sub-agents at once
Good: 2-3 sub-agents for truly independent tasks
```

## Project-Specific Sub-Agent Prompts

### Clerk Authentication Review
```
"Review Clerk authentication integration:
1. Verify frontend and backend use matching instance types (dev vs prod)
2. Check all protected routes have proper auth guards
3. Ensure tokens are refreshed properly
4. Verify logout clears all auth state
5. Check for proper error handling on auth failures"
```

### AWS Amplify Deployment Check
```
"Verify AWS Amplify deployment readiness:
1. Check amplify.yml has all required environment variables documented
2. Verify build commands are correct
3. Check no secrets are in the code
4. Ensure all env vars are in .env.example files
5. Verify CORS settings match deployment URLs"
```

### Database Schema Review
```
"Review Prisma schema and usage:
1. Check all models have proper indexes
2. Verify cascade deletes are configured correctly
3. Find any raw SQL queries that should use Prisma
4. Check for N+1 query patterns in the codebase
5. Suggest optimizations"
```

### Testing Coverage Analysis
```
"Analyze test coverage for [feature name]:
1. Find all components in this feature
2. Check which have unit tests
3. Identify critical paths needing E2E tests
4. Find edge cases not currently tested
5. Prioritize testing gaps by risk"
```

## Integration with Development Workflow

### Before Starting Work
Use sub-agents to understand existing patterns:
```
"Before I implement [feature], search the codebase for similar features
and document the patterns used for: routing, state management, API calls,
error handling, and loading states"
```

### During Development
Use sub-agents for consistency checks:
```
"Review my new feature against existing patterns. Flag any inconsistencies
in: naming conventions, file structure, import patterns, error handling,
or state management"
```

### Before Committing
Use sub-agents for pre-commit review:
```
"Review changes for:
1. Proper TypeScript types (no 'any')
2. Error handling on all async operations
3. Tests for new functionality
4. No console.logs in production code
5. Accessibility attributes on interactive elements"
```

### Before Pull Request
Use sub-agents for comprehensive review:
```
"Comprehensive PR review for [feature name]:
1. Code quality and consistency
2. Security considerations
3. Performance implications
4. Test coverage adequacy
5. Documentation completeness
6. Breaking changes or migration needs"
```

## Remember

- Sub-agents work best with clear, specific instructions
- Provide context about what you're trying to accomplish
- Specify the exact information you need in the response
- Use sub-agents for complex searches, not simple file reads
- Trust sub-agent results, but verify critical findings
- Combine sub-agent research with direct tool usage for implementation

---

**Pro Tip:** Keep this file updated with project-specific sub-agent prompts that work well for your team!
