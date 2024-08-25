import { Locator, Page } from "@playwright/test";

export class ChallengeFormPage {
    public readonly heading: Locator;
    public readonly toOneGameButton: Locator;
    public readonly bestOf3Button: Locator;
    public readonly bestOf5Button: Locator;
    public readonly bestOf7Button: Locator;

    constructor(private readonly root: Locator) {
        this.heading = root.getByRole("heading", { name: "Challenge A Friend" });
        this.toOneGameButton = root.getByRole("button", { name: "to just 1 game" });
        this.bestOf3Button = root.getByRole("button", { name: "to a best of 3" });
        this.bestOf5Button = root.getByRole("button", { name: "to a best of 5" });
        this.bestOf7Button = root.getByRole("button", { name: "to a best of 7" });
    }
}