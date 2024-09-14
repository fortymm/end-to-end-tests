import { expect, Locator, Page } from "@playwright/test";
import { DashboardPage } from "./dashboard-page";
import { ChallengePage } from "./challenge-page";

export class MatchPage {
    public readonly heading: Locator;

    static async createMatchBetween(firstUser: Page, secondUser: Page) {
        const firstUserDashboard = new DashboardPage(firstUser);
        await firstUserDashboard.goto();
        await firstUserDashboard.challengeForm.bestOf7Button.click();
        const inviteUrl = await firstUser.getByRole("textbox").inputValue();

        await secondUser.goto(inviteUrl);
        const challenge = new ChallengePage(secondUser);
        const newScorePage = await challenge.acceptChallenge();
        await expect(newScorePage.header).toBeVisible();
    }

    constructor(private readonly page: Page) {
        this.heading = page.getByRole("heading", { name: "Match" });
    }


    async goto(slug: string) {
        await this.page.goto(`/matches/${slug}`);
    }
}