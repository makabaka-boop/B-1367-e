// @ts-check
// @ts-ignore
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  // Use http://frontend:80 when running in Docker, 
  // fallback to localhost for local runs if env var not set.
  use: {
    // @ts-ignore
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
