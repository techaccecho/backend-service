import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server';
import {
  IdSchema,
  PostEntitySchema,
  PostIdSchema,
  PostTypeSchema,
  UpdatePostSchema,
} from '../../apps/blog-api/src/convex/schema';

export const create = mutation({
  args: PostEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('posts', args);
  },
});

export const find = query({
  args: IdSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('posts')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const usersQuery = ctx.db.query('posts');
    return await usersQuery.paginate(args.paginationOpts);
  },
});

export const listByType = query({
  args: PostTypeSchema,
  handler: async (ctx, args) => {
    const postQuery = ctx.db
      .query('posts')
      .withIndex('by_type', (q) => q.eq('type', args.type));

    return await postQuery.paginate(args.paginationOpts);
  },
});

export const update = mutation({
  args: UpdatePostSchema,
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: PostIdSchema,
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
    return id;
  },
});
