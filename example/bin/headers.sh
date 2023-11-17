#!/bin/bash
find  dist/ -name '*.*' -exec ls -l {} \;| \
awk '{sub("index.html","",$9); print substr($9,5) "@  x-uncompressed-content-length:",$5"@"}'| \
tr '@' '\n' > dist/_headers
