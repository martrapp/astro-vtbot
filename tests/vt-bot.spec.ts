import { test, expect } from '@playwright/test';

test.describe('Setup', () => {
	test('server running', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('body')).toHaveText('astro-vtbot test server');
	});
});

test.describe('Debug component', () => {
	test('shows up on both pages', async ({ page }) => {
		await page.goto('/debug/debug1/');
		await expect(page).toHaveTitle('Debug1');
		await expect(page.locator('#debugOutput')).not.toBeVisible();
		await page.locator('#debug2').click();
		await expect(page).toHaveTitle('Debug2');
		await expect(page.locator('#debugOutput')).toBeVisible();
	});
});
test.describe('ReplacementSwap', () => {
	test('keeps header and footer', async ({ page }) => {
		await page.goto('/repl/one/');
		await expect(page).toHaveTitle('Repl1');
		await expect(page.locator('header')).toHaveText('Header1');
		await expect(page.locator('footer')).toHaveText('Footer1');
		await page.locator('#two').click();
		await expect(page).toHaveTitle('Repl2');
		await expect(page.locator('header')).toHaveText('Header1');
		await expect(page.locator('footer')).toHaveText('Footer1');
	});
	test('replaces main', async ({ page }) => {
		await page.goto('/repl/one/');
		await expect(page).toHaveTitle('Repl1');
		await expect(page.locator('main')).toHaveText('Main1two');
		await page.locator('#two').click();
		await expect(page).toHaveTitle('Repl2');
		await expect(page.locator('main')).toHaveText('Main2three');
	});
	test('falls back to original swap', async ({ page }) => {
		await page.goto('/repl/two/');
		await expect(page).toHaveTitle('Repl2');
		await expect(page.locator('main')).toHaveText('Main2three');
		await page.locator('#three').click();
		await expect(page).toHaveTitle('Repl3');
		await expect(page.locator('header')).toHaveText('Header3');
		await expect(page.locator('main')).toHaveText('Main3');
		await expect(page.locator('footer')).toHaveText('Footer3');
	});
	test('can swap header with footer', async ({ page }) => {
		await page.goto('/repl/one/');
		await expect(page).toHaveTitle('Repl1');
		expect(await page.locator('header:above(footer)').count()).toBe(1);
		expect(await page.locator('footer:above(header)').count()).toBe(0);
		await page.locator('#four').click();
		await expect(page).toHaveTitle('Repl4');
		expect(await page.locator('header:above(footer)').count()).toBe(0);
		expect(await page.locator('footer:above(header)').count()).toBe(1);
	});
});
