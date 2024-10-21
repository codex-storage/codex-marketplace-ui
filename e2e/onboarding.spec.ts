import { test, expect } from '@playwright/test';

test('onboarding steps', async ({ page }) => {
  await page.context().setOffline(false)
  await page.goto('/');
  await expect(page.locator('#root')).toContainText('Network connected');
  await page.locator('a').nth(2).click();
  await page.context().setOffline(true)
  await expect(page.locator('#root')).toContainText('Network disconnected');
  await page.getByLabel('Display name').click();
  await page.getByLabel('Display name').fill('Arnaud');
  await page.locator('a').click();
  await page.locator('div').filter({ hasText: /^Internet connectionStatus indicator for the Internet\.$/ }).first().click();
  await expect(page.getByTestId("network").locator(".onboarding-check-icon--valid")).not.toBeInViewport()
  await expect(page.getByTestId("network").locator(".onboarding-check-icon--invalid")).toBeInViewport()
  await page.context().setOffline(false)
  await expect(page.getByTestId("network").locator(".onboarding-check-icon--valid")).toBeInViewport()
  await expect(page.getByTestId("network").locator(".onboarding-check-icon--invalid")).not.toBeInViewport()
});