import { test } from '../fixtures/mainPage';

test.describe('Тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsVisability();
  });

  test('Проверка названия элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsHref();
  });

  test('Проверка переключения лайт мода', async ({ mainPage }) => {
    await test.step('Проверка значения атрибута лайт мода - system', async () => {
      await mainPage.checkDataThemeAtributeValue('system');
    });
    await test.step('Нажатие на иконку лайт мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Проверка значения атрибута лайт мода - light', async () => {
      await mainPage.checkDataThemeAtributeValue('light');
    });
    await test.step('Нажатие на иконку лайт мода', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Проверка значения атрибута лайт мода - dark', async () => {
      await mainPage.checkDataThemeAtributeValue('dark');
    });
  });

  test(`Проверка стилей активного light мода`, async ({ mainPage }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutLightMode();
    });
  });

  test(`Проверка стилей активного dark мода`, async ({ mainPage }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной темной темой', async () => {
      await mainPage.checkLayoutDarkMode();
    });
  });
});
