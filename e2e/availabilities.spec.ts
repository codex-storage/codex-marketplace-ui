import test, { expect } from "@playwright/test";

test('creates an availability', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('link', { name: 'Sales' }).click();
    await page.getByRole('button').first().click();
    await page.getByLabel('Total size').click();
    await page.getByLabel('Total size').fill('0.50');
    await page.getByLabel('Duration').click();
    await page.getByLabel('Duration').fill('30');
    await page.getByLabel('Min price').click();
    await page.getByLabel('Min price').fill('5');
    await page.getByLabel('Max collateral').click();
    await page.getByLabel('Max collateral').fill('30');
    await page.getByLabel('Min price').fill('5');
    await page.getByLabel('Nickname').click();
    await page.getByLabel('Nickname').fill('test');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Confirm your new sale')).toBeVisible();
    await page.locator('small').filter({ hasText: /^512\.0 MB$/ }).click();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Success', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByText('512.0 MB allocated for the').first()).toBeVisible();
})

test('availability navigation buttons', async ({ page }) => {
    await page.goto('/dashboard/availabilities');
    await page.getByRole('button').first().click();
    await expect(page.locator('.stepper-number-done')).not.toBeVisible()
    await expect(page.locator('.stepper-number-active')).toBeVisible()
    await expect(page.locator('.stepper-buttons .button--primary')).not.toHaveAttribute("disabled");
    await expect(page.locator('.stepper-buttons .button--outline')).not.toHaveAttribute("disabled");
    await page.getByLabel('Total size').click();
    await page.getByLabel('Total size').fill('19');
    await expect(page.locator('.stepper-buttons .button--outline')).not.toHaveAttribute("disabled");
    await expect(page.locator('.stepper-buttons .button--primary')).toHaveAttribute("disabled");
    await page.getByLabel('Total size').click();
    await page.getByLabel('Total size').fill('0.5');
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
