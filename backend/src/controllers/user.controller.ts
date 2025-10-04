import { Request, Response } from 'express';
import { userService } from '../services/user.service';

/**
 * User Controller
 * Handles HTTP requests related to user management
 */

export const userController = {
  /**
   * Get current authenticated user
   */
  getCurrentUser: async (req: Request, res: Response) => {
    try {
      if (!req.auth?.userId) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
      }

      const user = await userService.getUserById(req.auth.userId);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch user',
        },
      });
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (req: Request, res: Response) => {
    try {
      if (!req.auth?.userId) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'User not authenticated',
          },
        });
      }

      const updatedUser = await userService.updateUser(
        req.auth.userId,
        req.body
      );

      res.json({
        success: true,
        data: updatedUser,
        message: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to update profile',
        },
      });
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'User not found',
          },
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch user',
        },
      });
    }
  },
};
