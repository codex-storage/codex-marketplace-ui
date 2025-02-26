import test, { expect } from "@playwright/test";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { Times } from "../src/utils/times";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("create a storage request", async ({ page }) => {
  await page.goto("/dashboard");
  await page.locator("a").filter({ hasText: "Purchases" }).click();
  await page.getByRole("button", { name: "Storage Request" }).click();

  await page
    .locator("div")
    .getByTestId("upload")
    .setInputFiles([path.join(__dirname, "assets", "chatgpt.jpg")]);
  await expect(page.locator("#cid")).not.toBeEmpty();
  await expect(page.getByText("Success, the CID has been")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByText("Your request is being processed.")
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page.getByText("No data.")).not.toBeVisible();
  await expect(page.getByTestId("cell-pending").first()).toBeVisible();
});

test("select a uploaded cid when creating a storage request", async ({
  page,
}) => {
  await page.goto("/dashboard");
  await page
    .locator("div")
    .getByTestId("upload")
    .setInputFiles([path.join(__dirname, "assets", "chatgpt.jpg")]);
  await page.locator("a").filter({ hasText: "Purchases" }).click();
  await page.getByRole("button", { name: "Storage Request" }).click();
  await page.getByPlaceholder("CID").click();
  await page.locator(".dropdown ul li").nth(1).click();
  await expect(page.getByText("button[disabled]")).not.toBeVisible();
});

test("storage request navigation buttons", async ({ page }) => {
  await page.goto("/dashboard/purchases");
  await page.getByRole("button", { name: "Storage Request" }).click();
  await expect(page.locator(".step--done")).not.toBeVisible();
  await expect(page.locator(".step--active")).toBeVisible();
  await expect(page.locator("footer .button--primary")).toHaveAttribute(
    "disabled"
  );
  await expect(
    page.locator("footer .button--outline").first()
  ).not.toHaveAttribute("disabled");
  await page
    .locator("div")
    .getByTestId("upload")
    .setInputFiles([path.join(__dirname, "assets", "chatgpt.jpg")]);
  await expect(
    page.locator("footer .button--outline").first()
  ).not.toHaveAttribute("disabled");
  await expect(page.locator("footer .button--primary")).not.toHaveAttribute(
    "disabled"
  );
  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.locator("footer .button--outline").first()
  ).not.toHaveAttribute("disabled");
  await expect(page.locator("footer .button--primary")).not.toHaveAttribute(
    "disabled"
  );
  await expect(page.locator(".step--done")).toBeVisible();
  await expect(page.locator(".step--active")).toBeVisible();
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.locator(".step--done")).not.toBeVisible();
  await expect(page.locator(".step--active")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.locator(".step--done")).toHaveCount(2);
  await expect(page.locator(".step--active")).toBeVisible();
  await expect(page.locator("footer .button--outline").first()).toHaveAttribute(
    "disabled"
  );
  await expect(page.locator("footer .button--primary")).not.toHaveAttribute(
    "disabled"
  );
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page.locator(".modal--open")).not.toBeVisible();
});

test("remove the CID when the file is deleted", async ({ page }) => {
  await page.goto("/dashboard");
  await page.locator("a").filter({ hasText: "Purchases" }).click();
  await page.getByRole("button", { name: "Storage Request" }).click();
  await page
    .locator("div")
    .getByTestId("upload")
    .setInputFiles([path.join(__dirname, "assets", "chatgpt.jpg")]);
  await expect(page.locator("#cid")).not.toBeEmpty();
  await page.locator(".button-icon--small").nth(1).click();
  await expect(page.locator("#cid")).toBeEmpty();
});

test("create a storage request by using decimal values", async ({ page }) => {
  await page.goto("/dashboard");
  await page.locator("a").filter({ hasText: "Settings" }).click();
  await page.getByLabel("Address").fill("http://127.0.0.1:8080");
  await page.locator(".refresh").click();
  await page.locator("a").filter({ hasText: "Purchases" }).click();
  await page.getByRole("button", { name: "Storage Request" }).click();

  await page
    .locator("div")
    .getByTestId("upload")
    .setInputFiles([path.join(__dirname, "assets", "chatgpt.jpg")]);
  await expect(page.locator("#cid")).not.toBeEmpty();
  await expect(page.getByText("Success, the CID has been")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Full period of the contract").fill("10");
  await expect(page.locator("footer .button--primary")).toHaveAttribute(
    "disabled"
  );

  await page.getByLabel("Full period of the contract").fill("1");
  await expect(page.locator("footer .button--primary")).not.toHaveAttribute(
    "disabled"
  );

  await page.getByLabel("Full period of the contract").fill("0");
  await expect(page.locator("footer .button--primary")).toHaveAttribute(
    "disabled"
  );

  const days = 4;

  await page.getByLabel("Full period of the contract").fill(days.toFixed(1));
  await expect(page.locator("footer .button--primary")).not.toHaveAttribute(
    "disabled"
  );

  await page.getByRole("button", { name: "Next" }).click();
  await expect(
    page.getByText("Your request is being processed.")
  ).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page.getByText("No data.")).not.toBeVisible();

  const oneDay = 24 * 60 * 60;

  await expect(
    page.getByText(Times.pretty(days * oneDay)).first()
  ).toBeVisible();
});

// test('create a storage request by using months', async ({ page }) => {
//     await page.goto('/dashboard');
//     await page.locator('a').filter({ hasText: 'Purchases' }).click();
//     await page.getByRole('button', { name: 'Storage Request' }).click();

//     await page.locator('div').getByTestId("upload").setInputFiles([
//         path.join(__dirname, "assets", 'chatgpt.jpg'),
//     ]);
//     await expect(page.locator('#cid')).not.toBeEmpty()
//     await expect(page.getByText('Success, the CID has been')).toBeVisible();
//     await page.getByRole('button', { name: 'Next' }).click();

//     await page.getByLabel("Full period of the contract").fill("3")
//     await page.getByRole('combobox').selectOption('months');
//     await expect(page.getByLabel("Full period of the contract")).toHaveValue("3")

//     await page.getByRole('button', { name: 'Next' }).click();
//     await expect(page.getByText('Your request is being processed.')).toBeVisible();
//     await page.getByRole('button', { name: 'Finish' }).click();
//     await expect(page.getByText('No data.')).not.toBeVisible();
//     await expect(page.getByText("3 months").first()).toBeVisible();
// })
