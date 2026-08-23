/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as apis from "../apis.js";
import type * as blogs from "../blogs.js";
import type * as dictionary from "../dictionary.js";
import type * as faqs from "../faqs.js";
import type * as puzzles from "../puzzles.js";
import type * as redirectUrls from "../redirectUrls.js";
import type * as serviceMappings from "../serviceMappings.js";
import type * as urlShortener from "../urlShortener.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  apis: typeof apis;
  blogs: typeof blogs;
  dictionary: typeof dictionary;
  faqs: typeof faqs;
  puzzles: typeof puzzles;
  redirectUrls: typeof redirectUrls;
  serviceMappings: typeof serviceMappings;
  urlShortener: typeof urlShortener;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
