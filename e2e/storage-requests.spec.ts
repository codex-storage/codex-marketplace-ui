import test, { expect } from "@playwright/test";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('create a storage request', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('a').filter({ hasText: 'Purchases' }).click();
    await page.getByRole('button', { name: 'Storage Request' }).click();

    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await expect(page.locator('#cid')).not.toBeEmpty()
    await expect(page.getByText('Success, the CID has been')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Your request is being processed.')).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByText('No data.')).not.toBeVisible();
    await expect(page.getByTestId('cell-pending').first()).toBeVisible();
})

test('select a uploaded cid when creating a storage request', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await page.locator('a').filter({ hasText: 'Purchases' }).click();
    await page.getByRole('button', { name: 'Storage Request' }).click();
    await page.getByPlaceholder('CID').click();
    await page.locator('.dropdown ul li').nth(1).click();
    await expect(page.getByText('button[disabled]')).not.toBeVisible();
})

test('storage request navigation buttons', async ({ page }) => {
    await page.goto('/dashboard/purchases');
    await page.getByRole('button', { name: 'Storage Request' }).click();
    await expect(page.locator('.step--done')).not.toBeVisible()
    await expect(page.locator('.step--active')).toBeVisible()
    await expect(page.locator('footer .button--primary')).toHaveAttribute("disabled");
    await expect(page.locator('footer .button--outline').first()).not.toHaveAttribute("disabled");
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await expect(page.locator('footer .button--outline').first()).not.toHaveAttribute("disabled");
    await expect(page.locator('footer .button--primary')).not.toHaveAttribute("disabled");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator('footer .button--outline').first()).not.toHaveAttribute("disabled");
    await expect(page.locator('footer .button--primary')).not.toHaveAttribute("disabled");
    await expect(page.locator('.step--done')).toBeVisible()
    await expect(page.locator('.step--active')).toBeVisible()
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.locator('.step--done')).not.toBeVisible()
    await expect(page.locator('.step--active')).toBeVisible()
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator('.step--done')).toHaveCount(2)
    await expect(page.locator('.step--active')).toBeVisible()
    await expect(page.locator('footer .button--outline').first()).toHaveAttribute("disabled");
    await expect(page.locator('footer .button--primary')).not.toHaveAttribute("disabled");
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.locator('.modal--open')).not.toBeVisible();
})

test('remove the CID when the file is deleted', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('a').filter({ hasText: 'Purchases' }).click();
    await page.getByRole('button', { name: 'Storage Request' }).click();
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await expect(page.locator('#cid')).not.toBeEmpty()
    await page.locator('.button-icon--small').nth(1).click();
    await expect(page.locator('#cid')).toBeEmpty()
})
