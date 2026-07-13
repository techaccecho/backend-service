import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';
import { FaqEntitySchema, IdSchema } from './schema.js';

export const create = mutation({
  args: FaqEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('faqs', args);
  },
});

export const upsert = mutation({
  args: FaqEntitySchema,
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('faqs')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();

    if (existing == null) {
      return await ctx.db.insert('faqs', args);
    }

    await ctx.db.patch(existing._id, args);
    return existing._id;
  },
});

export const upsertMany = mutation({
  args: {
    items: v.array(FaqEntitySchema),
  },
  handler: async (ctx, args) => {
    const ids = [];

    for (const item of args.items) {
      const existing = await ctx.db
        .query('faqs')
        .withIndex('by_public_id', (q) => q.eq('id', item.id))
        .unique();

      if (existing == null) {
        ids.push(await ctx.db.insert('faqs', item));
        continue;
      }

      await ctx.db.patch(existing._id, item);
      ids.push(existing._id);
    }

    return ids;
  },
});

export const find = query({
  args: IdSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('faqs')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const listActiveByType = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('faqs')
      .withIndex('by_type_active', (q) =>
        q.eq('type', args.type).eq('isActive', true),
      )
      .collect();
  },
});
