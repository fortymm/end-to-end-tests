import { Locator, Page } from "@playwright/test";

export class ChallengePage {
  public readonly copyUrlButton: Locator;

  async goto(slug: string) {
    await this.page.goto(`/challenges/${slug}`);
  }

  constructor(private readonly page: Page) {
    this.copyUrlButton = page.locator('#copy-url-button');
  }
}