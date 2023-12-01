import { test, expect } from '@playwright/test';

test.describe('Setup', () => {
	test('server running', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('body')).toHaveText('astro-vt-bot test server');
	});
});

test.describe('Debug component', () => {
	test('shows up', async ({ page }) => {
		await page.goto('/debug/debug1');
		await expect(page).toHaveTitle('Debug1');
		await expect(page.locator('#debugOutput')).not.toBeVisible();
		await page.locator('#debug2').click();
		await expect(page).toHaveTitle('Debug2');
		await expect(page.locator('#debugOutput')).toBeVisible();
	});
});
