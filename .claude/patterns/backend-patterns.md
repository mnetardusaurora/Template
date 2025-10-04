# Backend Code Patterns

Reference implementations and patterns for consistent backend development.

## Controller Patterns

### Basic Controller Pattern
```typescript
// backend/src/controllers/user.controller.ts
import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { logger } from '../utils/logger';

export class UserController {
  /**
   * Get user by ID
   * GET /api/users/:id
   */
  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      res.status(200).json(user);
    } catch (error) {
      logger.error('Error fetching user:', error);
      next(error);
    }
  }

  /**
   * Create new user
   * POST /api/users
   */
  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userData = req.body;

      const user = await userService.createUser(userData);

      res.status(201).json(user);
    } catch (error) {
      logger.error('Error creating user:', error);
      next(error);
    }
  }

  /**
   * Update user
   * PUT /api/users/:id
   */
  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await userService.updateUser(id, updateData);

      res.status(200).json(user);
    } catch (error) {
      logger.error('Error updating user:', error);
      next(error);
    }
  }

  /**
   * Delete user
   * DELETE /api/users/:id
   */
  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      await userService.deleteUser(id);

      res.status(204).send();
    } catch (error) {
      logger.error('Error deleting user:', error);
      next(error);
    }
  }
}

export const userController = new UserController();
```

## Service Patterns

### Service Layer Pattern
```typescript
// backend/src/services/user.service.ts
import { prisma } from '../config/database';
import { NotFoundError, ValidationError } from '../errors';
import { logger } from '../utils/logger';

export interface CreateUserData {
  email: string;
  name?: string;
  clerkId: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
}

class UserService {
  /**
   * Get user by ID
   */
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        // Don't select sensitive fields
      },
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Create new user
   */
  async createUser(data: CreateUserData) {
    // Validate
    if (!data.email) {
      throw new ValidationError('Email is required');
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ValidationError('User with this email already exists');
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        clerkId: data.clerkId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    logger.info(`User created: ${user.id}`);

    return user;
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserData) {
    // Check if user exists
    await this.getUserById(id);

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        updatedAt: true,
      },
    });

    logger.info(`User updated: ${user.id}`);

    return user;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string) {
    // Check if user exists
    await this.getUserById(id);

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    logger.info(`User deleted: ${id}`);
  }

  /**
   * Get user by Clerk ID
   */
  async getUserByClerkId(clerkId: string) {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      throw new NotFoundError(`User with Clerk ID ${clerkId} not found`);
    }

    return user;
  }
}

export const userService = new UserService();
```

## Middleware Patterns

### Authentication Middleware
```typescript
// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { UnauthorizedError } from '../errors';
import { logger } from '../utils/logger';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId: string;
      };
    }
  }
}

/**
 * Verify Clerk JWT token and attach user to request
 */
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('No authorization token provided');
    }

    // Verify token with Clerk
    const session = await clerkClient.sessions.verifySession(
      token,
      req.headers['x-clerk-session-id'] as string
    );

    if (!session) {
      throw new UnauthorizedError('Invalid session');
    }

    // Attach auth info to request
    req.auth = {
      userId: session.userId,
      sessionId: session.id,
    };

    next();
  } catch (error) {
    logger.error('Authentication failed:', error);
    next(new UnauthorizedError('Authentication failed'));
  }
}

/**
 * Optional authentication (doesn't fail if no token)
 */
export async function optionalAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      const session = await clerkClient.sessions.verifySession(
        token,
        req.headers['x-clerk-session-id'] as string
      );

      if (session) {
        req.auth = {
          userId: session.userId,
          sessionId: session.id,
        };
      }
    }

    next();
  } catch (error) {
    // Don't fail, just proceed without auth
    next();
  }
}
```

### Validation Middleware
```typescript
// backend/src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ValidationError } from '../errors';

/**
 * Validate request body against Zod schema
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        next(new ValidationError(messages.join(', ')));
      } else {
        next(error);
      }
    }
  };
}

/**
 * Validate request params against Zod schema
 */
export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        next(new ValidationError(messages.join(', ')));
      } else {
        next(error);
      }
    }
  };
}

// Example usage:
// const createUserSchema = z.object({
//   email: z.string().email(),
//   name: z.string().min(1).max(100).optional(),
// });
//
// router.post('/users', validateBody(createUserSchema), userController.createUser);
```

### Error Handling Middleware
```typescript
// backend/src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(400, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

/**
 * Global error handler
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    // Operational error - send to client
    logger.warn(`Operational error: ${err.message}`, {
      statusCode: err.statusCode,
      path: req.path,
      method: req.method,
    });

    res.status(err.statusCode).json({
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
    return;
  }

  // Programming or unknown error - don't leak details
  logger.error('Unhandled error:', err);

  res.status(500).json({
    error: {
      message: 'Internal server error',
      statusCode: 500,
    },
  });
}
```

## Route Patterns

### Route Organization
```typescript
// backend/src/routes/user.routes.ts
import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateBody, validateParams } from '../middleware/validation.middleware';
import { z } from 'zod';

const router = Router();

// Validation schemas
const userIdSchema = z.object({
  id: z.string().uuid(),
});

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100).optional(),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).max(100).optional(),
});

// Routes (all require authentication)
router.get(
  '/:id',
  authMiddleware,
  validateParams(userIdSchema),
  userController.getUser
);

router.post(
  '/',
  authMiddleware,
  validateBody(createUserSchema),
  userController.createUser
);

router.put(
  '/:id',
  authMiddleware,
  validateParams(userIdSchema),
  validateBody(updateUserSchema),
  userController.updateUser
);

router.delete(
  '/:id',
  authMiddleware,
  validateParams(userIdSchema),
  userController.deleteUser
);

export default router;
```

## Database Patterns

### Prisma Schema Pattern
```prisma
// backend/prisma/schema.prisma

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  clerkId   String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  posts     Post[]

  @@index([email])
  @@index([clerkId])
  @@map("users")
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([authorId])
  @@index([published])
  @@map("posts")
}
```

### Prisma Query Patterns
```typescript
// Select specific fields
const user = await prisma.user.findUnique({
  where: { id },
  select: {
    id: true,
    email: true,
    name: true,
    // Exclude sensitive fields
  },
});

// Include relations
const userWithPosts = await prisma.user.findUnique({
  where: { id },
  include: {
    posts: {
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    },
  },
});

// Pagination
const users = await prisma.user.findMany({
  skip: (page - 1) * limit,
  take: limit,
  orderBy: { createdAt: 'desc' },
});

// Transaction
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData });
  const post = await tx.post.create({
    data: { ...postData, authorId: user.id },
  });
  return { user, post };
});

// Aggregation
const stats = await prisma.post.aggregate({
  where: { published: true },
  _count: true,
  _avg: { viewCount: true },
});
```

## Testing Patterns

### Controller Test Pattern
```typescript
// backend/src/controllers/__tests__/user.controller.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { userController } from '../user.controller';
import { userService } from '../../services/user.service';

// Mock the service
vi.mock('../../services/user.service');

describe('UserController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
  });

  describe('getUser', () => {
    it('should return user when found', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test' };
      mockReq.params = { id: '1' };
      vi.mocked(userService.getUserById).mockResolvedValue(mockUser);

      await userController.getUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(userService.getUserById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should call next with error when user not found', async () => {
      mockReq.params = { id: '1' };
      const error = new Error('User not found');
      vi.mocked(userService.getUserById).mockRejectedValue(error);

      await userController.getUser(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
```

### Service Test Pattern
```typescript
// backend/src/services/__tests__/user.service.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { userService } from '../user.service';
import { prisma } from '../../config/database';
import { NotFoundError, ValidationError } from '../../errors';

describe('UserService', () => {
  beforeEach(async () => {
    // Clean database before each test
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    // Clean database after each test
    await prisma.user.deleteMany();
  });

  describe('createUser', () => {
    it('should create user with valid data', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        clerkId: 'clerk_123',
      };

      const user = await userService.createUser(userData);

      expect(user).toMatchObject({
        email: userData.email,
        name: userData.name,
      });
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
    });

    it('should throw ValidationError for duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        clerkId: 'clerk_123',
      };

      await userService.createUser(userData);

      await expect(
        userService.createUser({ ...userData, clerkId: 'clerk_456' })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getUserById', () => {
    it('should return user when found', async () => {
      const created = await userService.createUser({
        email: 'test@example.com',
        name: 'Test User',
        clerkId: 'clerk_123',
      });

      const user = await userService.getUserById(created.id);

      expect(user).toMatchObject({
        id: created.id,
        email: created.email,
        name: created.name,
      });
    });

    it('should throw NotFoundError when user not found', async () => {
      await expect(
        userService.getUserById('non-existent-id')
      ).rejects.toThrow(NotFoundError);
    });
  });
});
```

## Environment Configuration Pattern

```typescript
// backend/src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string().url(),
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  JWT_SECRET: z.string().min(32),
  CORS_ORIGIN: z.string().url(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

// Validate environment variables at startup
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
```

## Logging Pattern

```typescript
// backend/src/utils/logger.ts
import { env } from '../config/env';

type LogLevel = 'error' | 'warn' | 'info' | 'debug';

class Logger {
  private logLevels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  };

  private shouldLog(level: LogLevel): boolean {
    return this.logLevels[level] <= this.logLevels[env.LOG_LEVEL];
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
  }

  error(message: string, meta?: any): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, meta));
    }
  }

  debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

export const logger = new Logger();
```

## File Organization Pattern

```
backend/src/
├── config/
│   ├── database.ts            # Prisma client instance
│   └── env.ts                 # Environment validation
├── controllers/
│   ├── user.controller.ts
│   └── __tests__/
│       └── user.controller.test.ts
├── services/
│   ├── user.service.ts
│   └── __tests__/
│       └── user.service.test.ts
├── middleware/
│   ├── auth.middleware.ts
│   ├── validation.middleware.ts
│   └── error.middleware.ts
├── routes/
│   ├── user.routes.ts
│   └── index.ts               # Combine all routes
├── utils/
│   └── logger.ts
├── errors/
│   └── index.ts               # Custom error classes
├── test/
│   ├── setup.ts               # Test configuration
│   └── test-helpers.ts        # Test utilities
└── app.ts                      # Express app setup
```

## Anti-Patterns to Avoid

❌ **Don't: Business logic in controllers**
```typescript
// Bad
async createUser(req, res) {
  const existing = await prisma.user.findUnique(...);
  if (existing) throw new Error('Exists');
  const user = await prisma.user.create(...);
  res.json(user);
}
```

✅ **Do: Business logic in services**
```typescript
// Good
async createUser(req, res) {
  const user = await userService.createUser(req.body);
  res.json(user);
}
```

---

❌ **Don't: Expose internal errors**
```typescript
catch (error) {
  res.status(500).json({ error: error.message });
}
```

✅ **Do: Use error middleware**
```typescript
catch (error) {
  next(error);
}
```

---

❌ **Don't: Ignore validation**
```typescript
const user = await prisma.user.create({ data: req.body });
```

✅ **Do: Validate input**
```typescript
const validated = userSchema.parse(req.body);
const user = await prisma.user.create({ data: validated });
```
