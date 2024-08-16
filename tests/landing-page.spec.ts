import { test, expect } from '@playwright/test';
import { LandingPage } from './page-objects/landing-page';

test('has title', async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.heading).toBeVisible();
});

test.describe('with authenticated user', () => {
  test.use({ storageState: 'playwright/.auth/first_test_user.json' });

  test('has title', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await expect(landingPage.heading).toBeVisible();
  });

  test("shows the user's username", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    const firstUserUsername = await page.getByText('First User');
    await expect(firstUserUsername).toBeVisible();
  });
});