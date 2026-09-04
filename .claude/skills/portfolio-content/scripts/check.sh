#!/usr/bin/env bash
#
# Full verification after any content change. Stops at the first blocking failure.
#
#   lint contenu → eslint sur src/assets uniquement (la surface du skill)
#   validate     → donnees de contenu : liens casses, alt manquant, label de skill inconnu
#   sitemap      → regenere public/sitemap.xml a partir des slugs d'articles
#   build        → tsc -b && vite build
#
# Le lint global du depot est rapporte pour information mais ne bloque pas : il
# porte des erreurs preexistantes dans des composants sans rapport avec le contenu.
#
# Usage: check.sh [--fast]     (--fast saute le build de production)

set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"
cd "$ROOT"
LOG=$(mktemp)
trap 'rm -f "$LOG"' EXIT

FAST=0
[[ "${1:-}" == "--fast" ]] && FAST=1

run() {
  local title="$1"; shift
  echo "── $title"
  if ! "$@" >"$LOG" 2>&1; then
    echo "✗ echec : $title"
    tail -30 "$LOG"
    exit 1
  fi
  echo "  ok"
}

run "lint contenu"    npx eslint src/assets
run "validation data" npm run validate
run "sitemap"         npm run sitemap

# The deprecated aggregates must not gain new entries
if git diff --unified=0 -- src/assets/projects_images/index.ts src/assets/blog_images/index.ts 2>/dev/null \
   | grep -qE '^\+.*(projectsImages|projectsMedia)'; then
  echo "⚠ entrees ajoutees a projectsImages/projectsMedia, qui sont @deprecated"
fi

[[ $FAST -eq 0 ]] && run "build" npm run build

echo
echo "✓ Verifications bloquantes : OK"
npm run validate 2>&1 | grep -E "^✓" || true

# Informational only
if ! npm run lint >"$LOG" 2>&1; then
  echo "ℹ lint global du depot en echec (erreurs preexistantes hors contenu) :"
  grep -E "^\s+[0-9]+:[0-9]+\s+error" "$LOG" | sed 's/^/    /' | head -10
fi
