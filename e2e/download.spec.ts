import { test, expect } from '@playwright/test';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('download a file', async ({ page, browserName }) => {
    // https://github.com/microsoft/playwright/issues/13037
    test.skip(browserName.toLowerCase() !== 'chromium',
        `Test only for chromium!`);

    await page.goto('/dashboard');
    await page.locator('div').getByTestId("upload").setInputFiles([
        path.join(__dirname, "assets", 'chatgpt.jpg'),
    ]);
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.locator('.files-fileActions > button:nth-child(3)').first().click();
    await page.getByRole('button', { name: 'Copy CID' }).click();
    const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
    const cid = await handle.jsonValue()
    await page.locator('.sheets-container > .backdrop').click();
    await page.getByPlaceholder('CID').click();
    await page.getByPlaceholder('CID').fill(cid);
    // const page1Promise = page.waitForEvent('popup');
    const downloadPromise = page.waitForEvent('download');
    await page.locator('div').filter({ hasText: /^Download a fileDownload$/ }).getByRole('button').click();
    // const page1 = await page1Promise;
    const download = await downloadPromise;
    expect(await download.failure()).toBeNull()
});