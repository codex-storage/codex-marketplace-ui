import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('upload one file', async ({ page }) => {
  await page.goto('/dashboard');
  await page.locator('div').getByTestId("upload").setInputFiles([
    path.join(__dirname, "assets", 'chatgpt.jpg'),
  ]);

  await expect(page.getByText('File uploaded successfully')).toBeVisible();
});

test('multiple files upload', async ({ page }) => {
  await page.goto('/dashboard');
  await page.locator('div').getByTestId("upload").setInputFiles([
    path.join(__dirname, "assets", 'chatgpt.jpg'),
    path.join(__dirname, "assets", 'mountain.jpeg'),
  ]);

  await expect(page.getByText('File uploaded successfully').first()).toBeVisible();
  await expect(page.getByText('File uploaded successfully').nth(1)).toBeVisible();


  await page.locator('.uploadFile-infoRight > .buttonIcon').first().click();
  await page.locator('.uploadFile-infoRight > .buttonIcon').click();

  await expect(page.getByText('File uploaded successfully').first()).not.toBeVisible();
  await expect(page.getByText('File uploaded successfully').nth(1)).not.toBeVisible();
});

test('drag and drop file', async ({ page }) => {
  await page.goto('/dashboard');

  const buffer = readFileSync(path.join(__dirname, "assets", 'chatgpt.jpg'));

  // Create the DataTransfer and File
  const dataTransfer = await page.evaluateHandle((data) => {
    const dt = new DataTransfer();
    // Convert the buffer to a hex array
    const file = new File([data.toString('hex')], 'chat.jpg', { type: 'image/jpg' });
    dt.items.add(file);
    return dt;
  }, buffer);

  await page.dispatchEvent('input[type="file"]', 'drop', { dataTransfer });

  await expect(page.getByText('File uploaded successfully').first()).toBeVisible();
});

// test('stop an upload display a message', async ({ page }) => {
//   await page.goto('/dashboard');

//   const buffer = Buffer.alloc(50_000_000);

//   await page.locator('div').getByTestId("upload").setInputFiles({
//     buffer,
//     name: "test.txt",
//     mimeType: 'text/plain'
//   });

//   await page.locator('.uploadFile-infoRight > .buttonIcon--small').click();

//   await expect(page.getByText('The upload has been cancelled')).toBeVisible();
// });