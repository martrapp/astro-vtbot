#! /bin/sh

diff -q components/swap-functions.ts node_modules/astro/src/transitions 2>&1 > /dev/null
if [ $? -ne 0 ] ; then
	cp node_modules/astro/src/transitions/swap-functions.ts components
	echo "components/swap-functions.ts updated"
fi
exit
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
