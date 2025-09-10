# Karen Group — Coolify Deploy Kit (Fixed)

Bu sürüm, **“dosya bulunamadı / COPY failed”** hatalarını önlemek için güncellendi:

- **Paket yöneticisi otomatik tespit**: pnpm / yarn / npm
- **Prisma güvenli**: Projede `prisma/` yoksa bile build çalışır.
- **Entrypoint**: `DATABASE_URL` ve `prisma/schema.prisma` varsa migrate uygular.

## Kurulum (özet)
1) Bu dosyaları projenin **köküne** kopyala: `Dockerfile`, `.dockerignore`, `scripts/entrypoint.sh`  
2) `package.json` scriptleri:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start -p 3000"
  }
}
```
> Prisma kullanıyorsan `build` içine `prisma generate` ekleyebilirsin.

3) Coolify → Application ekle:  
   - Build Pack: **Dockerfile**  
   - Dockerfile Path: `Dockerfile`  
   - Port: **3000** (Healthcheck: `/`)  
   - Domain ekle → Auto SSL açık

4) Env değişkenleri:  
   - `NODE_ENV=production`  
   - `PORT=3000`  
   - (Prisma kullanıyorsan) `DATABASE_URL=postgresql://user:pass@host:5432/db`

## Yaygın hatalar & çözümler
- **`COPY failed: file not found`** → Dockerfile `scripts/entrypoint.sh`’ı bulamıyor.  
  → Çözüm: `scripts/entrypoint.sh` dosyası repo kökünde **scripts/** klasöründe olmalı.
- **`COPY --from=builder /app/prisma` hatası** → Bu sürümde önlendi (builder aşamasında boş prisma klasörü oluşturuluyor).
- **`pnpm: not found`** → Artık otomatik npm/yarn/pnpm tespiti var.
- **`Prisma schema not found`** → Entrypoint migrate adımı atlanır; bu hata değil.

İyi yayınlar! 🚀
