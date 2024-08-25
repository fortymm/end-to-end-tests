import { Locator, Page } from "@playwright/test";

export class ChallengePage {
  public readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole("heading", { name: "challenge", exact: true });
  }
}