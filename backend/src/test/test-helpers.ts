import { Request, Response } from 'express';

/**
 * Mock Express Request object
 */
export const mockRequest = (overrides: Partial<Request> = {}): Partial<Request> => {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  };
};

/**
 * Mock Express Response object
 */
export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
  };
  return res;
};

/**
 * Mock Express NextFunction
 */
export const mockNext = jest.fn();

/**
 * Create mock user data
 */
export const createMockUser = (overrides = {}) => ({
  id: 'user_123',
  email: 'test@example.com',
  name: 'Test User',
  createdAt: new Date(),
  ...overrides,
});

/**
 * Create mock auth object for authenticated requests
 */
export const createMockAuth = (userId = 'user_123') => ({
  userId,
  sessionId: 'session_123',
  claims: {},
});
