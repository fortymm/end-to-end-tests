import { Locator, Page } from "@playwright/test";

export class DashboardPage {
    public readonly heading: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole("heading", { name: "Dashboard" });
    }

    async goto() {
        await this.page.goto("/dashboard");
    }
}