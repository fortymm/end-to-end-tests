import { Locator, Page } from "@playwright/test";
import { MobileMenuPage } from "./mobile-menu-page";
import { UserMenuPage } from "./user-menu-page";
import { NotificationSlideoverPage } from "./notification-slideover-page";

export class LayoutPage {
  public readonly mobileMenu: MobileMenuPage;
  public readonly userMenu: UserMenuPage;
  public readonly notificationsSlideover: NotificationSlideoverPage;

  public readonly logInLink: Locator;
  public readonly registerLink: Locator;
  public readonly notificationsButton: Locator;

  constructor(private readonly page: Page) {
    this.notificationsSlideover = new NotificationSlideoverPage(page);
    this.mobileMenu = new MobileMenuPage(page);
    this.userMenu = new UserMenuPage(page);
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.logInLink = page.getByRole("link", { name: "Log in" });
    this.notificationsButton = page.getByRole("button", { name: "View notifications" });
  }
}
