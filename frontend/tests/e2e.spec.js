// @ts-check
// @ts-ignore
const { test, expect } = require('@playwright/test');

test.describe('Car Rental App', () => {
  
  // @ts-ignore
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear local storage to start fresh
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
    // Click the first rent button
    await page.locator('.rent-btn').first().click();
    
    // Check for toast message
    const toast = page.locator('.toast');
    await expect(toast).toBeVisible();
    await expect(toast).toContainText('请先登录');
    
    // Should stay on page briefly then redirect, but we can check if toast appears.
    // Waiting for redirection might be flaky if timing varies, checking URL after wait:
    await page.waitForTimeout(2000); 
    await expect(page).toHaveURL(/.*login\.html/);
  });

  // @ts-ignore
  test('login flow and authenticated state', async ({ page }) => {
    // Go to login
    await page.goto('/login.html');
    
    // Fill form
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin123');
    await page.click('button[type="submit"]');

    // Toast success
    await expect(page.locator('.toast')).toContainText('登录成功');
    
    // Wait for redirect
    await page.waitForURL('/index.html'); // or just '/' depending on server
    
    // Verify logged in state in Header
    await expect(page.locator('.user-profile')).toBeVisible();
    await expect(page.locator('.user-name')).toContainText('欢迎');
    await expect(page.locator('.login-btn')).not.toBeVisible();

    // Verify Rent Now behavior when logged in
    await page.locator('.rent-btn').first().click();
    await expect(page.locator('.toast')).toContainText('预订成功');
    await expect(page.locator('.booked-badge')).toBeVisible();
  });

  // @ts-ignore
  test('search functionality', async ({ page }) => {
    // Type a keyword that matches "Tesla"
    await page.fill('#location', 'Tesla'); 
    await page.click('#search-btn');

    // Should show Tesla card
    await page.waitForTimeout(500); // Wait for DOM update
    const carName = page.locator('.car-name').filter({ hasText: /Tesla/i });
    await expect(carName).toBeVisible();

    // Should hide others (e.g., Jeep)
    const jeepCard = page.locator('.car-card').filter({ hasText: 'Jeep' });
    await expect(jeepCard).not.toBeVisible();
    
    // Toast should appear
    await expect(page.locator('.toast')).toContainText('找到匹配车辆');
  });

  // @ts-ignore
  test('search no results', async ({ page }) => {
    await page.fill('#location', 'UFO Space Ship');
    await page.click('#search-btn');
    
    await expect(page.locator('.no-results')).toBeVisible();
    await expect(page.locator('.no-results')).toContainText('未找到匹配车型');
  });

});
