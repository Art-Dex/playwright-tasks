import test, { expect, Locator, Page } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  atribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Array<Elements>;
  readonly switchLightModeIcon: Locator;
  readonly html: Locator;

  constructor(page: Page) {
    this.page = page;
    this.switchLightModeIcon = page.getByRole('button', { name: 'Switch between dark and light' });
    this.html = page.locator('html');
    this.elements = [
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
  }

  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }

  async checkElementsVisability() {
    for (const { locator, name } of this.elements) {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect(locator(this.page)).toBeVisible();
      });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        test.step(`Проверка названия элемента ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  async checkElementsHref() {
    for (const { locator, name, atribute } of this.elements) {
      if (atribute) {
        test.step(`Проверка атрибутf href элемента ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(atribute?.type, atribute?.value);
        });
      }
    }
  }

  async clickSwitchLightModeIcon() {
    await this.switchLightModeIcon.click();
  }

  async checkDataThemeAtributeValue(valueAtribute: string) {
    await expect(this.html).toHaveAttribute('data-theme-choice', valueAtribute);
  }

  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  async checkLayoutLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithLightMode.png`);
  }

  async checkLayoutDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithDackMode.png`);
  }
}
