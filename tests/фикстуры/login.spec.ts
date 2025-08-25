import { test as base, expect, Page } from '@playwright/test';

interface AuthFixtures {
  authPage: Page;
}

// Нужно реализовать фукстуру authPage
// Отркрыть страницу https://osstep.github.io/fixture_login
// Заполнить поле имя admin
// Заполнить поле пароль admin123
// Авторизоваться
export const test = base.extend<AuthFixtures>({
  authPage: async ({ page }, use) => {
    await page.goto('https://osstep.github.io/fixture_login');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin123');
    await page.locator('#login-btn').click();
    await use(page);
  },
});

test('Admin dashboard access', async ({ authPage }) => {
  await expect(authPage).toHaveURL(/dashboard/);
  await expect(authPage.locator('.welcome-message')).toContainText('Welcome, admin');
  await expect(authPage.locator('.admin-features')).toBeVisible();
});
