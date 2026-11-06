# ibbplus-api

Small Express + SQLite API behind the gala registration form on ibbplus.com.

## Endpoints

| Method | Path                           | Auth   | Purpose                              |
| ------ | ------------------------------ | ------ | ------------------------------------ |
| POST   | /api/gala/registrations        | none   | Submit a registration (rate limited) |
| POST   | /api/admin/login               | none   | Exchange the admin password for a token |
| GET    | /api/admin/registrations       | bearer | List registrations plus summary stats |
| GET    | /api/admin/registrations.csv   | bearer | CSV export (token may be a query param) |
| DELETE | /api/admin/registrations/:id   | bearer | Remove a registration                |
| GET    | /api/health                    | none   | Liveness check                       |

## Running locally

```
cd server
cp .env.example .env   # set ADMIN_PASSWORD and TOKEN_SECRET
npm install
npm run dev            # http://localhost:5091
```

The Vite dev server proxies `/api/gala`, `/api/admin` and `/api/health` to port 5091.

## Production (pth-web-srv-00)

- Code: `/var/www/lugano/ibbplus/server`, secrets in `server/.env` (mode 600, not in git).
- Database: `server/data/ibbplus.db` (SQLite, WAL mode). Back it up by copying the file.
- Service: `ibbplus-api.service` (systemd, runs as `lugano`, listens on 127.0.0.1:5091).
- nginx proxies `https://ibbplus.com/api/` to the service.

Redeploy after a push:

```
cd /var/www/lugano/ibbplus && git pull
cd server && npm ci --omit=dev && sudo systemctl restart ibbplus-api
cd .. && npm run build
```

Dashboard: https://ibbplus.com/admin (password is `ADMIN_PASSWORD` in `server/.env`).
