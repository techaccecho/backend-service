# backend-service
The backend for frontend service

mkdir fastify-api && cd fastify-api
    pnpm init
    pnpm add fastify
    pnpm add -D typescript @types/node ts-node tap pnpm-sync
    ```
  
  
    Initialize your `tsconfig.json`. Fastify works best with `ESNext` targets to support modern features like Top-Level Await.
    ```bash
    pnpm exec tsc --init
    ```
    Ensure these settings are in your `tsconfig.json`:
    ```json
    {
      "compilerOptions": {
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "node",
        "outDir": "./dist",
        "esModuleInterop": true,
        "strict": true
      }
    }
    ```
  
  
    Fastify’s types are baked-in, so you don't need a separate `@types/fastify` package.
    ```typescript
    import Fastify from 'fastify'

    const fastify = Fastify({ logger: true })

    fastify.get('/', async (request, reply) => {
      return { hello: 'world' }
    })

    const start = async () => {
      try {
        await fastify.listen({ port: 3000 })
      } catch (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    }
    start()
    ```
  
  
    Update your scripts to handle development and production builds.
    ```json
    "scripts": {
      "dev": "ts-node src/index.ts",
      "build": "tsc",
      "start": "node dist/index.js"
    }
  }
    ```