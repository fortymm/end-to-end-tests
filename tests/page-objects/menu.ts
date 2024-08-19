import { Locator } from "@playwright/test";

export interface Menu {
  readonly openButton: Locator;
  readonly closeButton: Locator;
  readonly logOutLink: Locator;
  readonly settingsLink: Locator;
  readonly logInLink: Locator;
  readonly registerLink: Locator;
}