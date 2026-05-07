import fp from 'fastify-plugin';
import { type Class, Mediator, type Resolver } from 'mediatr-ts';
import { container } from 'tsyringe';
import { TOKENS } from '../tokens';

class TsyringeResolver implements Resolver {
  resolve<T>(type: Class<T>): T {
    return container.resolve(type);
  }
  add<T>(type: Class<T>): void {
    container.register(type, { useClass: type });
  }
}

export const mediatorPlugin = fp(async (fastify) => {
  container.register(TOKENS.Logger, { useValue: fastify.log });
  container.register(TOKENS.ConvexClient, { useValue: fastify.convex });

  const mediator = new Mediator({
    resolver: new TsyringeResolver(),
  });

  fastify.decorate('mediator', mediator);
});

declare module 'fastify' {
  interface FastifyInstance {
    mediator: Mediator;
  }
}
