import { Page } from "@playwright/test";

export class MatchPage {
    public readonly heading: Locator;

    constructor(private readonly page: Page) {
        this.heading = page.getByRole("heading", { name: "Match" });
    }


    async goto(slug: string) {
        await this.page.goto(`/matches/${slug}`);
    }
}