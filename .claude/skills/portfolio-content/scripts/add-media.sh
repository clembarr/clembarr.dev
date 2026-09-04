#!/usr/bin/env bash
#
# Imports one or more media files into a content asset folder, converting raster
# images to WebP, and prints the two snippets to add to the folder's index.ts.
#
# The snippets are printed, not inserted: editing TypeScript with sed is fragile,
# so the agent applies them with a proper edit.
#
# Usage:
#   add-media.sh <projects|blog> <prefixe_projet> <fichier...>
#
# Example:
#   add-media.sh projects dummy_arrays ~/shots/Bench Graph.png
#     -> src/assets/projects_images/dummy_arrays_bench_graph.webp
#
# Naming, per the repo convention:
#   file   <prefixe_projet>_<sujet>.webp   (snake_case, lowercase)
#   import <même nom sans extension>       (snake_case)
#   export <camelCase du même nom>         (ProjectMedia)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"

if [[ $# -lt 3 ]]; then
  sed -n '2,20p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit 1
fi

TARGET="$1"; PREFIX="$2"; shift 2

case "$TARGET" in
  projects) DEST="$ROOT/src/assets/projects_images" ;;
  blog)     DEST="$ROOT/src/assets/blog_images" ;;
  *) echo "✗ Cible inconnue \"$TARGET\" (attendu: projects | blog)" >&2; exit 1 ;;
esac

# The prefix groups every media of a project; it must match the file convention
if [[ ! "$PREFIX" =~ ^[a-z0-9]+(_[a-z0-9]+)*$ ]]; then
  echo "✗ Prefixe \"$PREFIX\" invalide : snake_case minuscule attendu (ex: dummy_arrays)" >&2
  exit 1
fi

command -v magick >/dev/null || { echo "✗ ImageMagick (magick) introuvable" >&2; exit 1; }

imports=(); exports=()

for source in "$@"; do
  [[ -f "$source" ]] || { echo "✗ Fichier introuvable : $source" >&2; exit 1; }

  base=$(basename "$source")
  ext="${base##*.}"
  stem="${base%.*}"

  # Normalise the subject part: lowercase, non-alphanumerics become underscores
  subject=$(printf '%s' "$stem" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/_/g; s/^_//; s/_$//')
  # Avoid dummy_arrays_dummy_arrays_bench when the source is already prefixed
  subject="${subject#${PREFIX}_}"
  name="${PREFIX}_${subject}"

  case "${ext,,}" in
    svg|mp4|gif|webp)
      # Vector, video and already-optimised formats are copied as-is
      out="$DEST/$name.${ext,,}"
      cp "$source" "$out"
      echo "→ copie   $(basename "$out")"
      ;;
    png|jpg|jpeg|tif|tiff|bmp)
      out="$DEST/$name.webp"
      magick "$source" -quality 82 "$out"
      before=$(stat -c%s "$source"); after=$(stat -c%s "$out")
      echo "→ webp    $(basename "$out")  ($((before/1024)) Ko → $((after/1024)) Ko)"
      ;;
    *)
      echo "✗ Extension non geree : .$ext" >&2; exit 1 ;;
  esac

  file=$(basename "$out")
  # camelCase for the ProjectMedia export, per the repo convention
  camel=$(printf '%s' "$name" | awk -F_ '{ printf "%s", $1; for (i=2; i<=NF; i++) printf "%s%s", toupper(substr($i,1,1)), substr($i,2) }')

  imports+=("import $name from \"./$file\";")
  exports+=("export const $camel: ProjectMedia = {
    url: $name,
    type: MediaType.IMAGE,
    alt: \"TODO: decrire l'image pour les lecteurs d'ecran\"
}")
done

cat <<EOF

--- A AJOUTER dans $(realpath --relative-to="$ROOT" "$DEST")/index.ts ---

1) imports (haut du fichier) :
$(printf '%s\n' "${imports[@]}")

2) exports nommes :
$(printf '%s\n\n' "${exports[@]}")
Rappels :
  - remplir chaque "alt" (le validateur bloque sur un alt vide)
  - passer type: MediaType.VIDEO pour un .mp4
  - NE PAS ajouter aux objets projectsImages / projectsMedia : ils sont @deprecated
EOF
