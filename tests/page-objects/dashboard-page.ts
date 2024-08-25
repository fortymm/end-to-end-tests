import { Page } from "@playwright/test";
import { ChallengeFormPage } from "./challenge-form-page";

export class DashboardPage {
    public readonly challengeForm: ChallengeFormPage;

    constructor(private readonly page: Page) {
        this.challengeForm = new ChallengeFormPage(page.getByText('Challenge A Friend to just 1'));
    }

    async goto() {
        await this.page.goto("/dashboard");
        await this.page.waitForSelector("body > .phx-connected");
    }
}