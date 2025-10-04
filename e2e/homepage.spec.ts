import { test, expect } from '@playwright/test';

/**
 * Homepage E2E Tests
 *
 * Tests the main homepage functionality
 */

test.describe('Homepage', () => {
  test.skip('should display homepage content for authenticated users', async ({ page }) => {
    // Note: This test requires authentication
    // You would need to set up authenticated context or use Clerk test mode

    await page.goto('/');

    // Check for main heading
    await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/sign-in');

    // Verify page loads without errors
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/sign-in');

    // Check that page is visible and formatted properly
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });
});
