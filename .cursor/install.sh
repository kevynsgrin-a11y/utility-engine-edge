#!/usr/bin/env bash
# Idempotent Cloud Agent bootstrap for utility-engine-edge.
# Installs dependencies, provisions local-only dev vars, typechecks, and
# applies D1 migrations to the local Miniflare database used by `wrangler dev`.
set -euo pipefail

cd "$(dirname "$0")/.."

# 1. Install dependencies deterministically from the lockfile.
npm ci

# 2. Provision local dev vars for `wrangler dev` (Miniflare) if absent.
#    These are throwaway local-only values, NOT production secrets. Real
#    deployments set JWT_SECRET / STRIPE_WEBHOOK_SECRET via `wrangler secret`.
if [ ! -f .dev.vars ]; then
  printf 'JWT_SECRET=%s\nSTRIPE_WEBHOOK_SECRET=%s\n' \
    "$(openssl rand -hex 32)" "whsec_local_dev_$(openssl rand -hex 12)" > .dev.vars
fi

# 3. Typecheck the Worker source.
npm run build

# 4. Apply D1 migrations to the local database (creates .wrangler state).
#    CI=1 keeps wrangler non-interactive; --local targets Miniflare, so no
#    Cloudflare account or login is required.
CI=1 npx wrangler d1 migrations apply DB --local
