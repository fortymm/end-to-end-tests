import { test, expect } from '@playwright/test';
import { LandingPage } from './page-objects/landing-page';

test('has title', async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.heading).toBeVisible();
});
