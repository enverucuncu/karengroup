# Hostinger VPS Dağıtım Rehberi

## 0) Sunucuyu hazırlayın
- Ubuntu 22.04 önerilir.
- Alan adını (aegistic.tr) sunucu IP'nize yönlendirin (A kaydı).

## 1) Gerekli yazılımlar
```bash
sudo bash deploy/hostinger/install_requirements.sh
```

## 2) Ortam değişkenleri
Aşağıdaki değişkenlerle `.env` dosyasını kök dizine ekleyin (opsiyonel; compose dosyaları varsayılan değerlerle de çalışır):
```
POSTGRES_DB=aegistic
POSTGRES_USER=aegistic
POSTGRES_PASSWORD=aegistic
```

## 3) Çalıştırma
### Nginx (HTTP, 80 port) ile:
```bash
sudo bash deploy/hostinger/deploy.sh up
```

### Otomatik TLS (Caddy) ile:
- `deploy/hostinger/Caddyfile` içindeki alan adı ve email'i düzenleyin.
```bash
sudo bash deploy/hostinger/deploy.sh up --tls
```

## 4) Veritabanı migrasyonları
```bash
sudo bash deploy/hostinger/deploy.sh migrate
```

## 5) Güncelleme
```bash
git pull  # ya da yeni zip’i sunucuya kopyalayın
sudo bash deploy/hostinger/deploy.sh up
```

> Not: Docker servisleri `restart: unless-stopped` ile kalıcıdır. Sunucu yeniden başlasa da servisler kendini ayağa kaldırır.
