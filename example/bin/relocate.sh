#! /bin/sh

BASE=${1:-"/"}
find dist -type f -name '*.html' -exec sed -i -e "s^\(\(href\|src\|srcset\)\)=\"/^\1=\"${BASE}^g" -e "s^content=\"/carousel/^content=\"${BASE}carousel/^g" -e "s^:/carousel/^:${BASE}carousel/^g" {} \; -print
