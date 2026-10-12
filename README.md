# Court Case Management System

A pnpm monorepo containing a React/Vite frontend and an Express/Mongoose API.

## Repository layout

- `frontend/` — React 19, Vite, Tailwind and client-side application.
- `backend/` — Express API, authentication, users, cases, hearings, documents and reports.
- `compose.yaml` — local/container deployment with MongoDB, API and Nginx frontend.

## Requirements

- Node.js 22 or newer
- pnpm 10 or newer (Corepack recommended)
- MongoDB 8 locally, or Docker for the full stack

## Local development

```bash
corepack enable
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Set `MONGO_URI`, `JWT_SECRET`, and `REFRESH_SECRET` in `backend/.env`. Generate separate secrets using `openssl rand -base64 48`. Use a MongoDB instance available at the configured URI. The frontend's Vite default API URL is `http://localhost:5000/api/v1` in development.

Run both applications:

```bash
pnpm dev
```

Or run them separately with `pnpm dev:api` and `pnpm dev:web`.

## Seed the first administrator

Admin creation is intentionally not part of API startup. This prevents every deployment from silently creating a known default account.

Set `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD` in `backend/.env`. Use a unique password of at least 12 characters. Then run:

```bash
pnpm seed:admin
```

The operation is idempotent: if the email already belongs to an administrator, it makes no changes. It refuses to promote a non-admin account. Never use sample credentials in production, and remove seed credentials from the environment after provisioning. The seed command only creates the administrator; it does not insert fictitious court records.

## Container deployment

1. Copy `backend/.env.example` to `backend/.env`.
2. Set unique production `JWT_SECRET` and `REFRESH_SECRET` values, the admin seed values, and `NODE_ENV=production`.
3. Review `CORS_ORIGINS` and `WEB_PORT` in your deployment environment. The bundled Compose setup serves the frontend on port 8080 by default.
4. Start the stack:

```bash
docker compose up --build -d
```

5. Seed the admin once:

```bash
docker compose run --rm --no-deps api node scripts/seed.js --admin-only
```

The API is reachable inside the Compose network, while only the frontend port is published to the host. MongoDB has a persistent Docker volume and is not published to the host. For real production, configure TLS at a reverse proxy/load balancer, backups and restore testing, monitoring, secret management, and a managed/private MongoDB deployment where appropriate.

## Health endpoints

- `GET /health/live` — process liveness.
- `GET /health/ready` — readiness, including MongoDB connection state.

## Production notes

- The API validates required secrets at startup, applies Helmet security headers, limits JSON request bodies, restricts credentialed CORS to configured origins, and applies an API rate limit.
- The server handles SIGINT/SIGTERM and closes MongoDB gracefully.
- The default hard-coded administrator bootstrap has been removed.
- Do not commit `.env` files. Rotate any credentials that were previously committed or shared.
- Before exposing this system to real court data, perform an application security review covering authorization on every resource, audit trails, backup/restore, retention, file upload validation/storage, and cookie settings. Production readiness infrastructure does not replace a domain-specific security review.
