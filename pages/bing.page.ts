import { Page, expect } from "@playwright/test";

import { loginData } from "../fixtures/loginData";

export class BingPage {
  constructor(protected page: Page) {}

  cookiesAcceptButton = this.page.locator("#bnp_btn_accept");
  searchInputElement = this.page.locator('[name="q"]');

  // Copilot GPTs elements
  copilotHeaderElement = this.page.getByRole("heading", {
    name: "Copilot",
    exact: true,
  });
  gptListElements = this.page.locator(".gpt-list");

  // Copilot conversation elements
  newTopicButton = this.page.getByLabel("New topic");
  askMeAnythingInput = this.page.getByLabel("Ask me anything...");
  copilotSubmitButton = this.page.getByLabel("Submit");
  stopRespondingButton = this.page.locator("#stop-responding-button");

  questionSection = this.page.locator("cib-message-group");
  answerSection = this.page.locator(".ac-adaptiveCard");
  continueButton = this.page.locator("button.get-started-btn");
  answerActionsSection = this.page.locator(".has-bot-actions");
  privacySection = this.page.locator(".privacy-statement");
  suggestionBar = this.page.locator("cib-suggestion-bar");

  // image generation elements
  imagePlaceholderElement = this.page.locator("#b_content #gi_content");

  async open() {
    await this.page.goto("/");
    await this.closeCookiesPopup();
  }

  async closeCookiesPopup() {
    try {
      await this.cookiesAcceptButton.waitFor({
        state: "visible",
        timeout: 5000,
      });
      await this.cookiesAcceptButton.click();
      console.log("Button clicked!");
    } catch (error) {
      console.log("Button not visible or did not appear within timeout.");
    }
  }

  async searchWithCopilot(searchPhrase: string) {
    await this.page.goto(
      `/search?form=MY02CC&OCID=MY02CC&q=${searchPhrase}&showconv=1`
    );
    await this.closeCookiesPopup();
  }

  async openCopilot() {
    await this.page.goto(
      "/search?form=MY02CC&OCID=MY02CC&q=Bing+AI&showconv=1"
    );
    await this.closeCookiesPopup();
  }

  async checkSearchElements() {
    await expect(this.searchInputElement).toBeVisible();
  }

  async checkCopilotElements() {
    await expect(this.copilotHeaderElement).toBeVisible();
    await expect(this.gptListElements).toBeVisible();
    await expect(this.newTopicButton).toBeVisible();
    await expect(this.askMeAnythingInput).toBeVisible();
    await expect(this.copilotSubmitButton).toBeVisible();
  }

  async askAQuestion(question: string) {
    await this.fillQuestionInput(question);

    // Answer section is visible:
    await expect(this.answerSection.last()).toBeVisible({ timeout: 25000 });
    await expect(this.suggestionBar).toBeVisible({ timeout: 15000 });
  }

  async askAnUnanswerableQuestion(question: string) {
    await this.fillQuestionInput(question);

    // Answer section is visible:
    await expect(this.answerSection.last()).toBeVisible({ timeout: 25000 });
  }

  async fillQuestionInput(question: string) {
    await this.closeCookiesPopup();

    await this.askMeAnythingInput.fill(question);
    await this.copilotSubmitButton.click();
    await expect(this.stopRespondingButton).toBeVisible();

    // Question section is visible:
    await expect(this.questionSection.first()).toBeVisible();

    await this.page
      .locator("div")
      .filter({ hasText: question })
      .first()
      .isVisible();
  }

  async clickContinue() {
    try {
      await this.continueButton.waitFor({
        state: "visible",
        timeout: 5000,
      });
      await this.continueButton.click();
      console.log("Button clicked!");
    } catch (error) {
      console.log("Button not visible or did not appear within timeout.");
    }
  }

  async verifySimpleResult(expectedResult: string) {
    await expect(this.answerSection.last()).toContainText(expectedResult);
  }

  async verifyFewDifferentAnswers(expectedResults) {
    const text = await this.answerSection.last().textContent();
    const regex = new RegExp(expectedResults.join("|"), "i");
    expect(text).toMatch(regex);
  }

  async waitForTheResults() {
    await this.page.waitForTimeout(2000);
  }

  async verifyComplicatedMathResult(expectedResult: string) {
    await expect(this.page.locator(".ac-adaptiveCard strong")).toHaveText(
      expectedResult
    );
  }

  async verifyImageGeneration() {
    await this.page
      .locator("iframe")
      .filter({ hasText: "Sign in to create images" })
      .first()
      .isVisible();
  }
}
