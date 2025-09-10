# AEGISTIC Web (Next.js 14 + Prisma + PostgreSQL)

## Kurulum
```bash
pnpm i
cp .env.example .env     # DATABASE_URL doldur
pnpm db:migrate          # şemayı oluştur
pnpm db:seed             # demo ürün/proje
pnpm dev                 # http://localhost:3000 → otomatik tr/en/ar/ru/fr yönlendirme
```

## Üretim
```bash
pnpm build
pnpm start
```

## Admin
- Ürün ekle: `/tr/admin/products/new`
- Proje ekle: `/tr/admin/projects/new`
(TR giriş → diğer diller otomatik; GOOGLE_TRANSLATE_API_KEY yoksa TR içeriği fallback edilir.)

## Notlar
- Renk/spacing/typografi, mevcut index.html ile eşleştirilmiştir (`app/globals.css`).
- `/public/logo.png` dosyasını kendi logonla değiştir.


## Docker ile Çalıştırma (geliştirme/üretim)
```bash
docker compose up -d --build
# İlk çalıştırmada Prisma migrate deploy otomatik çalışır (entrypoint)
# Ulaşım: http://localhost
```

## Nginx Reverse Proxy
- `deploy/nginx.conf` dosyasında upstream `web:3000`'e yönlendirir.
- TLS eklemek için `listen 443 ssl http2;` ve sertifika yollarını açın.

## GitHub Actions
- **CI**: `.github/workflows/ci.yml` → build + artifact.
- **Docker (GHCR)**: `.github/workflows/docker-ghcr.yml` → ghcr.io'ya image push.
- **SSH Deploy (opsiyonel)**: `.github/workflows/deploy-ssh.yml` → sunucuya rsync + docker compose up.
  - Gerekli Secrets: `SSH_PRIVATE_KEY`, `SSH_USER`, `SSH_HOST`, `DEPLOY_PATH`.
