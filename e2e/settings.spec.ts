import test, { expect } from "@playwright/test";

test('update the log level', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByLabel('Log level').selectOption('TRACE');
    await page.getByRole('main').locator('div').filter({ hasText: 'Log' }).getByRole('button').click();
    await expect(page.locator('span').filter({ hasText: 'success ! The log level has' }).locator('b')).toBeVisible();
})