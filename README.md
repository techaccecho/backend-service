# Backend Service Monorepo

This is the central backend services repository.

## Repository Structure

The project uses an monorepo structure that separates reusable logic-layer packages from deployable services.

```text
backend-service/
├── apps/               # Application microservices
│   ├── admin-service/
│   ├── auth-service/
│   ├── blog-service/   # Blog App integration
│   └── game-service/
├── lib/                # Reusable workspace packages
│   ├── data/           # Convex
│   ├── domain/         # Domain models and services
│   ├── starter/        # Sets up a basic fastify api with auth routes which can be extended
│   └── util/           # Shared utilities
├── package.json        # Root scripts and workspace registry
├── pnpm-workspace.yaml # Workspace package layout mapping
└── tsconfig.json       # Monorepo composite references mapping
```

## Prerequisites

Ensure the following global runtimes are installed:

* Node.js — LTS
* pnpm — Package manager

If pnpm is not installed, install it globally with npm:

```bash
npm install -g pnpm
```

## Getting Started

Follow these steps in sequence to configure your local development workspace.

### 1. Install Workspace Dependencies

From the repository root (`backend-service/`), install dependencies for all libraries and microservices:

```bash
pnpm install
```

### 2. Build Internal Libraries

Application services cross-reference internal configurations in `lib/*`, so run an initial compilation step:

```bash
pnpm build
```

This compiles the shared `data`, `util`, `domain`, and `starter` layers.

### 3. Configure Environment Variables

Application services require environment variables to communicate with Convex and Auth0.

Create a `.env` file inside the service folder you want to run. For example:

```text
apps/blog-service/.env
```

Add your development configuration:

```env
CONVEX_DEPLOYMENT=<replace_with_convex_deployment>
CONVEX_URL=<replace_with_convex_url>

LOG_LEVEL=info
PORT=3000
NODE_ENV=dev

API_KEY=<replace_with_api_key>

AUTH_DOMAIN=<replace_with_auth_domain>
AUTH_CLIENT_ID=<replace_with_auth_client_id>
AUTH_CLIENT_SECRET=<replace_with_auth_client_secret>
```

> **Security note:** Do not commit `.env` files or production credentials to repository

### 4. Run Services Locally

Run a specific service from the root workspace using the scripts defined in the root `package.json`.

| Feature Area  | Development Script | Target                           |
| ------------- | ------------------ | -------------------------------- |
| Blog Service  | `pnpm dev:blog`    | `http://localhost:3000/blog-api` |
| Auth Service  | `pnpm dev:auth`    | `http://localhost:3000/auth-api` |
| Admin Service | `pnpm dev:admin`   | `http://localhost:3000/admin-api`|
| Game Service  | `pnpm dev:game`    | `http://localhost:3000/game-api` |
