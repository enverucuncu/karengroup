#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/opt/aegistic-next"
COMPOSE_FILE="deploy/hostinger/docker-compose.hostinger.yml"
TLS_COMPOSE_FILE="deploy/hostinger/caddy-compose.yml"

usage() {
  echo "Kullanım:"
  echo "  $(basename "$0") up [--tls]        # Servisleri ayağa kaldır"
  echo "  $(basename "$0") down               # Servisleri durdur"
  echo "  $(basename "$0") logs               # Logları izle"
  echo "  $(basename "$0") migrate            # Prisma migrate deploy çalıştır"
  exit 1
}

cd "$(dirname "$0")/../.."

if [ "${1:-}" = "up" ]; then
  if [ "${2:-}" = "--tls" ]; then
    echo "TLS (Caddy) ile başlatılıyor..."
    docker compose -f "$TLS_COMPOSE_FILE" up -d --build
  else
    echo "Nginx reverse proxy ile başlatılıyor..."
    docker compose -f "$COMPOSE_FILE" up -d --build
  fi
  exit 0
fi

if [ "${1:-}" = "down" ]; then
  docker compose -f "$COMPOSE_FILE" down || true
  docker compose -f "$TLS_COMPOSE_FILE" down || true
  exit 0
fi

if [ "${1:-}" = "logs" ]; then
  docker compose -f "$COMPOSE_FILE" logs -f || docker compose -f "$TLS_COMPOSE_FILE" logs -f
  exit 0
fi

if [ "${1:-}" = "migrate" ]; then
  echo "Prisma migrate deploy..."
  docker compose -f "$COMPOSE_FILE" exec -T web npx prisma migrate deploy || \
  docker compose -f "$TLS_COMPOSE_FILE" exec -T web npx prisma migrate deploy
  exit 0
fi

usage
