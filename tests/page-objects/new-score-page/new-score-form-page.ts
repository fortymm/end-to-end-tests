import { Locator, Page } from "@playwright/test";
import { ScoreValidationPage } from "../score-validation-page";

interface PlayerScore {
    name: string;
    score: number;
}

export class NewScoreFormPage {
    public readonly firstPlayerScoreInput: Locator;
    public readonly secondPlayerScoreInput: Locator;
    public readonly saveButton: Locator;

    constructor(private readonly page: Page) {
        this.saveButton = page.getByRole('button', { name: 'Save' });
    }

    scoreInput(playerName: string) {
        return this.page.getByLabel(playerName);
    }

    async fill(firstPlayer: PlayerScore, secondPlayer: PlayerScore): Promise<ScoreValidationPage> {
        await this.fillScoreInput(firstPlayer);
        await this.fillScoreInput(secondPlayer);
        await this.saveButton.click();
        return new ScoreValidationPage(this.page);
    }

    private async fillScoreInput(playerScore: PlayerScore) {
        await this.scoreInput(playerScore.name).fill(String(playerScore.score));
    }
}