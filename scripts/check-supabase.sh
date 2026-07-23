#!/bin/bash
set -e
export PATH="$HOME/.local/bin:$PATH"
SITE="/mnt/c/WORK/The Rich Reporter/Competition Site"
cd "$SITE"
echo "=== env files ==="
ls -la .env* 2>&1 || true
echo "=== supabase cli ==="
command -v supabase || true
npx supabase --version 2>&1 | head -3 || true
echo "=== search env locals ==="
find /home/nigsib/projects -name ".env.local" 2>/dev/null | head -30 || true
find /mnt/c/WORK -name ".env.local" 2>/dev/null | head -30 || true
echo "=== gh auth ==="
gh auth status 2>&1 | head -10 || true
