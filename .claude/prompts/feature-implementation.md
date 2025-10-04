# Feature Implementation Prompts for Sub-Agents

Use these prompts to guide sub-agents through feature implementation research and planning.

## Feature Research Template

```
Research existing patterns for implementing [FEATURE_NAME]:

1. **Similar Features**
   - Find features in the codebase that are similar to [FEATURE_NAME]
   - Identify the patterns they use for:
     * Component structure
     * State management
     * API integration
     * Error handling
     * Loading states
     * Form handling (if applicable)
     * Data validation

2. **Technical Stack Usage**
   - How does the project currently use:
     * React Router for navigation
     * Clerk for authentication/authorization
     * API client for backend calls
     * Zod for validation
     * shadcn/ui for UI components
   - Provide specific examples from the codebase

3. **File Structure Patterns**
   - Where should new files be placed?
   - What naming conventions are used?
   - How are files organized (by feature vs by type)?

4. **Testing Patterns**
   - How are similar features tested?
   - What test utilities are available?
   - What's the expected coverage level?

5. **Code Examples**
   - Provide 2-3 complete code examples of similar features
   - Highlight the patterns that should be followed
   - Note any anti-patterns to avoid

Return a comprehensive guide that can be used to implement [FEATURE_NAME]
following established project patterns.
```

## Database Schema Planning

```
Plan database schema for [FEATURE_NAME]:

1. **Analyze Current Schema**
   - Review existing Prisma schema
   - Identify related models
   - Note naming conventions
   - Check field type patterns
   - Review relationship patterns

2. **Design New Models**
   For [FEATURE_NAME], design:
   - Model definitions
   - Field types and constraints
   - Relationships to existing models
   - Indexes needed
   - Enums if required

3. **Migration Strategy**
   - Identify potential breaking changes
   - Plan for data migration if updating existing tables
   - Consider backward compatibility
   - Note any deployment considerations

4. **Performance Considerations**
   - Suggest indexes
   - Identify potential N+1 queries
   - Recommend eager loading strategies
   - Note any caching opportunities

Provide complete Prisma schema additions with explanations.
```

## API Design Template

```
Design API endpoints for [FEATURE_NAME]:

1. **Review Existing API Patterns**
   - How are current endpoints structured?
   - What response format is used?
   - How is error handling done?
   - What validation patterns exist?

2. **Design New Endpoints**
   For [FEATURE_NAME], design:
   - Endpoint paths following REST conventions
   - HTTP methods
   - Request/response schemas
   - Error responses
   - Auth requirements

3. **Example Implementations**
   Provide code examples for:
   - Route definitions
   - Controller functions
   - Service layer functions
   - Validation schemas (Zod)
   - Response types

4. **Security Considerations**
   - Authentication requirements
   - Authorization rules
   - Input validation
   - Rate limiting needs
   - CORS implications

Return complete API specification with code examples.
```

## Component Architecture Planning

```
Plan component architecture for [FEATURE_NAME]:

1. **Component Breakdown**
   - List all components needed
   - Define component hierarchy
   - Identify reusable components
   - Note which are containers vs presentational

2. **State Management**
   - What state is needed?
   - Where should state live?
   - What should use local state vs context?
   - Any global state requirements?

3. **Data Flow**
   - How does data flow between components?
   - What are the data dependencies?
   - Where do API calls happen?
   - How is loading/error state managed?

4. **Routing**
   - What routes are needed?
   - Are any nested routes required?
   - What are the route params?
   - Any protected routes?

5. **shadcn/ui Components**
   - Which shadcn/ui components to use?
   - Any custom variations needed?
   - Form components required?
   - Dialog/modal needs?

Provide:
- Component tree diagram (text format)
- Props interface for each component
- File structure
- Import/export pattern
```

## Testing Strategy Template

```
Plan testing strategy for [FEATURE_NAME]:

1. **Unit Tests**
   - List all functions/hooks to unit test
   - Identify edge cases for each
   - Define mock data needed
   - Specify expected test coverage

2. **Component Tests**
   - List all components to test
   - Define user interactions to test
   - Specify different states to test
   - Identify accessibility checks needed

3. **Integration Tests**
   - List API endpoints to integration test
   - Define request/response scenarios
   - Specify database setup needed
   - Identify auth scenarios to test

4. **E2E Tests**
   - Define critical user flows
   - List happy path scenarios
   - Identify error scenarios to test
   - Specify cross-browser requirements

5. **Test Data**
   - Define fixtures needed
   - Specify factory functions required
   - Identify seed data requirements

Provide:
- Test file structure
- Example test cases for each type
- Mock/fixture templates
- Coverage targets
```

## Integration Planning

```
Plan integration for [FEATURE_NAME] with existing features:

1. **Dependencies**
   - What existing features does this depend on?
   - What shared state is required?
   - What utilities can be reused?
   - Any new shared utilities needed?

2. **Integration Points**
   - Where does this feature connect to existing code?
   - What components need updating?
   - Any navigation changes needed?
   - Database relationships to existing models?

3. **Breaking Changes**
   - Will this break any existing features?
   - Are there API changes affecting other code?
   - Any migration steps needed?
   - How to maintain backward compatibility?

4. **Shared Resources**
   - Can existing components be reused?
   - Are there shared types to use/extend?
   - What validation schemas can be shared?
   - Any shared hooks or utilities?

5. **Timeline Considerations**
   - What needs to be implemented first?
   - What can be done in parallel?
   - Any dependencies on other work?
   - What's the minimum viable implementation?

Return an integration plan with:
- Dependency graph
- Implementation order
- Files that need modifications
- New files to create
```

## Error Handling Plan

```
Plan error handling for [FEATURE_NAME]:

1. **User-Facing Errors**
   - What errors can users encounter?
   - What error messages to show?
   - How to recover from errors?
   - What UI components to use?

2. **Technical Errors**
   - What technical errors are possible?
   - How to log them?
   - What to show to users?
   - How to monitor them?

3. **Validation Errors**
   - What validation is needed?
   - Where to validate (frontend vs backend)?
   - What error format to use?
   - How to display to users?

4. **Edge Cases**
   - What edge cases exist?
   - How to handle them?
   - What's the fallback behavior?
   - Any timeout scenarios?

5. **Error Recovery**
   - Can users retry?
   - What state needs resetting?
   - Any cleanup required?
   - How to prevent error loops?

Provide:
- Error type definitions
- Error handling code examples
- User error messages
- Logging strategy
```
