import test, { devices, expect } from "@playwright/test";
import { Menu } from "./page-objects/menu";
import { DashboardPage } from "./page-objects/dashboard-page";
import { LayoutPage } from "./page-objects/layout-page";
import { LogInPage } from "./page-objects/log-in-page";
import { ChallengePage } from "./page-objects/challenge-page";

test.describe("with an authenticated user", () => {
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

    test("shows and hides the notifications slideover", async ({ page }) => {
      const dashboard = new DashboardPage(page);
      const layout = new LayoutPage(page);

      await expect(layout.notificationsSlideover.heading).not.toBeVisible();

      await dashboard.goto();
      await layout.mobileMenu.openButton.click();
      await layout.mobileMenu.notificationsButton.click();

      await expect(layout.notificationsSlideover.heading).toBeVisible();
      await layout.notificationsSlideover.closeButton.click();
      await expect(layout.notificationsSlideover.heading).not.toBeVisible();
    });

    test("shows and hides the user menu", async ({ page }) => {
      const dashboard = new DashboardPage(page);
      const layout = new LayoutPage(page);
      const menu = layout.mobileMenu;
      await dashboard.goto();

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

  test("shows and hides the notifications slideover", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const layout = new LayoutPage(page);
    await dashboard.goto();

    await layout.notificationsButton.click();

    await expect(layout.notificationsSlideover.heading).toBeVisible();
    await layout.notificationsSlideover.closeButton.click();
    await expect(layout.notificationsSlideover.heading).not.toBeVisible();
  });

  test("shows and hides the user menu", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const layout = new LayoutPage(page);
    const menu = layout.userMenu;
    await dashboard.goto();

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

  test("shows the challenge form", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    await expect(dashboard.challengeForm.heading).toBeVisible();
    await expect(dashboard.challengeForm.toOneGameButton).toBeVisible();
    await expect(dashboard.challengeForm.bestOf3Button).toBeVisible();
    await expect(dashboard.challengeForm.bestOf5Button).toBeVisible();
    await expect(dashboard.challengeForm.bestOf7Button).toBeVisible();
  });

  test("shows the ongoing matches for the player", async ({ browser }) => {
    const challengerPage = await browser.newPage({
      storageState: "playwright/.auth/first_test_user.json",
    });
    const responderPage = await browser.newPage({
      storageState: "playwright/.auth/second_test_user.json",
    });

    const dashboard = new DashboardPage(challengerPage);
    await dashboard.goto();
    const originalNumberOfMatches = await challengerPage
      .getByText("Second User vs First user")
      .count();
    await dashboard.challengeForm.bestOf7Button.click();
    const inviteUrl = await challengerPage.getByRole("textbox").inputValue();

    const challenge = new ChallengePage(responderPage);
    await responderPage.goto(inviteUrl);
    const newScorePage = await challenge.acceptChallenge();
    await expect(newScorePage.header).toBeVisible();

    await dashboard.goto();
    const numberOfMatches = await challengerPage
      .getByText("Second User vs First user")
      .count();
    await expect(numberOfMatches).toBeGreaterThan(originalNumberOfMatches);
  });

  test("does not show ongoing matches for other players", async ({
    browser,
  }) => {
    const playerFour = await browser.newPage({
      storageState: "playwright/.auth/fourth_test_user.json",
    });
    const dashboard = new DashboardPage(playerFour);
    await dashboard.goto();
    await expect(
      playerFour.getByText("Second User vs First User")
    ).not.toBeVisible();
  });

  test("allows creating a challenge", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();

    const createChallengeButtons = [
      dashboard.challengeForm.toOneGameButton,
      dashboard.challengeForm.bestOf3Button,
      dashboard.challengeForm.bestOf5Button,
      dashboard.challengeForm.bestOf7Button,
    ];

    const randomChallengeButton =
      createChallengeButtons[
        Math.floor(Math.random() * createChallengeButtons.length)
      ];
    await randomChallengeButton.click();
    const challenge = new ChallengePage(page);
    await expect(challenge.copyUrlButton).toBeVisible();
  });
});

test.describe("with no authenticated user", () => {
  test("redirects to the log in page", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const logInPage = new LogInPage(page);
    await dashboard.goto();
    await expect(logInPage.emailInput).toBeVisible();
  });
});
