import { Tokens } from '@lib/util';
import fp from 'fastify-plugin';
import { type Class, Mediator, type Resolver } from 'mediatr-ts';
import { container } from 'tsyringe';

class TsyringeResolver implements Resolver {
  resolve<T>(type: Class<T>): T {
    return container.resolve(type);
  }
  add<T>(type: Class<T>): void {
    container.register(type, { useClass: type });
  }
}

export const mediatorPlugin = fp(async (fastify) => {
  container.register(Tokens.Logger, { useValue: fastify.log });
  container.register(Tokens.ConvexClient, { useValue: fastify.convex });

  const mediator = new Mediator({
    resolver: new TsyringeResolver(),
  });

  fastify.decorate('mediator', mediator);
});
