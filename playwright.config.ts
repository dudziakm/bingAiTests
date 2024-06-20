import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 3 : 1,
  reporter: "html",
  timeout: 60000,
  expect: {
    timeout: 5000, // default timeout for elements waiting
  },
  use: {
    baseURL: "https://www.bing.com/",
    // baseURL:
    // "https://www.bing.com/search?form=MY02CC&OCID=MY02CC&q=Bing+AI&showconv=1",
    // baseURL: "https://www.wp.pl",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
