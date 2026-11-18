import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis qui je suis : Camille Dubreuil, organisatrice", async () => {
    await expect(page.getByText("Qui êtes-vous ?")).toBeVisible();
    await page.getByText("Camille Dubreuil").click();
  });

  await test.step("J'arrive sur mon espace de parcours", async () => {
    await expect(page.getByText("Bonjour Camille Dubreuil")).toBeVisible();
  });
});
