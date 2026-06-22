import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { container } from 'tsyringe';
import { AppErrorSchema, assertRequired, AsyncValidation } from '@lib/util';
import { Type } from '@sinclair/typebox';
import {
    BlogDataSchema,
    CreateCommentCommand,
    CreateCommentSchema,
    CreateCommentParamsSchema,
    CreateCommentViewerCommand,
    CreateCommentViewerSchema,
    CreateCommentViewerParamsSchema,
    CreateCommentReactionCommand,
    CreateCommentReactionSchema,
    CreateCommentReactionParamsSchema,
    DeleteCommentCommand,
    DeleteCommentParamsSchema,
    DeleteCommentReactionCommand,
    DeleteCommentReactionParamsSchema,
    UpdateCommentCommand,
    UpdateCommentParamsSchema,
    UpdateCommentSchema, 
    UpdateCommentReactionCommand,
    UpdateCommentReactionParamsSchema,
    UpdateCommentReactionSchema,
  } from '@lib/domain';
import {
  verifyCreateCommentHook,
  verifyCreateCommentViewerHook,
  verifyCreateCommentReactionHook,
  verifyUpdateCommentHook,
  verifyUpdateCommentReactionHook,
  verifyDeleteCommentHook,
   verifyDeleteCommentReactionHook
} from './hooks/index.js';

export const commentsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    const validation = container.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;

  fastify.post(
    '/blogs/:blogId/comments',
    {
      schema: {
        description: 'Create a comment',
        tags: ['Blogs', 'Comments'],
        params: CreateCommentParamsSchema,
        body: CreateCommentSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate(), verifyCreateCommentHook(convex)],
    },
    async (request, reply) => {
      const { params, body, blog, userRequest } = request;

      assertRequired('blog', blog);
      assertRequired('userRequest', userRequest);

      const command = new CreateCommentCommand({params, create: body, existing: blog, user: userRequest});
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.patch(
    '/blogs/:blogId/comments/:commentId',
    {
      schema: {
        description: 'Update comment',
        tags: ['Blogs', 'Comments'],
        params: UpdateCommentParamsSchema,
        body: UpdateCommentSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate(), verifyUpdateCommentHook(convex, validation)],
    },
    async (request, reply) => {
      const { params, body, blog, comment } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);

      const command = new UpdateCommentCommand({params, update: body, existing: comment, blog });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/blogs/:blogId/comments/:commentId',
    {
      schema: {
        description: 'Delete a comment',
        tags: ['Blogs', 'Comments'],
        params: DeleteCommentParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate(), verifyDeleteCommentHook(convex)],
    },
    async (request, reply) => {
      const { params, blog, comment } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);

      const command = new DeleteCommentCommand({params, existing: comment, blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  fastify.post(
      '/blogs/:blogId/comments/:commentId/viewers',
      {
        schema: {
          description: 'Create a viewer',
          tags: ['Blogs', 'Comments', 'Viewers'],
          params: CreateCommentViewerParamsSchema,
          body: CreateCommentViewerSchema,
          response: {
            201: BlogDataSchema,
            400: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate(), verifyCreateCommentViewerHook(convex)],
      },
      async (request, reply) => {
        const { params, body, blog, comment, userRequest } = request;

        assertRequired('blog', blog);
        assertRequired('comment', comment);
        assertRequired('userRequest', userRequest);

        const command = new CreateCommentViewerCommand({params, create: body, blog, comment, user: userRequest});
        const response = await mediator.send(command);
        return reply.status(201).send(response);
      },
    );

    fastify.post(
      '/blogs/:blogId/comments/:commentId/reactions',
      {
        schema: {
          description: 'Create a reaction',
          tags: ['Blogs', 'Comments', 'Reactions'],
          params: CreateCommentReactionParamsSchema,
          body: CreateCommentReactionSchema,
          response: {
            201: BlogDataSchema,
            400: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate(), verifyCreateCommentReactionHook(convex)],
      },
      async (request, reply) => {
        const { params, body, blog, comment, userRequest } = request;

        assertRequired('blog', blog);
        assertRequired('comment', comment);
        assertRequired('userRequest', userRequest);

        const command = new CreateCommentReactionCommand({params, create: body, blog, comment, user: userRequest});
        const response = await mediator.send(command);
        return reply.status(201).send(response);
      },
    );

    fastify.patch(
      '/blogs/:blogId/comments/:commentId/reactions/:reactionId',
      {
        schema: {
          description: 'Update reaction',
          tags: ['Blogs', 'Comments', 'Reactions'],
          params: UpdateCommentReactionParamsSchema,
          body: UpdateCommentReactionSchema,
          response: {
            200: BlogDataSchema,
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate(), verifyUpdateCommentReactionHook(convex, validation)],
      },
      async (request, reply) => {
        const { params, body, blog, comment, reaction } = request;

        assertRequired('blog', blog);
        assertRequired('comment', comment);
        assertRequired('reaction', reaction);

        const command = new UpdateCommentReactionCommand({params, update: body, existing: reaction, blog, comment });
        const response = await mediator.send(command);
        return reply.status(200).send(response);
      },
    );

    fastify.delete(
      '/blogs/:blogId/comments/:commentId/reactions/:reactionId',
      {
        schema: {
          description: 'Delete a reaction',
          tags: ['Blogs', 'Comments','Reactions'],
          params: DeleteCommentReactionParamsSchema,
          response: {
            204: Type.Null(),
            400: AppErrorSchema,
            404: AppErrorSchema,
            500: AppErrorSchema,
          },
        },
        preHandler: [authenticate(), verifyDeleteCommentReactionHook(convex)],
      },
      async (request, reply) => {
        const { params, blog, comment, reaction } = request;

        assertRequired('blog', blog);
        assertRequired('comment', comment);
        assertRequired('reaction', reaction);

        const command = new DeleteCommentReactionCommand({params, existing: reaction, blog, comment });
        await mediator.send(command);
        return reply.status(204).send(null);
      },
    );
};
