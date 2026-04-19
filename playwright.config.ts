import { defineConfig, devices } from "@playwright/test"

/**
 * Root Playwright config. Add `projects` / `testDir` paths as new packages ship apps.
 * Default: smoke the Next app in `aurora/` (starts dev server from repo root).
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Webpack avoids Turbopack resolving deps from the parent folder when a root package-lock exists.
    command: "npx next dev --webpack -H 127.0.0.1 -p 3000",
    cwd: "./aurora",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
