import type { FastifyRequest } from 'fastify';
import { ValidationError, assertRequired, assertHasStringKey, NotFoundError, ForbiddenError, AsyncValidation } from '@lib/util';
import type { ConvexHttpClient } from 'convex/browser';
import { verifyMutateComment } from './comment.js';
import { UpdateComment } from '@lib/domain';

export const verifyMutateCommentReply = async (convex: ConvexHttpClient, request: FastifyRequest, verifyAuthor: boolean = false) => {
    await verifyMutateComment(convex, request);
    
    const { auth, params, blog, comment } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'replyId');
    assertRequired('blog', blog);
    assertRequired('comment', comment);

    const { replyId } = params;

    const reply = comment.replies.find(reply => reply.id == replyId );

    if (reply == null) {
        throw new NotFoundError({ resource: `reply with id ${replyId}` });
    }

    if(auth.type === 'api' || auth.user.role === 'admin') {
        return;
    }

    if (verifyAuthor && reply.author.id !== auth.user.id) {
        throw new ForbiddenError();
    }

    request.commentReply = reply;
}

export const verifyMutateCommentReplyReaction = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    await verifyMutateCommentReply(convex, request, false);

    const { auth, params, commentReply } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'reactionId');
    assertRequired('commentReply', commentReply);

    const { reactionId } = params;

    const reactionResponse = commentReply.reactions.find(reaction => reaction.id == reactionId);

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

export const verifyUpdateCommentReply = async (convex: ConvexHttpClient, validation: AsyncValidation, request: FastifyRequest) => {
    await verifyMutateCommentReply(convex, request, false);

    const update = request.body as UpdateComment;
    
    const validationDetails = await validation
        .validator()
        .notEmpty({ value: update })
        .validate();

    if (validationDetails.length > 0) {
        throw new ValidationError({ details: validationDetails });
    }
}