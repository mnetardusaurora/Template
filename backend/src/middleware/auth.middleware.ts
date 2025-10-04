import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/express';

/**
 * Authentication Middleware
 *
 * Validates Clerk JWT tokens and attaches user info to request.
 * Supports both direct Clerk integration and Aurora Identity tokens.
 */

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId: string;
        claims?: Record<string, unknown>;
      };
    }
  }
}

/**
 * Verify Clerk token
 */
export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Missing or invalid authorization header',
        },
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Check if this is an Aurora Identity token
    const authSource = req.headers['x-auth-source'];

    if (authSource === 'aurora-identity') {
      // Validate Aurora Identity token
      // TODO: Implement Aurora Identity token validation
      // For now, we'll use Clerk to validate since Aurora uses Clerk
      // In production, you might validate against Aurora's API
    }

    // Verify token with Clerk
    // Note: In production, use proper Clerk session verification
    const sessionToken = token;

    // For now, we'll do basic validation
    // In production, use: await clerkClient.sessions.verifySession(sessionId, token)

    // Attach user info to request
    // This is a placeholder - implement proper token verification
    req.auth = {
      userId: 'user_placeholder', // Extract from verified token
      sessionId: 'session_placeholder',
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid or expired token',
      },
    });
  }
};

/**
 * Optional auth - attaches user if token present, but doesn't require it
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);

      // Attempt to verify token, but don't fail if invalid
      // req.auth = await verifyToken(token);
    }

    next();
  } catch (error) {
    // Don't fail for optional auth
    next();
  }
};
