#! /bin/sh


if [ "$GITHUB_ACTIONS" = "true" ]; then
	npx playwright install chromium
fi
mkdir -p test/fixture/node_modules
(
	cd test/fixture/node_modules
	rm -rf astro-vtbot
	ln -sT ../../.. astro-vtbot
)
npx astro check
npx playwright test
