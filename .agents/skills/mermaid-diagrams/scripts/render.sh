#!/usr/bin/env bash
# Render Mermaid .mmd → SVG/PNG/PDF using local mmdc + system Chrome.
# Usage:
#   render.sh <input.mmd> <output.ext> [theme]
#   render.sh --all <src_dir> <out_dir> [theme]      # batch → .svg + .png each
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MMDC="$SKILL_DIR/renderer/node_modules/.bin/mmdc"
PCFG="$SKILL_DIR/renderer/puppeteer.json"
THEME_DEFAULT="default"

[ -x "$MMDC" ] || { echo "ERROR: mmdc not installed at $MMDC. Run: cd $SKILL_DIR/renderer && npm install"; exit 1; }

render_one() {
  local in="$1" out="$2" theme="${3:-$THEME_DEFAULT}"
  "$MMDC" -i "$in" -o "$out" -t "$theme" -b transparent -p "$PCFG" -s 2 --quiet
  echo "[ok] $in -> $out"
}

if [ "${1:-}" = "--all" ]; then
  src="$2"; dst="$3"; theme="${4:-$THEME_DEFAULT}"
  mkdir -p "$dst"
  for f in "$src"/*.mmd; do
    [ -e "$f" ] || { echo "no .mmd in $src"; exit 1; }
    base="$(basename "${f%.mmd}")"
    render_one "$f" "$dst/$base.svg" "$theme"
    render_one "$f" "$dst/$base.png" "$theme"
  done
else
  render_one "$1" "$2" "${3:-$THEME_DEFAULT}"
fi
