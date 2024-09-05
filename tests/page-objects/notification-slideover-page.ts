import { Locator, Page } from "@playwright/test";

export class NotificationSlideoverPage {
  public readonly closeButton: Locator;
  public readonly heading: Locator;

  constructor(private readonly page: Page) {
    this.closeButton = page.getByRole("button", { name: "Close panel" });
    this.heading = page.getByRole("heading", { name: "Notifications" });
  }
}
