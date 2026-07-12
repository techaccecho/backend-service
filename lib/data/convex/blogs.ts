import { mutation, query } from './_generated/server.js';
import {
  AdminBlogActionEntitySchema,
  BlogEntitySchema,
  BlogIdSchema,
  BlogListSchema,
  BlogTypeSchema,
  IdSchema,
  UpdateBlogSchema,
} from './schema.js';

export const create = mutation({
  args: BlogEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('blogs', args);
  },
});

export const find = query({
  args: IdSchema,
  handler: async (ctx, args) => {
    return await ctx.db
      .query('blogs')
      .withIndex('by_public_id', (q) => q.eq('id', args.id))
      .unique();
  },
});

export const list = query({
  args: BlogListSchema,
  handler: async (ctx, args) => {
    let usersQuery = ctx.db.query('blogs');

    if (args.role !== 'admin') {
      usersQuery = usersQuery.filter((q) =>
        q.or(
          q.and(
            q.eq(q.field('isDraft'), false),
            q.or(
              q.eq(q.field('deletedAt'), null),
              q.eq(q.field('deletedAt'), undefined),
            ),
          ),
          ...(args.userId != null
            ? [
                q.and(
                  q.eq(q.field('author.id'), args.userId),
                  q.or(
                    q.eq(q.field('isDraft'), true),
                    q.neq(q.field('deletedAt'), null),
                  ),
                ),
              ]
            : []),
        ),
      );
    }

    return await usersQuery.paginate(args.paginationOpts);
  },
});

export const listByType = query({
  args: BlogTypeSchema,
  handler: async (ctx, args) => {
    let postQuery = ctx.db
      .query('blogs')
      .withIndex('by_type_last_activity', (q) => q.eq('type', args.type))
      .order(args.sort ?? 'desc');

    if (args.role !== 'admin') {
      postQuery = postQuery.filter((q) =>
        q.or(
          q.and(
            q.eq(q.field('isDraft'), false),
            q.or(
              q.eq(q.field('deletedAt'), null),
              q.eq(q.field('deletedAt'), undefined),
            ),
          ),
          ...(args.userId != null
            ? [
                q.and(
                  q.eq(q.field('author.id'), args.userId),
                  q.or(
                    q.eq(q.field('isDraft'), true),
                    q.neq(q.field('deletedAt'), null),
                  ),
                ),
              ]
            : []),
        ),
      );
    }

    return await postQuery.paginate(args.paginationOpts);
  },
});

export const update = mutation({
  args: UpdateBlogSchema,
  handler: async (ctx, args) => {
    const { id, updates } = args;
    await ctx.db.patch(id, updates);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: BlogIdSchema,
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
    return id;
  },
});

export const createAdminAction = mutation({
  args: AdminBlogActionEntitySchema,
  handler: async (ctx, args) => {
    return await ctx.db.insert('adminBlogActions', args);
  },
});
