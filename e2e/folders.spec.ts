import test, { expect } from "@playwright/test";

test('create a folder', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('#folder').click();
    await page.locator('#folder').fill('abc');
    await expect(page.getByText('Enter the folder name')).toBeVisible();
    await page.locator('#folder').fill('abc ');
    await expect(page.getByText('9 alpha characters maximum')).toBeVisible();
    await page.locator('#folder').fill('abc !');
    await expect(page.getByText('9 alpha characters maximum')).toBeVisible();
    await page.locator('#folder').fill('abc )');
    await expect(page.getByText('9 alpha characters maximum')).toBeVisible();
    await page.locator('#folder').fill('Favorites )');
    await expect(page.getByText('This folder already exists')).toBeVisible();
    await page.locator('#folder').fill('abc-_');
    await expect(page.getByText('Enter the folder name')).toBeVisible();
    await page.getByRole('button', { name: 'Folder' }).click();
    await expect(page.locator('span').filter({ hasText: 'abc-_' })).toBeVisible();
})