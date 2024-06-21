import { test } from "@playwright/test";

import { BingPage } from "../pages/bing.page";

test.describe("Check Bing for different answers for the same question", () => {
  let bingPage: BingPage;

  const possibleAnswers = [
    "I don’t have an answer for the meaning of life",
    "The meaning of life is a profound and age-old question",
    "I apologize, but I won’t be able to provide an answer to that question",
    "I apologize, but I won’t be able to continue discussing the meaning of life",
    "I apologize, but I’m unable to provide a meaningful answer to that question",
    "I apologize, but I cannot provide a definitive answer to the meaning of life",
    "I apologize, but I won’t be able to continue this conversation",
  ];

  test.beforeEach(async ({ page }) => {
    bingPage = new BingPage(page);

    await bingPage.openCopilot();
  });
  for (let i = 0; i < 5; i++) {
    // most of these fill pass. We get a different answer each time even though the question is the same
    test(`should give different answers for the same question for the ${i} time`, async () => {
      await bingPage.askAnUnanswerableQuestion("what is the meaning of life?");
      // waiting for the results to appear needs to be refactored. Here we have a really basic wait
      await bingPage.waitForTheResults();
      await bingPage.verifyFewDifferentAnswers(possibleAnswers);
    });
  }
});
