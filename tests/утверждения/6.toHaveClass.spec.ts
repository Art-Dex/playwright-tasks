import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohaveclass');
});

test('1. Проверка начальных классов элементов', async ({ page }) => {
  // Задание: Проверить начальные классы элементов
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  // 2. Проверить что box1 не имеет класса "error"
  // 3. Найти элемент box2 и проверить что он имеет класс "error"
  // 4. Найти элемент box3 и проверить что он имеет класс "hidden"
  const box1 = page.locator('#box1');
  const box2 = page.locator('#box2');
  const box3 = page.locator('#box3');

  await expect(box1).toHaveClass(/active/);
  await expect(box1).not.toHaveClass(/error/);
  await expect(box2).toHaveClass(/error/);
  await expect(box3).toHaveClass(/hidden/);
});

test('2. Проверка переключения классов box1', async ({ page }) => {
  // Задание: Проверить изменение классов при взаимодействии
  // 1. Найти элемент box1 и проверить что он имеет класс "active"
  // 2. Нажать кнопку "Переключить box1"
  // 3. Проверить что box1 теперь имеет класс "error"
  // 4. Проверить что box1 больше не имеет класса "active"
  // 5. Еще раз нажать кнопку
  // 6. Проверить что классы вернулись к исходным
  const box1 = page.locator('#box1');
  const buttonBox1 = page.locator('#toggle-box1');

  await expect(box1).toHaveClass(/active/);
  await buttonBox1.click();
  await expect(box1).toHaveClass(/error/);
  await expect(box1).not.toHaveClass(/active/);
  await buttonBox1.click();
  await expect(box1).not.toHaveClass(/error/);
  await expect(box1).toHaveClass(/active/);
});

test('3. Проверка показа/скрытия элемента', async ({ page }) => {
  // Задание: Проверить классы при скрытии/показе элемента
  // 1. Найти элемент box3 и проверить что он имеет класс "hidden"
  // 2. Нажать кнопку "Показать/скрыть box3"
  // 3. Проверить что box3 больше не имеет класса "hidden"
  // 4. Еще раз нажать кнопку
  // 5. Проверить что класс "hidden" снова присутствует
  const box3 = page.locator('#box3');
  const buttonBox3 = page.locator('#toggle-box3');

  await expect(box3).toHaveClass(/hidden/);
  await buttonBox3.click();
  await expect(box3).not.toHaveClass(/hidden/);
  await buttonBox3.click();
  await expect(box3).toHaveClass(/hidden/);
});

test('4. Проверка классов карточки пользователя', async ({ page }) => {
  // Задание: Проверить классы карточки пользователя
  // 1. Найти карточку пользователя и проверить что у нее нет класса "premium"
  // 2. Нажать кнопку "Перейти на Премиум"
  // 3. Проверить что карточка получила класс "premium"
  // 4. Нажать кнопку "Отметить как просроченный"
  // 5. Проверить что карточка имеет оба класса: "premium" и "expired"
  // 6. Проверить что классы содержатся в любом порядке
  const cardUser = page.locator('#user-card');
  const buttonGoToPrem = page.locator('#upgrade-user');
  const buttonOverdue = page.locator('#expire-user');

  await expect(cardUser).not.toHaveClass(/premium/);
  buttonGoToPrem.click();
  await expect(cardUser).toHaveClass(/premium/);
  buttonOverdue.click();
  await expect(cardUser).toHaveClass(/premium/);
  await expect(cardUser).toHaveClass(/expired/);
  await expect(cardUser).toHaveClass(/premium.*expired|expired.*premium/);
});

test('5. Проверка элемента с несколькими классами', async ({ page }) => {
  // Задание: Проверить элемент с множеством классов
  // 1. Найти элемент multi-class и проверить что он имеет все классы:
  //    "box", "warning", "large", "rounded" (в любом порядке)
  // 2. Нажать кнопку "Изменить классы"
  // 3. Проверить что класс "warning" заменен на "error"
  // 4. Проверить что класс "large" удален
  // 5. Проверить что класс "rounded" остался
  // 6. Проверить что элемент имеет класс "box" (основной класс)
  const multiClass = page.locator('#multi-class');
  const buttonUpdateClass = page.locator('#modify-classes');

  await expect(multiClass).toHaveClass(/box/);
  await expect(multiClass).toHaveClass(/warning/);
  await expect(multiClass).toHaveClass(/large/);
  await expect(multiClass).toHaveClass(/rounded/);

  await buttonUpdateClass.click();
  await expect(multiClass).toHaveClass(/error/);
  await expect(multiClass).not.toHaveClass(/warning/);
  await expect(multiClass).not.toHaveClass(/large/);
  await expect(multiClass).toHaveClass(/rounded/);
  await expect(multiClass).toHaveClass(/box/);
});
