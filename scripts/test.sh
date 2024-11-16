#! /bin/sh


if [ "$GITHUB_ACTIONS" = "true" ]; then
	npx playwright install chromium
else
	diff -q components/swap-functions.js node_modules/astro/dist/transitions 2>&1 > /dev/null
	if [ $? -ne 0 ] ; then
		cp node_modules/astro/dist/transitions/swap-functions.js components
		echo "components/swap-functions.js updated"
	fi
fi
mkdir -p test/fixture/node_modules
(
	cd test/fixture/node_modules
	rm -rf astro-vtbot
	ln -sT ../../.. astro-vtbot
)
npx astro check
npx playwright test
npx publint
