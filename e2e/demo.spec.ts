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

  await test.step("Je valide les étapes du parcours de don", async () => {
    await page.getByText("Valider cette étape").click();
    await expect(page.getByText("✓ Événement tracé : etape_don · choix_forme")).toBeVisible();
    await page.getByText("Valider cette étape").click();
    await expect(page.getByText("✓ Événement tracé : etape_don · financement")).toBeVisible();
    await page.getByText("Valider cette étape").click();
  });

  await test.step("J'arrive à l'action finale, avec son événement tracé", async () => {
    await expect(page.getByText("Merci pour votre engagement")).toBeVisible();
    await expect(
      page.getByText("✓ Événement tracé : conversion · don_finalise")
    ).toBeVisible();
  });
});
