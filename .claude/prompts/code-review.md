# Code Review Prompts for Sub-Agents

Use these prompts with Claude Code sub-agents for thorough code reviews.

## Pre-Commit Review

```
Review the current changes before commit:

1. **Code Quality**
   - No use of 'any' type without justification
   - Proper error handling on all async operations
   - No console.log in production code
   - Functions are focused and under 50 lines
   - Proper TypeScript types for all function parameters and returns

2. **Security**
   - No hardcoded secrets or API keys
   - User input is validated
   - SQL injection protection (using Prisma properly)
   - XSS protection (proper sanitization)
   - Authentication checks on protected routes

3. **Testing**
   - Unit tests for new business logic
   - E2E tests for new user flows
   - Edge cases are tested
   - Error scenarios are tested

4. **Consistency**
   - Follows project naming conventions
   - Matches existing file structure
   - Uses established patterns for: state management, API calls, error handling
   - Import statements follow project convention

5. **Performance**
   - No unnecessary re-renders
   - Proper use of React.memo, useMemo, useCallback
   - Database queries are optimized (no N+1)
   - Images are optimized and lazy loaded

6. **Accessibility**
   - Proper ARIA labels
   - Keyboard navigation works
   - Color contrast meets WCAG standards
   - Screen reader friendly

Return findings in this format:
-  Passed: [aspect]
-   Warning: [issue] in [file:line]
-  Critical: [issue] in [file:line]

Provide specific code examples and suggestions for fixes.
```

## Feature Review

```
Review the [FEATURE_NAME] feature for production readiness:

1. **Functional Requirements**
   - All acceptance criteria are met
   - Edge cases are handled
   - Error states are implemented
   - Loading states are implemented
   - Success confirmations are shown

2. **Technical Implementation**
   - Code follows SOLID principles
   - No code duplication
   - Proper separation of concerns
   - Reusable components extracted
   - Business logic in services, not components

3. **Security Review**
   - Authentication required where needed
   - Authorization checks implemented
   - Input validation (frontend and backend)
   - Sensitive data not exposed in logs
   - CSRF protection enabled

4. **Data Handling**
   - Database schema is correct
   - Migrations are reversible
   - Data validation at DB level
   - Proper indexes for queries
   - No data loss scenarios

5. **User Experience**
   - Intuitive UI/UX
   - Clear error messages
   - Helpful empty states
   - Responsive on all screen sizes
   - Works on all supported browsers

6. **Testing Coverage**
   - Unit tests for services
   - Component tests for complex logic
   - E2E tests for critical paths
   - Coverage meets thresholds

7. **Documentation**
   - Code is well-commented
   - API endpoints documented
   - README updated if needed
   - Breaking changes noted

Provide a production readiness score (0-100) and detailed findings.
```

## Security Audit

```
Perform a security audit of [COMPONENT/FEATURE]:

1. **Authentication & Authorization**
   - Verify all protected routes check authentication
   - Check authorization logic is correct
   - Ensure tokens are validated properly
   - Check for privilege escalation vulnerabilities
   - Verify session management is secure

2. **Input Validation**
   - All user inputs are validated (frontend and backend)
   - SQL injection protection verified
   - XSS protection verified
   - CSRF tokens used where needed
   - File upload restrictions in place

3. **Data Protection**
   - Sensitive data is encrypted at rest
   - HTTPS enforced for all requests
   - No sensitive data in logs
   - No secrets in code
   - Environment variables properly secured

4. **API Security**
   - Rate limiting implemented
   - Proper error messages (no info leakage)
   - CORS configured correctly
   - API authentication required
   - Input sanitization on all endpoints

5. **Dependencies**
   - No known vulnerabilities in dependencies
   - Dependencies are up to date
   - No unused dependencies

6. **Common Vulnerabilities**
   - No hardcoded credentials
   - No eval() or similar dangerous functions
   - No arbitrary code execution risks
   - Proper error handling (no stack traces exposed)
   - No path traversal vulnerabilities

Categorize findings as:
- 🔴 Critical (immediate fix required)
- 🟡 High (fix before production)
- 🟢 Medium (fix soon)
- 🔵 Low (nice to fix)
-  No issues found

Provide specific locations and remediation steps for each issue.
```

## Performance Review

```
Analyze [COMPONENT/FEATURE] for performance issues:

1. **Frontend Performance**
   - Identify unnecessary re-renders
   - Check for missing memoization opportunities
   - Find large bundle imports that could be lazy loaded
   - Identify unused code that could be removed
   - Check for expensive operations in render methods

2. **Backend Performance**
   - Find N+1 query problems
   - Identify slow database queries
   - Check for missing database indexes
   - Find synchronous operations that could be async
   - Identify memory leaks

3. **Network Performance**
   - Check API response sizes
   - Identify opportunities for pagination
   - Find missing caching opportunities
   - Check for redundant API calls
   - Verify proper HTTP caching headers

4. **Resource Usage**
   - Check image sizes and formats
   - Identify unoptimized assets
   - Check for memory leaks
   - Find inefficient algorithms

5. **Specific Checks**
   - React components using expensive operations
   - Database queries without WHERE clauses on large tables
   - Missing indexes on frequently queried fields
   - Large data transfers that could be paginated
   - Synchronous file operations

Provide:
- Current performance metrics (if measurable)
- Specific issues with file:line references
- Estimated performance impact (high/medium/low)
- Concrete optimization suggestions with code examples
```

## Accessibility Audit

```
Audit [COMPONENT/FEATURE] for accessibility compliance:

1. **Semantic HTML**
   - Proper heading hierarchy
   - Semantic elements used correctly
   - Form labels associated properly
   - Lists marked up correctly
   - Tables have proper headers

2. **ARIA**
   - ARIA labels on interactive elements
   - ARIA live regions for dynamic content
   - ARIA roles used appropriately
   - No ARIA misuse

3. **Keyboard Navigation**
   - All interactive elements keyboard accessible
   - Logical tab order
   - Focus indicators visible
   - No keyboard traps
   - Skip links provided

4. **Screen Reader**
   - All images have alt text
   - Icon buttons have labels
   - Error messages announced
   - Success messages announced
   - Form validation errors accessible

5. **Visual**
   - Color contrast meets WCAG AA
   - Text is resizable
   - No information conveyed by color alone
   - Focus indicators clearly visible
   - Animations can be disabled

6. **Forms**
   - Labels for all inputs
   - Error messages associated with fields
   - Required fields indicated
   - Input types appropriate
   - Autocomplete attributes set

Test each section against WCAG 2.1 Level AA standards.
Provide:
- Pass/Fail for each criterion
- Specific violations with file:line
- Remediation code examples
- Priority (P0/P1/P2)
```

## Test Coverage Review

```
Analyze test coverage for [COMPONENT/FEATURE]:

1. **Unit Test Coverage**
   - Find all services/utilities without tests
   - Identify complex functions without tests
   - Check edge cases are tested
   - Verify error scenarios are tested
   - Check mocking is done properly

2. **Component Test Coverage**
   - Find components without tests
   - Check user interactions are tested
   - Verify different states are tested
   - Check props variations are tested
   - Verify hooks are tested

3. **Integration Test Coverage**
   - Find API endpoints without tests
   - Check database operations are tested
   - Verify middleware is tested
   - Check error handling is tested
   - Verify authentication is tested

4. **E2E Test Coverage**
   - Identify critical user flows without E2E tests
   - Check happy paths are tested
   - Verify error paths are tested
   - Check different user roles are tested
   - Verify cross-browser scenarios

5. **Test Quality**
   - Tests are focused and clear
   - No flaky tests
   - Tests are independent
   - Tests are maintainable
   - Assertions are meaningful

Provide:
- Current coverage percentage
- List of untested critical paths
- Missing test scenarios
- Test quality issues
- Prioritized list of tests to add
```

## Code Quality Review

```
Review [COMPONENT/FEATURE] for code quality:

1. **Clean Code Principles**
   - Functions do one thing
   - Meaningful variable/function names
   - No magic numbers
   - Code is self-documenting
   - Comments explain "why", not "what"

2. **DRY (Don't Repeat Yourself)**
   - Find duplicated code
   - Identify common patterns
   - Suggest abstractions
   - Check for repeated logic

3. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

4. **TypeScript Usage**
   - No 'any' types
   - Proper type definitions
   - Interfaces over types where appropriate
   - Generics used effectively
   - Utility types leveraged

5. **Error Handling**
   - All async operations have try-catch
   - Errors are logged properly
   - User-friendly error messages
   - Error boundaries in place
   - No silent failures

6. **Code Organization**
   - Proper file structure
   - Related code is colocated
   - Imports are organized
   - Barrel exports used appropriately
   - No circular dependencies

Provide code quality score (0-100) with breakdown by category.
List specific issues with severity and remediation suggestions.
```
