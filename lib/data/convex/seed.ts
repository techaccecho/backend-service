import { v } from 'convex/values';
import { mutation } from './_generated/server.js';

export const seedAll = mutation({
  args: {
    steps: v.array(v.any()),
    dictionary: v.array(v.any()),
    redirectUrls: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    let stepsInserted = 0;
    let dictionaryInserted = 0;
    let redirectUrlsInserted = 0;
    let serviceMappingsInserted = 0;

    // 1. Seed Step Definitions
    for (const step of args.steps) {
      const existing = await ctx.db
        .query('stepDefinitions')
        .withIndex('by_public_id', (q) => q.eq('id', step.id))
        .unique();

      if (!existing) {
        await ctx.db.insert('stepDefinitions', {
          ...step,
          createdAt: Date.now(),
          updatedAt: null,
        });
        stepsInserted++;
      } else {
        await ctx.db.patch(existing._id, {
          ...step,
          updatedAt: Date.now(),
        });
      }
    }

    // 2. Seed Dictionary Words
    for (const dict of args.dictionary) {
      const existing = await ctx.db
        .query('dictionary')
        .withIndex('by_public_id', (q) => q.eq('id', dict.id.toString()))
        .unique();

      if (!existing) {
        await ctx.db.insert('dictionary', {
          id: dict.id.toString(),
          word: dict.word,
          question: dict.question,
          createdAt: Date.now(),
          updatedAt: null,
        });
        dictionaryInserted++;
      }
    }

    // 3. Seed Redirect URLs and Service Mappings
    for (const r of args.redirectUrls) {
      const existingUrl = await ctx.db
        .query('redirectUrls')
        .withIndex('by_type', (q) => q.eq('type', r.type))
        .unique();

      if (!existingUrl) {
        await ctx.db.insert('redirectUrls', {
          type: r.type,
          redirectUrl: r.redirectUrl,
          serviceName: r.serviceName || null,
          createdAt: Date.now(),
          updatedAt: null,
        });
        redirectUrlsInserted++;
      } else {
        await ctx.db.patch(existingUrl._id, {
          redirectUrl: r.redirectUrl,
          serviceName: r.serviceName || null,
          updatedAt: Date.now(),
        });
      }

      if (r.serviceName) {
        const existingMapping = await ctx.db
          .query('serviceMappings')
          .withIndex('by_service_name', (q) =>
            q.eq('serviceName', r.serviceName),
          )
          .unique();

        if (!existingMapping) {
          await ctx.db.insert('serviceMappings', {
            serviceName: r.serviceName,
            redirectUrlType: r.type,
            createdAt: Date.now(),
            updatedAt: null,
          });
          serviceMappingsInserted++;
        } else {
          await ctx.db.patch(existingMapping._id, {
            redirectUrlType: r.type,
            updatedAt: Date.now(),
          });
        }
      }
    }

    return {
      success: true,
      stepsCount: args.steps.length,
      stepsInserted,
      dictionaryCount: args.dictionary.length,
      dictionaryInserted,
      redirectUrlsCount: args.redirectUrls.length,
      redirectUrlsInserted,
      serviceMappingsInserted,
    };
  },
});
