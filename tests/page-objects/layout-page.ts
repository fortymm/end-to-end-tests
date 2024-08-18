import { Locator, Page } from "@playwright/test";

export class LayoutPage {
  public readonly logOutLink: Locator;
  public readonly settingsLink: Locator;
  public readonly logInLink: Locator;
  public readonly registerLink: Locator;

  public readonly openMobileMenuButton: Locator;
  public readonly closeMobileMenuButton: Locator;

  constructor(private readonly page: Page) {
    this.openMobileMenuButton = page.getByRole('button', { name: 'Open main menu' });
    this.closeMobileMenuButton = page.getByRole('button', { name: 'Close main menu' });
    this.logOutLink = page.getByRole("link", { name: "Log out" });
    this.settingsLink = page.getByRole("link", { name: "Settings" });
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.logInLink = page.getByRole("link", { name: "Log in" });
  }
}
