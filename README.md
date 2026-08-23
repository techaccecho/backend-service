# Backend Service Monorepo

This repository contains the backend microservices and shared libraries for the platform. It is built using **pnpm workspaces** and **TypeScript Project References** to share code between reusable libraries and deployable microservices.

---

## Repository Structure

```text
backend-service/
├── apps/                     # Deployable microservices
│   ├── admin-service/        # Admin Portal & Step Definition CRUD management
│   ├── auth-service/         # Auth0 JWT verification & middleware
│   ├── blog-service/         # BlogNET post & comment management
│   ├── game-service/         # Reserved for non-ARG game telemetry & leaderboards
│   └── state-service/        # Sole central owner of ARG Rules Engine & player state
│       ├── config/
│       │   └── arg_steps_manifest.json   # Central 19-step ARG graph manifest
│       └── src/
│           └── modules/state/
│               ├── ArgRulesEngine.ts     # Pure DAG rules, lockout & payload engine
│               ├── ArgRulesEngine.test.ts # Vitest suite for rules engine
│               └── state.routes.ts       # /state-api/player/* HTTP endpoints
│
├── lib/                      # Shared workspace libraries
│   ├── data/                 # Convex DB integration
│   ├── domain/               # Domain models, schemas & shared business logic
│   ├── starter/              # Shared Fastify bootstrap & plugin loaders
│   └── util/                 # Shared utilities & error schemas
│
├── package.json              # Workspace scripts & dependencies
├── pnpm-workspace.yaml       # Workspace definition
├── tsconfig.json             # TypeScript project references root
└── tsconfig.base.json        # Base TypeScript compiler options
```

---

## Deployable Applications Overview

| Application | Port | Route Prefix | Description |
| :--- | :---: | :---: | :--- |
| **`state-service`** | `3004` | `/state-api` | **Central authority for ARG state management.** Evaluates DAG step prerequisites, passcode lockouts, soft-delete bypasses, and returns active projection payloads. |
| **`admin-service`** | `3001` | `/admin-api` | Admin CRUD operations for managing `StepDefinition` records, soft-deletes, dictionary items, and URL shortener maps. |
| **`blog-service`** | `3000` | `/blog-api` | Core BlogNET API serving posts, categories, comments, and replies. |
| **`auth-service`** | `3002` | `/auth-api` | Auth0 token parsing, user identity mapping, and role-based permissions. |
| **`game-service`** | `3003` | `/game-api` | Reserved for future non-ARG game mechanics (physics telemetry, high-score leaderboards). |

---

## State Service API Specification (`/state-api`)

`state-service` is the single source of truth for ARG progression across all clients (`flutter-apps/blog`, `puzzle-apps`, `project-echo-game`).

### Endpoints

- **`GET /state-api/player/state`**
  - **Query/Header**: `userId` (extracted from Auth0 Bearer token or `?userId=`)
  - **Description**: Computes sub-millisecond $O(1)$ projection payload containing active step, completed step IDs, next available unlocked steps, and step unlock payloads.

- **`POST /state-api/player/step/complete`**
  - **Body**: `{ "stepId": "step_01_blog", "customData": {} }`
  - **Description**: Marks a step completed, updates user state, clears linked lockout policies (e.g., completing `step_02_wordsearch` clears `LOCKED_OUT` status on `step_07_passcode`), and returns updated payload.

- **`POST /state-api/player/step/fail`**
  - **Body**: `{ "stepId": "step_07_passcode" }`
  - **Description**: Increments failure counter for a step. Enforces lockout policy upon reaching max attempts (6th failed attempt switches status to `LOCKED_OUT`).

---

## Prerequisites

Install the following:

- **Node.js** (v20+ LTS)
- **pnpm** (v10+)

```bash
npm install -g pnpm
```

---

## Installation

Clone the repository and install all workspace dependencies:

```bash
pnpm install
```

---

## Environment Variables

Each application contains its own `.env` configuration file (e.g., `apps/state-service/.env`).

Example configuration:

```env
CONVEX_DEPLOYMENT=<convex_deployment_id>
CONVEX_URL=https://<deployment>.convex.cloud

LOG_LEVEL=info
PORT=3004
NODE_ENV=dev

AUTH_DOMAIN=<auth0_domain>
AUTH_CLIENT_ID=<auth0_client_id>
AUTH_CLIENT_SECRET=<auth0_client_secret>
```

> **Note**: Never commit `.env` files or production credentials to git tracking.

---

## Development Commands

Run applications individually during local development:

```bash
pnpm dev:state
```

### Script Reference

| Service | Dev Command | Start Command |
| :--- | :--- | :--- |
| **State Service** | `pnpm dev:state` | `pnpm start:state` |
| **Admin Service** | `pnpm dev:admin` | `pnpm start:admin` |
| **Blog Service** | `pnpm dev:blog` | `pnpm start:blog` |
| **Auth Service** | `pnpm dev:auth` | `pnpm start:auth` |
| **Game Service** | `pnpm dev:game` | `pnpm start:game` |

During development:
- Workspace library dependencies (`@lib/domain`, `@lib/starter`, `@lib/util`) are automatically compiled before application startup.
- Monorepo changes are watched continuously using TypeScript Project References.

---

## Testing & Quality Assurance

Run Vitest unit tests across workspace microservices:

```bash
pnpm test
```

Run test suite specifically for `state-service`:

```bash
pnpm --filter state-service test
```

---

## Workspace Build Pipeline

Build all applications and libraries:

```bash
pnpm build
```

Build only shared libraries:

```bash
pnpm build:libs
```

Build only microservice applications:

```bash
pnpm build:apps
```

Clean build artifacts:

```bash
pnpm clean
```

Rebuild workspace from scratch:

```bash
pnpm clean:build
```

---

## Code Quality & Tooling

| Command | Description |
| :--- | :--- |
| `pnpm lint` | Run Biome linting and static analysis |
| `pnpm lint:fix` | Automatically resolve Biome linting issues |
| `pnpm format` | Format workspace code using Biome |
