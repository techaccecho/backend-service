import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import {
  BlogDataSchema,
  CreateCommentReplyCommand,
  CreateCommentReplyParamsSchema,
  CreateCommentReplyReactionCommand,
  CreateCommentReplyReactionParamsSchema,
  CreateCommentReplyReactionSchema,
  CreateCommentReplySchema,
  CreateCommentReplyViewerCommand,
  CreateCommentReplyViewerParamsSchema,
  CreateCommentReplyViewerSchema,
  DeleteCommentReplyCommand,
  DeleteCommentReplyParamsSchema,
  DeleteCommentReplyReactionCommand,
  DeleteCommentReplyReactionParamsSchema,
  UpdateCommentReplyCommand,
  UpdateCommentReplyParamsSchema,
  UpdateCommentReplyReactionCommand,
  UpdateCommentReplyReactionParamsSchema,
  UpdateCommentReplyReactionSchema,
  UpdateCommentReplySchema,
} from '@lib/domain';
import { AppErrorSchema, AsyncValidation, assertRequired } from '@lib/util';
import { Type } from '@sinclair/typebox';
import { container } from 'tsyringe';
import {
  verifyCreateCommentReplyHook,
  verifyCreateCommentReplyReactionHook,
  verifyCreateCommentReplyViewerHook,
  verifyDeleteCommentReplyHook,
  verifyDeleteCommentReplyReactionHook,
  verifyUpdateCommentReplyHook,
  verifyUpdateCommentReplyReactionHook,
} from './hooks/index.js';

export const repliesRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const validation = container.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;

  fastify.post(
    '/blogs/:blogId/comments/:commentId/replies',
    {
      schema: {
        description: 'Create a comment reply',
        tags: ['Blogs', 'Comments', 'Replies'],
        params: CreateCommentReplyParamsSchema,
        body: CreateCommentReplySchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateCommentReplyHook(convex)],
    },
    async (request, reply) => {
      const { params, body, blog, comment, userRequest } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('userRequest', userRequest);

      const command = new CreateCommentReplyCommand({
        params,
        create: body,
        blog,
        comment,
        user: userRequest,
      });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.patch(
    '/blogs/:blogId/comments/:commentId/replies/:replyId',
    {
      schema: {
        description: 'Update a comment reply',
        tags: ['Blogs', 'Comments', 'Replies'],
        params: UpdateCommentReplyParamsSchema,
        body: UpdateCommentReplySchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [
        authenticate,
        verifyUpdateCommentReplyHook(convex, validation),
      ],
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('commentReply', commentReply);

      const command = new UpdateCommentReplyCommand({
        params,
        update: body,
        existing: commentReply,
        comment,
        blog,
      });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/blogs/:blogId/comments/:commentId/replies/:replyId',
    {
      schema: {
        description: 'Delete a comment reply',
        tags: ['Blogs', 'Comments', 'Replies'],
        params: DeleteCommentReplyParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteCommentReplyHook(convex)],
    },
    async (request, reply) => {
      const { params, blog, comment, commentReply } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('commentReply', commentReply);

      const command = new DeleteCommentReplyCommand({
        params,
        existing: commentReply,
        comment,
        blog,
      });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  fastify.post(
    '/blogs/:blogId/comments/:commentId/replies/:replyId/viewers',
    {
      schema: {
        description: 'Create a viewer',
        tags: ['Blogs', 'Comments', 'Replies', 'Viewers'],
        params: CreateCommentReplyViewerParamsSchema,
        body: CreateCommentReplyViewerSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateCommentReplyViewerHook(convex)],
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply, userRequest } =
        request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('commentReply', commentReply);
      assertRequired('userRequest', userRequest);

      const command = new CreateCommentReplyViewerCommand({
        params,
        create: body,
        blog,
        comment,
        reply: commentReply,
        user: userRequest,
      });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.post(
    '/blogs/:blogId/comments/:commentId/replies/:replyId/reactions',
    {
      schema: {
        description: 'Create a reaction',
        tags: ['Blogs', 'Comments', 'Replies', 'Reactions'],
        params: CreateCommentReplyReactionParamsSchema,
        body: CreateCommentReplyReactionSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyCreateCommentReplyReactionHook(convex)],
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply, userRequest } =
        request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('commentReply', commentReply);
      assertRequired('userRequest', userRequest);

      const command = new CreateCommentReplyReactionCommand({
        params,
        create: body,
        blog,
        comment,
        reply: commentReply,
        user: userRequest,
      });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.patch(
    '/blogs/:blogId/comments/:commentId/replies/:replyId/:reactionId',
    {
      schema: {
        description: 'Update reaction',
        tags: ['Blogs', 'Comments', 'Replies', 'Reactions'],
        params: UpdateCommentReplyReactionParamsSchema,
        body: UpdateCommentReplyReactionSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [
        authenticate,
        verifyUpdateCommentReplyReactionHook(convex, validation),
      ],
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply, reaction } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('commentReply', commentReply);
      assertRequired('reaction', reaction);

      const command = new UpdateCommentReplyReactionCommand({
        params,
        update: body,
        existing: reaction,
        blog,
        comment,
        reply: commentReply,
      });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/blogs/:blogId/comments/:commentId/replies/:replyId/reactions/:reactionId',
    {
      schema: {
        description: 'Delete a reaction',
        tags: ['Blogs', 'Comments', 'Replies', 'Reactions'],
        params: DeleteCommentReplyReactionParamsSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
      preHandler: [authenticate, verifyDeleteCommentReplyReactionHook(convex)],
    },
    async (request, reply) => {
      const { params, blog, comment, commentReply, reaction } = request;

      assertRequired('blog', blog);
      assertRequired('comment', comment);
      assertRequired('commentReply', commentReply);
      assertRequired('reaction', reaction);

      const command = new DeleteCommentReplyReactionCommand({
        params,
        existing: reaction,
        blog,
        comment,
        reply: commentReply,
      });
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );
};
