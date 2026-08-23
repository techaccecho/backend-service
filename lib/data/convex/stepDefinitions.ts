import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';
import { StepDefinitionEntitySchema } from './schema.js';

export const list = query({
  args: {},
  handler: async (ctx) => {
    const steps = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_order')
      .collect();
    return steps.filter((s) => !s.isDeleted);
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('stepDefinitions').withIndex('by_order').collect();
  },
});

export const getById = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('stepDefinitions')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const save = mutation({
  args: {
    step: StepDefinitionEntitySchema,
  },
  handler: async (ctx, { step }) => {
    const existing = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_public_id', (q) => q.eq('id', step.id))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...step,
        updatedAt: Date.now(),
      });
      const updated = await ctx.db.get(existing._id);
      return { success: true, step: updated };
    }

    const id = await ctx.db.insert('stepDefinitions', {
      ...step,
      createdAt: Date.now(),
      updatedAt: null,
    });
    const created = await ctx.db.get(id);
    return { success: true, step: created };
  },
});

export const deleteStep = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();

    if (!existing) {
      return { success: false, message: 'Step definition not found' };
    }

    await ctx.db.patch(existing._id, {
      isDeleted: true,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});

export const restoreStep = mutation({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('stepDefinitions')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();

    if (!existing) {
      return { success: false, message: 'Step definition not found' };
    }

    await ctx.db.patch(existing._id, {
      isDeleted: false,
      updatedAt: Date.now(),
    });
    return { success: true };
  },
});
