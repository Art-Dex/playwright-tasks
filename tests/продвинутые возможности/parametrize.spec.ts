import { test, expect, Locator } from '@playwright/test';

// Тесты для формы входа
test.describe('Параметризованные тесты формы входа', () => {
  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  // Нужно реализовать параметризованный тест на основе массива loginTestCases
  // Шаги теста:
  // 1. Перейти на страницу формы входа
  // 2. Заполнить поле имени пользователя (если не пустое)
  // 3. Заполнить поле пароля
  // 4. Нажать кнопку "Войти"
  // 5. Проверить сообщение системы
  // 6. Проверить класс сообщения (success/error)
  loginTestCases.forEach(({ username, password, expected }) => {
    test(`Проверка авторизации под пользователем ${username || 'пусто'}`, async ({ page }) => {
      await test.step('Перейти на страницу формы входа', async () => {
        await page.goto('https://osstep.github.io/parametrize');
      });

      await test.step('Заполнить поле имени пользователя', async () => {
        if (username) {
          await page.locator('#username').fill(username);
        }
      });

      await test.step('Заполнить поле пароля', async () => {
        await page.locator('#password').fill(password);
      });

      await test.step('Нажать кнопку "Войти"', async () => {
        await page.locator('#login-btn').click();
      });

      await test.step('Проверка результата входа', async () => {
        const messageLocator: Locator = page.locator('#message');
        await expect(messageLocator).toBeVisible();
        await expect(messageLocator).toHaveText(expected);

        const expectedClass = expected === 'Успешный вход!' ? 'success' : 'error';
        await expect(messageLocator).toHaveAttribute('class', expectedClass);
        console.log(`!!!!!!!!!!!!${expectedClass}!!!!!!!!!!!!`);
      });
    });
  });
});

// Тесты для калькулятора
test.describe('Параметризованные тесты калькулятора', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];
  // Нужно реализовать параметризованный тест на основе массива calculatorTestCases
  // Шаги теста:
  // 1. Перейти на страницу калькулятора
  // 2. Ввести первое число
  // 3. Ввести второе число
  // 4. Нажать кнопку операции (сложение/умножение)
  // 5. Проверить результат вычисления
  calculatorTestCases.forEach(({ a, b, operation, expected }) => {
    test(`Проверка результата ${a} ${operation} ${b} = ${expected}`, async ({ page }) => {
      await test.step('Перейти на страницу калькулятора', async () => {
        await page.goto('https://osstep.github.io/parametrize');
      });

      await test.step('Ввести первое число', async () => {
        await page.locator('#num1').fill(a.toString());
      });

      await test.step('Ввести второе число', async () => {
        await page.locator('#num2').fill(b.toString());
      });

      await test.step(`Нажать кнопку операции ${operation}`, async () => {
        await page.locator(`#${operation}-btn`).click();
      });

      await test.step(`Проверить результат вычисления`, async () => {
        await expect(page.locator(`#result`)).toContainText(expected.toString());
      });
    });
  });
});
