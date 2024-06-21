import { test } from "@playwright/test";

import { BingPage } from "../pages/bing.page";

test.describe("Check Basic Bing Copilot elements", () => {
  let bingPage: BingPage;

  test.beforeEach(async ({ page }) => {
    bingPage = new BingPage(page);

    await bingPage.open();
    await bingPage.openCopilot();
  });

  test("should do a simple math: 2 + 2", async () => {
    await bingPage.askAQuestion("What is the result of: 2+2");
    await bingPage.verifySimpleResult("4");
  });

  test("should do a simple math: 2 + 2 × 2 ÷ 2", async () => {
    await bingPage.askAQuestion("What is the result of: 2+2×2÷2");

    // this will pass but this is not a proper result
    await bingPage.verifyComplicatedMathResult("3");

    // this will fail but this is a proper result
    await bingPage.verifyComplicatedMathResult("4");
  });

  test("should do a simple math: 3 + 5 × 2 ÷ 4 - 1", async () => {
    await bingPage.askAQuestion("What is the result of: 3 + 5 × 2 ÷ 4 - 1");

    // it this test I am receiving a few different results:
    // 3, 3.5, 4, etc

    // this will fail but this is a proper result
    await bingPage.verifyComplicatedMathResult("4.5");
  });
});
