# Testing Strategy

## Testing Pyramid

### Unit Tests (70%)
- **Framework**: Vitest for frontend, Jest for backend
- **Coverage Target**: 80% code coverage
- **Focus**: Individual functions, components, and modules

```typescript
// Example unit test
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

### Integration Tests (20%)
- **Framework**: React Testing Library, Supertest for API
- **Focus**: Component interactions, API endpoints

```typescript
// API integration test
import request from 'supertest';
import { app } from '../src/app';

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123!'
    };

    const response = await request(app)
      .post('/api/users')
      .send(userData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(userData.email);
  });
});
```

### End-to-End Tests (10%)
- **Framework**: Playwright
- **Focus**: Critical user journeys, cross-browser testing

## Playwright Setup

### Configuration
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('user can sign in', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password123');
  await page.click('[data-testid="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
});

test('displays error for invalid credentials', async ({ page }) => {
  await page.goto('/login');

  await page.fill('[data-testid="email"]', 'invalid@example.com');
  await page.fill('[data-testid="password"]', 'wrongpassword');
  await page.click('[data-testid="submit"]');

  await expect(page.locator('[data-testid="error-message"]')).toContainText('Invalid credentials');
});
```

## Test Data Management

### Fixtures and Factories
```typescript
// tests/factories/user.factory.ts
import { faker } from '@faker-js/faker';

export const createUserData = (overrides = {}) => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  createdAt: faker.date.recent(),
  ...overrides,
});

// Usage in tests
const user = createUserData({ email: 'specific@example.com' });
```

### Database Seeding
```typescript
// tests/setup/seed.ts
export const seedDatabase = async () => {
  await db.user.deleteMany();
  await db.user.createMany({
    data: [
      createUserData({ email: 'admin@example.com', role: 'admin' }),
      createUserData({ email: 'user@example.com', role: 'user' }),
    ],
  });
};
```

## Coverage Targets

### Frontend Coverage
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### Backend Coverage
- **Statements**: 85%
- **Branches**: 80%
- **Functions**: 85%
- **Lines**: 85%

## QA Feedback Integration

### Bug Reporting Template
```markdown
## Bug Report

**Environment**: [Development/Staging/Production]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Device**: [Desktop/Mobile/Tablet]

### Steps to Reproduce
1.
2.
3.

### Expected Behavior


### Actual Behavior


### Screenshots/Videos


### Additional Context

```

### Testing Workflow
1. **Feature Development**: Write tests alongside code
2. **PR Review**: Ensure test coverage meets targets
3. **QA Testing**: Manual testing on staging environment
4. **Bug Triage**: Categorize and prioritize reported issues
5. **Regression Testing**: Automated tests prevent regressions

## Test Commands
```bash
# Frontend tests
cd frontend
npm run test              # Run unit tests
npm run test:coverage     # Run with coverage report
npm run test:watch        # Watch mode for development

# Backend tests
cd backend
npm run test              # Run unit tests
npm run test:integration  # Run integration tests
npm run test:coverage     # Run with coverage report

# E2E tests
npm run test:e2e          # Run all E2E tests
npm run test:e2e:headed   # Run with browser UI
npm run test:e2e:debug    # Debug mode
```