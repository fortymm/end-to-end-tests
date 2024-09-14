import { Locator, Page } from "@playwright/test";

export class NewScorePage {
    public readonly header: Locator;

    constructor(private readonly page: Page) {
        this.header = page.locator('h1', { hasText: 'New Score' });
    }
}