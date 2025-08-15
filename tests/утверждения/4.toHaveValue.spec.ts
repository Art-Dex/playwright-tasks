import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"
  await expect(page.getByLabel('Имя пользователя')).toHaveValue('Гость');
  await expect(page.getByLabel('Электронная почта')).toHaveValue('');
  await expect(page.getByLabel('Телефон')).toHaveValue('+7');
  await expect(page.getByLabel('Комментарии')).toHaveValue('');
  await expect(page.getByLabel('Страна')).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения
  const username = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const phone = page.getByLabel('Телефон');
  const comment = page.getByLabel('Комментарии');
  const language = page.getByLabel('Страна');

  await username.fill('Алексей');
  await email.fill('alex@example.com');
  await phone.fill('+7 (123) 456-78-90');
  await comment.fill('Тестовый комментарий');
  await language.selectOption('kz');

  await expect(username).toHaveValue('Алексей');
  await expect(email).toHaveValue('alex@example.com');
  await expect(phone).toHaveValue('+7 (123) 456-78-90');
  await expect(comment).toHaveValue('Тестовый комментарий');
  await expect(language).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"
  const username = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const phone = page.getByLabel('Телефон');
  const comment = page.getByLabel('Комментарии');
  const language = page.getByLabel('Страна');

  await username.fill('Петр');
  await email.fill('test@test.ru');
  await language.selectOption('by');

  await page.locator('#reset-btn').click();

  await expect(username).toHaveValue('Гость');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('+7');
  await expect(comment).toHaveValue('');
  await expect(language).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными
  const username = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const comment = page.getByLabel('Комментарии');

  await username.fill('Мария');
  await email.fill('maria@mail.ru');
  await comment.fill('Важный комментарий');

  await page.locator('#update-btn').click();

  const output = page.locator('#output');
  await expect(output).toContainText('Мария');
  await expect(output).toContainText('maria@mail.ru');
  await expect(output).toContainText('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым
  const username = page.getByLabel('Имя пользователя');
  const email = page.getByLabel('Электронная почта');
  const phone = page.getByLabel('Телефон');
  const comment = page.getByLabel('Комментарии');
  const language = page.getByLabel('Страна');

  await username.fill('');
  await phone.fill('');
  await language.selectOption('');

  await expect(username).toHaveValue('');
  await expect(email).toHaveValue('');
  await expect(phone).toHaveValue('');
  await expect(language).toHaveValue('');
});
