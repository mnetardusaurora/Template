import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { userController } from '../user.controller';
import { mockRequest, mockResponse, createMockAuth } from '../../test/test-helpers';
import * as userService from '../../services/user.service';

// Mock the user service
jest.mock('../../services/user.service');

describe('UserController', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('should return 401 if user not authenticated', async () => {
      req.auth = undefined;

      await userController.getCurrentUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        },
      });
    });

    it('should return current user data', async () => {
      const mockUser = {
        id: 'user_123',
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
      };

      req.auth = createMockAuth('user_123');
      (userService.userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await userController.getCurrentUser(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUser,
      });
    });

    it('should handle errors', async () => {
      req.auth = createMockAuth('user_123');
      (userService.userService.getUserById as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await userController.getCurrentUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch user',
        },
      });
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const mockUser = {
        id: 'user_123',
        email: 'updated@example.com',
        name: 'Updated Name',
        createdAt: new Date(),
      };

      req.auth = createMockAuth('user_123');
      req.body = { name: 'Updated Name', email: 'updated@example.com' };
      (userService.userService.updateUser as jest.Mock).mockResolvedValue(mockUser);

      await userController.updateProfile(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUser,
        message: 'Profile updated successfully',
      });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = {
        id: 'user_456',
        email: 'other@example.com',
        name: 'Other User',
        createdAt: new Date(),
      };

      req.params = { id: 'user_456' };
      (userService.userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await userController.getUserById(req, res);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUser,
      });
    });

    it('should return 404 if user not found', async () => {
      req.params = { id: 'user_999' };
      (userService.userService.getUserById as jest.Mock).mockResolvedValue(null);

      await userController.getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found',
        },
      });
    });
  });
});
