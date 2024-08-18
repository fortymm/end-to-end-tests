import { expect, Locator, Page } from "@playwright/test";
import { LandingPage } from "./landing-page";

export class LogInPage {
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly logInButton: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.logInButton = page.getByRole("button", { name: "Log in" });
  }

  async logIn(email: string, password: string): Promise<LandingPage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.logInButton.click();

    const landingPage = new LandingPage(this.page);
    await expect(landingPage.heading).toBeVisible();

    return landingPage;
  }

  async goto() {
    await this.page.goto("/users/log_in");
    await this.page.waitForSelector("body > .phx-connected");
  }
}
