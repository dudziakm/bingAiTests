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

  async open() {
    await this.page.goto("/");

    if (await this.cookiesAcceptButton.isVisible()) {
      await this.cookiesAcceptButton.click();
      console.log("Button clicked!");
    } else {
      console.log("Button not visible.");
    }
  }

  async searchWithCopilot(searchPhrase: string) {
    await this.page.goto(
      `/search?form=MY02CC&OCID=MY02CC&q=${searchPhrase}&showconv=1`
    );
  }

  async openCopilot() {
    await this.page.goto(
      "/search?form=MY02CC&OCID=MY02CC&q=Bing+AI&showconv=1"
    );
    await this.cookiesAcceptButton.click();
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
    await this.askMeAnythingInput.fill(question);
    await this.copilotSubmitButton.click();
    await expect(this.stopRespondingButton).toBeVisible();

    // Question section is visible:
    await expect(this.questionSection).toBeVisible();

    await this.page
      .locator("div")
      .filter({ hasText: question })
      .first()
      .isVisible();

    // Answer section is visible:
    await expect(this.answerSection).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }
}
