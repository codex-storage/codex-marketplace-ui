import test, { expect } from "@playwright/test";
import { Bytes } from "../src/utils/bytes";
import { GB } from "../src/utils/constants";

test("create an availability", async ({ page }) => {
  await page.goto("/dashboard/availabilities");
  await page.waitForTimeout(500);
  await page.locator(".availability-edit button").first().click();
  await page.getByLabel("Total size").click();

  const value = Math.random() * 0.5 + 0.1;

  await page.getByLabel("Total size").fill(value.toFixed(1));
  await page.getByLabel("Duration").click();
  await page.getByLabel("Duration").fill("30");
  await page.getByLabel("Min price").click();
  await page.getByLabel("Min price").fill("5");
  await page.getByLabel("Total collateral").click();
  await page.getByLabel("Total collateral").fill("30");
  await page.getByLabel("Min price").fill("5");
  await page.getByLabel("Nickname").click();
  await page.getByLabel("Nickname").fill("test");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Confirm your new sale")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Success", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(
    page.getByText(Bytes.pretty(parseFloat(value.toFixed(1)) * GB)).first()
  ).toBeVisible();
});

test("availability navigation buttons", async ({ page }) => {
  await page.goto("/dashboard/availabilities");
  await page.waitForTimeout(500);
  await page.locator(".availability-edit button").first().click();
  await expect(page.locator(".stepper-number-done")).not.toBeVisible();
  await expect(page.locator(".step--active")).toBeVisible();
  await expect(
    page.locator("footer .button--outline").first()
  ).not.toHaveAttribute("disabled");
  await page.getByLabel("Total size").click();
  await page.getByLabel("Total size").fill("");
  await page.getByLabel("Duration").click();

  await expect(page.locator("footer .button--primary")).toHaveAttribute(
    "disabled",
    { timeout: 3000 }
  );

  await page.getByLabel("Total size").click();
  await page.getByLabel("Total size").fill("0.5");
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

test("create an availability with changing the duration to months", async ({
  page,
}) => {
  await page.goto("/dashboard/availabilities");
  await page.waitForTimeout(500);
  await page.locator(".availability-edit button").first().click();
  await page.getByLabel("Total size").click();

  await page.getByLabel("Total size").fill("0.1");
  await page.getByLabel("Duration").click();
  await page.getByLabel("Duration").fill("3");
  await page.getByRole("combobox").nth(1).selectOption("months");

  await page.getByLabel("Min price").click();
  await page.getByLabel("Min price").fill("5");
  await page.getByLabel("Total collateral").click();
  await page.getByLabel("Total collateral").fill("30");
  await page.getByLabel("Min price").fill("5");
  await page.getByLabel("Nickname").click();
  await page.getByLabel("Nickname").fill("test");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Confirm your new sale")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Success", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(page.getByText("3 months").first()).toBeVisible();
});

test("create an availability after checking max size and invalid input", async ({
  page,
}) => {
  await page.goto("/dashboard/availabilities");
  await page.waitForTimeout(500);
  await page.locator(".availability-edit button").first().click();
  await page.getByLabel("Total size").click();

  await page.getByLabel("Total size").fill("9999");
  await expect(page.getByLabel("Total size")).toHaveAttribute("aria-invalid");

  await page.getByText("Use max size").click();
  await expect(page.getByLabel("Total size")).not.toHaveAttribute(
    "aria-invalid"
  );

  const value = 0.2;
  await page.getByLabel("Total size").fill(value.toString());

  await page.getByLabel("Duration").click();
  await page.getByLabel("Duration").fill("30");
  await page.getByLabel("Min price").click();
  await page.getByLabel("Min price").fill("5");
  await page.getByLabel("Total collateral").click();
  await page.getByLabel("Total collateral").fill("30");
  await page.getByLabel("Min price").fill("5");
  await page.getByLabel("Nickname").click();
  await page.getByLabel("Nickname").fill("test");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Confirm your new sale")).toBeVisible();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Success", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Finish" }).click();
  await expect(
    page.getByText(Bytes.pretty(parseFloat(value.toFixed(1)) * GB)).first()
  ).toBeVisible();
});
