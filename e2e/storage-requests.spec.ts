import test, { expect } from "@playwright/test";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('creates a storage request', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Purchases' }).click();
    await page.getByRole('button', { name: 'Storage Request' }).click();
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await expect(page.locator('#cid')).toHaveValue("zDvZRwzkvwapyNeL4mzw5gBsZvyn7x8F8Y9n4RYSC7ETBssDYpGe")
    await expect(page.getByText('Success, the CID has been')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Your request is being processed.')).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByText('No data.')).not.toBeVisible();
    await page.getByRole('cell', { name: 'pending' }).getByRole('paragraph').click();
})

test('select a uploaded cid when creating a storage request', async ({ page }) => {
    await page.goto('/dashboard');
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await page.getByRole('link', { name: 'Purchases' }).click();
    await page.getByRole('button', { name: 'Storage Request' }).click();
    await page.getByPlaceholder('Select or type your CID').click();
    await page.getByText('N/A0').click();
    await expect(page.getByText('button[disabled]')).not.toBeVisible();
})

test('storage request navigation buttons', async ({ page }) => {
    await page.goto('/dashboard/purchases');
    await page.getByRole('button', { name: 'Storage Request' }).click();
    await expect(page.locator('.stepper-number-done')).not.toBeVisible()
    await expect(page.locator('.stepper-number-active')).toBeVisible()
    await expect(page.locator('.stepper-buttons .button--primary')).toHaveAttribute("disabled");
    await expect(page.locator('.stepper-buttons .button--outline')).not.toHaveAttribute("disabled");
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await expect(page.locator('.stepper-buttons .button--outline')).not.toHaveAttribute("disabled");
    await expect(page.locator('.stepper-buttons .button--primary')).not.toHaveAttribute("disabled");
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator('.stepper-buttons .button--outline')).not.toHaveAttribute("disabled");
    await expect(page.locator('.stepper-buttons .button--primary')).not.toHaveAttribute("disabled");
    await expect(page.locator('.stepper-number-done')).toBeVisible()
    await expect(page.locator('.stepper-number-active')).toBeVisible()
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.locator('.stepper-number-done')).not.toBeVisible()
    await expect(page.locator('.stepper-number-active')).toBeVisible()
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.locator('.stepper-number-done')).toHaveCount(2)
    await expect(page.locator('.stepper-number-active')).toBeVisible()
    await expect(page.locator('.stepper-buttons .button--outline')).toHaveAttribute("disabled");
    await expect(page.locator('.stepper-buttons .button--primary')).not.toHaveAttribute("disabled");
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.locator('.modal--open')).not.toBeVisible();
})
