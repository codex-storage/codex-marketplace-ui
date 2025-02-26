import { test, expect } from "@playwright/test";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("download a file", async ({ page, browserName }) => {
  // https://github.com/microsoft/playwright/issues/13037
  test.skip(
    browserName.toLowerCase() !== "chromium",
    `Test only for chromium!`
  );

  await page.goto("/dashboard");
  await page
    .locator("div")
    .getByTestId("upload")
    .setInputFiles([path.join(__dirname, "assets", "chatgpt.jpg")]);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.locator(".file-cell button").first().click();
  const handle = await page.evaluateHandle(() =>
    navigator.clipboard.readText()
  );
  const cid = await handle.jsonValue();

  await page.locator(".download-input input").fill(cid);
  // const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent("download");
  await page.locator(".download-input + button").click();
  // const page1 = await page1Promise;
  const download = await downloadPromise;
  expect(await download.failure()).toBeNull();
});
