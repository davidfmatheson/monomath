import { test, expect } from '@playwright/test';

test.describe('micah-site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome message', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/Welcome/);
  });
});
