import type { CommentEntity, PostEntity } from '@backend-service/convex';
import { type Comment, type Post, toISO } from '../../lib';

export const toComment = (request: CommentEntity): Comment => ({
  id: request.id,
  content: request.content,
  author: {
    id: request.author.id,
    alias: request.author.alias,
    firstName: request.author.firstName,
    lastName: request.author.lastName,
  },
  parent: null,
  media: [],
  stats: {
    ...request.stats,
    updatedAt: toISO(request.updatedAt),
  },
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
});

export const toPost = (request: PostEntity): Post => ({
  id: request.id,
  title: request.title,
  content: request.content,
  type: request.type,
  category: request.category,
  author: request.author,
  priority: request.priority,
  isDraft: request.isDraft,
  isPinned: request.isPinned,
  isLocked: request.isLocked,
  reactions: [],
  comments: request.comments.map(toComment),
  stats: {
    ...request.stats,
    updatedAt: toISO(request.updatedAt),
  },
  media: [],
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
  lastActivityAt: toISO(request.lastActivityAt),
});
