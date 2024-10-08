import { Locator, Page } from "@playwright/test";
import { NewScoreFormPage } from "./new-score-page/new-score-form-page";

export class NewScorePage {
    public readonly form: NewScoreFormPage;
    public readonly header: Locator;

    constructor(private readonly page: Page) {
        this.form = new NewScoreFormPage(page);
        this.header = page.locator('h1', { hasText: "Enter the scores for game" });
    }
}