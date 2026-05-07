import { type Static, Type } from '@sinclair/typebox';
import type { FastifyPluginAsync } from 'fastify';
import type { Id } from '../../../convex/_generated/dataModel';
import { UsersService } from './users.service';

const ParamsSchema = Type.Object({
  id: Type.String({
    description: 'The Convex Unique ID for the user',
    pattern: '^[a-z0-9]{32}$', // Optional: Convex IDs are typically 32-char strings
  }),
});

const GetUsersQuerySchema = Type.Object({
  cursor: Type.Optional(Type.String()),
  limit: Type.Optional(Type.String()), // Queries usually come in as strings
});

type GetUsersQuery = Static<typeof GetUsersQuerySchema>;

type Params = Static<typeof ParamsSchema>;

const userRoutes: FastifyPluginAsync = async (fastify) => {
  const service = new UsersService(fastify.convex);

  fastify.get<{ Params: Params }>(
    '/:id',
    {
      schema: {
        params: ParamsSchema,
        response: {
          200: Type.Object({
            _id: Type.String(),
            email: Type.String(),
            role: Type.String(),
          }),
        },
      },
    },
    async (request, reply) => {
      const userId = request.params.id as Id<'users'>;

      try {
        const user = await service.findById(userId);
        return user;
      } catch (_err) {
        return reply.status(404).send({ error: 'User not found' });
      }
    },
  );

  fastify.get<{ Querystring: GetUsersQuery }>(
    '/',
    { schema: { querystring: GetUsersQuerySchema } },
    async (request) => {
      const { cursor, limit } = request.query;

      return await service.getUsers({
        numItems: parseInt(limit ?? '10', 10),
        cursor: cursor ?? null,
      });
    },
  );
};

export default userRoutes;
