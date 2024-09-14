import { test, expect } from '@playwright/test';
import { MatchPage } from './page-objects/match-page';
import { LogInPage } from './page-objects/log-in-page';
import { NewScorePage } from './page-objects/new-score-page';

  test('redirects to the log in page when not logged in', async ({ browser, page }) => {
    const challengerPage = await browser.newPage({ storageState: "playwright/.auth/first_test_user.json" });
    const responderPage = await browser.newPage({ storageState: "playwright/.auth/second_test_user.json" });
    await MatchPage.createMatchBetween(challengerPage, responderPage);
    const newScoreUrl = await challengerPage.url();
    await page.goto(newScoreUrl);
    const loginPage = new LogInPage(page);
    await expect(loginPage.emailInput).toBeVisible();
  });

  test('redirects to the match page when not a match participant', async ({ page, browser }) => {
    const challengerPage = await browser.newPage({ storageState: "playwright/.auth/first_test_user.json" });
    const responderPage = await browser.newPage({ storageState: "playwright/.auth/second_test_user.json" });
    const thirdUserPage = await browser.newPage({ storageState: "playwright/.auth/third_test_user.json" });

    await MatchPage.createMatchBetween(challengerPage, responderPage);
    const newScoreUrl = await challengerPage.url();
    await thirdUserPage.goto(newScoreUrl);
    const matchPage = new MatchPage(thirdUserPage);
    await expect(matchPage.heading).toBeVisible();
  });

  test('can access the page as a match participant', async ({ page, browser }) => {
    const challengerPage = await browser.newPage({ storageState: "playwright/.auth/first_test_user.json" });
    const responderPage = await browser.newPage({ storageState: "playwright/.auth/second_test_user.json" });

    await MatchPage.createMatchBetween(challengerPage, responderPage);
    const newScoreUrl = await challengerPage.url();
    await challengerPage.goto(newScoreUrl);
    const newScorePage = new NewScorePage(challengerPage);
    await expect(newScorePage.header).toBeVisible();
  });

  test('shows an error when the match is not found', async ({ browser }) => {
    const page = await browser.newPage({ storageState: "playwright/.auth/first_test_user.json" });
    await page.goto('http://localhost:4000/matches/0/games/0/scores/new');
    await expect(page.getByRole('heading', { name: 'Ecto.NoResultsError at GET /' })).toBeVisible();
  });
