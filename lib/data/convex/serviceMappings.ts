import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';

export const store = mutation({
  args: {
    serviceName: v.string(),
    redirectUrlType: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('serviceMappings')
      .withIndex('by_service_name', (q) =>
        q.eq('serviceName', args.serviceName),
      )
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        redirectUrlType: args.redirectUrlType,
        updatedAt: Date.now(),
      });
      return { success: true, id: existing._id };
    }

    const id = await ctx.db.insert('serviceMappings', {
      serviceName: args.serviceName,
      redirectUrlType: args.redirectUrlType,
      createdAt: Date.now(),
      updatedAt: null,
    });
    return { success: true, id };
  },
});

export const get = query({
  args: {
    serviceName: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('serviceMappings')
      .withIndex('by_service_name', (q) =>
        q.eq('serviceName', args.serviceName),
      )
      .unique();
  },
});

export const deleteMapping = mutation({
  args: {
    serviceName: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('serviceMappings')
      .withIndex('by_service_name', (q) =>
        q.eq('serviceName', args.serviceName),
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { success: true };
    }
    return { success: false, message: 'Not found' };
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('serviceMappings').collect();
  },
});
