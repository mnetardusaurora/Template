import { describe, it, expect, beforeEach } from '@jest/globals';
import { userService } from '../user.service';

describe('UserService', () => {
  beforeEach(() => {
    // Reset any mocks or state before each test
  });

  describe('getUserById', () => {
    it('should return a user for valid id', async () => {
      const userId = 'user_123';
      const user = await userService.getUserById(userId);

      expect(user).toBeDefined();
      expect(user?.id).toBe(userId);
      expect(user?.email).toBeDefined();
      expect(user?.name).toBeDefined();
    });

    it('should return user with correct structure', async () => {
      const user = await userService.getUserById('user_123');

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('createdAt');
    });
  });

  describe('updateUser', () => {
    it('should update user data', async () => {
      const userId = 'user_123';
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const updatedUser = await userService.updateUser(userId, updateData);

      expect(updatedUser).toBeDefined();
      expect(updatedUser?.name).toBe(updateData.name);
      expect(updatedUser?.email).toBe(updateData.email);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'new@example.com',
        name: 'New User',
      };

      const newUser = await userService.createUser(userData);

      expect(newUser).toBeDefined();
      expect(newUser.id).toBeDefined();
      expect(newUser.email).toBe(userData.email);
      expect(newUser.name).toBe(userData.name);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'user_123';
      const result = await userService.deleteUser(userId);

      expect(result).toBe(true);
    });
  });
});
