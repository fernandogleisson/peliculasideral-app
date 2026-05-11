import { test, expect } from '@playwright/test';

test.describe('Onboarding happy path (new user)', () => {
  test('cadastra novo user, preenche dados, chega em /eu', async ({ page }) => {
    const email = `e2e_${Date.now()}@example.com`;
    const password = 'Senha12345!';

    await page.goto('/onboarding');

    // step email
    await expect(page.getByText(/email/i)).toBeVisible();
    await page.fill('input[type=email]', email);
    await page.getByRole('button', { name: /continuar/i }).click();

    // step password
    await expect(page.getByText(/senha/i)).toBeVisible();
    await page.fill('input[type=password]', password);
    await page.getByRole('button', { name: /criar conta/i }).click();

    // step nome
    await page.fill('input[autocomplete=given-name]', 'E2E Test');
    await page.getByRole('button', { name: /continuar/i }).click();

    // step username
    await page.fill('input[pattern]', 'e2etest');
    await page.getByRole('button', { name: /continuar/i }).click();

    // step date
    await page.fill('input[type=date]', '1990-02-14');
    await page.getByRole('button', { name: /continuar/i }).click();

    // step time
    await page.fill('input[type=time]', '03:42');
    await page.getByRole('button', { name: /continuar/i }).click();

    // step city (default São Paulo, idx 0)
    await page.getByRole('button', { name: /continuar/i }).click();

    // step consent
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /concluir/i }).click();

    // animação → /eu
    await expect(page).toHaveURL(/\/eu/, { timeout: 15000 });
    await expect(page.getByText('E2E Test')).toBeVisible();
  });
});
