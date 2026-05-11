import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

test.describe('Email collision em /onboarding', () => {
  let email: string;

  test.beforeAll(async () => {
    email = `collision_${Date.now()}@example.com`;
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);
    await supabase.auth.admin.createUser({
      email,
      password: 'Existing12345!',
      email_confirm: true,
    });
  });

  test('email já existente redireciona pra /entrar', async ({ page }) => {
    await page.goto('/onboarding');
    await page.fill('input[type=email]', email);
    await page.getByRole('button', { name: /continuar/i }).click();

    await expect(page).toHaveURL(/\/entrar/, { timeout: 10000 });
    await expect(page).toHaveURL(new RegExp(`email=${encodeURIComponent(email)}`));
    await expect(page.getByText(/achamos que você já tem conta/i)).toBeVisible();
  });
});
