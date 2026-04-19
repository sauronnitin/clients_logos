import { expect, test } from "@playwright/test"

test.describe("aurora", () => {
  test("home responds", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("body")).toBeVisible()
  })

  test("clients marquee embed loads", async ({ page }) => {
    await page.goto("/embed/clients-marquee")
    await expect(page.getByRole("link").first()).toBeVisible()
  })
})
