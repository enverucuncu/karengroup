#!/bin/sh
set -e
# run prisma migrations if DATABASE_URL is provided
if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrate deploy..."
  npx prisma migrate deploy || true
fi
exec "$@"
