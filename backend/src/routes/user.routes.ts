import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * User Routes
 * All routes require authentication
 */

// Get current user profile
router.get('/me', requireAuth, userController.getCurrentUser);

// Update current user profile
router.patch('/me', requireAuth, userController.updateProfile);

// Get user by ID (admin only - add role check middleware as needed)
router.get('/:id', requireAuth, userController.getUserById);

export default router;
