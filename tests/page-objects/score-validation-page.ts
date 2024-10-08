import { Locator, Page } from "@playwright/test";

export class ScoreValidationPage {
    public readonly header: Locator;

    constructor(private readonly page: Page) {
        this.header = page.getByRole('heading', { name: 'Score validation' });
    }
}