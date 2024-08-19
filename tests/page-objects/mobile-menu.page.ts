import { Locator, Page } from "@playwright/test";
import { Menu } from "./menu";

export class MobileMenuPage implements Menu {
  public readonly openButton: Locator;
  public readonly closeButton: Locator;
  public readonly logOutLink: Locator;
  public readonly settingsLink: Locator;
  public readonly logInLink: Locator;
  public readonly registerLink: Locator;

  constructor(private readonly page: Page) {
    this.openButton = page.getByRole("button", { name: "Open main menu" });
    this.closeButton = page.getByRole("button", { name: "Close main menu" });
    this.logOutLink = page.getByRole("link", { name: "Log out" });
    this.settingsLink = page.getByRole("link", { name: "Settings" });
    this.logInLink = page.getByRole("link", { name: "Log in" });
    this.registerLink = page.getByRole("link", { name: "Register" });
  }
}
