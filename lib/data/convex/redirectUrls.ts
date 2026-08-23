import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';

export const store = mutation({
  args: {
    type: v.string(),
    url: v.string(),
    serviceName: v.optional(v.nullable(v.string())),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('redirectUrls')
      .withIndex('by_type', (q) => q.eq('type', args.type))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        redirectUrl: args.url,
        serviceName: args.serviceName,
        updatedAt: Date.now(),
      });
      return { success: true, id: existing._id };
    }

    const id = await ctx.db.insert('redirectUrls', {
      type: args.type,
      redirectUrl: args.url,
      serviceName: args.serviceName,
      createdAt: Date.now(),
      updatedAt: null,
    });
    return { success: true, id };
  },
});

export const update = mutation({
  args: {
    type: v.string(),
    url: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('redirectUrls')
      .withIndex('by_type', (q) => q.eq('type', args.type))
      .unique();

    if (!existing) {
      throw new Error(`Redirect URL for type '${args.type}' not found`);
    }

    await ctx.db.patch(existing._id, {
      redirectUrl: args.url,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const deleteUrl = mutation({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('redirectUrls')
      .withIndex('by_type', (q) => q.eq('type', args.type))
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { success: true };
    }
    return { success: false, message: 'Not found' };
  },
});

export const get = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query('redirectUrls')
      .withIndex('by_type', (q) => q.eq('type', args.type))
      .unique();

    if (!doc) return null;
    return {
      url: doc.redirectUrl,
      type: doc.type,
      serviceName: doc.serviceName,
    };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query('redirectUrls').collect();
    return items.map((item) => ({
      type: item.type,
      url: item.redirectUrl,
      serviceName: item.serviceName,
    }));
  },
});
