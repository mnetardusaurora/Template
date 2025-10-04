# Frontend Code Patterns

Reference implementations and patterns for consistent frontend development.

## Component Patterns

### Basic Component Structure
```tsx
// frontend/src/components/[feature]/ComponentName.tsx
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  /**
   * Clear description of the prop
   */
  title: string;
  /**
   * Optional prop with default
   */
  variant?: 'default' | 'outline';
  /**
   * Callback prop
   */
  onAction?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ComponentName provides [description of what it does].
 *
 * @example
 * <ComponentName title="Hello" onAction={() => console.log('clicked')} />
 */
export function ComponentName({
  title,
  variant = 'default',
  onAction,
  className
}: ComponentNameProps) {
  const [state, setState] = useState<string>('');

  const handleAction = useCallback(() => {
    // Logic here
    onAction?.();
  }, [onAction]);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant={variant} onClick={handleAction}>
          Action
        </Button>
      </CardContent>
    </Card>
  );
}
```

### Component with Data Fetching
```tsx
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';
import { userService } from '@/services/user.service';

interface User {
  id: string;
  name: string;
  email: string;
}

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const data = await userService.getUser(userId);
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load user');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState message={error} />;
  if (!user) return <ErrorState message="User not found" />;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### Custom Hook Pattern
```tsx
// frontend/src/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { userService } from '@/services/user.service';

interface UseUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useUser(userId: string): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const data = await userService.getUser(userId);
        if (!cancelled) {
          setUser(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load user');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId, refetchTrigger]);

  const refetch = () => setRefetchTrigger(prev => prev + 1);

  return { user, loading, error, refetch };
}

// Usage:
// const { user, loading, error, refetch } = useUser(userId);
```

### Form Handling Pattern
```tsx
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export function UserForm({ onSubmit }: { onSubmit: (data: FormData) => Promise<void> }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit(formData);
      // Reset form on success
      setFormData({ name: '', email: '' });
    } catch (error) {
      setErrors({ email: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-red-600 mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-red-600 mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

## State Management Patterns

### Context Pattern
```tsx
// frontend/src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isLoaded && clerkUser) {
      // Transform Clerk user to app user format
      setUser({
        id: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || '',
        name: clerkUser.fullName || ''
      });
    } else {
      setUser(null);
    }
  }, [clerkUser, isLoaded]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading: !isLoaded
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## API Integration Patterns

### API Client Pattern
```typescript
// frontend/src/services/api.ts
import { getAuth } from '@clerk/clerk-react';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const { getToken } = getAuth();
      return await getToken();
    } catch {
      return null;
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(import.meta.env.VITE_API_URL || 'http://localhost:3001');
```

### Service Layer Pattern
```typescript
// frontend/src/services/user.service.ts
import { api } from './api';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

class UserService {
  async getUser(id: string): Promise<User> {
    return api.get<User>(`/api/users/${id}`);
  }

  async updateUser(id: string, data: UpdateUserData): Promise<User> {
    return api.put<User>(`/api/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    return api.delete<void>(`/api/users/${id}`);
  }

  async getCurrentUser(): Promise<User> {
    return api.get<User>('/api/users/me');
  }
}

export const userService = new UserService();
```

## Styling Patterns

### Conditional Classes with cn()
```tsx
import { cn } from '@/lib/utils';

// Simple conditional
<div className={cn('base-class', isActive && 'active-class')} />

// Multiple conditions
<div className={cn(
  'base-class',
  isActive && 'active-class',
  hasError && 'error-class',
  className // Allow external classes
)} />

// Variant-based
const variants = {
  default: 'bg-primary text-white',
  outline: 'border border-primary text-primary',
  ghost: 'hover:bg-gray-100'
};

<button className={cn(variants[variant], className)} />
```

### Responsive Design Pattern
```tsx
<div className={cn(
  // Mobile (default)
  'flex flex-col gap-2 p-4',
  // Tablet
  'md:flex-row md:gap-4 md:p-6',
  // Desktop
  'lg:gap-6 lg:p-8'
)}>
  <div className="w-full md:w-1/2 lg:w-1/3">
    {/* Content */}
  </div>
</div>
```

## Accessibility Patterns

### Accessible Button
```tsx
<Button
  onClick={handleClick}
  disabled={loading}
  aria-label="Submit form"
  aria-busy={loading}
>
  {loading ? 'Loading...' : 'Submit'}
</Button>
```

### Accessible Form
```tsx
<div>
  <Label htmlFor="email">Email Address</Label>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    aria-required="true"
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? 'email-error' : undefined}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="text-red-600 text-sm mt-1">
      {errors.email}
    </p>
  )}
</div>
```

### Skip Link Pattern
```tsx
// In MainLayout or App
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white"
>
  Skip to main content
</a>

<main id="main-content">
  {children}
</main>
```

## Performance Patterns

### Code Splitting
```tsx
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Memoization Pattern
```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive component
export const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Only re-renders if data changes
  return <div>{/* expensive render */}</div>;
});

// Memoize expensive calculation
function Component({ items }) {
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.value - b.value);
  }, [items]);

  return <div>{/* use sortedItems */}</div>;
}

// Memoize callback
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Stable reference

  return <Child onClick={handleClick} />;
}
```

## Error Handling Patterns

### Error Boundary Usage
```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

export function Page() {
  return (
    <ErrorBoundary>
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
```

### Try-Catch Pattern
```tsx
async function handleAction() {
  try {
    setLoading(true);
    setError(null);

    const result = await someAsyncOperation();

    // Handle success
    onSuccess(result);
  } catch (err) {
    // Handle error
    const message = err instanceof Error ? err.message : 'An error occurred';
    setError(message);

    // Optional: Log to monitoring service
    console.error('Operation failed:', err);
  } finally {
    setLoading(false);
  }
}
```

## Testing Patterns

### Component Test Pattern
```tsx
// frontend/src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Hook Test Pattern
```tsx
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useUser } from '../useUser';

// Mock the service
vi.mock('@/services/user.service', () => ({
  userService: {
    getUser: vi.fn()
  }
}));

describe('useUser', () => {
  it('fetches user data', async () => {
    const mockUser = { id: '1', name: 'John', email: 'john@example.com' };
    userService.getUser.mockResolvedValue(mockUser);

    const { result } = renderHook(() => useUser('1'));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });
});
```

## File Organization Pattern

```
frontend/src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   └── card.tsx
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MainLayout.tsx
│   ├── auth/                  # Auth-specific components
│   │   └── ProtectedRoute.tsx
│   ├── [feature]/             # Feature-specific components
│   │   ├── FeatureComponent.tsx
│   │   └── __tests__/
│   │       └── FeatureComponent.test.tsx
│   ├── LoadingSpinner.tsx     # Shared components
│   ├── ErrorState.tsx
│   └── ErrorBoundary.tsx
├── hooks/                     # Custom hooks
│   ├── useAuth.ts
│   └── __tests__/
│       └── useAuth.test.ts
├── services/                  # API services
│   ├── api.ts
│   └── user.service.ts
├── lib/                       # Utilities
│   └── utils.ts
├── pages/                     # Page components
│   ├── HomePage.tsx
│   └── SignInPage.tsx
├── contexts/                  # React contexts
│   └── AuthContext.tsx
└── types/                     # TypeScript types
    └── index.ts
```

## Anti-Patterns to Avoid

❌ **Don't: Inline styles**
```tsx
<div style={{ marginTop: '20px' }}>Bad</div>
```

✅ **Do: Use Tailwind classes**
```tsx
<div className="mt-5">Good</div>
```

---

❌ **Don't: Direct DOM manipulation**
```tsx
document.getElementById('myElement').innerHTML = 'Bad';
```

✅ **Do: Use React state**
```tsx
const [content, setContent] = useState('Good');
```

---

❌ **Don't: Prop drilling**
```tsx
<Parent user={user}>
  <Child user={user}>
    <GrandChild user={user} />
  </Child>
</Parent>
```

✅ **Do: Use Context**
```tsx
<AuthProvider>
  <Child />
</AuthProvider>

// In GrandChild:
const { user } = useAuth();
```

---

❌ **Don't: `any` types**
```tsx
function handleData(data: any) { }
```

✅ **Do: Proper types**
```tsx
interface Data {
  id: string;
  value: number;
}
function handleData(data: Data) { }
```
