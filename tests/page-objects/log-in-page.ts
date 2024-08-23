import { expect, Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard-page";

export class LogInPage {
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly logInButton: Locator;

  constructor(private page: Page) {
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.logInButton = page.getByRole("button", { name: "Log in" });
  }

  async logIn(email: string, password: string): Promise<DashboardPage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.logInButton.click();

    const dashboard = new DashboardPage(this.page);
    await expect(dashboard.heading).toBeVisible();

    return dashboard;
  }

  async goto() {
    await this.page.goto("/users/log_in");
    await this.page.waitForSelector("body > .phx-connected");
  }
}
