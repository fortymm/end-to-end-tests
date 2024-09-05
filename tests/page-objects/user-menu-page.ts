import { Locator, Page } from "@playwright/test";
import { Menu } from "./menu";

export class UserMenuPage implements Menu {
  public readonly openButton: Locator;
  public readonly closeButton: Locator;
  public readonly logOutLink: Locator;
  public readonly settingsLink: Locator;
  public readonly logInLink: Locator;
  public readonly registerLink: Locator;

  constructor(private readonly page: Page) {
    this.openButton = page.getByRole("button", { name: "Open user menu" });
    this.closeButton = page.getByRole("button", { name: "Close user menu" });
    this.logOutLink = page.getByRole("menuitem", { name: "Log out" });
    this.settingsLink = page.getByRole("menuitem", { name: "Settings" });
    this.logInLink = page.getByRole("menuitem", { name: "Log in" });
    this.registerLink = page.getByRole("menuitem", { name: "Register" });
  }
}
