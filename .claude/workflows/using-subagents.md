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

### 1. General Purpose Agent
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

### 2. Code Review Agent (if available)
**When to use:**
- After completing a significant feature
- Before creating pull requests
- For security review
- Performance optimization checks

**Example prompts:**
```
"Review the authentication flow for security vulnerabilities"

"Check the new payment integration for proper error handling and edge cases"

"Review database queries for N+1 problems and suggest optimizations"
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
- ✅ Use for complex, multi-file searches
- ✅ Use for analysis requiring context from many files
- ❌ Don't use for simple file reads (use Read tool instead)
- ❌ Don't use for known specific locations (use Glob + Read)

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

### ❌ Using Sub-Agents for Simple Tasks
```
Bad: "Use sub-agent to read App.tsx"
Good: Use Read tool directly
```

### ❌ Vague Requests
```
Bad: "Find problems in the code"
Good: "Find all API calls missing try-catch blocks and proper error handling"
```

### ❌ No Success Criteria
```
Bad: "Look at the authentication"
Good: "Verify authentication implements these security requirements: [list]"
```

### ❌ Too Many Simultaneous Sub-Agents
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
