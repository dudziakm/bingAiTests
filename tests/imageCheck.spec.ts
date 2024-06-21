import { test } from "@playwright/test";

import { BingPage } from "../pages/bing.page";

test.describe("Check Basic Bing Image generation", () => {
  let bingPage: BingPage;

  test.beforeEach(async ({ page }) => {
    bingPage = new BingPage(page);
    await bingPage.openCopilot();
  });

  test("should ask for creating a basic image", async () => {
    await bingPage.askAQuestion(
      "Can you generate an image for me? Keywords: test, playwright, MS"
    );

    // only a basic check if the image placeholder is visible
    // we need to sign in to verify the image generation
    await bingPage.verifyImageGeneration();
  });
});
