# Test info

- Name: Calculatrice >> Réinitialise l’écran et l’historique
- Location: C:\Users\antoi\Documents\calculatrice\ma-calculatrice\src\e2e\calculator.spec.ts:28:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('C') resolved to 2 elements:
    1) <h2>🧮 Ma Calculatrice</h2> aka getByRole('heading', { name: '🧮 Ma Calculatrice' })
    2) <button>C</button> aka getByRole('button', { name: 'C' })

Call log:
  - waiting for getByText('C')

    at C:\Users\antoi\Documents\calculatrice\ma-calculatrice\src\e2e\calculator.spec.ts:29:31
```

# Page snapshot

```yaml
- heading "🧮 Ma Calculatrice" [level=2]
- text: "0"
- button "1"
- button "2"
- button "3"
- button "4"
- button "5"
- button "6"
- button "7"
- button "8"
- button "9"
- button "0"
- button "+"
- button "-"
- button "×"
- button "="
- button "C"
- button "🧹 Historique"
- heading "Historique" [level=3]
- list
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Calculatrice', () => {
   4 |   test.beforeEach(async ({ page }) => {
   5 |     await page.goto('http://localhost:5173');
   6 |   });
   7 |
   8 |   test('Effectue une addition simple', async ({ page }) => {
   9 |     await page.getByText('1').click();
  10 |     await page.getByText('+').click();
  11 |     await page.getByText('2').click();
  12 |     await page.getByText('=').click();
  13 |
  14 |     const screen = await page.locator('div').filter({ hasText: '3' }).first();
  15 |     await expect(screen).toBeVisible();
  16 |   });
  17 |
  18 |   test('Historique est mis à jour', async ({ page }) => {
  19 |     await page.getByText('4').click();
  20 |     await page.getByText('×').click();
  21 |     await page.getByText('5').click();
  22 |     await page.getByText('=').click();
  23 |
  24 |     const historyItem = await page.getByText('4 × 5 = 20');
  25 |     await expect(historyItem).toBeVisible();
  26 |   });
  27 |
  28 |   test('Réinitialise l’écran et l’historique', async ({ page }) => {
> 29 |     await page.getByText('C').click();
     |                               ^ Error: locator.click: Error: strict mode violation: getByText('C') resolved to 2 elements:
  30 |     const screen = await page.locator('div').filter({ hasText: '0' }).first();
  31 |     await expect(screen).toBeVisible();
  32 |
  33 |     await page.getByText('🧹 Historique').click();
  34 |     const history = await page.locator('li');
  35 |     await expect(history).toHaveCount(0);
  36 |   });
  37 | });
  38 |
```