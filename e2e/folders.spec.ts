import test, { expect } from "@playwright/test";

test('create a folder', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('#folder').click();
    await page.locator('#folder').fill('abc');
    await expect(page.getByPlaceholder('Folder name')).toBeVisible();
    await page.locator('#folder').fill('abc ');
    await expect(page.getByPlaceholder('Folder name')).toHaveAttribute("aria-invalid", "true");
    await page.locator('#folder').fill('abc !');
    await expect(page.getByPlaceholder('Folder name')).toHaveAttribute("aria-invalid", "true");
    await page.locator('#folder').fill('abc )');
    await expect(page.getByPlaceholder('Folder name')).toHaveAttribute("aria-invalid", "true");
    await page.locator('#folder').fill('Favorites )');
    await expect(page.getByPlaceholder('Folder name')).toHaveAttribute("aria-invalid", "true");
    await page.locator('#folder').fill('abc-_');
    await expect(page.getByPlaceholder('Folder name')).toBeVisible();
    await page.getByRole('button', { name: 'Folder' }).click();
    await expect(page.locator('span').filter({ hasText: 'abc-_' }).first()).toBeVisible();
})