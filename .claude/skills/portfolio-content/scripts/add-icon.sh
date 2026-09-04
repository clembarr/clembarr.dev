#!/usr/bin/env bash
#
# Imports an icon or a logo into one of the GraphicAsset registries, converting
# raster sources to WebP, and prints the fragments to add to the folder's index.ts.
#
# Complements add-media.sh, which only covers content images (projects/blog).
#
# Usage:
#   add-icon.sh orga    <nom> <fichier>                  # un seul fichier, duplique sur les deux themes
#   add-icon.sh skills  <nom> <fichier_light> <fichier_dark>
#   add-icon.sh socials <nom> <fichier_light> <fichier_dark>
#
# Examples:
#   add-icon.sh orga   esiea  ~/Pictures/esiea-icon.png
#   add-icon.sh skills svelte ~/icons/svelte_light.svg ~/icons/svelte_dark.svg

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"

if [[ $# -lt 3 ]]; then
  sed -n '2,16p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
  exit 1
fi

TARGET="$1"; NAME="$2"; shift 2

case "$TARGET" in
  orga)    DEST="$ROOT/src/assets/orga_icons";    SUFFIX="logo"; THEMED=0 ;;
  skills)  DEST="$ROOT/src/assets/skills_icons";  SUFFIX="icon"; THEMED=1 ;;
  socials) DEST="$ROOT/src/assets/socials_icons"; SUFFIX="icon"; THEMED=1 ;;
  *) echo "✗ Cible inconnue \"$TARGET\" (attendu: orga | skills | socials)" >&2; exit 1 ;;
esac

if [[ ! "$NAME" =~ ^[a-z0-9]+(_[a-z0-9]+)*$ ]]; then
  echo "✗ Nom \"$NAME\" invalide : snake_case minuscule attendu (ex: nagoya_u)" >&2
  exit 1
fi

[[ $THEMED -eq 1 && $# -ne 2 ]] && { echo "✗ $TARGET attend deux fichiers : light puis dark" >&2; exit 1; }
[[ $THEMED -eq 0 && $# -ne 1 ]] && { echo "✗ $TARGET attend un seul fichier" >&2; exit 1; }

command -v magick >/dev/null || { echo "✗ ImageMagick (magick) introuvable" >&2; exit 1; }

# Converts one source file into the registry, returns the produced filename
place() {
  local source="$1" out_stem="$2"
  [[ -f "$source" ]] || { echo "✗ Fichier introuvable : $source" >&2; exit 1; }

  local ext="${source##*.}"
  local out
  case "${ext,,}" in
    svg)
      # Vectors stay vectors: converting them to WebP loses scalability
      out="$DEST/$out_stem.svg"; cp "$source" "$out" ;;
    png|jpg|jpeg|webp|gif)
      out="$DEST/$out_stem.webp"; magick "$source" -quality 82 "$out" ;;
    *) echo "✗ Extension non geree : .$ext" >&2; exit 1 ;;
  esac

  local before after
  before=$(stat -c%s "$source"); after=$(stat -c%s "$out")
  echo "→ $(basename "$out")  ($((before/1024)) Ko → $((after/1024)) Ko)" >&2
  basename "$out"
}

if [[ $THEMED -eq 1 ]]; then
  light_file=$(place "$1" "${NAME}_${SUFFIX}_light")
  dark_file=$(place "$2" "${NAME}_${SUFFIX}_dark")
  imports="import ${NAME}_light from \"./$light_file\";
import ${NAME}_dark from \"./$dark_file\";"
  light_ref="${NAME}_light"; dark_ref="${NAME}_dark"
  export_name="${NAME}_${SUFFIX}"
  aggregate="  3) ajouter \`$export_name\` a l'objet agrege en fin de fichier"
else
  logo_file=$(place "$1" "${NAME}_${SUFFIX}")
  imports="import ${NAME}_${SUFFIX} from \"./$logo_file\";"
  light_ref="${NAME}_${SUFFIX}"; dark_ref="${NAME}_${SUFFIX}"
  # PascalCase for organisation logos, per the repo convention (CGILogo, NagoyaULogo)
  export_name="$(printf '%s' "$NAME" | awk -F_ '{ for (i=1; i<=NF; i++) printf "%s%s", toupper(substr($i,1,1)), substr($i,2) }')Logo"
  aggregate="  (orga_icons n'a pas d'objet agrege : rien de plus a faire)"
fi

cat <<EOF

--- A AJOUTER dans $(realpath --relative-to="$ROOT" "$DEST")/index.ts ---

1) imports :
$imports

2) GraphicAsset :
export const $export_name: GraphicAsset = {
    label: "TODO: nom lisible",
    content: {
        'light': $light_ref,
        'dark': $dark_ref
    },
    alt: "TODO: nom lisible + Logo/Icon"
};

$aggregate

Rappels :
  - les deux cles 'light' et 'dark' sont obligatoires, meme en dupliquant la meme source
  - un visuel qui porte son propre fond fonctionne tel quel dans les deux themes
EOF
