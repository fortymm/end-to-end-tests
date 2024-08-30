import test, { expect } from "@playwright/test";
import { ChallengePage } from "./page-objects/challenge-page";
import { DashboardPage } from "./page-objects/dashboard-page";
import { LogInPage } from "./page-objects/log-in-page";
import { MatchPage } from "./page-objects/match-page";

test.describe("when nobody is logged in", () => {
  test("redirects to the login page", async ({ page }) => {
    const challenge = new ChallengePage(page);
    const logInPage = new LogInPage(page);
    await challenge.goto("some-challenge");
    await expect(logInPage.emailInput).toBeVisible();
  });
});

test.describe("with somebody logged in", () => {
  let inviteUrl: string;

  test.beforeAll(async ({ browser }) => {
    const firstUserContext = await browser.newContext({
      storageState: "playwright/.auth/first_test_user.json",
    });

    const firstUserPage = await firstUserContext.newPage();

    const dashboard = new DashboardPage(firstUserPage);
    await dashboard.goto();
    await dashboard.challengeForm.bestOf7Button.click();
    inviteUrl = await firstUserPage.getByRole("textbox").inputValue();
  });

  test.describe("when the logged in user did not create the challenge", () => {
    test.use({ storageState: "playwright/.auth/second_test_user.json" });

    test("allows the user to accept the challenge", async ({ page }) => {
      await page.goto(inviteUrl);

      await expect(
        page.getByText("First User has challenged you!", { exact: true })
      ).toBeVisible();
      await expect(
        page.getByText("The first player to win 4 games wins the match.", {
          exact: true,
        })
      ).toBeVisible();
    });
  });

  test.describe("when the logged in user created the challenge", () => {
    test.use({ storageState: "playwright/.auth/first_test_user.json" });

    test("shows the challenge details", async ({ page }) => {
      await page.goto(inviteUrl);
      await expect(page.getByRole("textbox")).toHaveValue(inviteUrl);
    });
  });

  test("allows creating a new match", async ({ browser }) => {
    const challengerPage = await browser.newPage({ storageState: "playwright/.auth/first_test_user.json" });
    const responderPage = await browser.newPage({ storageState: "playwright/.auth/second_test_user.json" });

    const dashboard = new DashboardPage(challengerPage);
    await dashboard.goto();
    await dashboard.challengeForm.bestOf7Button.click();
    const inviteUrl = await challengerPage.getByRole("textbox").inputValue();

    const challenge = new ChallengePage(responderPage);
    await responderPage.goto(inviteUrl);
    const matchPage = await challenge.acceptChallenge();
    await expect(matchPage.heading).toBeVisible();
  });

  test("redirects to the match page when the challenge has already been accepted", async ({ browser }) => {
    const challengerPage = await browser.newPage({ storageState: "playwright/.auth/first_test_user.json" });
    const responderPage = await browser.newPage({ storageState: "playwright/.auth/second_test_user.json" });

    const dashboard = new DashboardPage(challengerPage);
    await dashboard.goto();
    await dashboard.challengeForm.bestOf7Button.click();
    const inviteUrl = await challengerPage.getByRole("textbox").inputValue();

    const challenge = new ChallengePage(responderPage);
    await responderPage.goto(inviteUrl);
    const matchPage = await challenge.acceptChallenge();

    await responderPage.goto(inviteUrl);
    await expect(matchPage.heading).toBeVisible();
  });

});

test.describe("when the challenge can't be found", () => {
  test.use({ storageState: "playwright/.auth/first_test_user.json" });

  test("shows an error message", async ({ page }) => {
    const challenge = new ChallengePage(page);
    await challenge.goto("non-existent-challenge");
    await expect(
      page.getByRole("heading", { name: "Ecto.NoResultsError at GET /" })
    ).toBeVisible();
  });
});
