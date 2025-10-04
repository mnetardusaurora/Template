# Code Standards

## File Structure

### Frontend Structure
```
frontend/src/
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts          # Re-export all components
│   ├── layout/               # Layout components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── features/             # Feature-specific components
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── index.ts
│   │   └── dashboard/
│   └── common/               # Shared components
├── pages/                    # Route components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── index.ts
├── services/                 # API calls and external services
│   ├── api.ts
│   ├── auth.service.ts
│   └── user.service.ts
├── types/                    # TypeScript type definitions
│   ├── auth.types.ts
│   ├── user.types.ts
│   └── api.types.ts
├── utils/                    # Utility functions
│   ├── format.ts
│   ├── validation.ts
│   └── constants.ts
├── styles/                   # Global styles
│   ├── globals.css
│   └── components.css
└── lib/                      # Library configurations
    ├── utils.ts              # cn() utility
    └── auth.ts               # Auth configuration
```

### Backend Structure
```
backend/src/
├── controllers/              # Route handlers
│   ├── auth.controller.ts
│   ├── user.controller.ts
│   └── index.ts
├── middleware/               # Express middleware
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   ├── error.middleware.ts
│   └── index.ts
├── models/                   # Data models (if not using Prisma)
│   ├── User.ts
│   └── index.ts
├── routes/                   # API route definitions
│   ├── auth.routes.ts
│   ├── user.routes.ts
│   └── index.ts
├── services/                 # Business logic
│   ├── auth.service.ts
│   ├── user.service.ts
│   ├── email.service.ts
│   └── index.ts
├── utils/                    # Utility functions
│   ├── logger.ts
│   ├── crypto.ts
│   └── validation.ts
├── types/                    # TypeScript type definitions
│   ├── auth.types.ts
│   ├── user.types.ts
│   └── express.types.ts
├── config/                   # Configuration files
│   ├── database.ts
│   ├── auth.ts
│   └── index.ts
└── app.ts                    # Express app setup
```

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase starting with 'use' (`useAuth.ts`)
- **Services**: camelCase with '.service' suffix (`auth.service.ts`)
- **Types**: camelCase with '.types' suffix (`user.types.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Variables and Functions
```typescript
// Variables: camelCase
const userName = 'john_doe';
const isLoggedIn = true;

// Functions: camelCase, descriptive verbs
const getUserById = (id: string) => { /* ... */ };
const validateEmail = (email: string) => { /* ... */ };

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Types/Interfaces: PascalCase
interface UserProfile {
  id: string;
  email: string;
  name: string;
}

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';
```

## TypeScript Standards

### Type Definitions
```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Use type aliases for unions and primitives
type Status = 'active' | 'inactive' | 'pending';
type UserId = string;

// Generic types
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Utility types
type CreateUserRequest = Omit<User, 'id' | 'createdAt'>;
type UpdateUserRequest = Partial<Pick<User, 'name' | 'email'>>;
```

### Function Signatures
```typescript
// Explicit return types for exported functions
export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  // Implementation
};

// Use readonly for immutable data
interface ReadonlyUser {
  readonly id: string;
  readonly email: string;
  readonly createdAt: Date;
}

// Use strict null checks
const findUser = (id: string): User | null => {
  // Implementation
};
```

## React Component Standards

### Component Structure
```typescript
// Import order: React, libraries, internal
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user.types';

// Props interface
interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
  className?: string;
}

// Component with explicit return type
export const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  onUpdate,
  className
}) => {
  // Hooks first
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Effects
  useEffect(() => {
    // Side effects
  }, [userId]);

  // Event handlers
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Early returns
  if (!user) {
    return <div>Loading...</div>;
  }

  // Main render
  return (
    <div className={className}>
      {/* Component JSX */}
    </div>
  );
};

// Default export if single component per file
export default UserProfile;
```

### Custom Hooks
```typescript
// Custom hook naming and structure
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hook logic

  return {
    user,
    isLoading,
    login: async (credentials: LoginCredentials) => { /* ... */ },
    logout: () => { /* ... */ },
  } as const; // Use 'as const' for better type inference
};
```

## API Standards

### Endpoint Naming
```typescript
// RESTful conventions
GET    /api/users          // Get all users
GET    /api/users/:id      // Get user by ID
POST   /api/users          // Create user
PUT    /api/users/:id      // Update user (full)
PATCH  /api/users/:id      // Update user (partial)
DELETE /api/users/:id      // Delete user

// Nested resources
GET    /api/users/:id/posts
POST   /api/users/:id/posts
```

### Response Format
```typescript
// Success response
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error response
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// Usage
const getUserResponse: ApiSuccessResponse<User> = {
  success: true,
  data: user,
  message: 'User retrieved successfully'
};
```

## Error Handling

### Frontend Error Boundaries
```typescript
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}
```

### Backend Error Handling
```typescript
// Custom error classes
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Error middleware
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    });
  } else {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong'
      }
    });
  }
};
```

## Import/Export Standards

### Absolute Imports
```typescript
// Configure path mapping in tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}

// Use absolute imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user.types';
```

### Re-exports
```typescript
// components/ui/index.ts
export { Button } from './button';
export { Input } from './input';
export { Card } from './card';

// Usage
import { Button, Input, Card } from '@/components/ui';
```