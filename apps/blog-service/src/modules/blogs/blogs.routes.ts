import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from 'tsyringe';
import { AppErrorSchema, QuerySchema, assertRequired, AsyncValidation } from '@lib/util';
import { Type } from '@sinclair/typebox';
import {
    PaginatedBlogDataSchema, BlogDataSchema,
    GetBlogParamsSchema, GetBlogQuery, GetBlogsQuery,
    GetBlogsByTypeQuery,
    CreateBlogCommand,
    CreateBlogSchema,
    CreateViewerCommand,
    CreateViewerParamsSchema,
    CreateViewerSchema,
    CreateReactionCommand,
    CreateReactionParamsSchema,
    CreateReactionSchema,
    CreateTagCommand,
    CreateTagParamsSchema,
    CreateTagSchema,
    CreateParticipantCommand,
    CreateParticipantParamsSchema,
    CreateParticipantSchema,
    DeleteBlogCommand,
    DeleteBlogParamsSchema,
    DeleteReactionCommand,
    DeleteReactionParamsSchema,
    DeleteTagCommand,
    DeleteTagParamsSchema,
    DeleteParticipantCommand,
    DeleteParticipantParamsSchema,
    UpdateBlogCommand,
    UpdateBlogParamsSchema,
    UpdateBlogSchema,
    UpdateReactionCommand,
    UpdateReactionParamsSchema,
    UpdateReactionSchema,
    UpdateTagCommand,
    UpdateTagParamsSchema,
    UpdateTagSchema
  } from '@lib/domain';
import {
  verifyCreateBlogHook,
  verifyCreateViewerHook,
  verifyCreateReactionHook,
  verifyCreateTagHook,
  verifyCreateParticipantHook,
  verifyUpdateBlogHook,
  verifyDeleteBlogHook,
  verifyUpdateReactionHook,
  verifyDeleteReactionHook,
  verifyUpdateTagHook,
  verifyDeleteTagHook,
  verifyDeleteParticipantHook
} from './hooks/index.js';

export const blogsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    const validation = container.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;

  fastify.post(
    '/blogs',
    {
      schema: {
        description: 'Create a blog',
        tags: ['Blogs'],
        body: CreateBlogSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateBlogHook(convex)],
    },
    async (request, reply) => {
      const { body, userRequest } = request;
      assertRequired('userRequest', userRequest);
      const command = new CreateBlogCommand({create: body, user: userRequest});
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.get(
    '/blogs/:blogId',
    {
      schema: {
        description: 'Get a blog',
        tags: ['Blogs'],
        params: GetBlogParamsSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [],
    },
    async (request, reply) => {
      const { params } = request;
      const query = new GetBlogQuery({params});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.get(
    '/blogs',
    {
      schema: {
        description: 'Get blogs',
        tags: ['Blogs'],
        querystring: QuerySchema,
        response: {
          200: PaginatedBlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [],
    },
    async (request, reply) => {
      const query = new GetBlogsQuery({query: request.query});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.patch(
    '/blogs/:blogId',
    {
      schema: {
        description: 'Update a blog',
        tags: ['Blogs'],
        params: UpdateBlogParamsSchema,
        body: UpdateBlogSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyUpdateBlogHook(convex, validation)],
    },
    async (request, reply) => {
      const { params, body, blog } = request;

      assertRequired('blog', blog);
      const command = new UpdateBlogCommand({params, update: body, existing: blog});
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/blogs/:blogId',
    {
      schema: {
        description: 'Delete a blog',
        tags: ['Blogs'],
        params: DeleteBlogParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteBlogHook(convex)],
    },
    async (request, reply) => {
      const { params, blog } = request;
      assertRequired('blog', blog);

      const command = new DeleteBlogCommand({params, existing: blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  fastify.get(
    '/posts',
    {
      schema: {
        description: 'Get posts',
        tags: ['Posts'],
        querystring: QuerySchema,
        response: {
          200: PaginatedBlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [],
    },
    async (request, reply) => {
      const query = new GetBlogsByTypeQuery({query: request.query, type: 'post'});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.get(
    '/threads',
    {
      schema: {
        description: 'Get threads',
        tags: ['Threads'],
        querystring: QuerySchema,
        response: {
          200: PaginatedBlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [],
    },
    async (request, reply) => {
      const query = new GetBlogsByTypeQuery({query: request.query, type: 'thread'});
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.post(
      '/blogs/:blogId/viewers',
      {
        schema: {
          description: 'Create a viewer',
          tags: ['Blogs', 'Viewers'],
          params: CreateViewerParamsSchema,
          body: CreateViewerSchema,
          response: {
            201: BlogDataSchema,
            400: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyCreateViewerHook(convex)],
      },
      async (request, reply) => {
        const { params, body, blog, userRequest } = request;
  
        assertRequired('blog', blog);
        assertRequired('userRequest', userRequest);
  
        const command = new CreateViewerCommand({params, create: body, existing: blog, user: userRequest });
        const response = await mediator.send(command);
        return reply.status(201).send(response);
      },
    );

    fastify.post(
      '/blogs/:blogId/reactions',
      {
        schema: {
          description: 'Create a reaction',
          tags: ['Blogs', 'Reactions'],
          params: CreateReactionParamsSchema,
          body: CreateReactionSchema,
          response: {
            201: BlogDataSchema,
            400: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyCreateReactionHook(convex)],
      },
      async (request, reply) => {
        const { params, body, blog, userRequest } = request;
  
        assertRequired('blog', blog);
        assertRequired('userRequest', userRequest);
  
        const command = new CreateReactionCommand({params, create: body, existing: blog, user: userRequest});
        const response = await mediator.send(command);
        return reply.status(201).send(response);
      },
    );
  
    fastify.patch(
      '/blogs/:blogId/reactions/:reactionId',
      {
        schema: {
          description: 'Update reaction',
          tags: ['Blogs', 'Reactions'],
          params: UpdateReactionParamsSchema,
          body: UpdateReactionSchema,
          response: {
            200: BlogDataSchema,
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyUpdateReactionHook(convex, validation)],
      },
      async (request, reply) => {
        const { params, body, blog, reaction } = request;
  
        assertRequired('blog', blog);
        assertRequired('reaction', reaction);
  
        const command = new UpdateReactionCommand({params, update: body, existing: reaction, blog });
        const response = await mediator.send(command);
        return reply.status(200).send(response);
      },
    );
  
    fastify.delete(
      '/blogs/:blogId/reactions/:reactionId',
      {
        schema: {
          description: 'Delete a reaction',
          tags: ['Blogs', 'Reactions'],
          params: DeleteReactionParamsSchema,
          response: {
            204: Type.Null(),
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyDeleteReactionHook(convex)],
      },
      async (request, reply) => {
        const { params, blog, reaction } = request;
  
        assertRequired('blog', blog);
        assertRequired('reaction', reaction);
  
        const command = new DeleteReactionCommand({params, existing: reaction, blog });
        await mediator.send(command);
        return reply.status(204).send(null);
      },
    );

    fastify.post(
      '/blogs/:blogId/tags',
      {
        schema: {
          description: 'Create a tag',
          tags: ['Blogs', 'Tags'],
          params: CreateTagParamsSchema,
          body: CreateTagSchema,
          response: {
            201: BlogDataSchema,
            400: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyCreateTagHook(convex)],
      },
      async (request, reply) => {
        const { params, body, blog } = request;
  
        assertRequired('blog', blog);
  
        const command = new CreateTagCommand({params, create: body, existing: blog});
        const response = await mediator.send(command);
        return reply.status(201).send(response);
      },
    );
  
    fastify.patch(
      '/blogs/:blogId/tags/:tagId',
      {
        schema: {
          description: 'Update a tag',
          tags: ['Blogs', 'Tags'],
          params: UpdateTagParamsSchema,
          body: UpdateTagSchema,
          response: {
            200: BlogDataSchema,
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyUpdateTagHook(convex, validation)],
      },
      async (request, reply) => {
        const { params, body, blog, tag } = request;
  
        assertRequired('blog', blog);
        assertRequired('tag', tag);
  
        const command = new UpdateTagCommand({params, update: body, existing: tag, blog });
        const response = await mediator.send(command);
        return reply.status(200).send(response);
      },
    );
  
    fastify.delete(
      '/blogs/:blogId/tags/:tagId',
      {
        schema: {
          description: 'Delete a tag',
          tags: ['Blogs', 'Tags'],
          params: DeleteTagParamsSchema,
          response: {
            204: Type.Null(),
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyDeleteTagHook(convex)],
      },
      async (request, reply) => {
        const { params, blog, tag } = request;
  
        assertRequired('blog', blog);
        assertRequired('tag', tag);
  
        const command = new DeleteTagCommand({params, existing: tag, blog });
        await mediator.send(command);
        return reply.status(204).send(null);
      },
    );

    fastify.post(
      '/blogs/:blogId/participants',
      {
        schema: {
          description: 'Create a participant',
          tags: ['Blogs', 'Participants'],
          params: CreateParticipantParamsSchema,
          body: CreateParticipantSchema,
          response: {
            201: BlogDataSchema,
            400: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyCreateParticipantHook(convex)],
      },
      async (request, reply) => {
        const { params, body, blog, userRequest } = request;
  
        assertRequired('blog', blog);
        assertRequired('userRequest', userRequest);
  
        const command = new CreateParticipantCommand({params, create: body, user: userRequest, existing: blog});
        const response = await mediator.send(command);
        return reply.status(201).send(response);
      },
    );
  
    fastify.delete(
      '/blogs/:blogId/participants/:participantId',
      {
        schema: {
          description: 'Delete a participant',
          tags: ['Blogs', 'Participants'],
          params: DeleteParticipantParamsSchema,
          response: {
            204: Type.Null(),
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate, verifyDeleteParticipantHook(convex)],
      },
      async (request, reply) => {
        const { params, blog, participant } = request;
  
        assertRequired('blog', blog);
        assertRequired('participant', participant);
  
        const command = new DeleteParticipantCommand({params, existing: participant, blog });
        await mediator.send(command);
        return reply.status(204).send(null);
      },
    );
};
