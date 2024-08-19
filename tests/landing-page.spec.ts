import { test, expect, devices } from "@playwright/test";
import { LandingPage } from "./page-objects/landing-page";
import { LayoutPage } from "./page-objects/layout-page";
import { Menu } from "./page-objects/menu";

const validateMenu = (menu: Menu) => {
};

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
      const menu = layout.mobileMenu;
      await landingPage.goto();

      await expect(menu.logOutLink).not.toBeVisible();
      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(menu.settingsLink).not.toBeVisible();

      await expect(menu.openButton).toBeVisible();
      await expect(menu.closeButton).not.toBeVisible();

      await menu.openButton.click();

      await expect(menu.closeButton).toBeVisible();
      await expect(menu.openButton).not.toBeVisible();

      await expect(layout.registerLink).toBeVisible();
      await expect(layout.logInLink).toBeVisible();
      await expect(menu.logOutLink).not.toBeVisible();
      await expect(menu.settingsLink).not.toBeVisible();

      await menu.closeButton.click();

      await expect(menu.closeButton).not.toBeVisible();
      await expect(menu.openButton).toBeVisible();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();
      await expect(menu.logOutLink).not.toBeVisible();
      await expect(menu.settingsLink).not.toBeVisible();
    });
  });

  test("shows links to log in and register", async ({ page }) => {
    const landingPage = new LandingPage(page);
    const layout = new LayoutPage(page);
    await landingPage.goto();

    await expect(layout.userMenu.logOutLink).not.toBeVisible();
    await expect(layout.userMenu.settingsLink).not.toBeVisible();
    await expect(layout.logInLink).toBeVisible();
    await expect(layout.registerLink).toBeVisible();
  });
});

test.describe("with authenticated user", () => {
  test.use({ storageState: "playwright/.auth/first_test_user.json" });

  const validateMenu = async (menu: Menu) => {
      await expect(menu.logOutLink).not.toBeVisible();
      await expect(menu.settingsLink).not.toBeVisible();

      await expect(menu.openButton).toBeVisible();
      await expect(menu.closeButton).not.toBeVisible();

      await menu.openButton.click();

      await expect(menu.closeButton).toBeVisible();
      await expect(menu.openButton).not.toBeVisible();

      await expect(menu.logOutLink).toBeVisible();
      await expect(menu.settingsLink).toBeVisible();

      await menu.closeButton.click();

      await expect(menu.closeButton).not.toBeVisible();
      await expect(menu.openButton).toBeVisible();

      await expect(menu.logOutLink).not.toBeVisible();
      await expect(menu.settingsLink).not.toBeVisible();
  };

  test.describe("when viewed on mobile", () => {
    test.use({ viewport: devices["iPhone 13"].viewport });

    test("shows and hides the user menu", async ({ page }) => {
      const landingPage = new LandingPage(page);
      const layout = new LayoutPage(page);
      const menu = layout.mobileMenu;
      await landingPage.goto();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();

      await expect(
        page.locator("#mobile-menu").getByText("First User")
      ).not.toBeVisible();
      await expect(
        page.locator("#mobile-menu").getByText("first_test_user@test.test")
      ).not.toBeVisible();

      await menu.openButton.click();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();

      await expect(
        page.locator("#mobile-menu").getByText("First User")
      ).toBeVisible();
      await expect(
        page.locator("#mobile-menu").getByText("first_test_user@test.test")
      ).toBeVisible();

      await menu.closeButton.click();

      await expect(layout.registerLink).not.toBeVisible();
      await expect(layout.logInLink).not.toBeVisible();

      await expect(
        page.locator("#mobile-menu").getByText("First User")
      ).not.toBeVisible();
      await expect(
        page.locator("#mobile-menu").getByText("first_test_user@test.test")
      ).not.toBeVisible();

      await validateMenu(menu);
    });

  });

  test("shows and hides the user menu", async ({ page }) => {
    const landingPage = new LandingPage(page);
    const layout = new LayoutPage(page);
    const menu = layout.userMenu;
    await landingPage.goto();

    await expect(layout.logInLink).not.toBeVisible();
    await expect(menu.settingsLink).not.toBeVisible();
    await expect(menu.closeButton).not.toBeVisible();

    await menu.openButton.click();

    await expect(layout.registerLink).not.toBeVisible();
    await expect(layout.logInLink).not.toBeVisible();

    await menu.closeButton.click();

    await expect(layout.registerLink).not.toBeVisible();
    await expect(layout.logInLink).not.toBeVisible();

    await validateMenu(menu);
  });
});
