import { api } from './api';

/**
 * User Service
 *
 * API calls related to user management
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserProfile extends User {
  // Add additional profile fields as needed
  role?: string;
  metadata?: Record<string, unknown>;
}

export const userService = {
  /**
   * Get current user profile
   */
  getCurrentUser: async (token?: string): Promise<UserProfile> => {
    return api.get<UserProfile>('/api/users/me', token);
  },

  /**
   * Update user profile
   */
  updateProfile: async (
    data: Partial<UserProfile>,
    token?: string
  ): Promise<UserProfile> => {
    return api.patch<UserProfile>('/api/users/me', data, token);
  },

  /**
   * Get user by ID (admin only)
   */
  getUserById: async (id: string, token?: string): Promise<User> => {
    return api.get<User>(`/api/users/${id}`, token);
  },
};
