import { expect, Locator, Page } from "@playwright/test";
import { MatchPage } from "./match-page";

export class ChallengePage {
  public readonly copyUrlButton: Locator;
  public readonly acceptChallengeButton: Locator;

  async goto(slug: string) {
    await this.page.goto(`/challenges/${slug}`);
  }

  constructor(private readonly page: Page) {
    this.copyUrlButton = page.locator('#copy-url-button');
    this. acceptChallengeButton = page.getByRole('button', { name: 'Accept the challenge' });
  }

  async acceptChallenge(): Promise<MatchPage> {
    await this.page.waitForSelector('body > .phx-connected');
    await this.acceptChallengeButton.click();

    const matchPage = new MatchPage(this.page);
    await this.page.waitForSelector('body > .phx-connected');
    await expect(matchPage.heading).toBeVisible();

    return matchPage;
  }
}