import { test } from "@playwright/test";

import { BingPage } from "../pages/bing.page";

test.describe("Check Bing for different question in the same chat", () => {
  let bingPage: BingPage;

  test.beforeEach(async ({ page }) => {
    bingPage = new BingPage(page);

    await bingPage.openCopilot();
  });

  test("should allow changing topics and language", async () => {
    await bingPage.askAQuestion("what the capital of Poland?");
    await bingPage.verifySimpleResult("Warsaw");

    await bingPage.clickContinue();

    await bingPage.askAQuestion("what is the result of 2+2?");
    await bingPage.verifySimpleResult("4");

    await bingPage.clickContinue();

    await bingPage.askAQuestion("ile mamy województw w polsce?");
    await bingPage.verifySimpleResult("16");
  });
});
