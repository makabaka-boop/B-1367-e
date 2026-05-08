// @ts-check
// @ts-ignore
const { test, expect } = require('@playwright/test');

test.describe('Car Rental App - Authentication', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show login button when not logged in', async ({ page }) => {
    await expect(page.locator('.login-btn')).toBeVisible();
    await expect(page.locator('.user-profile')).not.toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login.html');
    
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('登录成功');
    await page.waitForURL('/index.html');
    
    await expect(page.locator('.user-profile')).toBeVisible();
    await expect(page.locator('.user-name')).toContainText('欢迎');
    await expect(page.locator('.login-btn')).not.toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login.html');
    
    await page.fill('#email', 'wronguser');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('账号或密码错误');
    await expect(page).toHaveURL(/.*login\.html/);
  });

  test('should show error when login fields are empty', async ({ page }) => {
    await page.goto('/login.html');
    
    await page.click('button[type="submit"]');

    await expect(page.locator('.toast')).toContainText('请填写所有必填项');
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/index.html');
    
    await page.click('.logout-link');
    
    await expect(page.locator('.toast')).toContainText('已安全退出');
    await page.waitForTimeout(1500);
    
    await expect(page.locator('.login-btn')).toBeVisible();
    await expect(page.locator('.user-profile')).not.toBeVisible();
  });
});

test.describe('Car Rental App - Search', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should search by car name', async ({ page }) => {
    await page.fill('#location', 'Tesla');
    await page.click('#search-btn');

    await page.waitForTimeout(500);
    const teslaCard = page.locator('.car-card').filter({ hasText: /Tesla/i });
    await expect(teslaCard).toBeVisible();

    const jeepCard = page.locator('.car-card').filter({ hasText: 'Jeep' });
    await expect(jeepCard).not.toBeVisible();
    
    await expect(page.locator('.toast')).toContainText('找到匹配车辆');
  });

  test('should search by car type sedan', async ({ page }) => {
    await page.selectOption('#type', 'sedan');
    await page.click('#search-btn');

    await page.waitForTimeout(500);
    await expect(page.locator('.toast')).toContainText('找到匹配车辆');
  });

  test('should search by car type SUV', async ({ page }) => {
    await page.selectOption('#type', 'suv');
    await page.click('#search-btn');

    await page.waitForTimeout(500);
    await expect(page.locator('.toast')).toContainText('找到匹配车辆');
  });

  test('should search by car type luxury', async ({ page }) => {
    await page.selectOption('#type', 'luxury');
    await page.click('#search-btn');

    await page.waitForTimeout(500);
    await expect(page.locator('.toast')).toContainText('找到匹配车辆');
  });

  test('should show no results message when no cars match', async ({ page }) => {
    await page.fill('#location', 'NonExistentCar12345');
    await page.click('#search-btn');
    
    await expect(page.locator('.no-results')).toBeVisible();
    await expect(page.locator('.no-results')).toContainText('未找到匹配车型');
    await expect(page.locator('.toast')).toContainText('未找到匹配车辆');
  });
});

test.describe('Car Rental App - Booking', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect to login when booking without authentication', async ({ page }) => {
    await page.locator('.rent-btn').first().click();
    
    const toast = page.locator('.toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('请先登录');
    
    await page.waitForTimeout(2000);
    await expect(page).toHaveURL(/.*login\.html/);
  });

  test('should allow booking when authenticated', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/index.html');

    await page.locator('.rent-btn').first().click();
    await expect(page.locator('.toast')).toContainText('预订成功');
    await expect(page.locator('.booked-badge')).toBeVisible();
  });

  test('should disable rent button after booking', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/index.html');

    const rentBtn = page.locator('.rent-btn').first();
    await rentBtn.click();
    
    await expect(page.locator('.booked-badge')).toBeVisible();
    await expect(rentBtn).toHaveText(/再次预订/);
  });
});

test.describe('Car Rental App - Pending Features', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should show pending feature message for nav links', async ({ page }) => {
    await page.locator('.nav-link').first().click();
    
    await expect(page.locator('.toast')).toBeVisible();
    await expect(page.locator('.toast')).toContainText('该功能正在开发中');
  });

  test('should show pending feature message for footer pending links', async ({ page }) => {
    await page.locator('.pending-feature').first().click();
    
    await expect(page.locator('.toast')).toBeVisible();
    await expect(page.locator('.toast')).toContainText('该功能正在开发中');
  });

  test('should show different pending message when logged in', async ({ page }) => {
    await page.goto('/login.html');
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/index.html');

    await page.locator('.pending-feature').first().click();
    
    await expect(page.locator('.toast')).toBeVisible();
    await expect(page.locator('.toast')).toContainText('尊敬的管理员');
  });
});

test.describe('Car Rental App - Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should have correct Chinese title', async ({ page }) => {
    await expect(page).toHaveTitle(/DriveGo/);
    await expect(page.locator('.hero-title')).toHaveText('寻找您的完美座驾');
  });

  test('should display navigation bar', async ({ page }) => {
    await expect(page.locator('.header')).toBeVisible();
    await expect(page.locator('text=寻找车辆')).toBeVisible();
  });

  test('should display car cards', async ({ page }) => {
    const carCards = page.locator('.car-card');
    await expect(carCards).toHaveCount(6);
  });
});
