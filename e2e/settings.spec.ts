import test, { expect } from "@playwright/test";

test('update the log level', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByLabel('Log level').selectOption('TRACE');
    await page.getByRole('main').locator('div').filter({ hasText: 'Log' }).getByRole('button').click();
    await expect(page.locator('span').filter({ hasText: 'success ! The log level has' }).locator('b')).toBeVisible();
})

test('update the URL with wrong URL applies', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.getByLabel('Codex client node URL').click();

    await page.getByLabel('Codex client node URL').fill('http://127.0.0.1:8079');
    await page.getByRole('button', { name: 'Save changes' }).nth(1).click();

    await expect.soft(page.getByText("Cannot retrieve the data")).toBeVisible()

    await page.getByLabel('Codex client node URL').fill('http://127.0.0.1:8080');
    await page.getByRole('button', { name: 'Save changes' }).nth(1).click();
})