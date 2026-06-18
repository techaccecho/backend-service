import type { FastifyRequest } from 'fastify';
import { ValidationError, assertRequired, assertHasStringKey, NotFoundError, ForbiddenError, AsyncValidation } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyMutateBlog } from './blog.js';
import { UpdateComment } from '@lib/domain';

export const verifyMutateComment = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    await verifyMutateBlog(convex, request);
    
    const { auth, params, blog } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'commentId');
    assertRequired('blog', blog);

    const { commentId } = params;

    const comment = blog.comments.find(comment => comment.id == commentId);

    if (comment == null) {
        throw new NotFoundError({ resource: `comment with id ${commentId}` });
    }

    if(auth.type === 'api' || auth.user.role === 'admin') {
        return;
    }

    if (comment.author.id !== auth.user.id) {
        throw new ForbiddenError();
    }

    request.comment = comment;
}

export const verifyMutateCommentReaction = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    await verifyMutateBlog(convex, request);

    const { auth, params, comment } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'reactionId');
    assertRequired('comment', comment);

    const { reactionId } = params;

    const reactionResponse = comment.reactions.find(reaction => reaction.id == reactionId);

    if (reactionResponse == null) {
        throw new NotFoundError({ resource: `reaction with id ${reactionId}` });
    }

    if(auth.type === 'api' || auth.user.role === 'admin') {
        return;
    }

    if (reactionResponse.user.id !== auth.user.id) {
        throw new ForbiddenError();
    }

    request.reaction = reactionResponse;
}

export const verifyUpdateComment = async (convex: ConvexHttpClient, validation: AsyncValidation, request: FastifyRequest) => {
    await verifyMutateComment(convex, request);

    const update = request.body as UpdateComment;
    
    const validationDetails = await validation
        .validator()
        .notEmpty({ value: update })
        .validate();

    if (validationDetails.length > 0) {
        throw new ValidationError({ details: validationDetails });
    }
}