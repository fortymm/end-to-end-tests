import { Locator, Page } from "@playwright/test";

export class LayoutPage {
  public readonly logOutLink: Locator;
  public readonly settingsLink: Locator;
  public readonly logInLink: Locator;
  public readonly registerLink: Locator;

  constructor(private readonly page: Page) {
    this.logOutLink = page.getByRole("link", { name: "Log out" });
    this.settingsLink = page.getByRole("link", { name: "Settings" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.logInLink = page.getByRole("link", { name: "Log in" });
  }
}
