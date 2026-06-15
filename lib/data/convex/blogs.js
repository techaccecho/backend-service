import { paginationOptsValidator } from 'convex/server';
import { mutation, query } from './_generated/server.js';
import { BlogEntitySchema, BlogIdSchema, BlogTypeSchema, IdSchema, UpdateBlogSchema, } from './schema.js';
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
    args: {
        paginationOpts: paginationOptsValidator,
    },
    handler: async (ctx, args) => {
        const usersQuery = ctx.db.query('blogs');
        return await usersQuery.paginate(args.paginationOpts);
    },
});
export const listByType = query({
    args: BlogTypeSchema,
    handler: async (ctx, args) => {
        const postQuery = ctx.db
            .query('blogs')
            .withIndex('by_type', (q) => q.eq('type', args.type));
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
