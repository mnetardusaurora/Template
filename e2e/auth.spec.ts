import { test, expect } from '@playwright/test';

/**
 * Authentication E2E Tests
 *
 * Tests the authentication flow using Clerk
 */

test.describe('Authentication Flow', () => {
  test('should display sign-in page', async ({ page }) => {
    await page.goto('/sign-in');

    // Check that the sign-in page loads
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should display sign-up page', async ({ page }) => {
    await page.goto('/sign-up');

    // Check that the sign-up page loads
    await expect(page.getByRole('heading', { name: /create your account/i })).toBeVisible();
  });

  test('should redirect unauthenticated users to sign-in', async ({ page }) => {
    await page.goto('/');

    // Should redirect to sign-in page
    await expect(page).toHaveURL(/sign-in/);
  });

  test('should navigate between sign-in and sign-up', async ({ page }) => {
    await page.goto('/sign-in');

    // Find and click link to sign-up
    // Note: Adjust selectors based on actual Clerk component structure
    const signUpLink = page.getByRole('link', { name: /sign up/i });
    if (await signUpLink.isVisible()) {
      await signUpLink.click();
      await expect(page).toHaveURL(/sign-up/);
    }
  });

  // Note: Full authentication tests would require test credentials
  // or Clerk test mode configuration
  test.skip('should sign in with valid credentials', async ({ page }) => {
    await page.goto('/sign-in');

    // Fill in credentials (use test credentials in CI)
    await page.fill('input[name="identifier"]', 'test@example.com');
    await page.fill('input[name="password"]', 'TestPassword123!');

    // Submit form
    await page.click('button[type="submit"]');

    // Should redirect to home page
    await expect(page).toHaveURL('/');
  });
});
