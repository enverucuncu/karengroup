#!/bin/sh
set -e

# Prisma migrations (safe if prisma isn't used)
if [ -n "$DATABASE_URL" ] && [ -d "/app/prisma" ] && [ -f "/app/prisma/schema.prisma" ]; then
  echo "Running Prisma migrate deploy..."
  npx prisma migrate deploy || echo "Warning: prisma migrate failed (continuing)"
else
  echo "Prisma not configured or DATABASE_URL missing. Skipping migrations."
fi

exec "$@"
