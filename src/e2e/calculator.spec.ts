import { test, expect } from '@playwright/test';

test.describe('Calculatrice', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('Effectue une addition simple', async ({ page }) => {
    await page.getByText('1').click();
    await page.getByText('+').click();
    await page.getByText('2').click();
    await page.getByText('=').click();

    const screen = await page.locator('div').filter({ hasText: '3' }).first();
    await expect(screen).toBeVisible();
  });

  test('Historique est mis à jour', async ({ page }) => {
    await page.getByText('4').click();
    await page.getByText('×').click();
    await page.getByText('5').click();
    await page.getByText('=').click();

    const historyItem = await page.getByText('4 × 5 = 20');
    await expect(historyItem).toBeVisible();
  });

  test('Réinitialise l’écran et l’historique', async ({ page }) => {
    await page.getByText('C').click();
    const screen = await page.locator('div').filter({ hasText: '0' }).first();
    await expect(screen).toBeVisible();

    await page.getByText('🧹 Historique').click();
    const history = await page.locator('li');
    await expect(history).toHaveCount(0);
  });
});
