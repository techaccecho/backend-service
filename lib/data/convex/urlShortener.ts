import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';
import { ShortUrlEntitySchema } from './schema.js';

export const create = mutation({
  args: ShortUrlEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('shortUrls', args);
  },
});

export const getByCode = query({
  args: {
    shortCode: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('shortUrls')
      .withIndex('by_short_code', (q) => q.eq('shortCode', args.shortCode))
      .unique();
  },
});

export const getByUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('shortUrls')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .collect();
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('shortUrls').collect();
  },
});
