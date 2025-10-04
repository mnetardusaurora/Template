import { test, expect } from '@playwright/test';

/**
 * API E2E Tests
 *
 * Tests API endpoints and integration
 */

test.describe('API Integration', () => {
  const API_URL = process.env.API_URL || 'http://localhost:3001';

  test('should connect to backend health endpoint', async ({ request }) => {
    const response = await request.get(`${API_URL}/health`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.timestamp).toBeTruthy();
  });

  test('should return 401 for unauthenticated API requests', async ({ request }) => {
    const response = await request.get(`${API_URL}/api/users/me`);

    expect(response.status()).toBe(401);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error.code).toBe('UNAUTHORIZED');
  });

  test('should return 404 for non-existent endpoints', async ({ request }) => {
    const response = await request.get(`${API_URL}/api/nonexistent`);

    expect(response.status()).toBe(404);

    const data = await response.json();
    expect(data.success).toBe(false);
  });

  test.skip('should allow authenticated requests with valid token', async ({ request }) => {
    // Note: This test requires a valid auth token
    // You would need to set up test authentication

    const token = 'test_token'; // Get from test auth flow

    const response = await request.get(`${API_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    expect(response.status()).toBe(200);
  });
});
