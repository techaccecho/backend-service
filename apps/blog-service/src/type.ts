import { AttributeEntity, CommentEntity, ReactionEntity, Doc, ReplyEntity } from '@lib/data';

declare module 'fastify' {
  interface FastifyRequest {
    userRequest?: Doc<'users'>;
    blog?: Doc<'blogs'>;
    comment?: CommentEntity;
    commentReply?: ReplyEntity;
    reaction?: ReactionEntity;
    tag?: AttributeEntity
  }
}