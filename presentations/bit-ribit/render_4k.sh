#!/usr/bin/env bash
# Render all deck diagrams at 4K (3840x2160) from their SVG masters. SVG-first, no upscaling.
set -e
cd "$(dirname "$0")"
R=../../agents/presentation-studio-pro/infographics/render_svg.py
# target_png_name : source_svg   (heroes pull from showcase/)
map=(
 "cover:visuals/cover.svg"
 "intro:visuals/intro.svg"
 "matrix:visuals/matrix.svg"
 "sources:visuals/sources.svg"
 "fw1_tam_sam_som:visuals/fw1_tam_sam_som.svg"
 "fw2_competitors:visuals/fw2_competitors.svg"
 "fw3_porter:visuals/showcase/porter_b.svg"
 "fw4_vpc:visuals/fw4_vpc.svg"
 "fw5_smart_okr:visuals/showcase/okr_c.svg"
 "new1_dormant_yield:visuals/new1_dormant_yield.svg"
 "new2_trojan_horse:visuals/new2_trojan_horse.svg"
 "new3_value_engine:visuals/showcase/ve_a.svg"
)
for pair in "${map[@]}"; do
  name="${pair%%:*}"; svg="${pair#*:}"
  python3 "$R" "$svg" "visuals/$name.png" 3 >/dev/null 2>&1
  dim=$(sips -g pixelWidth -g pixelHeight "visuals/$name.png" 2>/dev/null | awk '/pixel/{printf "%s ",$2}')
  echo "4K  $name.png  <- $svg  [$dim]"
done
echo "all deck diagrams rendered @ 4K (3840x2160)"
