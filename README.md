# Backend Service Monorepo

This repository contains the backend services for the platform. It is built using **pnpm workspaces** and **TypeScript Project References** to share code between reusable libraries and deployable microservices.

---

## Repository Structure

```text
backend-service/
├── apps/                     # Deployable microservices
│   ├── admin-service/
│   ├── auth-service/
│   ├── blog-service/
│   └── game-service/
│
├── lib/                      # Shared workspace libraries
│   ├── data/                 # Convex integration
│   ├── domain/               # Domain models & business logic
│   ├── starter/              # Shared Fastify bootstrap
│   └── util/                 # Shared utilities
│
├── package.json              # Workspace scripts
├── pnpm-workspace.yaml
├── tsconfig.json             # TypeScript project references
└── tsconfig.base.json
```

---

## Prerequisites

Install the following:

- Node.js (LTS)
- pnpm

```bash
npm install -g pnpm
```

---

## Installation

Clone the repository and install all workspace dependencies.

```bash
pnpm install
```

---

## Environment Variables

Each application has its own `.env` file.

For example:

```text
apps/blog-service/.env
```

Example:

```env
CONVEX_DEPLOYMENT=<deployment>

CONVEX_URL=<url>

LOG_LEVEL=info
PORT=3000
NODE_ENV=dev

API_KEY=<api_key>

AUTH_DOMAIN=<domain>
AUTH_CLIENT_ID=<client_id>
AUTH_CLIENT_SECRET=<client_secret>
```

> Never commit `.env` files or production credentials.

---

## Development

Each service can be started independently.

```bash
pnpm dev:blog
```

Available commands:

| Service | Command |
| ---------- | --------- |
| Blog | `pnpm dev:blog` |
| Auth | `pnpm dev:auth` |
| Admin | `pnpm dev:admin` |
| Game | `pnpm dev:game` |

During development:

- Workspace library dependencies are automatically built before the service starts.
- Library changes are watched and rebuilt using TypeScript Project References.
- The service automatically restarts when compiled output changes.

---

## Building

Build the entire workspace:

```bash
pnpm build
```

Build only shared libraries:

```bash
pnpm build:libs
```

Build only applications:

```bash
pnpm build:apps
```

---

## Cleaning

Remove all build output:

```bash
pnpm clean
```

Rebuild everything from scratch:

```bash
pnpm clean:build
```

---

## Starting a Built Service

After building:

```bash
pnpm start:blog
```

Available commands:

| Service | Command |
| ---------- | --------- |
| Blog | `pnpm start:blog` |
| Auth | `pnpm start:auth` |
| Admin | `pnpm start:admin` |
| Game | `pnpm start:game` |

---

## Workspace Architecture

The repository uses:

- **pnpm Workspaces** for package management
- **TypeScript Project References** for incremental builds
- **Fastify** for HTTP services
- **Biome** for formatting and linting
- **Husky + lint-staged** for Git hooks
- **tsup** for bundling Vercel serverless entry points

Shared libraries are compiled once and referenced by all services, ensuring incremental builds and fast local development.

---

## Useful Commands

| Command | Description |
| ---------- | ------------- |
| `pnpm build` | Build all libraries and applications |
| `pnpm build:libs` | Build shared libraries only |
| `pnpm build:apps` | Build applications only |
| `pnpm clean` | Remove all build output |
| `pnpm clean:build` | Clean and rebuild everything |
| `pnpm lint` | Run Biome checks |
| `pnpm lint:fix` | Fix lint issues |
| `pnpm format` | Format the repository |
