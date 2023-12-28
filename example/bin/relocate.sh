#! /bin/sh

BASE="${1:-""}/"

echo "Relocating '/' to '${BASE}'"
find dist -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i \
-e "s^url(/_astro/^url(${BASE}_astro/^g" \
-e "s^\(\(href\|src\|srcset\)\)=\"/^\1=\"${BASE}^g" \
-e "s^content=\"/carousel/^content=\"${BASE}carousel/^g" \
-e "s^:/carousel/^:${BASE}carousel/^g" {} \; -print
