import { test, expect, Locator, Page } from '@playwright/test';
import { MainPage } from '../models/MainPage';

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
    // await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openMainPage();
    await mainPage.checkElementsVisability();
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openMainPage();
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openMainPage();
    await mainPage.checkElementsHref();
  });

  test('Проверка переключения лайт мода', async ({ page }) => {
    const mainPage = new MainPage(page);

    await mainPage.openMainPage();
    await mainPage.checkDataThemeAtributeValue('system');
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAtributeValue('light');
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAtributeValue('dark');
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
