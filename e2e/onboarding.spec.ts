import { test, expect } from '@playwright/test';

test('onboarding steps', async ({ page }) => {
  await page.context().setOffline(false)
  await page.goto('/');
  await expect(page.getByText("Codex is a durable, decentralised data storage protocol, created so the world community can preserve its most important knowledge without risk of censorship.")).toBeVisible()
  await page.locator('.navigation').click();
  await expect(page.locator('.navigation')).toHaveAttribute("aria-disabled");
  await page.getByLabel('Preferred name').fill('Arnaud');
  await expect(page.locator('.navigation')).not.toHaveAttribute("aria-disabled");
  await page.locator('.navigation').click();

  // Network
  await expect(page.locator(".health-checks ul li").nth(1).getByTestId("icon-error")).not.toBeVisible()
  await expect(page.locator(".health-checks ul li").nth(1).getByTestId("icon-success")).toBeVisible()

  // Port forwarding
  await expect(page.locator(".health-checks ul li").nth(2).getByTestId("icon-error")).not.toBeVisible()
  await expect(page.locator(".health-checks ul li").nth(2).getByTestId("icon-success")).toBeVisible()

  // Codex node
  await expect(page.locator(".health-checks ul li").nth(3).getByTestId("icon-error")).not.toBeVisible()
  await expect(page.locator(".health-checks ul li").nth(3).getByTestId("icon-success")).toBeVisible()

  // Marketplace
  await expect(page.locator(".health-checks ul li").nth(4).getByTestId("icon-error")).not.toBeVisible()
  await expect(page.locator(".health-checks ul li").nth(4).getByTestId("icon-success")).toBeVisible()

  await page.context().setOffline(true)

  // Network
  await expect(page.locator(".health-checks ul li").nth(1).getByTestId("icon-error")).toBeVisible()
  await expect(page.locator(".health-checks ul li").nth(1).getByTestId("icon-success")).not.toBeVisible()

  await page.context().setOffline(false)
});

// await expect(page.locator('#root')).toContainText('Network connected');
// await page.locator('a').nth(2).click();
// await page.context().setOffline(true)
// await expect(page.locator('#root')).toContainText('Network disconnected');