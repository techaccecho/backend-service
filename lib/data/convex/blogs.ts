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
    const authorName =
      args.author.alias ||
      args.author.firstName ||
      args.author.lastName ||
      args.author.email;
    const searchableText =
      `${args.title} ${args.content} ${authorName}`.toLowerCase();
    return await ctx.db.insert('blogs', {
      ...args,
      searchableText,
    });
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
    if (args.search) {
      const search = args.search;
      let searchQuery = ctx.db
        .query('blogs')
        .withSearchIndex('search_text', (q) =>
          q.search('searchableText', search).eq('type', args.type),
        );

      if (args.authorId !== undefined) {
        searchQuery = searchQuery.filter((q) =>
          q.eq(q.field('author.id'), args.authorId),
        );
      }

      if (args.role !== 'admin') {
        searchQuery = searchQuery.filter((q) =>
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

      return await searchQuery.paginate(args.paginationOpts);
    }

    let postQuery = ctx.db
      .query('blogs')
      .withIndex('by_type_last_activity', (q) => q.eq('type', args.type))
      .order(args.sort ?? 'desc');

    if (args.authorId !== undefined) {
      postQuery = postQuery.filter((q) =>
        q.eq(q.field('author.id'), args.authorId),
      );
    }

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
    if (updates.title !== undefined || updates.content !== undefined) {
      const existing = await ctx.db.get(id);
      if (existing) {
        const title =
          updates.title !== undefined ? updates.title : existing.title;
        const content =
          updates.content !== undefined ? updates.content : existing.content;
        const authorName =
          existing.author.alias ||
          existing.author.firstName ||
          existing.author.lastName ||
          existing.author.email;
        const searchableText =
          `${title} ${content} ${authorName}`.toLowerCase();
        updates.searchableText = searchableText;
      }
    }
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

export const backfillSearchableText = mutation({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query('blogs').collect();
    let updatedCount = 0;
    for (const blog of blogs) {
      if (!blog.searchableText) {
        const authorName =
          blog.author.alias ||
          blog.author.firstName ||
          blog.author.lastName ||
          blog.author.email;
        const searchableText =
          `${blog.title} ${blog.content} ${authorName}`.toLowerCase();
        await ctx.db.patch(blog._id, { searchableText });
        updatedCount++;
      }
    }
    return { updatedCount };
  },
});
