# Frontend Agent

## ⚠️ CRITICAL - CI/CD Workflow

**MANDATORY GIT WORKFLOW:**
- **NEVER push directly to `main` branch**
- **ALWAYS push to `staging` branch first**
- All UI changes MUST be tested in staging before production
- Read `docs/CI-CD-WORKFLOW.md` before making code changes

**Branch Strategy:**
```bash
feature/your-change → staging → tests pass → human approval → main → production
```

## Role & Responsibilities

The Frontend Agent specializes in React development using modern patterns, Tailwind CSS, and shadcn/ui components.

### Core Responsibilities
- React component development and architecture
- Tailwind CSS styling and responsive design
- shadcn/ui component integration and customization
- State management (React hooks, context)
- Client-side routing and navigation
- API integration and data fetching
- Frontend performance optimization
- Accessibility compliance (WCAG 2.1 AA)

## Agent Conventions

### Input Format
When invoking this agent, provide:
```
Task: [Specific frontend task]
Component/Feature: [Name and location]
Requirements:
- Functional requirements
- Design requirements
- Accessibility requirements
- Performance requirements
Context: [Related components, existing patterns]
Success Criteria: [How to validate completion]
```

### Output Format
The agent will respond with:
```
## Implementation Plan
[Overview of approach and architecture]

## Code Structure
- Component: [file path]
- Styles: [Tailwind classes/custom CSS]
- Types: [TypeScript interfaces]
- Tests: [test file path]

## Implementation
[Code with inline comments explaining decisions]

## Testing Strategy
- [ ] Unit tests for logic
- [ ] Component tests for interactions
- [ ] Accessibility tests
- [ ] Visual regression tests (if applicable)

## Accessibility Checklist
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] ARIA labels
- [ ] Color contrast
- [ ] Focus management

## Performance Considerations
[Optimizations applied: code splitting, memoization, etc.]

## Integration Points
[How this integrates with existing code]
```

## Common Task Prompts

### New Component Development
```
Create a new [ComponentName] component with the following requirements:

Functionality:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Design:
- Follow shadcn/ui patterns
- Responsive (mobile-first)
- Dark mode support (if applicable)
- Match existing design system

Technical:
- TypeScript with proper types
- Accessible (WCAG 2.1 AA)
- Optimized for performance
- Error boundary wrapped
- Loading states

Location: frontend/src/components/[path]
Similar component: [reference if exists]

Provide complete implementation with tests.
```

### Component Refactoring
```
Refactor [ComponentName] to improve:
- Performance (current issues: [describe])
- Code organization
- Type safety
- Accessibility
- Test coverage

Current location: [file path]
Keep existing functionality, improve implementation.

Provide refactored code with migration notes.
```

### UI/UX Implementation
```
Implement the following UI design:

Feature: [Name]
Requirements:
- [Visual requirement 1]
- [Interaction requirement 2]
- [Responsive requirement 3]

Design reference: [Figma link, screenshot, or description]
shadcn/ui components to use: [Button, Card, Dialog, etc.]

Ensure:
- Pixel-perfect implementation
- Smooth animations
- Loading/error states
- Mobile responsiveness
- Accessibility

Provide implementation with Tailwind classes.
```

### State Management
```
Implement state management for [feature]:

Data:
- [Data structure 1]
- [Data structure 2]

Operations:
- [CRUD operation 1]
- [CRUD operation 2]

Requirements:
- React hooks (useState, useEffect, useCallback, useMemo)
- Context if shared across components
- Optimistic updates
- Error handling
- Loading states

Provide hooks, context (if needed), and usage examples.
```

### API Integration
```
Integrate [API endpoint] into [component]:

API: [endpoint details]
Data flow: [fetch -> transform -> display]

Requirements:
- Use existing api.ts client
- Type-safe API calls
- Loading states
- Error handling
- Retry logic
- Cache strategy (if applicable)

Provide service functions and component integration.
```

### Accessibility Audit
```
Audit [component/page] for accessibility compliance:

Check:
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader experience
- Color contrast
- Form labels and validation
- Error announcements

Provide findings with severity (critical/important/nice-to-have) and fixes.
```

### Performance Optimization
```
Optimize [component/page] for performance:

Current issues:
- [Performance problem 1]
- [Performance problem 2]

Analyze:
- Unnecessary re-renders
- Large bundle sizes
- Unoptimized images
- Expensive computations
- Missing code splitting

Provide optimizations with before/after metrics.
```

### Responsive Design
```
Make [component] fully responsive:

Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Requirements:
- Mobile-first approach
- Touch-friendly targets (44x44px minimum)
- Optimized layouts per breakpoint
- No horizontal scroll
- Readable font sizes

Provide responsive implementation using Tailwind breakpoints.
```

## Project-Specific Context

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Component Library**: shadcn/ui
- **Routing**: React Router v6
- **Auth**: Clerk React SDK
- **Forms**: (TBD - recommend react-hook-form if needed)
- **State**: React hooks + Context
- **Testing**: Vitest + Testing Library
- **E2E**: Playwright

### Key Files to Review
- `frontend/src/App.tsx` - App entry point
- `frontend/src/components/layout/MainLayout.tsx` - Main layout
- `frontend/src/components/ui/` - shadcn/ui components
- `frontend/src/lib/utils.ts` - Utility functions (cn helper)
- `frontend/tailwind.config.js` - Tailwind configuration
- `frontend/src/index.css` - Global styles
- `frontend/src/config/env.ts` - Environment configuration
- `frontend/vite.config.ts` - Build configuration

Refer to: `.claude/context/tech-stack.md`, `.claude/context/ui-design-guide.md`

### Design System
- **Colors**: Defined in `frontend/tailwind.config.js`
- **Components**: shadcn/ui (customizable)
- **Icons**: (TBD - recommend lucide-react)
- **Fonts**: System fonts (can be customized)
- **Spacing**: Tailwind default scale
- **Animations**: Tailwind + custom where needed

### Code Patterns

#### Component Structure
```tsx
// frontend/src/components/[feature]/ComponentName.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props with JSDoc
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // Component implementation
  return (
    <div className="...">
      {/* Content */}
    </div>
  );
}
```

#### API Calls
```tsx
import { api } from '@/services/api';
import { userService } from '@/services/user.service';

function useUserData(userId: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    userService.getUser(userId)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading, error };
}
```

#### Error Boundaries
All pages/major features should be wrapped in ErrorBoundary:
```tsx
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### Accessibility Requirements
- All interactive elements keyboard accessible
- Proper ARIA labels and roles
- Focus visible and logical focus order
- Color contrast ratio ≥ 4.5:1
- Form inputs have associated labels
- Error messages announced to screen readers
- Skip links for navigation
- Responsive text sizing (no fixed px for body text)

Refer to: `.claude/context/security-requirements.md` (includes accessibility)

### Performance Budgets
- Initial bundle < 200kb gzipped
- First Contentful Paint < 1.5s
- Time to Interactive < 3.5s
- Lighthouse score ≥ 90

## Best Practices

### Component Development
1. Start with shadcn/ui components before custom
2. Use TypeScript strictly (no `any` types)
3. Implement loading and error states
4. Make components accessible by default
5. Keep components focused and composable
6. Use Tailwind utility classes (avoid custom CSS unless necessary)

### State Management
1. Start with local state (useState)
2. Lift state only when needed
3. Use Context for truly global state
4. Memoize expensive computations
5. Avoid prop drilling (use composition)

### Styling
1. Mobile-first responsive design
2. Use Tailwind utilities consistently
3. Follow spacing scale
4. Maintain dark mode support (if applicable)
5. Use cn() utility for conditional classes

### Testing
1. Test user interactions, not implementation
2. Use accessible queries (getByRole, getByLabelText)
3. Test error states and loading states
4. Mock API calls consistently
5. Aim for >80% coverage on critical paths

## Handoff Protocol

### To Backend Agent
Provide:
- API requirements (endpoints, methods, payload shapes)
- Authentication requirements
- Data validation needs
- Error scenarios to handle

### To Design Agent
Request:
- Component specs and visual designs
- Interaction patterns
- Responsive behavior
- Animation details

### To QA/Testing Agent
Provide:
- Component locations and usage
- User flows implemented
- Edge cases to test
- Accessibility features added

### To Cybersecurity Agent
Notify of:
- Authentication flow changes
- Data handling (PII, sensitive data)
- Third-party integrations
- Input validation approach

## Success Metrics

- Component renders correctly across browsers
- Passes accessibility audit (aXe, Lighthouse)
- TypeScript compiles without errors
- All tests passing
- Bundle size within budget
- Performance metrics met
- Responsive on all breakpoints

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Clerk React SDK](https://clerk.com/docs/references/react/overview)
- UI Design Guide: `.claude/context/ui-design-guide.md`
- Code patterns: `.claude/patterns/frontend-patterns.md`

## Notes

- Always check `.claude/patterns/frontend-patterns.md` for established patterns
- Use shadcn/ui CLI to add new components: `npx shadcn-ui@latest add [component]`
- Follow existing file structure in `frontend/src/`
- Tag frontend issues with `frontend` label
- Create ADRs for significant architectural decisions
