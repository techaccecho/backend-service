import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import type { FaqEntity } from '@lib/data';
import {
  AppErrorSchema,
  DataSchema,
  DomainError,
  NotFoundError,
  toData,
} from '@lib/util';
import { type Static, Type } from '@sinclair/typebox';
import { makeFunctionReference } from 'convex/server';

const cacheTtlMs = 5 * 60 * 1000;
const rulesOfEngagementFaqType = 'rules-of-engagement-faq';

const RulesOfEngagementFaqItemSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  type: Type.String(),
  sortOrder: Type.Number(),
  question: Type.String(),
  answer: Type.String(),
  tags: Type.Array(Type.String()),
});

const RulesOfEngagementFaqSchema = Type.Object({
  id: Type.String(),
  version: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  items: Type.Array(RulesOfEngagementFaqItemSchema),
});

const RulesOfEngagementFaqDataSchema = DataSchema(RulesOfEngagementFaqSchema);

type RulesOfEngagementFaq = Static<typeof RulesOfEngagementFaqSchema>;

type RulesOfEngagementFaqData = Static<typeof RulesOfEngagementFaqDataSchema>;

const findActiveRulesOfEngagementFaq = makeFunctionReference<
  'query',
  { type: string },
  FaqEntity[]
>('faqs:listActiveByType');

let cachedFaq:
  | {
      expiresAt: number;
      data: RulesOfEngagementFaqData;
    }
  | undefined;
let pendingFaq: Promise<RulesOfEngagementFaqData> | undefined;

const toRulesOfEngagementFaq = (items: FaqEntity[]): RulesOfEngagementFaq => {
  const sortedItems = [...items].sort(
    (first, second) => first.sortOrder - second.sortOrder,
  );
  const [firstItem] = sortedItems;

  if (firstItem == null) {
    throw new NotFoundError({
      resource: 'active rules of engagement FAQ',
    });
  }

  if (sortedItems.some((item) => item.version !== firstItem.version)) {
    throw new DomainError({
      code: 'FAQ_VERSION_MISMATCH',
      message:
        'Active rules of engagement FAQ items must share the same version',
    });
  }

  return {
    id: rulesOfEngagementFaqType,
    version: firstItem.version,
    title: firstItem.title,
    description: firstItem.description,
    items: sortedItems.map((item) => ({
      id: item.id,
      type: item.type,
      sortOrder: item.sortOrder,
      question: item.question,
      answer: item.answer,
      tags: item.tags,
    })),
  };
};

export const rulesOfEngagementRoutes: FastifyPluginAsyncTypebox = async (
  fastify,
) => {
  const { convex } = fastify;

  fastify.get(
    '/rules-of-engagement/faq',
    {
      schema: {
        description: 'Get the active rules of engagement FAQ',
        tags: ['Rules of Engagement'],
        response: {
          200: RulesOfEngagementFaqDataSchema,
          404: AppErrorSchema,
          500: AppErrorSchema,
        },
      },
    },
    async (_request, reply) => {
      const now = Date.now();
      if (cachedFaq != null && cachedFaq.expiresAt > now) {
        return reply
          .header('Cache-Control', `public, max-age=${cacheTtlMs / 1000}`)
          .status(200)
          .send(cachedFaq.data);
      }

      pendingFaq ??= convex
        .query(findActiveRulesOfEngagementFaq, {
          type: rulesOfEngagementFaqType,
        })
        .then((items) => {
          const data = toData({ data: toRulesOfEngagementFaq(items) });
          cachedFaq = {
            expiresAt: Date.now() + cacheTtlMs,
            data,
          };
          return data;
        })
        .finally(() => {
          pendingFaq = undefined;
        });

      const response = await pendingFaq;
      return reply
        .header('Cache-Control', `public, max-age=${cacheTtlMs / 1000}`)
        .status(200)
        .send(response);
    },
  );
};
