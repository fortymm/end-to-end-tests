import { test, expect, devices } from "@playwright/test";
import { LandingPage } from "./page-objects/landing-page";
import { LayoutPage } from "./page-objects/layout-page";

test("has title", async ({ page }) => {
  const landingPage = new LandingPage(page);
  await landingPage.goto();
  await expect(landingPage.heading).toBeVisible();
});

test.describe("with no authenticated user", () => {
  test.describe("when viewed on mobile", () => {
    test.use({ viewport: devices["iPhone 13"].viewport });

    test("shows and hides the mobile menu", async ({ page }) => {
      const landingPage = new LandingPage(page);
      const layout = new LayoutPage(page);
      await landingPage.goto();

      await expect(layout.logOutLink).not.toBeVisible();
      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(layout.settingsLink).not.toBeVisible();

      await expect(layout.openMobileMenuButton).toBeVisible();
      await expect(layout.closeMobileMenuButton).not.toBeVisible();

      await layout.openMobileMenuButton.click();

      await expect(layout.closeMobileMenuButton).toBeVisible();
      await expect(layout.openMobileMenuButton).not.toBeVisible();

      await expect(layout.registerLink).toBeVisible();
      await expect(layout.logInLink).toBeVisible();
      await expect(layout.logOutLink).not.toBeVisible();
      await expect(layout.settingsLink).not.toBeVisible();

      await layout.closeMobileMenuButton.click();

      await expect(layout.closeMobileMenuButton).not.toBeVisible();
      await expect(layout.openMobileMenuButton).toBeVisible();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(layout.logOutLink).not.toBeVisible();
      await expect(layout.settingsLink).not.toBeVisible();
    });
  });

  test("shows links to log in and register", async ({ page }) => {
    const landingPage = new LandingPage(page);
    const layout = new LayoutPage(page);
    await landingPage.goto();

    await expect(layout.logOutLink).not.toBeVisible();
    await expect(layout.settingsLink).not.toBeVisible();
    await expect(layout.logInLink).toBeVisible();
    await expect(layout.registerLink).toBeVisible();
  });
});

test.describe("with authenticated user", () => {
  test.use({ storageState: "playwright/.auth/first_test_user.json" });

  test.describe("when viewed on mobile", () => {
    test.use({ viewport: devices["iPhone 13"].viewport });

    test("shows and hides the mobile menu", async ({ page }) => {
      const landingPage = new LandingPage(page);
      const layout = new LayoutPage(page);
      await landingPage.goto();

      await expect(layout.logOutLink).not.toBeVisible();
      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(layout.settingsLink).not.toBeVisible();

      await expect(page.locator('#mobile-menu').getByText('First User')).not.toBeVisible();
      await expect(page.locator('#mobile-menu').getByText('first_test_user@test.test')).not.toBeVisible();

      await expect(layout.openMobileMenuButton).toBeVisible();
      await expect(layout.closeMobileMenuButton).not.toBeVisible();

      await layout.openMobileMenuButton.click();

      await expect(layout.closeMobileMenuButton).toBeVisible();
      await expect(layout.openMobileMenuButton).not.toBeVisible();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(layout.logOutLink).toBeVisible();
      await expect(layout.settingsLink).toBeVisible();

      await expect(page.locator('#mobile-menu').getByText('First User')).toBeVisible();
      await expect(page.locator('#mobile-menu').getByText('first_test_user@test.test')).toBeVisible();

      await layout.closeMobileMenuButton.click();

      await expect(layout.closeMobileMenuButton).not.toBeVisible();
      await expect(layout.openMobileMenuButton).toBeVisible();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(layout.logOutLink).not.toBeVisible();
      await expect(layout.settingsLink).not.toBeVisible();

      await expect(page.locator('#mobile-menu').getByText('First User')).not.toBeVisible();
      await expect(page.locator('#mobile-menu').getByText('first_test_user@test.test')).not.toBeVisible();
    });
  });

  test("has title", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    await expect(landingPage.heading).toBeVisible();
  });

  test("shows the user's username", async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.goto();
    const firstUserUsername = await page.getByRole('list').getByText('First User');
    await expect(firstUserUsername).toBeVisible();
  });

  test("shows links to log out and the user's settings page", async ({
    page,
  }) => {
    const landingPage = new LandingPage(page);
    const layout = new LayoutPage(page);
    await landingPage.goto();

    await expect(layout.logOutLink).toBeVisible();
    await expect(layout.settingsLink).toBeVisible();
    await expect(layout.logInLink).not.toBeVisible();
    await expect(layout.registerLink).not.toBeVisible();
  });
});
