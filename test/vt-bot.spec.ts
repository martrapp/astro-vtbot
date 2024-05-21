import { test, expect, Page } from '@playwright/test';

test.describe('Setup', () => {
	test('server running', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('body')).toHaveText('astro-vtbot test server');
	});
});

test.describe('BrakePad component', () => {
	test('delays for specified time', async ({ page }) => {
		let milliseconds = 0;
		page.on('console', (msg) => {
			milliseconds = parseInt(msg.text().split(':')[1], 10);
		});
		await page.goto('/brake/one/');
		await expect(page).toHaveTitle('Brake2');
		expect(milliseconds).toBeGreaterThan(300);
		expect(milliseconds).toBeLessThan(500);
	});
	test('default is 2s', async ({ page }) => {
		let milliseconds = 0;
		page.on('console', (msg) => {
			milliseconds = parseInt(msg.text().split(':')[1], 10);
		});
		await page.goto('/brake/two/');
		await expect(page).toHaveTitle('Brake1');
		expect(milliseconds).toBeGreaterThan(2000);
		expect(milliseconds).toBeLessThan(2500);
	});
});

test.describe('AutoNameSelected', () => {
	test('works as advertised', async ({ page }) => {
		let text = '';
		page.on('console', (msg) => msg.text().startsWith('test') && (text += msg.text().substring(4)));
		await page.goto('/name-selected/one/');
		await expect(page).toHaveTitle('Selected1');

		await page.locator('#click').click();
		await expect(page).toHaveTitle('Selected2');

		expect(text).toBe(
			' H1 two-0 H2 three-0 H3 vtbot-hx-2 H2 three-1 H3 vtbot-hx-4 A one-0 H2 three-2 A one-1'
		);
	});
});
test.describe('Debug component', () => {
	test('logs', async ({ page }) => {
		let messages = '';
		page.on('console', (msg) => msg.text().includes('vtbot-debug') && (messages += msg.text()));
		await page.goto('/debug/debug1/');
		await expect(page).toHaveTitle('Debug1');
		expect(messages).not.toBe('');
		messages = '';
		await page.locator('#debug2').click();
		await expect(page).toHaveTitle('Debug2');
		expect(messages).not.toBe('');
	});
	test('does not throw', async ({ page }) => {
		let error = '';
		page.on('pageerror', (err) => (error += err));
		await page.goto('/debug/debug1/');
		await expect(page).toHaveTitle('Debug1');
		await page.locator('#debug2').click();
		await expect(page).toHaveTitle('Debug2');
		await expect(error).toBeFalsy();
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
		await expect(page.locator('main')).toHaveText('Main2onethree');
	});
	test('falls back to original swap', async ({ page }) => {
		await page.goto('/repl/two/');
		await expect(page).toHaveTitle('Repl2');
		await expect(page.locator('main')).toHaveText('Main2onethree');
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
	test('can swap lang attribute', async ({ page }) => {
		await page.goto('/repl/one/');
		await expect(page).toHaveTitle('Repl1');
		expect(await page.locator('html').getAttribute('lang')).toBe('es');
		await page.locator('#two').click();
		await expect(page).toHaveTitle('Repl2');
		expect(await page.locator('html').getAttribute('lang')).toBe('de');
	});
	test('can persist html attributes', async ({ page }) => {
		await page.goto('/repl/one/');
		await expect(page).toHaveTitle('Repl1');
		await page.locator('html').evaluate((el, value) => el.setAttribute('theme', value), 'dark');
		await page.locator('html').evaluate((el, value) => el.setAttribute('dark', value), 'very');
		await page.locator('#two').click();
		await expect(page).toHaveTitle('Repl2');
		expect(await page.locator('html').getAttribute('theme')).toBe('dark');
		expect(await page.locator('html').getAttribute('dark')).toBe(null);
		await page.locator('html').evaluate((el, value) => el.setAttribute('theme', value), 'dark');
		await page.locator('html').evaluate((el, value) => el.setAttribute('dark', value), 'very');
		await page.locator('#one').click();
		await expect(page).toHaveTitle('Repl1');
		expect(await page.locator('html').getAttribute('theme')).toBe(null);
		expect(await page.locator('html').getAttribute('dark')).toBe('very');
	});

	test('can handle data-astro-transition-persist', async ({ page }) => {
		await page.goto('/repl/five/');
		await expect(page).toHaveTitle('Repl5');
		await page.locator('#six').click();
		await expect(page).toHaveTitle('Repl6');
		expect(await page.locator('main #persist').count()).toBe(1);
		expect(await page.locator('head meta[name="persist"]').getAttribute('content')).toBe('5');
	});
});

test.describe('Linter component', () => {
	let consoleOutput = '';
	const captureConsole = (page: Page) => {
		consoleOutput = '';
		page.on('console', (msg) => {
			const text = msg.text();
			consoleOutput +=
				text.startsWith('[astro]') || text.startsWith('[vite]')
					? ''
					: text.replace(/background-color:.*$/, '');
		});
	};
	test('finds nested transition:persit and data-vtbot-replace attributes', async ({ page }) => {
		captureConsole(page);
		await page.goto('/linter/one/');
		await expect(page).toHaveTitle('Linter1');
		await page.locator('#totwo').click();
		await expect(page).toHaveTitle('Linter2');
		expect(consoleOutput).toBe(
			`%c[vtbot-linter] nested HTML elements with [data-astro-transition-persist] in old DOM (/linter/one/) %o at %chtml > body > main > p%c is nested inside %o at %chtml > body > main JSHandle@node console.groupEnd%c[vtbot-linter] nested HTML elements with [data-vtbot-replace] in new DOM (/linter/two/) %o at %chtml > body > main > p%c is nested inside %o at %chtml > body > main JSHandle@node console.groupEnd`
		);
	});
	test('finds undefined and not unique transition:persit and data-vtbot-replace attributes', async ({
		page,
	}) => {
		captureConsole(page);
		await page.goto('/linter/three/');
		await expect(page).toHaveTitle('Linter3');
		await page.locator('#tofour').click();
		await expect(page).toHaveTitle('Linter4');
		expect(consoleOutput).toBe(
			`%c[vtbot-linter] duplicate data-astro-transition-persist=a in old DOM (/linter/three/) %o at %chtml > body > main > p%c and earlier %o at %chtml > body > main > h1 JSHandle@node console.groupEnd%c[vtbot-linter] looks like an implicit name: data-astro-transition-persist=astro-pzn23gpo-1 in new DOM (/linter/four/) %o at %chtml > body > main > p JSHandle@node console.groupEnd%c[vtbot-linter] no value given for [data-vtbot-replace] in new DOM (/linter/four/) %o at %chtml > body > main > h1 JSHandle@node console.groupEnd`
		);
	});
	test('finds non unique view-transition-names', async ({ page }) => {
		captureConsole(page);
		await page.goto('/linter/five/');
		await expect(page).toHaveTitle('Linter5');
		await page.locator('#tosix').click();
		await expect(page).toHaveTitle('Linter6');
		expect(consoleOutput).toBe(
			`Unexpected duplicate view-transition-name: a%c[vtbot-linter] view transition name \"a\" is not unique in old DOM (/linter/five/) %o at %chtml > body > main > h1 JSHandle@node %o at %chtml > body > main > p JSHandle@node console.groupEnd%c[vtbot-linter] view transition name \"b\" is not unique in new DOM (/linter/six/) %o at %chtml > body > main > a JSHandle@node %o at %chtml > body > main JSHandle@node %o at %chtml > body > main > p JSHandle@node console.groupEnd`
		);
	});
	test('detect lost view transition names and styles', async ({ page }) => {
		captureConsole(page);
		await page.goto('/linter/seven/');
		await expect(page).toHaveTitle('Linter7');
		await page.locator('#toeight').click();
		await expect(page).toHaveTitle('Linter8');
		expect(consoleOutput).toBe(
			`%c[vtbot-linter] no HTMLElement with view transition name \"olaf\" exists in new DOM (/linter/eight/). This means either that a transition name has been defined but not used, e.g. by setting transition:name on an Astro component instead of an HTML element; or the HTML element that used the transition name has been moved to another DOM in the meantime.console.groupEnd%c[vtbot-linter] scoped style id \"y2uoggpx\" is used but not defined in new DOM (/linter/eight/).  JSHandle@node%c[vtbot-linter] The style sheet might got optimized away or the HTML element might have lost its style sheet, e.g. when being copied from another DOM. console.groupEnd`
		);
	});
	test('detect illegal view-transition-names', async ({ page }) => {
		captureConsole(page);
		await page.goto('/linter/nine/');
		await expect(page).toHaveTitle('Linter9');
		await page.locator('#toten').click();
		await expect(page).toHaveTitle('Linter10');
		expect(consoleOutput).toBe(
			`%c[vtbot-linter] Illegal view-transition-name(s) in old DOM (/linter/nine/) %cMaybe it starts with a number, or is a reserved word, or it contains illegal characters? %cH^rst, 5bs%c in %o at %chtml > head > style:nth-of-type(2) %c-123abc%c in %o at %chtml > body > main > p console.groupEnd`
		);
	});
	test('detect non standard script types', async ({ page }) => {
		captureConsole(page);
		await page.goto('/linter/eleven/');
		await expect(page).toHaveTitle('Linter11');
		await page.locator('#totwelve').click();
		await expect(page).toHaveTitle('Linter12');
		expect(consoleOutput).toBe(
			'%c[vtbot-linter] suspicious script types in /linter/twelve/ JSHandle@nodeJSHandle@nodeconsole.groupEndstandard script type 2standard script type 1'
		);
	});
});
