#!/bin/bash
set -euo pipefail
export PATH="$HOME/.local/bin:$PATH"
cd "/mnt/c/WORK/The Rich Reporter/Competition Site"

# Clean empty scripts dir leftovers
rmdir scripts 2>/dev/null || true

git add -A
git status --short

git -c user.email="nigel@localhost" -c user.name="Nigel" commit -m "$(cat <<'EOF'
Ship membership, Stripe checkout, and live competition platform.

Add Auth signup/admin, contact, AMOE forms, legal pages, DB-backed marketplace, reservation expiry cron, Stripe Custom Elements + webhook, and realtime inventory hooks.
EOF
)"

git push -u origin HEAD

npx vercel deploy --yes --prod
