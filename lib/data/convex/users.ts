import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server.js';
import {
  AliasSchema,
  AuthIdSchema,
  EmailSchema,
  IdSchema,
  UpdateUserSchema,
  UserEntitySchema,
  UserIdSchema,
} from './schema.js';

export const create = mutation({
  args: UserEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('users', args);
  },
});

export const find = query({
  args: IdSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const findByEmail = query({
  args: EmailSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .unique();
  },
});

export const findByAuthId = query({
  args: AuthIdSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_auth_id', (q) => q.eq('authId', args.authId))
      .unique();
  },
});

export const findByAlias = query({
  args: AliasSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .withIndex('by_alias', (q) => q.eq('alias', args.alias))
      .unique();
  },
});

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const usersQuery = ctx.db.query('users');
    return await usersQuery.paginate(args.paginationOpts);
  },
});

export const listArchived = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('isLocked'), true))
      .paginate(args.paginationOpts);
  },
});

export const findArchived = query({
  args: IdSchema,
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
    if (user && user.isLocked) {
      return user;
    }
    return null;
  },
});

export const update = mutation({
  args: UpdateUserSchema,
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: UserIdSchema,
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
    return id;
  },
});
