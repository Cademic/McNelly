#!/usr/bin/env bash
#
# Generate web-optimized photo derivatives.
#
# Drop full-resolution originals into photos-src/ (git-ignored) using the
# filenames the site expects (see src/data/site.ts), then run:
#
#   ./scripts/optimize-photos.sh
#
# For every photos-src/<name>.{jpg,jpeg,png,heic} this writes:
#   public/photos/<name>.jpg   – 1800px wide, quality 82
#   public/photos/<name>.webp  – 1800px wide
#
# Pass a name (without extension) to rebuild just one:
#   ./scripts/optimize-photos.sh service-commercial
#
set -euo pipefail

SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)/photos-src"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/photos"
WIDTH=1800
JPG_QUALITY=82

mkdir -p "$OUT_DIR"

shopt -s nullglob nocaseglob
filter="${1:-}"
found=0

for src in "$SRC_DIR"/*.{jpg,jpeg,png,heic}; do
  [ -e "$src" ] || continue
  base="$(basename "$src")"
  name="${base%.*}"
  if [ -n "$filter" ] && [ "$name" != "$filter" ]; then
    continue
  fi
  found=1
  echo "→ $name"
  magick "$src" -auto-orient -resize "${WIDTH}x${WIDTH}>" -strip \
    -quality "$JPG_QUALITY" "$OUT_DIR/$name.jpg"
  magick "$src" -auto-orient -resize "${WIDTH}x${WIDTH}>" -strip \
    "$OUT_DIR/$name.webp"
done

if [ "$found" -eq 0 ]; then
  echo "No matching originals in $SRC_DIR" >&2
  exit 1
fi

echo "Done. Wrote derivatives to public/photos/"
