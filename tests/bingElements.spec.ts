import { test, expect } from "@playwright/test";

import { BingPage } from "../pages/bing.page";

test.describe("Check Basic Bing Copilot elements", () => {
  let bingPage: BingPage;

  test.beforeEach(async ({ page }) => {
    bingPage = new BingPage(page);

    await bingPage.open();
    await bingPage.checkSearchElements();
  });

  test("should check copilot UI elements", async () => {
    await bingPage.searchWithCopilot("Bing+AI");
    await bingPage.checkCopilotElements();
  });
});
