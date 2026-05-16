import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { Type } from '@sinclair/typebox';
import {
  AppErrorSchema,
  PaginatedPostDataSchema,
  PostDataSchema,
  QuerySchema,
} from '../../lib';
import {
  CreateCommentCommand,
  CreateCommentParamSchema,
  CreateCommentSchema,
  DeleteCommentCommand,
  DeleteCommentParamSchema,
  DeletePostCommand,
  DeletePostParamSchema,
  UpdateCommentCommand,
  UpdateCommentParamSchema,
  UpdatePostCommand,
  UpdatePostParamSchema,
  UpdatePostSchema,
} from './commands';
import {
  CreatePostCommand,
  CreatePostSchema,
} from './commands/create-post.command';
import { GetPostParamSchema, GetPostQuery } from './queries';
import { GetPostsQuery } from './queries/get-posts.query';

export const postsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  const { mediator } = fastify;

  fastify.post(
    '/',
    {
      schema: {
        description: 'Create a new post',
        tags: ['Posts'],
        body: CreatePostSchema,
        response: {
          201: PostDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { body } = request;
      const command = new CreatePostCommand(body);
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.get(
    '/',
    {
      // preHandler: fastify.authenticate,
      schema: {
        description: 'Get all posts with pagination',
        tags: ['Posts'],
        querystring: QuerySchema,
        response: {
          200: PaginatedPostDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const query = new GetPostsQuery(request.query);
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.get(
    '/:id',
    {
      schema: {
        description: 'Get a post by id',
        tags: ['Posts'],
        params: GetPostParamSchema,
        response: {
          200: PostDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params } = request;
      const query = new GetPostQuery(params);
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    },
  );

  fastify.patch(
    '/:id',
    {
      schema: {
        description: 'Update an existing post partially',
        tags: ['Posts'],
        params: UpdatePostParamSchema,
        body: UpdatePostSchema,
        response: {
          200: PostDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params, body } = request;
      const command = new UpdatePostCommand(params, body);
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        description: 'Delete a post',
        tags: ['Posts'],
        params: DeletePostParamSchema,
        response: {
          204: Type.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params } = request;
      const command = new DeletePostCommand(params);
      await mediator.send(command);
      return reply.status(204).send(null);
    },
  );

  fastify.post(
    '/:id/comments',
    {
      schema: {
        description: 'Create a new comment',
        tags: ['Comments'],
        params: CreateCommentParamSchema,
        body: CreateCommentSchema,
        response: {
          201: PostDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params, body } = request;
      const command = new CreateCommentCommand(params, body);
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    },
  );

  fastify.patch(
    '/:id/comments/:commentId',
    {
      schema: {
        description: 'Update an existing comment partially',
        tags: ['Comments'],
        params: UpdateCommentParamSchema,
        body: UpdatePostSchema,
        response: {
          200: PostDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params, body } = request;
      const command = new UpdateCommentCommand(params, body);
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );

  fastify.delete(
    '/:id/comments/:commentId',
    {
      schema: {
        description: 'Delete a comment',
        tags: ['Comments'],
        params: DeleteCommentParamSchema,
        response: {
          200: PostDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (request, reply) => {
      const { params } = request;
      const command = new DeleteCommentCommand(params);
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    },
  );
};
