# Tech Stack Standards and Patterns

## Frontend Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **Component Library**: shadcn/ui for consistent, accessible components
- **State Management**: React hooks (useState, useContext) for local state, consider Zustand or Redux Toolkit for complex global state

## Backend Stack
- **Runtime**: Node.js 20 LTS
- **Framework**: Express.js for RESTful APIs
- **Database**: PostgreSQL with Prisma ORM (recommended)
- **Authentication**: JWT tokens with refresh token rotation
- **Validation**: Zod for runtime type validation

## Development Tools
- **Package Manager**: npm or yarn
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Testing**: Vitest for unit tests, Playwright for E2E testing
- **Type Checking**: TypeScript strict mode

## Architectural Patterns

### Frontend Architecture
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── feature/       # Feature-specific components
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── services/          # API calls and external services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── styles/            # Global styles and Tailwind config
```

### Backend Architecture
```
backend/
├── src/
│   ├── controllers/   # Route handlers
│   ├── middleware/    # Express middleware
│   ├── models/        # Data models
│   ├── routes/        # API route definitions
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── tests/             # Test files
└── config/            # Configuration files
```

## Coding Standards
- Use TypeScript strict mode
- Prefer functional components and hooks
- Use meaningful variable and function names
- Write unit tests for business logic
- Follow ESLint and Prettier configurations
- Use absolute imports with path mapping