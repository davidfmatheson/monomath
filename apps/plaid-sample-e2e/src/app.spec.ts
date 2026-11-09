import { test, expect } from '@playwright/test';

test.describe('plaid-sample', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome message', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome plaid-sample');
  });
});
