// @ts-check
// @ts-ignore
const { test, expect } = require('@playwright/test');

test.describe('Car Rental App', () => {

  // @ts-ignore
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  // @ts-ignore
  test('homepage has correct Chinese title', async ({ page }) => {
    await expect(page).toHaveTitle(/DriveGo/);
    await expect(page.locator('.hero-title')).toHaveText('寻找您的完美座驾');
  });

  // @ts-ignore
  test('navigation bar exists and links work', async ({ page }) => {
    await expect(page.locator('.header')).toBeVisible();
    await expect(page.locator('text=寻找车辆')).toBeVisible();
  });

  // @ts-ignore
  test('unauthenticated rent button redirects to login', async ({ page }) => {
    await page.waitForSelector('.rent-btn');
    await page.locator('.rent-btn').first().click();

    const toast = page.locator('.toast');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toContainText('请先登录');

    await page.waitForURL(/.*login\.html/, { timeout: 10000 });
  });

  // @ts-ignore
  test('login flow and authenticated state', async ({ page }) => {
    await page.goto('/login.html');

    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('登录成功');

    await page.waitForURL('/index.html');

    await expect(page.locator('.user-profile')).toBeVisible();
    await expect(page.locator('.user-name')).toContainText('欢迎');
    await expect(page.locator('.login-btn')).not.toBeVisible();

    await page.locator('.rent-btn').first().click();
    await expect(page.locator('.toast')).toContainText('预订成功');
    await expect(page.locator('.booked-badge')).toBeVisible();
  });

  // @ts-ignore
  test('search functionality', async ({ page }) => {
    await page.fill('#location', 'Tesla');
    await page.click('#search-btn');

    await page.waitForTimeout(500);
    const carName = page.locator('.car-name').filter({ hasText: /Tesla/i });
    await expect(carName).toBeVisible();

    const jeepCard = page.locator('.car-card').filter({ hasText: 'Jeep' });
    await expect(jeepCard).not.toBeVisible();

    await expect(page.locator('.toast')).toContainText('找到匹配车辆');
  });

  // @ts-ignore
  test('search no results', async ({ page }) => {
    await page.fill('#location', 'UFO Space Ship');
    await page.click('#search-btn');

    await expect(page.locator('.no-results')).toBeVisible();
    await expect(page.locator('.no-results')).toContainText('未找到匹配车型');
  });

  // @ts-ignore
  test('login with wrong credentials shows error', async ({ page }) => {
    await page.goto('/login.html');

    await page.fill('#email', 'wrong');
    await page.fill('#password', 'wrong');
    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('账号或密码错误');
    await expect(page).toHaveURL(/.*login\.html/);
  });

  // @ts-ignore
  test('logout clears session and updates header', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user_logged_in', JSON.stringify({ name: 'Admin User', avatar: 'assets/images/user.png', role: 'admin' }));
    });
    await page.goto('/');

    await expect(page.locator('.user-profile')).toBeVisible();

    await page.locator('.logout-link').click();

    await expect(page.locator('.toast')).toContainText('已安全退出');

    await page.waitForTimeout(1500);
    await expect(page.locator('.login-btn')).toBeVisible();
    await expect(page.locator('.user-profile')).not.toBeVisible();
  });

  // @ts-ignore
  test('pending feature shows toast for unauthenticated user', async ({ page }) => {
    await page.locator('.pending-feature').first().click();

    const toast = page.locator('.toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('该功能正在开发中');
  });

  // @ts-ignore
  test('pending feature shows admin toast for authenticated user', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user_logged_in', JSON.stringify({ name: 'Admin User', avatar: 'assets/images/user.png', role: 'admin' }));
    });
    await page.goto('/');

    await page.locator('.pending-feature').first().click();

    const toast = page.locator('.toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('该模块即将上线');
  });

  // @ts-ignore
  test('authenticated booking main flow: login, book, verify badge and disabled state', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/index.html');

    const firstRentBtn = page.locator('.rent-btn').first();
    await firstRentBtn.click();

    await expect(page.locator('.toast')).toContainText('预订成功');

    const firstCard = page.locator('.car-card').first();
    await expect(firstCard.locator('.booked-badge')).toHaveText('已预订');
    await expect(firstRentBtn).toBeDisabled();
    await expect(firstRentBtn).toHaveText('再次预订');
  });

  // @ts-ignore
  test('search by car type shows no results when no card matches type keyword', async ({ page }) => {
    await page.selectOption('#type', 'suv');
    await page.click('#search-btn');

    await page.waitForTimeout(500);

    await expect(page.locator('.no-results')).toBeVisible();
    await expect(page.locator('.toast')).toContainText('未找到匹配车辆');
  });

  // @ts-ignore
  test('nav links show pending feature toast', async ({ page }) => {
    await page.locator('.nav-link').first().click();
    await expect(page.locator('.toast')).toContainText('该功能正在开发中');
  });

  // @ts-ignore
  test('register link shows pending feature toast', async ({ page }) => {
    await page.goto('/login.html');
    await page.locator('.register').click();
    await expect(page.locator('.toast')).toContainText('该功能正在开发中');
  });
});
