import { test } from "@playwright/test";

import { BingPage } from "../pages/bing.page";

test.describe("Check Basic Bing Copilot elements", () => {
  let bingPage: BingPage;

  test.beforeEach(async ({ page }) => {
    bingPage = new BingPage(page);
    await bingPage.openCopilot();
  });

  test("should start a basic conversation", async () => {
    await bingPage.checkCopilotElements();
    await bingPage.askAQuestion("What is the weather in Warsaw?");
  });
});
