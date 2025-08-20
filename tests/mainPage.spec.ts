import { test, expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  atribute?: {
    type: string;
    value: string;
  };
}
const elements: Array<Elements> = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright Logo',
    text: 'Playwright',
    atribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    atribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API', exact: true }),
    name: 'Api link',
    text: 'API',
    atribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    atribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub icon',
    atribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord icon',
    atribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch icon',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Command+K)' }),
    name: 'Search input',
  },
];

const lightMods: string[] = ['light', 'dark'];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
      'Playwright',
    );
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    elements.forEach(({ locator, name, atribute }) => {
      if (atribute) {
        test.step(`Проверка атрибутf href элемента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(atribute?.type, atribute?.value);
        });
      }
    });
  });

  test('Проверка переключения лайт мода', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'system');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'light');
    await page.getByRole('button', { name: 'Switch between dark and light' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme-choice', 'dark');
  });

  test('Проверка заголовка страницы', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toHaveText(
      'Playwright enables reliable end-to-end testing for modern web apps.',
    );
  });

  test('Проверка кнопки GET SARTED', async ({ page }) => {
    await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect
      .soft(page.getByRole('link', { name: 'Get started' }))
      .toHaveAttribute('href', '/docs/intro');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect.soft(page).toHaveURL('https://playwright.dev/docs/intro');
  });

  lightMods.forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);
      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
