import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

test.describe('Returning user via /entrar', () => {
  let email: string;
  const password = 'Senha12345!';

  test.beforeAll(async () => {
    email = `returning_${Date.now()}@example.com`;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
  });

  test('user com conta loga via /entrar e vai pra /onboarding (profile=null)', async ({ page }) => {
    await page.goto('/entrar');
    await page.fill('input[type=email]', email);
    await page.fill('input[type=password]', password);
    await page.getByRole('button', { name: /entrar/i }).click();

    // sem profile → onboarding (step nome, alreadyLoggedIn=true)
    await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    await expect(page.getByText(/como você quer ser chamada/i)).toBeVisible();
  });
});
