import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';

export const add = mutation({
  args: {
    word: v.string(),
    question: v.string(),
  },
  handler: async (ctx, args) => {
    const id = Date.now().toString();
    const docId = await ctx.db.insert('dictionary', {
      id,
      word: args.word,
      question: args.question,
      createdAt: Date.now(),
      updatedAt: null,
    });
    return { success: true, id, docId };
  },
});

export const update = mutation({
  args: {
    id: v.string(),
    word: v.optional(v.string()),
    question: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query('dictionary')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();

    if (!entry) {
      return { success: false, message: 'Dictionary entry not found' };
    }

    const updates: Record<string, unknown> = { updatedAt: Date.now() };
    if (args.word !== undefined) updates.word = args.word;
    if (args.question !== undefined) updates.question = args.question;

    await ctx.db.patch(entry._id, updates);
    return { success: true };
  },
});

export const get = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('dictionary')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const list = query({
  args: {
    paginationOpts: v.optional(paginationOptsValidator),
    numItems: v.optional(v.number()),
    cursor: v.optional(v.nullable(v.string())),
  },
  handler: async (ctx, args) => {
    if (args.paginationOpts) {
      return await ctx.db.query('dictionary').paginate(args.paginationOpts);
    }
    const items = await ctx.db.query('dictionary').collect();
    const numItems = args.numItems || 10;
    const startIndex = args.cursor ? parseInt(args.cursor, 10) : 0;
    const paginatedItems = items.slice(startIndex, startIndex + numItems);
    const nextIndex = startIndex + numItems;
    const continueCursor =
      nextIndex < items.length ? nextIndex.toString() : null;

    return {
      items: paginatedItems,
      continueCursor,
    };
  },
});
