import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server.js';
import {
  ApiEntitySchema,
  ApiIdSchema,
  ApiNameSchema,
  IdSchema,
  UpdateApiSchema,
} from './schema.js';

export const create = mutation({
  args: ApiEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('apis', args);
  },
});

export const find = query({
  args: IdSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('apis')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const findByName = query({
  args: ApiNameSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('apis')
      .withIndex('by_name', (q) => q.eq('name', args.name))
      .unique();
  },
});

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const query = ctx.db.query('apis');
    return await query.paginate(args.paginationOpts);
  },
});

export const update = mutation({
  args: UpdateApiSchema,
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: ApiIdSchema,
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
    return id;
  },
});
