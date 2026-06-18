import type { FastifyRequest } from 'fastify';
import { assertRequired, assertHasStringKey, NotFoundError, ForbiddenError } from '@lib/util';
import { api } from '@lib/data';
import type { ConvexHttpClient } from 'convex/browser';
import { ValidationError, AsyncValidation } from '@lib/util';
import { UpdateBlog } from '@lib/domain';

export const verifyMutateBlog = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    const { auth } = request;

    assertRequired('auth', auth);
    assertHasStringKey(request.params, 'blogId');

    const { blogId } = request.params;

    const response = await convex.query(api.blogs.find, { id: blogId });

    if (response == null) {
        throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }

    if(auth.type === 'api' || auth.user.role === 'admin') {
        return;
    }

    if (response.author.id !== auth.user.id) {
        throw new ForbiddenError();
    }

    request.blog = response;
}

export const verifyMutateReaction = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    await verifyMutateBlog(convex, request);
    
    const { auth, params, blog } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'reactionId');
    assertRequired('blog', blog);

    const { reactionId } = params;

    const reactionResponse = blog.reactions.find(reaction => reaction.id == reactionId);

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

export const verifyMutateTag = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    await verifyMutateBlog(convex, request);

    const { auth, params, blog } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'tagId');
    assertRequired('blog', blog);

    const { tagId } = params;

    const tagResponse = blog.tags.find(tag => tag.id == tagId);

    if (tagResponse == null) {
        throw new NotFoundError({ resource: `tag with id ${tagId}` });
    }

    request.tag = tagResponse;
}

export const verifyMutateParticipant = async (convex: ConvexHttpClient, request: FastifyRequest) => {
    await verifyMutateBlog(convex, request);

    const { auth, params, blog } = request;

    assertRequired('auth', auth);
    assertHasStringKey(params, 'participantId');
    assertRequired('blog', blog);

    const { participantId } = params;

    const participantResponse = blog.participants.find(participant => participant.id == participantId);

    if (participantResponse == null) {
        throw new NotFoundError({ resource: `participant with id ${participantId}` });
    }

    request.participant = participantResponse;
}

export const verifyUpdateBlog = async (convex: ConvexHttpClient, validation: AsyncValidation, request: FastifyRequest) => {
    await verifyMutateBlog(convex, request);
    const update = request.body as UpdateBlog;
    
    const validationDetails = await validation
        .validator()
        .notEmpty({ value: update })
        .validate();

    if (validationDetails.length > 0) {
        throw new ValidationError({ details: validationDetails });
    }
}