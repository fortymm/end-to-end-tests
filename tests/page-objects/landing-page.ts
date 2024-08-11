import { Locator, Page } from "@playwright/test";

export class LandingPage {
  public readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole("heading", {
      name: "Phoenix Framework v1.7.14",
    });
  }

  async goto() {
    await this.page.goto("/");
  }
}
