import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je choisis mon profil : organisateur d'action", async () => {
    await expect(page.getByText("Qui êtes-vous ?")).toBeVisible();
    await page.getByText("Organisateur d'action").click();
  });

  await test.step("J'arrive sur mon espace de parcours", async () => {
    await expect(page.getByText("Votre parcours")).toBeVisible();
  });

  await test.step("Je valide les étapes du parcours de don", async () => {
    await page.getByRole("button", { name: "Don unique" }).click();
    await expect(page.getByText("✓ Événement tracé : etape_don · choix_forme")).toBeVisible();
    await page.getByText("Valider cette étape").click();
    await expect(page.getByText("✓ Événement tracé : etape_don · financement")).toBeVisible();
    await page.getByText("Valider cette étape").click();
  });

  await test.step("J'arrive à l'action finale, avec son événement tracé", async () => {
    await expect(page.getByText("Merci pour votre engagement")).toBeVisible();
    await expect(page.getByText("✓ Événement tracé : conversion · don_finalise")).toBeVisible();
  });

  await test.step("Je crée mon espace personnel", async () => {
    await page.getByText("Créer mon espace personnel").click();
    await expect(page.getByText("Mon espace personnel")).toBeVisible();
  });

  await test.step("Je découvre les actions solidaires depuis mon espace", async () => {
    await page.getByText("Découvrir les actions solidaires").click();
    await expect(page.getByText("Actions solidaires")).toBeVisible();
    await page.getByText("Marathon de Lyon 2025").click();
    await expect(page.getByText("✓ Événement tracé : article_ouvert · action_solidaire")).toBeVisible();
  });
});
