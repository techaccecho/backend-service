import { paginationOptsValidator } from 'convex/server';
import { v } from 'convex/values';
import { mutation, query } from './_generated/server.js';
import { PuzzleEntitySchema } from './schema.js';

export const create = mutation({
  args: PuzzleEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('puzzles', args);
  },
});

export const getById = query({
  args: {
    puzzleId: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const puzzle = await ctx.db
      .query('puzzles')
      .withIndex('by_public_id', (q) => q.eq('id', args.puzzleId))
      .unique();

    if (puzzle && args.userId && puzzle.userId !== args.userId) {
      return null;
    }
    return puzzle;
  },
});

export const getByUserId = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const puzzles = await ctx.db
      .query('puzzles')
      .withIndex('by_user_id', (q) => q.eq('userId', args.userId))
      .collect();

    if (puzzles.length === 0) return null;
    const active = puzzles.find((p) => !p.completed);
    return active || puzzles[puzzles.length - 1];
  },
});

export const updateProgress = mutation({
  args: {
    puzzleId: v.string(),
    userId: v.string(),
    word: v.string(),
    allFound: v.boolean(),
    foundWords: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const puzzle = await ctx.db
      .query('puzzles')
      .withIndex('by_public_id', (q) => q.eq('id', args.puzzleId))
      .unique();

    if (!puzzle || puzzle.userId !== args.userId) {
      throw new Error('Puzzle not found or user mismatch');
    }

    await ctx.db.patch(puzzle._id, {
      foundWords: args.foundWords,
      completed: args.allFound,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

export const list = query({
  args: {
    filter: v.optional(v.string()),
    paginationOpts: v.optional(paginationOptsValidator),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query('puzzles');
    if (args.filter === 'ACTIVE') {
      q = q.filter((doc) => doc.eq(doc.field('completed'), false));
    } else if (args.filter === 'COMPLETE') {
      q = q.filter((doc) => doc.eq(doc.field('completed'), true));
    }
    if (args.paginationOpts) {
      return await q.paginate(args.paginationOpts);
    }
    const items = await q.collect();
    return { items, continueCursor: null };
  },
});
