// ../../lib/starter/dist/bootstrap.js
import "dotenv/config";
import "reflect-metadata";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import addFormats from "ajv-formats";
import Fastify from "fastify";

// ../../lib/starter/dist/plugins/auth.js
import fastifyAuth from "@fastify/auth";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";
import jwksClient from "jwks-rsa";

// ../../lib/data/convex/_generated/api.js
import { anyApi, componentsGeneric } from "convex/server";
var api = anyApi;
var components = componentsGeneric();

// ../../lib/data/convex/_generated/server.js
import {
  actionGeneric,
  httpActionGeneric,
  queryGeneric,
  mutationGeneric,
  internalActionGeneric,
  internalMutationGeneric,
  internalQueryGeneric
} from "convex/server";

// ../../lib/data/convex/schema.js
import { defineSchema, defineTable, paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
var AttributeEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  value: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var AttachmentEntitySchema = v.object({
  id: v.string(),
  type: v.union(v.literal("media/image")),
  url: v.nullable(v.string()),
  content: v.nullable(v.string()),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var UserEntitySchema = v.object({
  id: v.string(),
  authId: v.string(),
  email: v.string(),
  alias: v.nullable(v.string()),
  firstName: v.nullable(v.string()),
  lastName: v.nullable(v.string()),
  dateOfBirth: v.nullable(v.string()),
  bio: v.nullable(v.string()),
  preferences: v.array(AttributeEntitySchema),
  role: v.union(v.literal("user"), v.literal("admin")),
  isLocked: v.boolean(),
  avatar: v.nullable(AttachmentEntitySchema),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.number()
});
var UserPreviewEntitySchema = v.object({
  id: v.string(),
  email: v.string(),
  alias: v.nullable(v.string()),
  firstName: v.nullable(v.string()),
  lastName: v.nullable(v.string())
});
var EngagementEntitySchema = v.object({
  views: v.number(),
  comments: v.number(),
  attachments: v.number(),
  reactions: v.number(),
  updatedAt: v.nullable(v.number())
});
var ReactionEntitySchema = v.object({
  id: v.string(),
  user: UserPreviewEntitySchema,
  code: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var CommentParentEntitySchema = v.object({
  id: v.string(),
  content: v.string(),
  createdAt: v.number()
});
var ReplyEntitySchema = v.object({
  id: v.string(),
  user: UserPreviewEntitySchema,
  content: v.string(),
  attachments: v.array(AttachmentEntitySchema),
  viewers: v.array(UserPreviewEntitySchema),
  reactions: v.array(ReactionEntitySchema),
  engagement: EngagementEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var CommentEntitySchema = v.object({
  id: v.string(),
  user: UserPreviewEntitySchema,
  content: v.string(),
  replies: v.array(ReplyEntitySchema),
  attachments: v.array(AttachmentEntitySchema),
  viewers: v.array(UserPreviewEntitySchema),
  reactions: v.array(ReactionEntitySchema),
  engagement: EngagementEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var BlogEntitySchema = v.object({
  id: v.string(),
  user: UserPreviewEntitySchema,
  type: v.union(v.literal("post"), v.literal("topic")),
  tags: v.array(AttributeEntitySchema),
  title: v.string(),
  content: v.string(),
  priority: v.number(),
  isDraft: v.boolean(),
  isPinned: v.boolean(),
  isLocked: v.boolean(),
  comments: v.array(CommentEntitySchema),
  attachments: v.array(AttachmentEntitySchema),
  viewers: v.array(UserPreviewEntitySchema),
  reactions: v.array(ReactionEntitySchema),
  engagement: EngagementEntitySchema,
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.number()
});
var ApiConfigEntitySchema = v.object({
  auth: v.object({
    jkwsUri: v.string(),
    audience: v.string(),
    issuer: v.string()
  })
});
var ApiFeatureEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  enabled: v.boolean(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var ApiSubscriberEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  type: v.union(v.literal("api-key")),
  value: v.string(),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number()),
  lastActivityAt: v.number()
});
var ApiEntitySchema = v.object({
  id: v.string(),
  name: v.string(),
  config: ApiConfigEntitySchema,
  features: v.array(ApiFeatureEntitySchema),
  subscribers: v.array(ApiSubscriberEntitySchema),
  createdAt: v.number(),
  updatedAt: v.nullable(v.number())
});
var schema_default = defineSchema({
  users: defineTable(UserEntitySchema).index("by_public_id", ["id"]).index("by_email", ["email"]).index("by_auth_id", ["authId"]).index("by_alias", ["alias"]),
  blogs: defineTable(BlogEntitySchema).index("by_public_id", ["id"]).index("by_type", ["type"]).index("by_last_activity", ["lastActivityAt"]),
  apis: defineTable(ApiEntitySchema).index("by_public_id", ["id"]).index("by_name", ["name"])
});
var IdSchema = v.object({
  id: v.string()
});
var BlogIdSchema = v.object({
  id: v.id("blogs")
});
var UpdateBlogSchema = v.object({
  id: v.id("blogs"),
  updates: v.object({
    type: v.optional(v.union(v.literal("post"), v.literal("topic"))),
    tags: v.optional(v.array(AttributeEntitySchema)),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    priority: v.optional(v.number()),
    isDraft: v.optional(v.boolean()),
    isPinned: v.optional(v.boolean()),
    isLocked: v.optional(v.boolean()),
    comments: v.optional(v.array(CommentEntitySchema)),
    reactions: v.optional(v.array(ReactionEntitySchema)),
    attachments: v.optional(v.array(AttachmentEntitySchema)),
    viewers: v.optional(v.array(UserPreviewEntitySchema)),
    engagement: v.optional(EngagementEntitySchema),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number())
  })
});
var UserIdSchema = v.object({
  id: v.id("users")
});
var EmailSchema = v.object({
  email: v.string()
});
var AuthIdSchema = v.object({
  authId: v.string()
});
var AliasSchema = v.object({
  alias: v.string()
});
var UpdateUserSchema = v.object({
  id: v.id("users"),
  updates: v.object({
    authId: v.optional(v.string()),
    email: v.optional(v.string()),
    alias: v.optional(v.nullable(v.string())),
    firstName: v.optional(v.nullable(v.string())),
    lastName: v.optional(v.nullable(v.string())),
    dateOfBirth: v.optional(v.nullable(v.string())),
    bio: v.optional(v.nullable(v.string())),
    preferences: v.optional(v.array(AttributeEntitySchema)),
    role: v.optional(v.union(v.literal("user"), v.literal("admin"))),
    isLocked: v.optional(v.boolean()),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number())
  })
});
var BlogTypeSchema = v.object({
  type: v.union(v.literal("post"), v.literal("topic")),
  paginationOpts: paginationOptsValidator
});
var ApiIdSchema = v.object({
  id: v.id("apis")
});
var ApiNameSchema = v.object({
  name: v.string()
});
var UpdateApiSchema = v.object({
  id: v.id("apis"),
  updates: v.object({
    name: v.optional(v.string()),
    config: v.optional(ApiConfigEntitySchema),
    features: v.optional(v.array(ApiFeatureEntitySchema)),
    subscribers: v.optional(v.array(ApiSubscriberEntitySchema)),
    updatedAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number())
  })
});

// ../../lib/util/dist/config.js
import { Type } from "@sinclair/typebox";
var ConfigSchema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal("dev"), Type.Literal("prod"), Type.Literal("test")], {
    default: "dev"
  }),
  PORT: Type.Number({ default: 3e3 }),
  CONVEX_URL: Type.String(),
  LOG_LEVEL: Type.Union([
    Type.Literal("info"),
    Type.Literal("verbose"),
    Type.Literal("debug"),
    Type.Literal("warn"),
    Type.Literal("error")
  ], { default: "error" }),
  API_KEY: Type.String(),
  AUTH_JWKS_URI: Type.String(),
  AUTH_AUDIENCE: Type.String(),
  AUTH_ISSUER: Type.String()
});

// ../../lib/util/dist/data-schema.js
import { Type as Type2 } from "@sinclair/typebox";
var DataSchema = (dataSchema) => Type2.Object({
  code: Type2.String(),
  message: Type2.String(),
  data: dataSchema
});
var PaginatedDataSchema = (dataSchema) => Type2.Object({
  code: Type2.String(),
  message: Type2.String(),
  data: Type2.Array(dataSchema),
  meta: Type2.Object({
    nextCursor: Type2.Union([Type2.String(), Type2.Null()]),
    hasMore: Type2.Boolean()
  })
});
var toData = (args) => {
  const { code = "SUCCESS", message = "Request succeeded", data } = args;
  return {
    code,
    message,
    data
  };
};
var toPaginatedData = (args) => {
  const { code = "SUCCESS", message = "Request succeeded", result, mapper } = args;
  return {
    code,
    message,
    data: result.page.map(mapper),
    meta: {
      nextCursor: result.continueCursor,
      hasMore: !result.isDone
    }
  };
};

// ../../lib/util/dist/date-time.js
var toISO = (timestamp) => {
  const result = timestamp === null ? null : new Date(timestamp).toISOString();
  return result;
};
var now = () => Date.now();

// ../../lib/util/dist/error.js
import { Type as Type3 } from "@sinclair/typebox";
var DomainError = class extends Error {
  code;
  constructor(args) {
    const { message, code = "DOMAIN_ERROR" } = args;
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var NotFoundError = class extends DomainError {
  constructor(args = {}) {
    const { code = "NOT_FOUND", resource = "Resource" } = args;
    const message = `${resource} not found`;
    super({ code, message });
  }
};
var UnauthorizedError = class extends DomainError {
  constructor(args = {}) {
    const { message = "Unauthorized access" } = args;
    const code = "UNAUTHORIZED";
    super({ code, message });
  }
};
var ValidationError = class extends DomainError {
  details;
  constructor(args) {
    const { message = "Validation failed", details = [] } = args;
    const code = "VALIDATION_FAILED";
    super({ code, message });
    this.details = details;
  }
};
var ForbiddenError = class extends DomainError {
  constructor(args = {}) {
    const { message = "Forbidden access" } = args;
    const code = "FORBIDDEN";
    super({ code, message });
  }
};
function isFastifyError(error) {
  return error !== null && typeof error === "object" && ("code" in error || "validation" in error || "statusCode" in error);
}
var AppErrorSchema = Type3.Object({
  code: Type3.String(),
  message: Type3.String(),
  stack: Type3.Optional(Type3.String()),
  details: Type3.Optional(Type3.Array(Type3.Object({
    path: Type3.String(),
    message: Type3.String()
  }))),
  requestId: Type3.String()
});
var toAppError = (args) => {
  const { error, requestId, isProd } = args;
  if (isFastifyError(error) && error.validation) {
    return {
      code: "VALIDATION_ERROR",
      message: "Invalid request data",
      details: error.validation.map((err) => ({
        path: err.instancePath,
        message: err.message ?? ""
      })),
      requestId
    };
  }
  if (error instanceof ValidationError) {
    return {
      code: "VALIDATION_ERROR",
      message: error.message,
      details: error.details,
      requestId
    };
  }
  if (error instanceof UnauthorizedError) {
    return {
      code: "UNAUTHORIZED_ERROR",
      message: error.message,
      requestId
    };
  }
  if (error instanceof ForbiddenError) {
    return {
      code: "FORBIDDEN_ERROR",
      message: error.message,
      requestId
    };
  }
  if (error instanceof NotFoundError) {
    return {
      code: "NOT_FOUND_ERROR",
      message: error.message,
      requestId
    };
  }
  if (error instanceof DomainError) {
    return {
      code: "INTERNAL_SERVER_ERROR",
      message: isProd ? "Internal Server Error" : error.message,
      requestId
    };
  }
  return {
    code: "INTERNAL_SERVER_ERROR",
    message: isProd ? "Internal Server Error" : error.message,
    ...isProd ? {} : { stack: error.stack },
    requestId
  };
};

// ../../lib/util/dist/id.js
import { randomUUID } from "crypto";
var uuid = () => randomUUID();

// ../../lib/util/dist/id-param.js
import { Type as Type4 } from "@sinclair/typebox";
var StaticIdParamSchema = Type4.Object({
  id: Type4.String({
    description: "The Id",
    format: "uui"
  })
});

// ../../lib/util/dist/query.js
import { Type as Type5 } from "@sinclair/typebox";
var QuerySchema = Type5.Object({
  limit: Type5.Optional(Type5.Integer({
    minimum: 1,
    maximum: 100,
    default: 20,
    description: "Number of items to fetch"
  })),
  cursor: Type5.Optional(Type5.Union([Type5.Null(), Type5.String()], {
    default: null,
    description: "The cursor/token for the next set of results"
  }))
});
var toQuery = (query) => ({
  numItems: query.limit ?? 20,
  cursor: query.cursor ?? null
});

// ../../lib/util/dist/token.js
var Tokens = {
  Logger: /* @__PURE__ */ Symbol("logger"),
  AppConfig: /* @__PURE__ */ Symbol("AppConfig"),
  ConvexClient: /* @__PURE__ */ Symbol("ConvexClient")
};

// ../../lib/util/dist/validation.js
import { inject, injectable } from "tsyringe";
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var AsyncValidator = class {
  convex;
  validators = [];
  constructor(convex) {
    this.convex = convex;
  }
  uniqueApiName(args) {
    const { path = "/name", value } = args;
    this.validators.push(async () => {
      const exists = await this.convex.query(api.apis.findByName, {
        name: value
      });
      if (exists != null) {
        return {
          path,
          message: `name '${value}' already exists`
        };
      }
      return null;
    });
    return this;
  }
  uniqueAuthId(args) {
    const { path = "/authId", value } = args;
    this.validators.push(async () => {
      const exists = await this.convex.query(api.users.findByAuthId, {
        authId: value
      });
      if (exists != null) {
        return {
          path,
          message: `authId '${value}' already exists`
        };
      }
      return null;
    });
    return this;
  }
  uniqueAlias(args) {
    const { path = "/alias", value } = args;
    this.validators.push(async () => {
      const exists = await this.convex.query(api.users.findByAlias, {
        alias: value
      });
      if (exists != null) {
        return {
          path,
          message: `alias '${value}' already exists`
        };
      }
      return null;
    });
    return this;
  }
  uniqueEmail(args) {
    const { path = "/email", value } = args;
    this.validators.push(async () => {
      const exists = await this.convex.query(api.users.findByEmail, {
        email: value
      });
      if (exists != null) {
        return {
          path,
          message: `email '${value}' already exists`
        };
      }
      return null;
    });
    return this;
  }
  notEmpty(args) {
    const { path = "/body", value } = args;
    this.validators.push(async () => {
      if (Object.keys(value).length === 0) {
        return {
          path,
          message: "at least one property must be provided for update"
        };
      }
      return null;
    });
    return this;
  }
  async validate(options = {}) {
    const { mode = "parallel" } = options;
    switch (mode) {
      case "parallel": {
        const results = await Promise.all(this.validators.map((v2) => v2()));
        return results.filter((v2) => v2 !== null);
      }
      case "sequential": {
        const errors = [];
        for (const validator of this.validators) {
          const result = await validator();
          if (result) {
            errors.push(result);
          }
        }
        return errors;
      }
      case "fail-fast": {
        for (const validator of this.validators) {
          const result = await validator();
          if (result) {
            return [result];
          }
        }
        return [];
      }
      default:
        return [];
    }
  }
};
var AsyncValidation = class AsyncValidation2 {
  convex;
  constructor(convex) {
    this.convex = convex;
  }
  validator() {
    return new AsyncValidator(this.convex);
  }
};
AsyncValidation = __decorate([
  injectable(),
  __param(0, inject(Tokens.ConvexClient)),
  __metadata("design:paramtypes", [Function])
], AsyncValidation);

// ../../lib/util/dist/assert.js
var assertRequired = (name, prop) => {
  if (prop == null) {
    throw new Error(`Missing required property '${name}'`);
  }
};
var assertHasStringKey = (prop, key) => {
  if (prop == null || typeof prop !== "object" || !(key in prop)) {
    throw new Error(`Missing required property '${key}'`);
  }
};

// ../../lib/domain/dist/api/api.schema.js
import { Type as Type6 } from "@sinclair/typebox";
var FeatureSchema = Type6.Object({
  name: Type6.String(),
  enabled: Type6.Boolean(),
  createdAt: Type6.String({ format: "date-time" }),
  updatedAt: Type6.Union([Type6.String({ format: "date-time" }), Type6.Null()])
});
var SubscriptionSchema = Type6.Object({
  id: Type6.String({ format: "uuid" }),
  name: Type6.String(),
  type: Type6.Union([Type6.Literal("api-key")]),
  value: Type6.String(),
  createdAt: Type6.String({ format: "date-time" }),
  updatedAt: Type6.Union([Type6.String({ format: "date-time" }), Type6.Null()])
});
var ApiConfigSchema = Type6.Object({
  auth: Type6.Object({
    jkwsUri: Type6.String(),
    audience: Type6.String(),
    issuer: Type6.String()
  })
});
var ApiSchema = Type6.Object({
  _id: Type6.String(),
  id: Type6.String({ format: "uuid" }),
  name: Type6.String(),
  config: ApiConfigSchema,
  features: Type6.Array(FeatureSchema),
  subscribers: Type6.Array(SubscriptionSchema),
  createdAt: Type6.String({ format: "date-time" }),
  updatedAt: Type6.Union([Type6.String({ format: "date-time" }), Type6.Null()])
});
var ApiDataSchema = DataSchema(ApiSchema);
var PaginatedApiDataSchema = PaginatedDataSchema(ApiSchema);
var toApi = (request) => ({
  ...request,
  config: {
    ...request.config,
    auth: {
      ...request.config.auth
    }
  },
  features: request.features.map((e) => ({
    ...e,
    createdAt: toISO(e.createdAt),
    updatedAt: toISO(e.updatedAt)
  })),
  subscribers: request.subscribers.map((e) => ({
    ...e,
    createdAt: toISO(e.createdAt),
    updatedAt: toISO(e.updatedAt)
  })),
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt)
});

// ../../lib/domain/dist/api/commands/create-api.command.js
import { Type as Type7 } from "@sinclair/typebox";
import { RequestData } from "mediatr-ts";
var CreateApiSchema = Type7.Object({
  name: Type7.String(),
  config: Type7.Object({
    auth: Type7.Object({
      jkwsUri: Type7.String(),
      audience: Type7.String(),
      issuer: Type7.String()
    })
  })
});
var toCreateApiArgs = (request) => {
  const { create } = request;
  const { config } = create;
  const { auth } = config;
  const createConfig = {
    auth: {
      jkwsUri: auth.jkwsUri,
      audience: auth.audience,
      issuer: auth.issuer
    }
  };
  return {
    ...request,
    id: uuid(),
    name: create.name,
    config: createConfig,
    features: [],
    subscribers: [],
    createdAt: now(),
    updatedAt: null
  };
};
var CreateApiCommand = class extends RequestData {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/create-api.handler.js
import { requestHandler } from "mediatr-ts";
import { inject as inject2, injectable as injectable2 } from "tsyringe";
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata2 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param2 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateApiHandler = class CreateApiHandler2 {
  logger;
  convex;
  validation;
  constructor(logger, convex, validation) {
    this.logger = logger;
    this.convex = convex;
    this.validation = validation;
  }
  async handle(command) {
    const { request } = command;
    const { create } = request;
    const { name } = create;
    this.logger.info({ name }, `Creating api: ${name}`);
    const validator = this.validation.validator();
    validator.uniqueApiName({ value: name });
    const validationDetails = await validator.validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
    const createRequest = toCreateApiArgs(request);
    const { id } = createRequest;
    await this.convex.mutation(api.apis.create, createRequest);
    const created = await this.convex.query(api.apis.find, { id });
    if (created == null) {
      throw new NotFoundError({ resource: `api with id ${id}` });
    }
    return toData({ data: toApi(created) });
  }
};
CreateApiHandler = __decorate2([
  injectable2(),
  requestHandler(CreateApiCommand),
  __param2(0, inject2(Tokens.Logger)),
  __param2(1, inject2(Tokens.ConvexClient)),
  __param2(2, inject2(AsyncValidation)),
  __metadata2("design:paramtypes", [Object, Function, AsyncValidation])
], CreateApiHandler);

// ../../lib/domain/dist/api/commands/create-feature.command.js
import { Type as Type8 } from "@sinclair/typebox";
import { RequestData as RequestData2 } from "mediatr-ts";
var CreateFeatureParamsSchema = Type8.Object({
  apiId: Type8.String({
    description: "The id of the api",
    format: "uuid"
  })
});
var CreateFeatureSchema = Type8.Object({
  name: Type8.String(),
  enabled: Type8.Boolean()
});
var toCreateFeatureArgs = (request) => {
  const { create, existing } = request;
  const createFeature = {
    id: uuid(),
    name: create.name,
    enabled: create.enabled,
    createdAt: now(),
    updatedAt: null
  };
  return {
    id: existing._id,
    updates: {
      features: [...existing.features, createFeature]
    }
  };
};
var CreateFeatureCommand = class extends RequestData2 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/create-feature.handler.js
import { requestHandler as requestHandler2 } from "mediatr-ts";
import { inject as inject3, injectable as injectable3 } from "tsyringe";
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata3 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param3 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateFeatureHandler = class CreateFeatureHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { apiId } = params;
    this.logger.info({ apiId }, `Creating feature for api: ${apiId}`);
    const args = toCreateFeatureArgs(request);
    const updated = await this.convex.mutation(api.apis.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
CreateFeatureHandler = __decorate3([
  injectable3(),
  requestHandler2(CreateFeatureCommand),
  __param3(0, inject3(Tokens.Logger)),
  __param3(1, inject3(Tokens.ConvexClient)),
  __metadata3("design:paramtypes", [Object, Function])
], CreateFeatureHandler);

// ../../lib/domain/dist/api/commands/create-subscriber.command.js
import { Type as Type9 } from "@sinclair/typebox";
import { RequestData as RequestData3 } from "mediatr-ts";
var CreateSubscriberParamsSchema = Type9.Object({
  apiId: Type9.String({
    description: "The id of the api",
    format: "uuid"
  })
});
var CreateSubscriberSchema = Type9.Object({
  name: Type9.String(),
  type: Type9.Union([Type9.Literal("api-key")]),
  value: Type9.String()
});
var toCreateSubscriberArgs = (request) => {
  const { create, existing } = request;
  const createSubscriber = {
    id: uuid(),
    name: create.name,
    type: create.type,
    value: create.value,
    createdAt: now(),
    updatedAt: null,
    lastActivityAt: now()
  };
  return {
    id: existing._id,
    updates: {
      subscribers: [...existing.subscribers, createSubscriber]
    }
  };
};
var CreateSubscriberCommand = class extends RequestData3 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/create-subscriber.handler.js
import { requestHandler as requestHandler3 } from "mediatr-ts";
import { inject as inject4, injectable as injectable4 } from "tsyringe";
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata4 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param4 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateSubscriberHandler = class CreateSubscriberHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { apiId } = params;
    this.logger.info({ apiId }, `Creating subscriber for api: ${apiId}`);
    const args = toCreateSubscriberArgs(request);
    const updated = await this.convex.mutation(api.apis.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
CreateSubscriberHandler = __decorate4([
  injectable4(),
  requestHandler3(CreateSubscriberCommand),
  __param4(0, inject4(Tokens.Logger)),
  __param4(1, inject4(Tokens.ConvexClient)),
  __metadata4("design:paramtypes", [Object, Function])
], CreateSubscriberHandler);

// ../../lib/domain/dist/api/commands/delete-api.command.js
import { RequestData as RequestData4 } from "mediatr-ts";
import { Type as Type10 } from "@sinclair/typebox";
var DeleteApiParamsSchema = Type10.Object({
  apiId: Type10.String({
    description: "The id of the api",
    format: "uuid"
  })
});
var DeleteApiCommand = class extends RequestData4 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/delete-api.handler.js
import { requestHandler as requestHandler4 } from "mediatr-ts";
import { inject as inject5, injectable as injectable5 } from "tsyringe";
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata5 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param5 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteApiHandler = class DeleteApiHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { existing } = request;
    const { _id, id } = existing;
    this.logger.info({ id }, `Deleting api: ${id}`);
    await this.convex.mutation(api.apis.remove, {
      id: _id
    });
  }
};
DeleteApiHandler = __decorate5([
  injectable5(),
  requestHandler4(DeleteApiCommand),
  __param5(0, inject5(Tokens.Logger)),
  __param5(1, inject5(Tokens.ConvexClient)),
  __metadata5("design:paramtypes", [Object, Function])
], DeleteApiHandler);

// ../../lib/domain/dist/api/commands/delete-feature.command.js
import { Type as Type11 } from "@sinclair/typebox";
import { RequestData as RequestData5 } from "mediatr-ts";
var DeleteFeatureParamsSchema = Type11.Object({
  apiId: Type11.String({
    description: "The id of the api",
    format: "uuid"
  }),
  featureId: Type11.String({
    description: "The id of the feature",
    format: "uuid"
  })
});
var toDeleteFeatureArgs = (request) => {
  const { existing, api: api2 } = request;
  const restFeatures = api2.features.filter((feature) => feature.id !== existing.id);
  return {
    id: api2._id,
    updates: {
      features: restFeatures
    }
  };
};
var DeleteFeatureCommand = class extends RequestData5 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/delete-feature.handler.js
import { requestHandler as requestHandler5 } from "mediatr-ts";
import { inject as inject6, injectable as injectable6 } from "tsyringe";
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata6 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param6 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteFeatureHandler = class DeleteFeatureHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { apiId, featureId } = params;
    this.logger.info({ featureId }, `Deleting feature: ${featureId}`);
    const args = toDeleteFeatureArgs(request);
    const updated = await this.convex.mutation(api.apis.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
DeleteFeatureHandler = __decorate6([
  injectable6(),
  requestHandler5(DeleteFeatureCommand),
  __param6(0, inject6(Tokens.Logger)),
  __param6(1, inject6(Tokens.ConvexClient)),
  __metadata6("design:paramtypes", [Object, Function])
], DeleteFeatureHandler);

// ../../lib/domain/dist/api/commands/delete-subscriber.command.js
import { Type as Type12 } from "@sinclair/typebox";
import { RequestData as RequestData6 } from "mediatr-ts";
var DeleteSubscriberParamsSchema = Type12.Object({
  apiId: Type12.String({
    description: "The id of the api",
    format: "uuid"
  }),
  subscriberId: Type12.String({
    description: "The id of the subscriber",
    format: "uuid"
  })
});
var toDeleteSubscriberArgs = (request) => {
  const { existing, api: api2 } = request;
  const restSubscribers = api2.subscribers.filter((subscriber) => subscriber.id !== existing.id);
  return {
    id: api2._id,
    updates: {
      subscribers: restSubscribers
    }
  };
};
var DeleteSubscriberCommand = class extends RequestData6 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/delete-subscriber.handler.js
import { requestHandler as requestHandler6 } from "mediatr-ts";
import { inject as inject7, injectable as injectable7 } from "tsyringe";
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata7 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param7 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteSubscriberHandler = class DeleteSubscriberHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { apiId, subscriberId } = params;
    this.logger.info({ subscriberId }, `Deleting feature: ${subscriberId}`);
    const args = toDeleteSubscriberArgs(request);
    const updated = await this.convex.mutation(api.apis.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
DeleteSubscriberHandler = __decorate7([
  injectable7(),
  requestHandler6(DeleteSubscriberCommand),
  __param7(0, inject7(Tokens.Logger)),
  __param7(1, inject7(Tokens.ConvexClient)),
  __metadata7("design:paramtypes", [Object, Function])
], DeleteSubscriberHandler);

// ../../lib/domain/dist/api/commands/update-api.command.js
import { Type as Type13 } from "@sinclair/typebox";
import { RequestData as RequestData7 } from "mediatr-ts";
var UpdateApiParamsSchema = Type13.Object({
  apiId: Type13.String({
    description: "The id of the api",
    format: "uuid"
  })
});
var UpdateApiSchema2 = Type13.Partial(Type13.Object({
  name: Type13.Optional(Type13.String()),
  config: Type13.Optional(Type13.Object({
    auth: Type13.Optional(Type13.Object({
      jkwsUri: Type13.Optional(Type13.String()),
      audience: Type13.Optional(Type13.String()),
      issuer: Type13.Optional(Type13.String())
    }))
  }))
}));
var toUpdateApiArgs = (request) => {
  const { update, existing } = request;
  const { config } = update;
  const { config: existingConfig } = existing;
  const { auth: existingAuth } = existingConfig;
  const updateConfig = {
    ...config,
    auth: (config?.auth && {
      jkwsUri: config.auth.jkwsUri ?? existingAuth.jkwsUri,
      audience: config.auth.audience ?? existingAuth.audience,
      issuer: config.auth.issuer ?? existingAuth.issuer
    }) ?? { ...existingAuth }
  };
  return {
    id: existing._id,
    updates: {
      name: update.name ?? existing.name,
      config: updateConfig,
      updatedAt: now()
    }
  };
};
var UpdateApiCommand = class extends RequestData7 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/update-api.handler.js
import { requestHandler as requestHandler7 } from "mediatr-ts";
import { inject as inject8, injectable as injectable8 } from "tsyringe";
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata8 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param8 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateApiHandler = class UpdateApiHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { update, params, existing } = request;
    const { apiId } = params;
    this.logger.info({ apiId }, `Updating api: ${apiId}`);
    const updated = await this.convex.mutation(api.apis.update, toUpdateApiArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
UpdateApiHandler = __decorate8([
  injectable8(),
  requestHandler7(UpdateApiCommand),
  __param8(0, inject8(Tokens.Logger)),
  __param8(1, inject8(Tokens.ConvexClient)),
  __metadata8("design:paramtypes", [Object, Function])
], UpdateApiHandler);

// ../../lib/domain/dist/api/commands/update-feature.command.js
import { Type as Type14 } from "@sinclair/typebox";
import { RequestData as RequestData8 } from "mediatr-ts";
var UpdateFeatureParamsSchema = Type14.Object({
  apiId: Type14.String({
    description: "The id of the api",
    format: "uuid"
  }),
  featureId: Type14.String({
    description: "The id of the feature",
    format: "uuid"
  })
});
var UpdateFeatureSchema = Type14.Partial(Type14.Object({
  name: Type14.String(),
  enabled: Type14.Boolean()
}));
var toUpdateFeatureArgs = (request) => {
  const { params, update, existing, api: api2 } = request;
  const { featureId } = params;
  const updateFeature = {
    ...existing,
    name: update.name ?? existing.name,
    enabled: update.enabled ?? existing.enabled,
    updatedAt: now()
  };
  const restFeatures = api2.features.filter((feature) => feature.id !== featureId);
  return {
    id: api2._id,
    updates: {
      features: [...restFeatures, updateFeature],
      lastActivityAt: now()
    }
  };
};
var UpdateFeatureCommand = class extends RequestData8 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/update-feature.handler.js
import { requestHandler as requestHandler8 } from "mediatr-ts";
import { inject as inject9, injectable as injectable9 } from "tsyringe";
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata9 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param9 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateFeatureHandler = class UpdateFeatureHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { featureId, apiId } = params;
    this.logger.info({ featureId }, `Updating feature: ${featureId}`);
    const updated = await this.convex.mutation(api.apis.update, toUpdateFeatureArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
UpdateFeatureHandler = __decorate9([
  injectable9(),
  requestHandler8(UpdateFeatureCommand),
  __param9(0, inject9(Tokens.Logger)),
  __param9(1, inject9(Tokens.ConvexClient)),
  __metadata9("design:paramtypes", [Object, Function])
], UpdateFeatureHandler);

// ../../lib/domain/dist/api/commands/update-subscriber.command.js
import { Type as Type15 } from "@sinclair/typebox";
import { RequestData as RequestData9 } from "mediatr-ts";
var UpdateSubscriberParamsSchema = Type15.Object({
  apiId: Type15.String({
    description: "The id of the api",
    format: "uuid"
  }),
  subscriberId: Type15.String({
    description: "The id of the subscriber",
    format: "uuid"
  })
});
var UpdateSubscriberSchema = Type15.Partial(Type15.Object({
  name: Type15.String(),
  type: Type15.Union([Type15.Literal("api-key")]),
  value: Type15.String()
}));
var toUpdateSubscriberArgs = (request) => {
  const { params, update, existing, api: api2 } = request;
  const { subscriberId } = params;
  const updateSubscriber = {
    ...existing,
    name: update.name ?? existing.name,
    type: update.type ?? existing.type,
    value: update.value ?? existing.value,
    updatedAt: now()
  };
  const restSubscribers = api2.subscribers.filter((subscriber) => subscriber.id !== subscriberId);
  return {
    id: api2._id,
    updates: {
      subscribers: [...restSubscribers, updateSubscriber],
      lastActivityAt: now()
    }
  };
};
var UpdateSubscriberCommand = class extends RequestData9 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/commands/update-subscriber.handler.js
import { requestHandler as requestHandler9 } from "mediatr-ts";
import { inject as inject10, injectable as injectable10 } from "tsyringe";
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata10 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param10 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateSubscriberHandler = class UpdateSubscriberHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { subscriberId, apiId } = params;
    this.logger.info({ subscriberId }, `Updating subscriber: ${subscriberId}`);
    const updated = await this.convex.mutation(api.apis.update, toUpdateSubscriberArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }
    return toData({ data: toApi(updated) });
  }
};
UpdateSubscriberHandler = __decorate10([
  injectable10(),
  requestHandler9(UpdateSubscriberCommand),
  __param10(0, inject10(Tokens.Logger)),
  __param10(1, inject10(Tokens.ConvexClient)),
  __metadata10("design:paramtypes", [Object, Function])
], UpdateSubscriberHandler);

// ../../lib/domain/dist/api/queries/get-api.handler.js
import { requestHandler as requestHandler10 } from "mediatr-ts";
import { inject as inject11, injectable as injectable11 } from "tsyringe";

// ../../lib/domain/dist/api/queries/get-api.query.js
import { Type as Type16 } from "@sinclair/typebox";
import { RequestData as RequestData10 } from "mediatr-ts";
var GetApiParamsSchema = Type16.Object({
  apiId: Type16.String({
    description: "The id of the api",
    format: "uuid"
  })
});
var GetApiQuery = class extends RequestData10 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/queries/get-api.handler.js
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata11 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param11 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetPostHandler = class GetPostHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    const { params } = request;
    const { apiId } = params;
    this.logger.info({ apiId }, `Getting api: ${apiId}`);
    const response = await this.convex.query(api.apis.find, {
      id: apiId
    });
    if (response == null) {
      throw new NotFoundError({ resource: `api with id ${apiId}` });
    }
    return toData({ data: toApi(response) });
  }
};
GetPostHandler = __decorate11([
  injectable11(),
  requestHandler10(GetApiQuery),
  __param11(0, inject11(Tokens.Logger)),
  __param11(1, inject11(Tokens.ConvexClient)),
  __metadata11("design:paramtypes", [Object, Function])
], GetPostHandler);

// ../../lib/domain/dist/api/queries/get-apis.handler.js
import { requestHandler as requestHandler11 } from "mediatr-ts";
import { inject as inject12, injectable as injectable12 } from "tsyringe";

// ../../lib/domain/dist/api/queries/get-apis.query.js
import { RequestData as RequestData11 } from "mediatr-ts";
var GetApisQuery = class extends RequestData11 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/api/queries/get-apis.handler.js
var __decorate12 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata12 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param12 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetPostsHandler = class GetPostsHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    this.logger.info("Getting apis");
    const result = await this.convex.query(api.apis.list, {
      paginationOpts: toQuery(request.query)
    });
    return toPaginatedData({
      result,
      mapper: toApi
    });
  }
};
GetPostsHandler = __decorate12([
  injectable12(),
  requestHandler11(GetApisQuery),
  __param12(0, inject12(Tokens.Logger)),
  __param12(1, inject12(Tokens.ConvexClient)),
  __metadata12("design:paramtypes", [Object, Function])
], GetPostsHandler);

// ../../lib/domain/dist/blog/blog.schema.js
import { Type as Type19 } from "@sinclair/typebox";

// ../../lib/domain/dist/util/attachment.js
import { Type as Type17 } from "@sinclair/typebox";
var AttachmentSchema = Type17.Object({
  id: Type17.String({ format: "uuid" }),
  type: Type17.Union([Type17.Literal("media/image")]),
  url: Type17.Union([Type17.String(), Type17.Null()]),
  content: Type17.Union([Type17.String(), Type17.Null()]),
  createdAt: Type17.String({ format: "date-time" }),
  updatedAt: Type17.Union([Type17.String({ format: "date-time" }), Type17.Null()])
});
var toAttachment = (request) => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt)
});

// ../../lib/domain/dist/util/attribute.js
import { Type as Type18 } from "@sinclair/typebox";
var AttributeSchema = Type18.Object({
  id: Type18.String({ format: "uuid" }),
  name: Type18.String(),
  value: Type18.String(),
  createdAt: Type18.String({ format: "date-time" }),
  updatedAt: Type18.Union([Type18.String({ format: "date-time" }), Type18.Null()])
});
var toAttribute = (request) => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt)
});

// ../../lib/domain/dist/blog/blog.schema.js
var UserPreviewSchema = Type19.Object({
  id: Type19.String({ format: "uuid" }),
  email: Type19.String({ format: "email" }),
  alias: Type19.Union([Type19.String(), Type19.Null()]),
  firstName: Type19.Union([Type19.String(), Type19.Null()]),
  lastName: Type19.Union([Type19.String(), Type19.Null()])
});
var EngagementSchema = Type19.Object({
  views: Type19.Number(),
  comments: Type19.Number(),
  attachments: Type19.Number(),
  reactions: Type19.Number(),
  updatedAt: Type19.Union([Type19.String({ format: "date-time" }), Type19.Null()])
});
var ReactionSchema = Type19.Object({
  id: Type19.String({ format: "uuid" }),
  user: UserPreviewSchema,
  code: Type19.String(),
  createdAt: Type19.String({ format: "date-time" }),
  updatedAt: Type19.Union([Type19.String({ format: "date-time" }), Type19.Null()])
});
var ReplySchema = Type19.Object({
  id: Type19.String({ format: "uuid" }),
  user: UserPreviewSchema,
  content: Type19.Union([Type19.String(), Type19.Null()]),
  createdAt: Type19.String({ format: "date-time" }),
  updatedAt: Type19.Union([Type19.String({ format: "date-time" }), Type19.Null()])
});
var CommentSchema = Type19.Object({
  id: Type19.String({ format: "uuid" }),
  user: UserPreviewSchema,
  content: Type19.String(),
  replies: Type19.Array(ReplySchema),
  attachments: Type19.Array(AttachmentSchema),
  viewers: Type19.Array(UserPreviewSchema),
  reactions: Type19.Array(ReactionSchema),
  engagement: EngagementSchema,
  createdAt: Type19.String({ format: "date-time" }),
  updatedAt: Type19.Union([Type19.String({ format: "date-time" }), Type19.Null()])
});
var BlogSchema = Type19.Object({
  _id: Type19.String(),
  id: Type19.String({ format: "uuid" }),
  user: UserPreviewSchema,
  title: Type19.String(),
  content: Type19.String(),
  type: Type19.Union([Type19.Literal("post"), Type19.Literal("topic")]),
  tags: Type19.Array(AttributeSchema),
  priority: Type19.Number(),
  isDraft: Type19.Boolean(),
  isPinned: Type19.Boolean(),
  isLocked: Type19.Boolean(),
  comments: Type19.Array(CommentSchema),
  attachments: Type19.Array(AttachmentSchema),
  viewers: Type19.Array(UserPreviewSchema),
  reactions: Type19.Array(ReactionSchema),
  engagement: EngagementSchema,
  createdAt: Type19.String({ format: "date-time" }),
  updatedAt: Type19.Union([Type19.String({ format: "date-time" }), Type19.Null()]),
  lastActivityAt: Type19.String({ format: "date-time" })
});
var BlogDataSchema = DataSchema(BlogSchema);
var PaginatedBlogDataSchema = PaginatedDataSchema(BlogSchema);
var toReply = (request) => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt)
});
var toReaction = (request) => ({
  ...request,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt)
});
var toEngagement = (request) => ({
  ...request,
  updatedAt: toISO(request.updatedAt)
});
var toComment = (request) => ({
  ...request,
  replies: request.replies.map(toReply),
  attachments: request.attachments.map(toAttachment),
  reactions: request.reactions.map(toReaction),
  engagement: toEngagement(request.engagement),
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt)
});
var toBlog = (request) => ({
  ...request,
  tags: request.tags.map(toAttribute),
  comments: request.comments.map(toComment),
  attachments: request.attachments.map(toAttachment),
  reactions: request.reactions.map(toReaction),
  engagement: toEngagement(request.engagement),
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
  lastActivityAt: toISO(request.lastActivityAt)
});

// ../../lib/domain/dist/blog/commands/create-blog.command.js
import { Type as Type20 } from "@sinclair/typebox";
import { RequestData as RequestData12 } from "mediatr-ts";
var CreateAttachmentSchema = Type20.Object({
  type: Type20.Union([Type20.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type20.Optional(Type20.String({ description: "URL of the attachment" })),
  content: Type20.Optional(Type20.String({
    description: "Base64 encoded actual content of the attachment"
  }))
});
var CreateBlogSchema = Type20.Object({
  title: Type20.String({ description: "The title of the blog" }),
  content: Type20.String({
    description: "The actual content/description of the blog"
  }),
  userId: Type20.String({ description: "The id of the blog writer" }),
  type: Type20.Union([Type20.Literal("post"), Type20.Literal("topic")], {
    description: "The type of the blog. Whether its a blog post or a topic"
  }),
  tags: Type20.Optional(Type20.Array(Type20.Object({
    name: Type20.String({ description: "Tag name" }),
    value: Type20.String({ description: "Tag value" })
  }), {
    description: "The tags for blog e.g. Category: Technology"
  })),
  priority: Type20.Optional(Type20.Number({
    description: "The priority to be given to the blog. Helps with prioritizing blogs"
  })),
  isDraft: Type20.Optional(Type20.Boolean({ description: "Whether the blog is draft" })),
  isPinned: Type20.Optional(Type20.Boolean({ description: "Whether the blog is pinned" })),
  isLocked: Type20.Optional(Type20.Boolean({ description: "Whether the blog is locked" })),
  attachments: Type20.Optional(Type20.Array(CreateAttachmentSchema, {
    description: "The attachments referenced"
  }))
});
var toCreateBlogArgs = (request) => {
  const { create, user } = request;
  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const createAttachments = create.attachments?.map((attachment) => ({
    id: uuid(),
    type: attachment.type,
    url: attachment.url ?? null,
    content: attachment.content ?? null,
    createdAt: now(),
    updatedAt: null
  })) ?? [];
  const createEngagement = {
    views: 0,
    comments: 0,
    attachments: createAttachments.length,
    reactions: 0,
    updatedAt: null
  };
  return {
    id: uuid(),
    title: create.title,
    content: create.content,
    user: createUser,
    type: create.type,
    tags: [],
    priority: create.priority ?? 5,
    isDraft: create.isDraft ?? false,
    isPinned: create.isPinned ?? false,
    isLocked: create.isLocked ?? false,
    attachments: createAttachments,
    viewers: [],
    reactions: [],
    comments: [],
    engagement: createEngagement,
    createdAt: now(),
    updatedAt: null,
    lastActivityAt: now()
  };
};
var CreateBlogCommand = class extends RequestData12 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/create-blog.handler.js
import { requestHandler as requestHandler12 } from "mediatr-ts";
import { inject as inject13, injectable as injectable13 } from "tsyringe";
var __decorate13 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata13 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param13 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreatePostHandler = class CreatePostHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { create } = request;
    const { title } = create;
    this.logger.info({ title }, `Creating blog: ${title}`);
    const args = toCreateBlogArgs(request);
    await this.convex.mutation(api.blogs.create, args);
    const created = await this.convex.query(api.blogs.find, { id: args.id });
    if (created == null) {
      throw new NotFoundError({ resource: `blog with id ${args.id}` });
    }
    return toData({ data: toBlog(created) });
  }
};
CreatePostHandler = __decorate13([
  injectable13(),
  requestHandler12(CreateBlogCommand),
  __param13(0, inject13(Tokens.Logger)),
  __param13(1, inject13(Tokens.ConvexClient)),
  __metadata13("design:paramtypes", [Object, Function])
], CreatePostHandler);

// ../../lib/domain/dist/blog/commands/create-tag.command.js
import { Type as Type21 } from "@sinclair/typebox";
import { RequestData as RequestData13 } from "mediatr-ts";
var CreateTagParamsSchema = Type21.Object({
  blogId: Type21.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var CreateTagSchema = Type21.Object({
  name: Type21.String({ description: "Tag name" }),
  value: Type21.String({ description: "Tag value" })
});
var toCreateTagArgs = (request) => {
  const { create, existing } = request;
  const createTag = {
    id: uuid(),
    name: create.name,
    value: create.value,
    createdAt: now(),
    updatedAt: null
  };
  return {
    id: existing._id,
    updates: {
      tags: [...existing.tags, createTag]
    }
  };
};
var CreateTagCommand = class extends RequestData13 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/create-tag.handler.js
import { requestHandler as requestHandler13 } from "mediatr-ts";
import { inject as inject14, injectable as injectable14 } from "tsyringe";
var __decorate14 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata14 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param14 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateTagHandler = class CreateTagHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, create } = request;
    const { blogId } = params;
    const { name } = create;
    this.logger.info({ name }, `Creating tag: ${name}`);
    const args = toCreateTagArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateTagHandler = __decorate14([
  injectable14(),
  requestHandler13(CreateTagCommand),
  __param14(0, inject14(Tokens.Logger)),
  __param14(1, inject14(Tokens.ConvexClient)),
  __metadata14("design:paramtypes", [Object, Function])
], CreateTagHandler);

// ../../lib/domain/dist/blog/commands/create-viewer.command.js
import { Type as Type22 } from "@sinclair/typebox";
import { RequestData as RequestData14 } from "mediatr-ts";
var CreateViewerParamsSchema = Type22.Object({
  blogId: Type22.String({
    description: "The id of the blog to update",
    format: "uuid"
  })
});
var CreateViewerSchema = Type22.Object({
  userId: Type22.String({ description: "The id of the blog viewer" })
});
var toCreateViewerArgs = (request) => {
  const { existing, user } = request;
  const createViewer = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const updateViewers = [...existing.viewers, createViewer];
  return {
    id: existing._id,
    updates: {
      viewers: updateViewers,
      engagement: {
        ...existing.engagement,
        views: updateViewers.length
      }
    }
  };
};
var CreateViewerCommand = class extends RequestData14 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/create-viewer.handler.js
import { requestHandler as requestHandler14 } from "mediatr-ts";
import { inject as inject15, injectable as injectable15 } from "tsyringe";
var __decorate15 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata15 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param15 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateViewerHandler = class CreateViewerHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId } = params;
    this.logger.info({ blogId }, `Creating viewer for blog: ${blogId}`);
    const args = toCreateViewerArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateViewerHandler = __decorate15([
  injectable15(),
  requestHandler14(CreateViewerCommand),
  __param15(0, inject15(Tokens.Logger)),
  __param15(1, inject15(Tokens.ConvexClient)),
  __metadata15("design:paramtypes", [Object, Function])
], CreateViewerHandler);

// ../../lib/domain/dist/blog/commands/create-reaction.command.js
import { Type as Type23 } from "@sinclair/typebox";
import { RequestData as RequestData15 } from "mediatr-ts";
var CreateReactionParamsSchema = Type23.Object({
  blogId: Type23.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var CreateReactionSchema = Type23.Object({
  userId: Type23.String({ description: "The id of the reactor" }),
  code: Type23.String({ description: "The ASCII code of the reaction" })
});
var toCreateReactionArgs = (request) => {
  const { create, existing, user } = request;
  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const createReaction = {
    id: uuid(),
    user: createUser,
    code: create.code,
    createdAt: now(),
    updatedAt: null
  };
  const updateReactions = [...existing.reactions, createReaction];
  return {
    id: existing._id,
    updates: {
      reactions: updateReactions,
      engagement: {
        ...existing.engagement,
        reactions: updateReactions.length
      }
    }
  };
};
var CreateReactionCommand = class extends RequestData15 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/create-reaction.handler.js
import { requestHandler as requestHandler15 } from "mediatr-ts";
import { inject as inject16, injectable as injectable16 } from "tsyringe";
var __decorate16 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata16 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param16 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateReactionHandler = class CreateReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId } = params;
    this.logger.info({ blogId }, `Creating reaction for blog: ${blogId}`);
    const args = toCreateReactionArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateReactionHandler = __decorate16([
  injectable16(),
  requestHandler15(CreateReactionCommand),
  __param16(0, inject16(Tokens.Logger)),
  __param16(1, inject16(Tokens.ConvexClient)),
  __metadata16("design:paramtypes", [Object, Function])
], CreateReactionHandler);

// ../../lib/domain/dist/blog/commands/delete-blog.command.js
import { Type as Type24 } from "@sinclair/typebox";
import { RequestData as RequestData16 } from "mediatr-ts";
var DeleteBlogParamsSchema = Type24.Object({
  blogId: Type24.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var DeleteBlogCommand = class extends RequestData16 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/delete-blog.handler.js
import { requestHandler as requestHandler16 } from "mediatr-ts";
import { inject as inject17, injectable as injectable17 } from "tsyringe";
var __decorate17 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata17 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param17 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeletePostHandler = class DeletePostHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { existing } = request;
    const { id } = existing;
    this.logger.info({ id }, `Deleting blog: ${id}`);
    await this.convex.mutation(api.blogs.remove, {
      id: existing._id
    });
  }
};
DeletePostHandler = __decorate17([
  injectable17(),
  requestHandler16(DeleteBlogCommand),
  __param17(0, inject17(Tokens.Logger)),
  __param17(1, inject17(Tokens.ConvexClient)),
  __metadata17("design:paramtypes", [Object, Function])
], DeletePostHandler);

// ../../lib/domain/dist/blog/commands/delete-reaction.command.js
import { Type as Type25 } from "@sinclair/typebox";
import { RequestData as RequestData17 } from "mediatr-ts";
var DeleteReactionParamsSchema = Type25.Object({
  blogId: Type25.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var toDeleteReactionArgs = (request) => {
  const { existing, blog } = request;
  const restReactions = blog.reactions.filter((reaction) => reaction.id !== existing.id);
  return {
    id: blog._id,
    updates: {
      reactions: restReactions,
      engagement: {
        ...blog.engagement,
        reactions: restReactions.length
      }
    }
  };
};
var DeleteReactionCommand = class extends RequestData17 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/delete-reaction.handler.js
import { requestHandler as requestHandler17 } from "mediatr-ts";
import { inject as inject18, injectable as injectable18 } from "tsyringe";
var __decorate18 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata18 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param18 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteReactionHandler = class DeleteReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;
    this.logger.info({ id }, `Deleting reaction: ${id}`);
    const args = toDeleteReactionArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
DeleteReactionHandler = __decorate18([
  injectable18(),
  requestHandler17(DeleteReactionCommand),
  __param18(0, inject18(Tokens.Logger)),
  __param18(1, inject18(Tokens.ConvexClient)),
  __metadata18("design:paramtypes", [Object, Function])
], DeleteReactionHandler);

// ../../lib/domain/dist/blog/commands/delete-tag.command.js
import { Type as Type26 } from "@sinclair/typebox";
import { RequestData as RequestData18 } from "mediatr-ts";
var DeleteTagParamsSchema = Type26.Object({
  blogId: Type26.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var toDeleteTagArgs = (request) => {
  const { existing, blog } = request;
  const restTags = blog.tags.filter((tag) => tag.id !== existing.id);
  return {
    id: blog._id,
    updates: {
      tags: restTags
    }
  };
};
var DeleteTagCommand = class extends RequestData18 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/delete-tag.handler.js
import { requestHandler as requestHandler18 } from "mediatr-ts";
import { inject as inject19, injectable as injectable19 } from "tsyringe";
var __decorate19 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata19 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param19 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteTagHandler = class DeleteTagHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;
    this.logger.info({ id }, `Deleting tag: ${id}`);
    const args = toDeleteTagArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
DeleteTagHandler = __decorate19([
  injectable19(),
  requestHandler18(DeleteTagCommand),
  __param19(0, inject19(Tokens.Logger)),
  __param19(1, inject19(Tokens.ConvexClient)),
  __metadata19("design:paramtypes", [Object, Function])
], DeleteTagHandler);

// ../../lib/domain/dist/blog/commands/update-blog.command.js
import { Type as Type27 } from "@sinclair/typebox";
import { RequestData as RequestData19 } from "mediatr-ts";
var UpdateBlogParamsSchema = Type27.Object({
  blogId: Type27.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var UpdateAttachmentSchema = Type27.Partial(Type27.Object({
  id: Type27.String({
    format: "uuid",
    description: "The id of the attachment"
  }),
  type: Type27.Union([Type27.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type27.Optional(Type27.String({ description: "URL of the attachment" })),
  content: Type27.Optional(Type27.String({
    description: "Base64 encoded actual content of the attachment"
  }))
}));
var UpdateBlogSchema2 = Type27.Partial(Type27.Object({
  title: Type27.String({ description: "The title" }),
  content: Type27.String({
    description: "The actual content"
  }),
  priority: Type27.Number({
    description: "The priority"
  }),
  isDraft: Type27.Boolean({ description: "Whether is draft" }),
  isPinned: Type27.Boolean({ description: "Whether is pinned" }),
  isLocked: Type27.Boolean({ description: "Whether is locked" }),
  attachments: Type27.Array(UpdateAttachmentSchema, {
    description: "The attachments referenced"
  })
}));
var toUpdateBlogArgs = (request) => {
  const { update, existing } = request;
  const updateAttachments = update.attachments?.reduce((acc, curr) => {
    const existingAttachment = existing.attachments.find((existingAttachment2) => existingAttachment2.id === curr.id);
    if (existingAttachment != null) {
      acc.push({
        ...existingAttachment,
        type: curr.type ?? existingAttachment.type,
        url: curr.url ?? existingAttachment.url,
        content: curr.content ?? existingAttachment.content,
        updatedAt: now()
      });
    }
    if (existingAttachment == null && curr.type != null && (curr.url != null || curr.content != null)) {
      acc.push({
        id: uuid(),
        type: curr.type,
        url: curr.url ?? null,
        content: curr.content ?? null,
        createdAt: now(),
        updatedAt: null
      });
    }
    return acc;
  }, []) ?? [];
  const restAttachments = existing.attachments.filter((existingAttachment) => !updateAttachments.some((attachment) => attachment.id === existingAttachment.id));
  return {
    id: existing._id,
    updates: {
      title: update.title ?? existing.title,
      content: update.content ?? existing.content,
      priority: update.priority ?? existing.priority,
      isDraft: update.isDraft ?? existing.isDraft,
      isPinned: update.isPinned ?? existing.isPinned,
      isLocked: update.isLocked ?? existing.isLocked,
      attachments: [...restAttachments, ...updateAttachments],
      updatedAt: Date.now(),
      lastActivityAt: Date.now()
    }
  };
};
var UpdateBlogCommand = class extends RequestData19 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/update-blog.handler.js
import { requestHandler as requestHandler19 } from "mediatr-ts";
import { inject as inject20, injectable as injectable20 } from "tsyringe";
var __decorate20 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata20 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param20 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateBlogHandler = class UpdateBlogHandler2 {
  logger;
  convex;
  validation;
  constructor(logger, convex, validation) {
    this.logger = logger;
    this.convex = convex;
    this.validation = validation;
  }
  async handle(command) {
    const { request } = command;
    const { params, update } = request;
    const { blogId } = params;
    this.logger.info({ blogId }, `Updating blog: ${blogId}`);
    const validationDetails = await this.validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
    const updated = await this.convex.mutation(api.blogs.update, toUpdateBlogArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateBlogHandler = __decorate20([
  injectable20(),
  requestHandler19(UpdateBlogCommand),
  __param20(0, inject20(Tokens.Logger)),
  __param20(1, inject20(Tokens.ConvexClient)),
  __param20(2, inject20(AsyncValidation)),
  __metadata20("design:paramtypes", [Object, Function, AsyncValidation])
], UpdateBlogHandler);

// ../../lib/domain/dist/blog/commands/update-reaction.command.js
import { Type as Type28 } from "@sinclair/typebox";
import { RequestData as RequestData20 } from "mediatr-ts";
var UpdateReactionParamsSchema = Type28.Object({
  blogId: Type28.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  reactionId: Type28.String({
    description: "The id of the reaction",
    format: "uuid"
  })
});
var UpdateReactionSchema = Type28.Object({
  code: Type28.String({ description: "The ASCII code of the reaction" })
});
var toUpdateReactionArgs = (request) => {
  const { params, update, existing, blog } = request;
  const { reactionId } = params;
  const updateReaction = {
    ...existing,
    code: update.code,
    updatedAt: now()
  };
  const restReactions = blog.reactions.filter((reaction) => reaction.id !== reactionId);
  return {
    id: blog._id,
    updates: {
      reactions: [...restReactions, updateReaction]
    }
  };
};
var UpdateReactionCommand = class extends RequestData20 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/update-reaction.handler.js
import { requestHandler as requestHandler20 } from "mediatr-ts";
import { inject as inject21, injectable as injectable21 } from "tsyringe";
var __decorate21 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata21 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param21 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateReactionHandler = class UpdateReactionHandler2 {
  logger;
  convex;
  validation;
  constructor(logger, convex, validation) {
    this.logger = logger;
    this.convex = convex;
    this.validation = validation;
  }
  async handle(command) {
    const { request } = command;
    const { params, update } = request;
    const { reactionId, blogId } = params;
    this.logger.info({ reactionId }, `Updating reaction: ${reactionId}`);
    const validationDetails = await this.validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
    const updated = await this.convex.mutation(api.blogs.update, toUpdateReactionArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateReactionHandler = __decorate21([
  injectable21(),
  requestHandler20(UpdateReactionCommand),
  __param21(0, inject21(Tokens.Logger)),
  __param21(1, inject21(Tokens.ConvexClient)),
  __param21(2, inject21(AsyncValidation)),
  __metadata21("design:paramtypes", [Object, Function, AsyncValidation])
], UpdateReactionHandler);

// ../../lib/domain/dist/blog/commands/update-tag.command.js
import { Type as Type29 } from "@sinclair/typebox";
import { RequestData as RequestData21 } from "mediatr-ts";
var UpdateTagParamsSchema = Type29.Object({
  blogId: Type29.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  tagId: Type29.String({
    description: "The id of the tag",
    format: "uuid"
  })
});
var UpdateTagSchema = Type29.Partial(Type29.Object({
  name: Type29.String({ description: "Tag name" }),
  value: Type29.String({ description: "Tag value" })
}));
var toUpdateTagArgs = (request) => {
  const { params, update, existing, blog } = request;
  const { tagId } = params;
  const updateTag = {
    ...existing,
    name: update.name ?? existing.name,
    value: update.value ?? existing.value,
    updatedAt: now()
  };
  const restTags = blog.tags.filter((tag) => tag.id !== tagId);
  return {
    id: blog._id,
    updates: {
      tags: [...restTags, updateTag]
    }
  };
};
var UpdateTagCommand = class extends RequestData21 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/commands/update-tag.handler.js
import { requestHandler as requestHandler21 } from "mediatr-ts";
import { inject as inject22, injectable as injectable22 } from "tsyringe";
var __decorate22 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata22 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param22 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateTagHandler = class UpdateTagHandler2 {
  logger;
  convex;
  validation;
  constructor(logger, convex, validation) {
    this.logger = logger;
    this.convex = convex;
    this.validation = validation;
  }
  async handle(command) {
    const { request } = command;
    const { params, update } = request;
    const { tagId, blogId } = params;
    this.logger.info({ tagId }, `Updating tag: ${tagId}`);
    const validationDetails = await this.validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
    const updated = await this.convex.mutation(api.blogs.update, toUpdateTagArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateTagHandler = __decorate22([
  injectable22(),
  requestHandler21(UpdateTagCommand),
  __param22(0, inject22(Tokens.Logger)),
  __param22(1, inject22(Tokens.ConvexClient)),
  __param22(2, inject22(AsyncValidation)),
  __metadata22("design:paramtypes", [Object, Function, AsyncValidation])
], UpdateTagHandler);

// ../../lib/domain/dist/blog/queries/get-blog.handler.js
import { requestHandler as requestHandler22 } from "mediatr-ts";
import { inject as inject23, injectable as injectable23 } from "tsyringe";

// ../../lib/domain/dist/blog/queries/get-blog.query.js
import { Type as Type30 } from "@sinclair/typebox";
import { RequestData as RequestData22 } from "mediatr-ts";
var GetBlogParamsSchema = Type30.Object({
  blogId: Type30.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var GetBlogQuery = class extends RequestData22 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/queries/get-blog.handler.js
var __decorate23 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata23 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param23 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetBlogHandler = class GetBlogHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    const { params } = request;
    const { blogId } = params;
    this.logger.info({ blogId }, `Getting blog: ${blogId}`);
    const response = await this.convex.query(api.blogs.find, {
      id: blogId
    });
    if (response == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(response) });
  }
};
GetBlogHandler = __decorate23([
  injectable23(),
  requestHandler22(GetBlogQuery),
  __param23(0, inject23(Tokens.Logger)),
  __param23(1, inject23(Tokens.ConvexClient)),
  __metadata23("design:paramtypes", [Object, Function])
], GetBlogHandler);

// ../../lib/domain/dist/blog/queries/get-blogs.handler.js
import { requestHandler as requestHandler23 } from "mediatr-ts";
import { inject as inject24, injectable as injectable24 } from "tsyringe";

// ../../lib/domain/dist/blog/queries/get-blogs.query.js
import { RequestData as RequestData23 } from "mediatr-ts";
var GetBlogsQuery = class extends RequestData23 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/blog/queries/get-blogs.handler.js
var __decorate24 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata24 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param24 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetBlogsHandler = class GetBlogsHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    this.logger.info("Getting blogs");
    const result = await this.convex.query(api.blogs.list, {
      paginationOpts: toQuery(request.query)
    });
    return toPaginatedData({
      result,
      mapper: toBlog
    });
  }
};
GetBlogsHandler = __decorate24([
  injectable24(),
  requestHandler23(GetBlogsQuery),
  __param24(0, inject24(Tokens.Logger)),
  __param24(1, inject24(Tokens.ConvexClient)),
  __metadata24("design:paramtypes", [Object, Function])
], GetBlogsHandler);

// ../../lib/domain/dist/comment/commands/create-comment.command.js
import { Type as Type31 } from "@sinclair/typebox";
import { RequestData as RequestData24 } from "mediatr-ts";
var CreateCommentParamsSchema = Type31.Object({
  blogId: Type31.String({
    description: "The id of the blog",
    format: "uuid"
  })
});
var CreateAttachmentSchema2 = Type31.Object({
  type: Type31.Union([Type31.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type31.Optional(Type31.String({ description: "URL of the attachment" })),
  content: Type31.Optional(Type31.String({
    description: "Base64 encoded actual content of the attachment"
  }))
});
var CreateCommentSchema = Type31.Object({
  userId: Type31.String({ description: "The id of the author" }),
  content: Type31.String({
    description: "The content"
  }),
  attachments: Type31.Optional(Type31.Array(CreateAttachmentSchema2, {
    description: "The attachments referenced"
  }))
});
var toCreateCommentArgs = (request) => {
  const { create, existing, user } = request;
  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const createAttachments = create.attachments?.map((attachment) => ({
    id: uuid(),
    type: attachment.type,
    url: attachment.url ?? null,
    content: attachment.content ?? null,
    createdAt: now(),
    updatedAt: null
  })) ?? [];
  const createEngagement = {
    views: 0,
    comments: 0,
    attachments: createAttachments.length,
    reactions: 0,
    updatedAt: null
  };
  const createComment = {
    id: uuid(),
    user: createUser,
    content: create.content,
    replies: [],
    attachments: createAttachments,
    viewers: [],
    reactions: [],
    engagement: createEngagement,
    createdAt: now(),
    updatedAt: null
  };
  const updateComments = [...existing.comments, createComment];
  return {
    id: existing._id,
    updates: {
      comments: updateComments,
      engagement: {
        ...existing.engagement,
        comments: updateComments.length
      }
    }
  };
};
var CreateCommentCommand = class extends RequestData24 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/create-comment.handler.js
import { requestHandler as requestHandler24 } from "mediatr-ts";
import { inject as inject25, injectable as injectable25 } from "tsyringe";
var __decorate25 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata25 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param25 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateCommentHandler = class CreateCommentHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId } = params;
    this.logger.info({ blogId }, `Creating comment for blog: ${blogId}`);
    const args = toCreateCommentArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateCommentHandler = __decorate25([
  injectable25(),
  requestHandler24(CreateCommentCommand),
  __param25(0, inject25(Tokens.Logger)),
  __param25(1, inject25(Tokens.ConvexClient)),
  __metadata25("design:paramtypes", [Object, Function])
], CreateCommentHandler);

// ../../lib/domain/dist/comment/commands/create-comment-reaction.command.js
import { Type as Type32 } from "@sinclair/typebox";
import { RequestData as RequestData25 } from "mediatr-ts";
var CreateCommentReactionParamsSchema = Type32.Object({
  blogId: Type32.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type32.String({
    description: "The id of the comment",
    format: "uuid"
  })
});
var CreateCommentReactionSchema = Type32.Object({
  userId: Type32.String({ description: "The id of the reactor" }),
  code: Type32.String({ description: "The ASCII code of the reaction" })
});
var toCreateCommentReactionArgs = (request) => {
  const { create, blog, comment, user } = request;
  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const createReaction = {
    id: uuid(),
    user: createUser,
    code: create.code,
    createdAt: now(),
    updatedAt: null
  };
  const updateReactions = [...comment.reactions, createReaction];
  const updateComment = {
    ...comment,
    reactions: updateReactions,
    engagement: {
      ...comment.engagement,
      reactions: updateReactions.length
    }
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var CreateCommentReactionCommand = class extends RequestData25 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/create-comment-reaction.handler.js
import { requestHandler as requestHandler25 } from "mediatr-ts";
import { inject as inject26, injectable as injectable26 } from "tsyringe";
var __decorate26 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata26 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param26 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateCommentReactionHandler = class CreateCommentReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId, commentId } = params;
    this.logger.info({ commentId }, `Creating reaction for comment: ${commentId}`);
    const args = toCreateCommentReactionArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateCommentReactionHandler = __decorate26([
  injectable26(),
  requestHandler25(CreateCommentReactionCommand),
  __param26(0, inject26(Tokens.Logger)),
  __param26(1, inject26(Tokens.ConvexClient)),
  __metadata26("design:paramtypes", [Object, Function])
], CreateCommentReactionHandler);

// ../../lib/domain/dist/comment/commands/create-comment-viewer.command.js
import { Type as Type33 } from "@sinclair/typebox";
import { RequestData as RequestData26 } from "mediatr-ts";
var CreateCommentViewerParamsSchema = Type33.Object({
  blogId: Type33.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type33.String({
    description: "The id of the comment",
    format: "uuid"
  })
});
var CreateCommentViewerSchema = Type33.Object({
  userId: Type33.String({ description: "The id of the blog viewer" })
});
var toCreateCommentViewerArgs = (request) => {
  const { blog, comment, user } = request;
  const createViewer = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const updateViewers = [...comment.viewers, createViewer];
  const updateComment = {
    ...comment,
    viewers: updateViewers,
    engagement: {
      ...comment.engagement,
      views: updateViewers.length
    }
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var CreateCommentViewerCommand = class extends RequestData26 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/create-comment-viewer.handler.js
import { requestHandler as requestHandler26 } from "mediatr-ts";
import { inject as inject27, injectable as injectable27 } from "tsyringe";
var __decorate27 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata27 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param27 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateCommentViewerHandler = class CreateCommentViewerHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId, commentId } = params;
    this.logger.info({ commentId }, `Creating viewer for comment: ${commentId}`);
    const args = toCreateCommentViewerArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateCommentViewerHandler = __decorate27([
  injectable27(),
  requestHandler26(CreateCommentViewerCommand),
  __param27(0, inject27(Tokens.Logger)),
  __param27(1, inject27(Tokens.ConvexClient)),
  __metadata27("design:paramtypes", [Object, Function])
], CreateCommentViewerHandler);

// ../../lib/domain/dist/comment/commands/delete-comment.command.js
import { Type as Type34 } from "@sinclair/typebox";
import { RequestData as RequestData27 } from "mediatr-ts";
var DeleteCommentParamsSchema = Type34.Object({
  blogId: Type34.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type34.String({
    description: "The id of the comment",
    format: "uuid"
  })
});
var toDeleteCommentArgs = (request) => {
  const { existing, blog } = request;
  const restComments = blog.comments.filter((comment) => comment.id !== existing.id);
  return {
    id: blog._id,
    updates: {
      comments: restComments,
      engagement: {
        ...blog.engagement,
        comments: restComments.length
      }
    }
  };
};
var DeleteCommentCommand = class extends RequestData27 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/delete-comment.handler.js
import { requestHandler as requestHandler27 } from "mediatr-ts";
import { inject as inject28, injectable as injectable28 } from "tsyringe";
var __decorate28 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata28 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param28 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteCommentHandler = class DeleteCommentHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;
    this.logger.info({ id }, `Deleting comment: ${id}`);
    const args = toDeleteCommentArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
DeleteCommentHandler = __decorate28([
  injectable28(),
  requestHandler27(DeleteCommentCommand),
  __param28(0, inject28(Tokens.Logger)),
  __param28(1, inject28(Tokens.ConvexClient)),
  __metadata28("design:paramtypes", [Object, Function])
], DeleteCommentHandler);

// ../../lib/domain/dist/comment/commands/delete-comment-reaction.command.js
import { Type as Type35 } from "@sinclair/typebox";
import { RequestData as RequestData28 } from "mediatr-ts";
var DeleteCommentReactionParamsSchema = Type35.Object({
  blogId: Type35.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type35.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  reactionId: Type35.String({
    description: "The id of the reaction",
    format: "uuid"
  })
});
var toDeleteCommentReactionArgs = (request) => {
  const { existing, blog, comment } = request;
  const restReactions = comment.reactions.filter((reaction) => reaction.id !== existing.id);
  const updateComment = {
    ...comment,
    reactions: restReactions,
    engagement: {
      ...comment.engagement,
      reactions: restReactions.length
    }
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var DeleteCommentReactionCommand = class extends RequestData28 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/delete-comment-reaction.handler.js
import { requestHandler as requestHandler28 } from "mediatr-ts";
import { inject as inject29, injectable as injectable29 } from "tsyringe";
var __decorate29 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata29 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param29 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteCommentReactionHandler = class DeleteCommentReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;
    this.logger.info({ id }, `Deleting reaction: ${id}`);
    const args = toDeleteCommentReactionArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
DeleteCommentReactionHandler = __decorate29([
  injectable29(),
  requestHandler28(DeleteCommentReactionCommand),
  __param29(0, inject29(Tokens.Logger)),
  __param29(1, inject29(Tokens.ConvexClient)),
  __metadata29("design:paramtypes", [Object, Function])
], DeleteCommentReactionHandler);

// ../../lib/domain/dist/comment/commands/update-comment.command.js
import { Type as Type36 } from "@sinclair/typebox";
import { RequestData as RequestData29 } from "mediatr-ts";
var UpdateCommentParamsSchema = Type36.Object({
  blogId: Type36.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type36.String({
    description: "The id of the comment",
    format: "uuid"
  })
});
var UpdateAttachmentSchema2 = Type36.Partial(Type36.Object({
  id: Type36.String({
    format: "uuid",
    description: "The id of the attachment"
  }),
  type: Type36.Union([Type36.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type36.Optional(Type36.String({ description: "URL of the attachment" })),
  content: Type36.Optional(Type36.String({
    description: "Base64 encoded actual content of the attachment"
  }))
}));
var UpdateCommentSchema = Type36.Partial(Type36.Object({
  content: Type36.String({
    description: "The content"
  }),
  attachments: Type36.Array(UpdateAttachmentSchema2, {
    description: "The attachments referenced"
  })
}));
var toUpdateCommentArgs = (request) => {
  const { params, update, existing, blog } = request;
  const { commentId } = params;
  const updateAttachments = update.attachments?.reduce((acc, curr) => {
    const existingAttachment = existing.attachments.find((existingAttachment2) => existingAttachment2.id === curr.id);
    if (existingAttachment != null) {
      acc.push({
        ...existingAttachment,
        type: curr.type ?? existingAttachment.type,
        url: curr.url ?? existingAttachment.url,
        content: curr.content ?? existingAttachment.content,
        updatedAt: now()
      });
    }
    if (existingAttachment == null && curr.type != null && (curr.url != null || curr.content != null)) {
      acc.push({
        id: uuid(),
        type: curr.type,
        url: curr.url ?? null,
        content: curr.content ?? null,
        createdAt: now(),
        updatedAt: null
      });
    }
    return acc;
  }, []) ?? [];
  const restAttachments = existing.attachments.filter((existingAttachment) => !updateAttachments.some((attachment) => attachment.id === existingAttachment.id));
  const updateComment = {
    ...existing,
    content: update.content ?? existing.content,
    attachments: [...restAttachments, ...updateAttachments],
    updatedAt: now()
  };
  const restComments = blog.comments.filter((comment) => comment.id !== commentId);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment],
      lastActivityAt: now()
    }
  };
};
var UpdateCommentCommand = class extends RequestData29 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/update-comment.handler.js
import { requestHandler as requestHandler29 } from "mediatr-ts";
import { inject as inject30, injectable as injectable30 } from "tsyringe";
var __decorate30 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata30 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param30 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateCommentHandler = class UpdateCommentHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, update } = request;
    const { commentId, blogId } = params;
    this.logger.info({ commentId }, `Updating comment: ${commentId}`);
    const updated = await this.convex.mutation(api.blogs.update, toUpdateCommentArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateCommentHandler = __decorate30([
  injectable30(),
  requestHandler29(UpdateCommentCommand),
  __param30(0, inject30(Tokens.Logger)),
  __param30(1, inject30(Tokens.ConvexClient)),
  __metadata30("design:paramtypes", [Object, Function])
], UpdateCommentHandler);

// ../../lib/domain/dist/comment/commands/update-comment-reaction.command.js
import { Type as Type37 } from "@sinclair/typebox";
import { RequestData as RequestData30 } from "mediatr-ts";
var UpdateCommentReactionParamsSchema = Type37.Object({
  blogId: Type37.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type37.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  reactionId: Type37.String({
    description: "The id of the reaction",
    format: "uuid"
  })
});
var UpdateCommentReactionSchema = Type37.Object({
  code: Type37.String({ description: "The ASCII code of the reaction" })
});
var toUpdateCommentReactionArgs = (request) => {
  const { params, update, existing, blog, comment } = request;
  const { reactionId } = params;
  const updateReaction = {
    ...existing,
    code: update.code,
    updatedAt: now()
  };
  const restReactions = comment.reactions.filter((reaction) => reaction.id !== reactionId);
  const updateComment = {
    ...comment,
    reactions: [...restReactions, updateReaction]
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var UpdateCommentReactionCommand = class extends RequestData30 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/comment/commands/update-comment-reaction.handler.js
import { requestHandler as requestHandler30 } from "mediatr-ts";
import { inject as inject31, injectable as injectable31 } from "tsyringe";
var __decorate31 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata31 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param31 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateCommentReactionHandler = class UpdateCommentReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, update } = request;
    const { reactionId, blogId } = params;
    this.logger.info({ reactionId }, `Updating reaction: ${reactionId}`);
    const updated = await this.convex.mutation(api.blogs.update, toUpdateCommentReactionArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateCommentReactionHandler = __decorate31([
  injectable31(),
  requestHandler30(UpdateCommentReactionCommand),
  __param31(0, inject31(Tokens.Logger)),
  __param31(1, inject31(Tokens.ConvexClient)),
  __metadata31("design:paramtypes", [Object, Function])
], UpdateCommentReactionHandler);

// ../../lib/domain/dist/reply/commands/create-comment-reply-reaction.command.js
import { Type as Type38 } from "@sinclair/typebox";
import { RequestData as RequestData31 } from "mediatr-ts";
var CreateCommentReplyReactionParamsSchema = Type38.Object({
  blogId: Type38.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type38.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  replyId: Type38.String({
    description: "The id of the reply",
    format: "uuid"
  })
});
var CreateCommentReplyReactionSchema = Type38.Object({
  userId: Type38.String({ description: "The id of the reactor" }),
  code: Type38.String({ description: "The ASCII code of the reaction" })
});
var toCreateCommentReplyReactionArgs = (request) => {
  const { create, blog, comment, reply, user } = request;
  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const createReaction = {
    id: uuid(),
    user: createUser,
    code: create.code,
    createdAt: now(),
    updatedAt: null
  };
  const updateCommentReply = {
    ...reply,
    reactions: [...reply.reactions, createReaction]
  };
  const restReplies = comment.replies.filter((existingReply) => existingReply.id !== reply.id);
  const updateReplies = [...restReplies, updateCommentReply];
  const updateComment = {
    ...comment,
    replies: updateReplies,
    engagement: {
      ...comment.engagement,
      comments: updateReplies.length
    }
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var CreateCommentReplyReactionCommand = class extends RequestData31 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/create-comment-reply-reaction.handler.js
import { requestHandler as requestHandler31 } from "mediatr-ts";
import { inject as inject32, injectable as injectable32 } from "tsyringe";
var __decorate32 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata32 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param32 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateCommentReplyReactionHandler = class CreateCommentReplyReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId, replyId } = params;
    this.logger.info({ replyId }, `Creating reaction for reply: ${replyId}`);
    const args = toCreateCommentReplyReactionArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateCommentReplyReactionHandler = __decorate32([
  injectable32(),
  requestHandler31(CreateCommentReplyReactionCommand),
  __param32(0, inject32(Tokens.Logger)),
  __param32(1, inject32(Tokens.ConvexClient)),
  __metadata32("design:paramtypes", [Object, Function])
], CreateCommentReplyReactionHandler);

// ../../lib/domain/dist/reply/commands/create-comment-reply.command.js
import { Type as Type39 } from "@sinclair/typebox";
import { RequestData as RequestData32 } from "mediatr-ts";
var CreateCommentReplyParamsSchema = Type39.Object({
  blogId: Type39.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type39.String({
    description: "The id of the comment",
    format: "uuid"
  })
});
var CreateCommentReplyAttachmentSchema = Type39.Object({
  type: Type39.Union([Type39.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type39.Optional(Type39.String({ description: "URL of the attachment" })),
  content: Type39.Optional(Type39.String({
    description: "Base64 encoded actual content of the attachment"
  }))
});
var CreateCommentReplySchema = Type39.Object({
  userId: Type39.String(),
  content: Type39.String({
    description: "The actual content"
  }),
  attachments: Type39.Optional(Type39.Array(CreateCommentReplyAttachmentSchema, {
    description: "The attachments referenced"
  }))
});
var toCreateCommentReplyArgs = (request) => {
  const { create, blog, comment, user } = request;
  const createUser = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const createAttachments = create.attachments?.map((attachment) => ({
    id: uuid(),
    type: attachment.type,
    url: attachment.url ?? null,
    content: attachment.content ?? null,
    createdAt: now(),
    updatedAt: null
  })) ?? [];
  const createEngagement = {
    views: 0,
    comments: 0,
    attachments: createAttachments.length,
    reactions: 0,
    updatedAt: null
  };
  const createReply = {
    id: uuid(),
    user: createUser,
    content: create.content,
    attachments: createAttachments,
    viewers: [],
    reactions: [],
    engagement: createEngagement,
    createdAt: now(),
    updatedAt: null
  };
  const updateReplies = [...comment.replies, createReply];
  const updateComment = {
    ...comment,
    replies: updateReplies,
    engagement: {
      ...comment.engagement,
      comments: updateReplies.length
    }
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var CreateCommentReplyCommand = class extends RequestData32 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/create-comment-reply.handler.js
import { requestHandler as requestHandler32 } from "mediatr-ts";
import { inject as inject33, injectable as injectable33 } from "tsyringe";
var __decorate33 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata33 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param33 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateCommentReplyHandler = class CreateCommentReplyHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId, commentId } = params;
    this.logger.info({ commentId }, `Creating reply for comment: ${commentId}`);
    const args = toCreateCommentReplyArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateCommentReplyHandler = __decorate33([
  injectable33(),
  requestHandler32(CreateCommentReplyCommand),
  __param33(0, inject33(Tokens.Logger)),
  __param33(1, inject33(Tokens.ConvexClient)),
  __metadata33("design:paramtypes", [Object, Function])
], CreateCommentReplyHandler);

// ../../lib/domain/dist/reply/commands/create-comment-reply-viewer.command.js
import { Type as Type40 } from "@sinclair/typebox";
import { RequestData as RequestData33 } from "mediatr-ts";
var CreateCommentReplyViewerParamsSchema = Type40.Object({
  blogId: Type40.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type40.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  replyId: Type40.String({
    description: "The id of the reply",
    format: "uuid"
  })
});
var CreateCommentReplyViewerSchema = Type40.Object({
  userId: Type40.String({ description: "The id of the reply viewer" })
});
var toCreateCommentReplyViewerArgs = (request) => {
  const { blog, comment, reply, user } = request;
  const createViewer = {
    id: user.id,
    email: user.email,
    alias: user.alias,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const updateViewers = [...reply.viewers, createViewer];
  const updateReply = {
    ...reply,
    viewers: updateViewers,
    engagement: {
      ...reply.engagement,
      views: updateViewers.length
    }
  };
  const restReplies = comment.replies.filter((existingReply) => existingReply.id !== reply.id);
  const updateComment = {
    ...comment,
    replies: [...restReplies, updateReply]
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var CreateCommentReplyViewerCommand = class extends RequestData33 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/create-comment-reply-viewer.handler.js
import { requestHandler as requestHandler33 } from "mediatr-ts";
import { inject as inject34, injectable as injectable34 } from "tsyringe";
var __decorate34 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata34 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param34 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateCommentReplyViewerHandler = class CreateCommentReplyViewerHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { blogId, replyId } = params;
    this.logger.info({ replyId }, `Creating viewer for reply: ${replyId}`);
    const args = toCreateCommentReplyViewerArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
CreateCommentReplyViewerHandler = __decorate34([
  injectable34(),
  requestHandler33(CreateCommentReplyViewerCommand),
  __param34(0, inject34(Tokens.Logger)),
  __param34(1, inject34(Tokens.ConvexClient)),
  __metadata34("design:paramtypes", [Object, Function])
], CreateCommentReplyViewerHandler);

// ../../lib/domain/dist/reply/commands/delete-comment-reply-reaction.command.js
import { Type as Type41 } from "@sinclair/typebox";
import { RequestData as RequestData34 } from "mediatr-ts";
var DeleteCommentReplyReactionParamsSchema = Type41.Object({
  blogId: Type41.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type41.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  replyId: Type41.String({
    description: "The id of the reply",
    format: "uuid"
  }),
  reactionId: Type41.String({
    description: "The id of the reaction",
    format: "uuid"
  })
});
var toDeleteCommentReplyReactionArgs = (request) => {
  const { existing, blog, comment, reply } = request;
  const restReactions = reply.reactions.filter((reaction) => reaction.id !== existing.id);
  const updateReply = {
    ...reply,
    reactions: restReactions
  };
  const restReplies = comment.replies.filter((existingReply) => existingReply.id !== reply.id);
  const updateReplies = [...restReplies, updateReply];
  const updateComment = {
    ...comment,
    replies: updateReplies,
    engagement: {
      ...comment.engagement,
      comments: updateReplies.length
    }
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var DeleteCommentReplyReactionCommand = class extends RequestData34 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/delete-comment-reply-reaction.handler.js
import { requestHandler as requestHandler34 } from "mediatr-ts";
import { inject as inject35, injectable as injectable35 } from "tsyringe";
var __decorate35 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata35 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param35 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteCommentReplyReactionHandler = class DeleteCommentReplyReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { reactionId, blogId } = params;
    this.logger.info({ reactionId }, `Deleting reaction: ${reactionId}`);
    const args = toDeleteCommentReplyReactionArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
DeleteCommentReplyReactionHandler = __decorate35([
  injectable35(),
  requestHandler34(DeleteCommentReplyReactionCommand),
  __param35(0, inject35(Tokens.Logger)),
  __param35(1, inject35(Tokens.ConvexClient)),
  __metadata35("design:paramtypes", [Object, Function])
], DeleteCommentReplyReactionHandler);

// ../../lib/domain/dist/reply/commands/delete-comment-reply.command.js
import { Type as Type42 } from "@sinclair/typebox";
import { RequestData as RequestData35 } from "mediatr-ts";
var DeleteCommentReplyParamsSchema = Type42.Object({
  blogId: Type42.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type42.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  replyId: Type42.String({
    description: "The id of the reaction",
    format: "uuid"
  })
});
var toDeleteCommentReplyArgs = (request) => {
  const { existing, blog, comment } = request;
  const restReplies = comment.replies.filter((reply) => reply.id !== existing.id);
  const updateComment = {
    ...comment,
    replies: restReplies
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  const updateComments = [...restComments, updateComment];
  return {
    id: blog._id,
    updates: {
      comments: updateComments,
      engagement: {
        ...comment.engagement,
        comments: updateComments.length
      }
    }
  };
};
var DeleteCommentReplyCommand = class extends RequestData35 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/delete-comment-reply.handler.js
import { requestHandler as requestHandler35 } from "mediatr-ts";
import { inject as inject36, injectable as injectable36 } from "tsyringe";
var __decorate36 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata36 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param36 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteCommentReplyHandler = class DeleteCommentReplyHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { blogId } = params;
    const { id } = existing;
    this.logger.info({ id }, `Deleting reply: ${id}`);
    const args = toDeleteCommentReplyArgs(request);
    const updated = await this.convex.mutation(api.blogs.update, args);
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
DeleteCommentReplyHandler = __decorate36([
  injectable36(),
  requestHandler35(DeleteCommentReplyCommand),
  __param36(0, inject36(Tokens.Logger)),
  __param36(1, inject36(Tokens.ConvexClient)),
  __metadata36("design:paramtypes", [Object, Function])
], DeleteCommentReplyHandler);

// ../../lib/domain/dist/reply/commands/update-comment-reply-reaction.command.js
import { Type as Type43 } from "@sinclair/typebox";
import { RequestData as RequestData36 } from "mediatr-ts";
var UpdateCommentReplyReactionParamsSchema = Type43.Object({
  blogId: Type43.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type43.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  replyId: Type43.String({
    description: "The id of the reply",
    format: "uuid"
  }),
  reactionId: Type43.String({
    description: "The id of the reaction",
    format: "uuid"
  })
});
var UpdateCommentReplyReactionSchema = Type43.Object({
  code: Type43.String({ description: "The ASCII code of the reaction" })
});
var toUpdateCommentReplyReactionArgs = (request) => {
  const { params, update, existing, blog, comment, reply } = request;
  const { reactionId } = params;
  const updateReaction = {
    ...existing,
    code: update.code,
    updatedAt: now()
  };
  const restReactions = reply.reactions.filter((reaction) => reaction.id !== reactionId);
  const updateReply = {
    ...reply,
    reactions: [...restReactions, updateReaction]
  };
  const restReplies = comment.replies.filter((existingReply) => existingReply.id !== reply.id);
  const updateComment = {
    ...comment,
    replies: [...restReplies, updateReply]
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var UpdateCommentReplyReactionCommand = class extends RequestData36 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/update-comment-reply-reaction.handler.js
import { requestHandler as requestHandler36 } from "mediatr-ts";
import { inject as inject37, injectable as injectable37 } from "tsyringe";
var __decorate37 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata37 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param37 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateCommentReplyReactionHandler = class UpdateCommentReplyReactionHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, update } = request;
    const { reactionId, blogId } = params;
    this.logger.info({ reactionId }, `Updating reaction: ${reactionId}`);
    const updated = await this.convex.mutation(api.blogs.update, toUpdateCommentReplyReactionArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateCommentReplyReactionHandler = __decorate37([
  injectable37(),
  requestHandler36(UpdateCommentReplyReactionCommand),
  __param37(0, inject37(Tokens.Logger)),
  __param37(1, inject37(Tokens.ConvexClient)),
  __metadata37("design:paramtypes", [Object, Function])
], UpdateCommentReplyReactionHandler);

// ../../lib/domain/dist/reply/commands/update-comment-reply.command.js
import { Type as Type44 } from "@sinclair/typebox";
import { RequestData as RequestData37 } from "mediatr-ts";
var UpdateCommentReplyParamsSchema = Type44.Object({
  blogId: Type44.String({
    description: "The id of the blog",
    format: "uuid"
  }),
  commentId: Type44.String({
    description: "The id of the comment",
    format: "uuid"
  }),
  replyId: Type44.String({
    description: "The id of the reply",
    format: "uuid"
  })
});
var UpdateCommentReplyAttachmentSchema = Type44.Partial(Type44.Object({
  id: Type44.String({
    format: "uuid",
    description: "The id of the attachment"
  }),
  type: Type44.Union([Type44.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type44.Optional(Type44.String({ description: "URL of the attachment" })),
  content: Type44.Optional(Type44.String({
    description: "Base64 encoded actual content of the attachment"
  }))
}));
var UpdateCommentReplySchema = Type44.Partial(Type44.Object({
  content: Type44.String({ description: "The actual content" }),
  attachments: Type44.Array(UpdateCommentReplyAttachmentSchema, {
    description: "The attachments referenced"
  })
}));
var toUpdateCommentReplyArgs = (request) => {
  const { params, update, existing, blog, comment } = request;
  const { replyId } = params;
  const updateAttachments = update.attachments?.reduce((acc, curr) => {
    const existingAttachment = existing.attachments.find((existingAttachment2) => existingAttachment2.id === curr.id);
    if (existingAttachment != null) {
      acc.push({
        ...existingAttachment,
        type: curr.type ?? existingAttachment.type,
        url: curr.url ?? existingAttachment.url,
        content: curr.content ?? existingAttachment.content,
        updatedAt: now()
      });
    }
    if (existingAttachment == null && curr.type != null && (curr.url != null || curr.content != null)) {
      acc.push({
        id: uuid(),
        type: curr.type,
        url: curr.url ?? null,
        content: curr.content ?? null,
        createdAt: now(),
        updatedAt: null
      });
    }
    return acc;
  }, []) ?? [];
  const restAttachments = existing.attachments.filter((existingAttachment) => !updateAttachments.some((attachment) => attachment.id === existingAttachment.id));
  const updateReply = {
    ...existing,
    content: update.content ?? existing.content,
    attachments: [...restAttachments, ...updateAttachments],
    updatedAt: now()
  };
  const restReplies = comment.replies.filter((reply) => reply.id !== replyId);
  const updateComment = {
    ...comment,
    replies: [...restReplies, updateReply]
  };
  const restComments = blog.comments.filter((existingComment) => existingComment.id !== comment.id);
  return {
    id: blog._id,
    updates: {
      comments: [...restComments, updateComment]
    }
  };
};
var UpdateCommentReplyCommand = class extends RequestData37 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/reply/commands/update-comment-reply.handler.js
import { requestHandler as requestHandler37 } from "mediatr-ts";
import { inject as inject38, injectable as injectable38 } from "tsyringe";
var __decorate38 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata38 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param38 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateCommentReplyHandler = class UpdateCommentReplyHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { replyId, blogId } = params;
    this.logger.info({ replyId }, `Updating reply: ${replyId}`);
    const updated = await this.convex.mutation(api.blogs.update, toUpdateCommentReplyArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `blog with id ${blogId}` });
    }
    return toData({ data: toBlog(updated) });
  }
};
UpdateCommentReplyHandler = __decorate38([
  injectable38(),
  requestHandler37(UpdateCommentReplyCommand),
  __param38(0, inject38(Tokens.Logger)),
  __param38(1, inject38(Tokens.ConvexClient)),
  __metadata38("design:paramtypes", [Object, Function])
], UpdateCommentReplyHandler);

// ../../lib/domain/dist/user/commands/create-user.command.js
import { Type as Type45 } from "@sinclair/typebox";
import { RequestData as RequestData38 } from "mediatr-ts";
var CreateUserSchema = Type45.Object({
  authId: Type45.String({
    description: "The Auth id"
  }),
  email: Type45.String({
    format: "email",
    description: "The email "
  }),
  alias: Type45.Optional(Type45.String({ description: "The alias" })),
  firstName: Type45.Optional(Type45.String({ description: "The firstName" })),
  lastName: Type45.Optional(Type45.String({ description: "The lastName" })),
  dateOfBirth: Type45.Optional(Type45.String({ description: "The dateOfBirth" })),
  bio: Type45.Optional(Type45.String({ description: "The biography" })),
  preferences: Type45.Optional(Type45.Array(Type45.Object({
    name: Type45.String(),
    value: Type45.String()
  }), { default: [], description: "The preferences" })),
  role: Type45.Optional(Type45.Union([Type45.Literal("user"), Type45.Literal("admin")], {
    default: "user",
    description: "The role of the user"
  })),
  isLocked: Type45.Optional(Type45.Boolean({ description: "Whether the user is locked" }))
});
var toCreateUserArgs = (request) => {
  const { create } = request;
  const createPreferences = create.preferences?.map((preference) => ({
    id: uuid(),
    name: preference.name,
    value: preference.value,
    createdAt: now(),
    updatedAt: null
  })) ?? [];
  return {
    id: uuid(),
    authId: create.authId ?? null,
    email: create.email ?? null,
    alias: create.alias ?? null,
    firstName: create.firstName ?? null,
    lastName: create.lastName ?? null,
    dateOfBirth: create.dateOfBirth ?? null,
    bio: create.bio ?? null,
    preferences: createPreferences,
    role: create.role ?? "user",
    isLocked: create.isLocked ?? false,
    avatar: null,
    createdAt: now(),
    updatedAt: null,
    lastActivityAt: now()
  };
};
var CreateUserCommand = class extends RequestData38 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/user/commands/create-user.handler.js
import { requestHandler as requestHandler38 } from "mediatr-ts";
import { inject as inject39, injectable as injectable39 } from "tsyringe";

// ../../lib/domain/dist/user/user.schema.js
import { Type as Type46 } from "@sinclair/typebox";
var UserSchema = Type46.Object({
  _id: Type46.String(),
  id: Type46.String({ format: "uuid" }),
  authId: Type46.Union([Type46.String(), Type46.Null()]),
  email: Type46.Union([Type46.String({ format: "email" })]),
  alias: Type46.Union([Type46.String(), Type46.Null()]),
  firstName: Type46.Union([Type46.String(), Type46.Null()]),
  lastName: Type46.Union([Type46.String(), Type46.Null()]),
  dateOfBirth: Type46.Union([Type46.String(), Type46.Null()]),
  bio: Type46.Union([Type46.String(), Type46.Null()]),
  preferences: Type46.Array(AttributeSchema),
  role: Type46.Union([Type46.Literal("user"), Type46.Literal("admin")]),
  isLocked: Type46.Boolean(),
  createdAt: Type46.String({ format: "date-time" }),
  updatedAt: Type46.Union([Type46.String({ format: "date-time" }), Type46.Null()]),
  lastActivityAt: Type46.String({ format: "date-time" })
});
var UserDataSchema = DataSchema(UserSchema);
var PaginatedUserDataSchema = PaginatedDataSchema(UserSchema);
var toUser = (request) => ({
  _id: request._id,
  id: request.id,
  authId: request.authId,
  email: request.email,
  alias: request.alias,
  firstName: request.firstName,
  lastName: request.lastName,
  dateOfBirth: request.dateOfBirth,
  bio: request.bio,
  preferences: request.preferences.map(toAttribute),
  role: request.role,
  isLocked: request.isLocked,
  createdAt: toISO(request.createdAt),
  updatedAt: toISO(request.updatedAt),
  lastActivityAt: toISO(request.lastActivityAt)
});

// ../../lib/domain/dist/user/commands/create-user.handler.js
var __decorate39 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata39 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param39 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var CreateUserHandler = class CreateUserHandler2 {
  logger;
  convex;
  validation;
  constructor(logger, convex, validation) {
    this.logger = logger;
    this.convex = convex;
    this.validation = validation;
  }
  async handle(command) {
    const { request } = command;
    const { create } = request;
    const { email, alias } = create;
    this.logger.info({ email }, `Creating user: ${email}`);
    const validator = this.validation.validator();
    validator.uniqueEmail({ value: email });
    if (alias != null) {
      validator.uniqueAlias({ value: alias });
    }
    const validationDetails = await validator.validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
    const args = toCreateUserArgs(request);
    const { id } = args;
    await this.convex.mutation(api.users.create, args);
    const created = await this.convex.query(api.users.find, { id });
    if (created == null) {
      throw new NotFoundError({ resource: `user with id ${id}` });
    }
    return toData({ data: toUser(created) });
  }
};
CreateUserHandler = __decorate39([
  injectable39(),
  requestHandler38(CreateUserCommand),
  __param39(0, inject39(Tokens.Logger)),
  __param39(1, inject39(Tokens.ConvexClient)),
  __param39(2, inject39(AsyncValidation)),
  __metadata39("design:paramtypes", [Object, Function, AsyncValidation])
], CreateUserHandler);

// ../../lib/domain/dist/user/commands/delete-user.command.js
import { Type as Type47 } from "@sinclair/typebox";
import { RequestData as RequestData39 } from "mediatr-ts";
var DeleteUserParamsSchema = Type47.Object({
  userId: Type47.String({
    description: "The id of the user",
    format: "uuid"
  })
});
var DeleteUserCommand = class extends RequestData39 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/user/commands/delete-user.handler.js
import { requestHandler as requestHandler39 } from "mediatr-ts";
import { inject as inject40, injectable as injectable40 } from "tsyringe";
var __decorate40 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata40 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param40 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var DeleteUserHandler = class DeleteUserHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params, existing } = request;
    const { userId } = params;
    this.logger.info({ userId }, `Deleting user: ${userId}`);
    await this.convex.mutation(api.users.remove, {
      id: existing._id
    });
  }
};
DeleteUserHandler = __decorate40([
  injectable40(),
  requestHandler39(DeleteUserCommand),
  __param40(0, inject40(Tokens.Logger)),
  __param40(1, inject40(Tokens.ConvexClient)),
  __metadata40("design:paramtypes", [Object, Function])
], DeleteUserHandler);

// ../../lib/domain/dist/user/commands/update-user.command.js
import { Type as Type48 } from "@sinclair/typebox";
import { RequestData as RequestData40 } from "mediatr-ts";
var UpdateUserParamsSchema = Type48.Object({
  userId: Type48.String({
    description: "The id of the user",
    format: "uuid"
  })
});
var UpdateAttachmentSchema3 = Type48.Partial(Type48.Object({
  id: Type48.String({
    format: "uuid",
    description: "The id of the attachment"
  }),
  type: Type48.Union([Type48.Literal("media/image")], {
    description: "Type of attachment"
  }),
  url: Type48.Optional(Type48.String({ description: "URL of the attachment" })),
  content: Type48.Optional(Type48.String({
    description: "Base64 encoded actual content of the attachment"
  }))
}));
var UpdateUserSchema2 = Type48.Partial(Type48.Object({
  authId: Type48.String({
    description: "The Auth id"
  }),
  email: Type48.String({
    format: "email",
    description: "The email "
  }),
  alias: Type48.Optional(Type48.String({ description: "The alias" })),
  firstName: Type48.Optional(Type48.String({ description: "The firstName" })),
  lastName: Type48.Optional(Type48.String({ description: "The lastName" })),
  dateOfBirth: Type48.Optional(Type48.String({ description: "The dateOfBirth" })),
  bio: Type48.Optional(Type48.String({ description: "The biography" })),
  preferences: Type48.Optional(Type48.Array(Type48.Object({
    name: Type48.String(),
    value: Type48.String()
  }), { default: [], description: "The preferences" })),
  role: Type48.Optional(Type48.Union([Type48.Literal("user"), Type48.Literal("admin")], {
    default: "user",
    description: "The role of the user"
  })),
  isLocked: Type48.Optional(Type48.Boolean({ description: "Whether the user is locked" }))
}));
var toUpdateUserArgs = (request) => {
  const { update, existing } = request;
  return {
    id: existing._id,
    updates: {
      authId: update.authId ?? existing.authId,
      email: update.email ?? existing.email,
      alias: update.alias ?? existing.alias,
      firstName: update.firstName ?? existing.firstName,
      lastName: update.lastName ?? existing.lastName,
      dateOfBirth: update.dateOfBirth ?? existing.dateOfBirth,
      bio: update.bio ?? existing.bio,
      role: update.role ?? existing.role,
      isLocked: update.isLocked ?? existing.isLocked,
      updatedAt: now(),
      lastActivityAt: now()
    }
  };
};
var UpdateUserCommand = class extends RequestData40 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/user/commands/update-user.handler.js
import { requestHandler as requestHandler40 } from "mediatr-ts";
import { inject as inject41, injectable as injectable41 } from "tsyringe";
var __decorate41 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata41 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param41 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var UpdateUserHandler = class UpdateUserHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(command) {
    const { request } = command;
    const { params } = request;
    const { userId } = params;
    this.logger.info({ userId }, `Updating user: ${userId}`);
    const updated = await this.convex.mutation(api.users.update, toUpdateUserArgs(request));
    if (updated == null) {
      throw new NotFoundError({ resource: `user with id ${userId}` });
    }
    return toData({ data: toUser(updated) });
  }
};
UpdateUserHandler = __decorate41([
  injectable41(),
  requestHandler40(UpdateUserCommand),
  __param41(0, inject41(Tokens.Logger)),
  __param41(1, inject41(Tokens.ConvexClient)),
  __metadata41("design:paramtypes", [Object, Function])
], UpdateUserHandler);

// ../../lib/domain/dist/user/queries/get-user.handler.js
import { requestHandler as requestHandler41 } from "mediatr-ts";
import { inject as inject42, injectable as injectable42 } from "tsyringe";

// ../../lib/domain/dist/user/queries/get-user.query.js
import { Type as Type49 } from "@sinclair/typebox";
import { RequestData as RequestData41 } from "mediatr-ts";
var GetUserParamsSchema = Type49.Object({
  userId: Type49.String({
    description: "The id of the user",
    format: "uuid"
  })
});
var GetUserQuery = class extends RequestData41 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/user/queries/get-user.handler.js
var __decorate42 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata42 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param42 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetUserHandler = class GetUserHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    const { params } = request;
    const { userId } = params;
    this.logger.info({ userId }, `Getting user: ${userId}`);
    const response = await this.convex.query(api.users.find, {
      id: userId
    });
    if (response == null) {
      throw new NotFoundError({ resource: `user with id ${userId}` });
    }
    return toData({ data: toUser(response) });
  }
};
GetUserHandler = __decorate42([
  injectable42(),
  requestHandler41(GetUserQuery),
  __param42(0, inject42(Tokens.Logger)),
  __param42(1, inject42(Tokens.ConvexClient)),
  __metadata42("design:paramtypes", [Object, Function])
], GetUserHandler);

// ../../lib/domain/dist/user/queries/get-user-by-auth-id.handler.js
import { requestHandler as requestHandler42 } from "mediatr-ts";
import { inject as inject43, injectable as injectable43 } from "tsyringe";

// ../../lib/domain/dist/user/queries/get-user-by-auth-id.query.js
import { Type as Type50 } from "@sinclair/typebox";
import { RequestData as RequestData42 } from "mediatr-ts";
var GetUserByAuthIdParamsSchema = Type50.Object({
  authId: Type50.String({
    description: "The authId of the user"
  })
});
var GetUserByAuthIdQuery = class extends RequestData42 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/user/queries/get-user-by-auth-id.handler.js
var __decorate43 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata43 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param43 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetUserByAuthIdHandler = class GetUserByAuthIdHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    const { params } = request;
    const { authId } = params;
    this.logger.info({ authId }, `Getting user by auth id: ${authId}`);
    const response = await this.convex.query(api.users.findByAuthId, {
      authId
    });
    if (response == null) {
      throw new NotFoundError({ resource: `user with authId ${authId}` });
    }
    return toData({ data: toUser(response) });
  }
};
GetUserByAuthIdHandler = __decorate43([
  injectable43(),
  requestHandler42(GetUserByAuthIdQuery),
  __param43(0, inject43(Tokens.Logger)),
  __param43(1, inject43(Tokens.ConvexClient)),
  __metadata43("design:paramtypes", [Object, Function])
], GetUserByAuthIdHandler);

// ../../lib/domain/dist/user/queries/get-users.handler.js
import { requestHandler as requestHandler43 } from "mediatr-ts";
import { inject as inject44, injectable as injectable44 } from "tsyringe";

// ../../lib/domain/dist/user/queries/get-users.query.js
import { RequestData as RequestData43 } from "mediatr-ts";
var GetUsersQuery = class extends RequestData43 {
  request;
  constructor(request) {
    super();
    this.request = request;
  }
};

// ../../lib/domain/dist/user/queries/get-users.handler.js
var __decorate44 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata44 = function(k, v2) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v2);
};
var __param44 = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var GetUsersHandler = class GetUsersHandler2 {
  logger;
  convex;
  constructor(logger, convex) {
    this.logger = logger;
    this.convex = convex;
  }
  async handle(query) {
    const { request } = query;
    this.logger.info("Getting users");
    const result = await this.convex.query(api.users.list, {
      paginationOpts: toQuery(request.query)
    });
    return toPaginatedData({
      result,
      mapper: toUser
    });
  }
};
GetUsersHandler = __decorate44([
  injectable44(),
  requestHandler43(GetUsersQuery),
  __param44(0, inject44(Tokens.Logger)),
  __param44(1, inject44(Tokens.ConvexClient)),
  __metadata44("design:paramtypes", [Object, Function])
], GetUsersHandler);

// ../../lib/starter/dist/modules/auth/hooks/auth.hook.js
var verifyApiKey = (config) => {
  return async (request, _) => {
    const apiKey = request.headers["x-api-key"];
    if (apiKey == null || apiKey !== config.API_KEY) {
      throw new UnauthorizedError();
    }
    request.auth = { type: "api" };
  };
};
var verifyJwt = (convex) => {
  return async (request, _reply) => {
    try {
      if (request.headers.authorization == null) {
        throw new UnauthorizedError();
      }
      await request.jwtVerify();
      const { user } = request;
      const authId = user.sub;
      const email = user.email ?? "";
      try {
        const userResponse = await convex.query(api.users.findByAuthId, { authId });
        if (userResponse == null) {
          throw new NotFoundError({ resource: `user with authId ${authId}` });
        }
        request.auth = {
          type: "user",
          user: userResponse
        };
      } catch (err) {
        request.log.info("A Jwt for an unregistered was sent. Attempting to auto register user");
        if (err instanceof NotFoundError) {
          const create = toCreateUserArgs({ create: { authId, email } });
          const { id } = create;
          await convex.mutation(api.users.create, create);
          const created = await convex.query(api.users.find, { id });
          if (created == null) {
            request.log.warn("Created user missing");
            throw new NotFoundError({ resource: `user with id ${id}` });
          }
          request.auth = {
            type: "user",
            user: created
          };
        }
      }
    } catch (_err) {
      console.log(_err);
      throw new UnauthorizedError();
    }
  };
};

// ../../lib/starter/dist/util/user.js
var verifyCreateUser = async (validation, request) => {
  const { authId, email, alias } = request.body;
  const validator = validation.validator();
  validator.uniqueAuthId({ value: authId }).uniqueEmail({ value: email });
  if (alias != null) {
    validator.uniqueAlias({ value: alias });
  }
  const validationDetails = await validator.validate();
  if (validationDetails.length > 0) {
    throw new ValidationError({ details: validationDetails });
  }
};
var verifyUpdateUser = async (convex, request) => {
  const { auth, userRequest } = request;
  assertRequired("auth", auth);
  assertHasStringKey(request.params, "userId");
  assertRequired("userRequest", userRequest);
  const { userId } = request.params;
  const { authId, email, alias } = userRequest;
  const validationDetails = [];
  if (authId != null) {
    const response = await convex.query(api.users.findByAuthId, { authId });
    if (response != null && response.id !== userId) {
      validationDetails.push({ path: "/authId", message: `authId '${authId} already exists` });
    }
  }
  if (email != null) {
    const response = await convex.query(api.users.findByEmail, { email });
    if (response != null && response.id !== userId) {
      validationDetails.push({ path: "/email", message: `email '${email} already exists` });
    }
  }
  if (alias != null) {
    const response = await convex.query(api.users.findByAlias, { alias });
    if (response != null && response.id !== userId) {
      validationDetails.push({ path: "/alias", message: `alias '${email} already exists` });
    }
  }
  if (validationDetails.length > 0) {
    throw new ValidationError({ details: validationDetails });
  }
};
var verifyMutateUser = async (convex, request) => {
  const { auth } = request;
  assertRequired("auth", auth);
  assertHasStringKey(request.params, "userId");
  const { userId } = request.params;
  const userResponse = await convex.query(api.users.find, { id: userId });
  if (userResponse == null) {
    throw new NotFoundError({ resource: `user with id ${userId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (userResponse.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.userRequest = userResponse;
};

// ../../lib/starter/dist/modules/auth/hooks/verify-create-user.hook.js
var verifyCreateUserHook = (validation) => {
  return async (request, _) => {
    await verifyCreateUser(validation, request);
  };
};

// ../../lib/starter/dist/modules/auth/hooks/verify-delete-user.hook.js
var verifyDeleteUserHook = (convex) => {
  return async (request, _) => {
    await verifyMutateUser(convex, request);
  };
};

// ../../lib/starter/dist/modules/auth/hooks/verify-update-user.hook.js
var verifyUpdateUserHook = (convex) => {
  return async (request, _) => {
    await verifyMutateUser(convex, request);
    await verifyUpdateUser(convex, request);
  };
};

// ../../lib/starter/dist/modules/auth/auth.routes.js
import { container } from "tsyringe";
var authRoutes = async (fastify) => {
  const validation = container.resolve(AsyncValidation);
  const { authenticate, mediator } = fastify;
  fastify.post("/auth/register", {
    schema: {
      description: "Register a user",
      tags: ["Auth"],
      body: CreateUserSchema,
      response: {
        201: UserDataSchema,
        400: AppErrorSchema,
        500: AppErrorSchema
      }
    },
    preHandler: [authenticate, verifyCreateUserHook(validation)]
  }, async (request, reply) => {
    const { body } = request;
    const command = new CreateUserCommand({ create: body });
    const response = await mediator.send(command);
    return reply.status(201).send(response);
  });
};

// ../../lib/starter/dist/modules/auth/users.routes.js
import { container as container2 } from "tsyringe";
import { Type as Type51 } from "@sinclair/typebox";
var usersRoutes = async (fastify) => {
  const validation = container2.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;
  fastify.post("/users", {
    schema: {
      description: "Create user",
      tags: ["Users"],
      body: CreateUserSchema,
      response: {
        201: UserDataSchema,
        400: AppErrorSchema,
        500: AppErrorSchema
      }
    },
    preHandler: [authenticate, verifyCreateUserHook(validation)]
  }, async (request, reply) => {
    const { body } = request;
    const command = new CreateUserCommand({ create: body });
    const response = await mediator.send(command);
    return reply.status(201).send(response);
  });
  fastify.get("/users/:userId", {
    schema: {
      description: "Get a user",
      tags: ["Users"],
      params: GetUserParamsSchema,
      response: {
        200: UserDataSchema,
        400: AppErrorSchema,
        404: AppErrorSchema,
        500: AppErrorSchema
      }
    },
    preHandler: [authenticate]
  }, async (request, reply) => {
    const { params } = request;
    const query = new GetUserQuery({ params });
    const response = await mediator.send(query);
    return reply.status(200).send(response);
  });
  fastify.get("/users", {
    schema: {
      description: "Get users",
      tags: ["Users"],
      querystring: QuerySchema,
      response: {
        200: PaginatedUserDataSchema,
        400: AppErrorSchema,
        500: AppErrorSchema
      }
    },
    preHandler: [authenticate]
  }, async (request, reply) => {
    const query = new GetUsersQuery({ query: request.query });
    const response = await mediator.send(query);
    return reply.status(200).send(response);
  });
  fastify.patch("/users/:userId", {
    schema: {
      description: "Update a user",
      tags: ["Users"],
      params: UpdateUserParamsSchema,
      body: UpdateUserSchema2,
      response: {
        200: UserDataSchema,
        400: AppErrorSchema,
        404: AppErrorSchema,
        500: AppErrorSchema
      }
    },
    preHandler: [authenticate, verifyUpdateUserHook(convex)]
  }, async (request, reply) => {
    const { params, body, userRequest } = request;
    assertRequired("userRequest", userRequest);
    const command = new UpdateUserCommand({ params, update: body, existing: userRequest });
    const response = await mediator.send(command);
    return reply.status(200).send(response);
  });
  fastify.delete("/users/:userId", {
    schema: {
      description: "Delete a user",
      tags: ["Users"],
      params: DeleteUserParamsSchema,
      response: {
        204: Type51.Null(),
        400: AppErrorSchema,
        404: AppErrorSchema,
        500: AppErrorSchema
      }
    },
    preHandler: [authenticate, verifyDeleteUserHook(convex)]
  }, async (request, reply) => {
    const { params, userRequest } = request;
    assertRequired("userRequest", userRequest);
    const command = new DeleteUserCommand({ params, existing: userRequest });
    await mediator.send(command);
    return reply.status(204).send(null);
  });
};

// ../../lib/starter/dist/plugins/auth.js
var authPlugin = fp(async (fastify) => {
  const { config, convex } = fastify;
  const client = jwksClient({
    jwksUri: config.AUTH_JWKS_URI,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5
  });
  await fastify.register(fastifyJwt, {
    decode: {
      complete: true
    },
    secret: async (_request, token) => {
      if (!token || !("header" in token) || token.header?.kid == null) {
        throw new Error("Missing kid");
      }
      const key = await client.getSigningKey(token.header.kid);
      return key.getPublicKey();
    },
    verify: {
      allowedAud: config.AUTH_AUDIENCE,
      allowedIss: config.AUTH_ISSUER,
      algorithms: ["RS256"]
    }
  });
  await fastify.register(fastifyAuth);
  fastify.decorate("authenticate", fastify.auth([verifyApiKey(config), verifyJwt(convex)], {
    relation: "or"
  }));
});

// ../../lib/starter/dist/plugins/config.js
import fastifyEnv from "@fastify/env";
import fp2 from "fastify-plugin";
var configPlugin = fp2(async (fastify) => {
  const options = {
    confKey: "config",
    schema: ConfigSchema,
    dotenv: true,
    // Look for .env files
    data: process.env
    // Merge process.env with the validated file data
  };
  return fastify.register(fastifyEnv, options);
}, { name: "config" });

// ../../lib/starter/dist/plugins/convex.js
import { ConvexHttpClient } from "convex/browser";
import fp3 from "fastify-plugin";
var convexPlugin = fp3(async (fastify) => {
  const client = new ConvexHttpClient(fastify.config.CONVEX_URL);
  fastify.decorate("convex", client);
});

// ../../lib/starter/dist/plugins/error-handler.js
import fp4 from "fastify-plugin";
var errorHandlerPlugin = fp4(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    const { id } = request;
    request.log.error({ err: error }, "Request failed");
    const isProd = fastify.config.NODE_ENV === "prod";
    const appError = toAppError({ error, isProd, requestId: id });
    switch (appError.code) {
      case "VALIDATION_ERROR":
        reply.status(400).send(appError);
        break;
      case "UNAUTHORIZED_ERROR":
        reply.status(401).send(appError);
        break;
      case "FORBIDDEN_ERROR":
        reply.status(403).send(appError);
        break;
      case "NOT_FOUND_ERROR":
        reply.status(404).send(appError);
        break;
      default:
        reply.status(500).send(appError);
    }
  });
});

// ../../lib/starter/dist/plugins/mediator.js
import fp5 from "fastify-plugin";
import { Mediator } from "mediatr-ts";
import { container as container3 } from "tsyringe";
var TsyringeResolver = class {
  resolve(type) {
    return container3.resolve(type);
  }
  add(type) {
    container3.register(type, { useClass: type });
  }
};
var mediatorPlugin = fp5(async (fastify) => {
  container3.register(Tokens.Logger, { useValue: fastify.log });
  container3.register(Tokens.ConvexClient, { useValue: fastify.convex });
  const mediator = new Mediator({
    resolver: new TsyringeResolver()
  });
  fastify.decorate("mediator", mediator);
});

// ../../lib/starter/dist/plugins/routes.js
import fp6 from "fastify-plugin";
var routesPlugin = fp6(async (fastify, { routePrefix }) => {
  await fastify.register(authRoutes, {
    prefix: routePrefix
  });
  await fastify.register(usersRoutes, {
    prefix: routePrefix
  });
});

// ../../lib/starter/dist/bootstrap.js
var bootstrap = async (config) => {
  const { routePrefix, docs } = config;
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || "info",
      redact: ["req.headers.authorization", "body.password", "body.email"],
      serializers: {
        req: (req) => ({ method: req.method, url: req.url, ip: req.ip })
      }
    },
    ajv: {
      customOptions: {
        removeAdditional: "all",
        coerceTypes: true,
        useDefaults: true,
        allErrors: true
      },
      plugins: [(ajv) => addFormats.default(ajv, { mode: "full" })]
    }
  }).withTypeProvider();
  await app.register(configPlugin);
  await app.register(convexPlugin);
  await app.register(mediatorPlugin);
  await app.register(authPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(swagger, {
    openapi: {
      info: {
        title: docs.title,
        description: docs.description,
        version: docs.version
      }
    }
  });
  await app.register(swaggerUi, {
    routePrefix: `${routePrefix}/docs`
  });
  await app.register(routesPlugin, { routePrefix });
  return app;
};
var serverless = async (app, req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};

// src/plugins/routes.ts
import fp7 from "fastify-plugin";

// src/modules/util/blog.ts
var verifyMutateBlog = async (convex, request) => {
  const { auth } = request;
  assertRequired("auth", auth);
  assertHasStringKey(request.params, "blogId");
  const { blogId } = request.params;
  const response = await convex.query(api.blogs.find, { id: blogId });
  if (response == null) {
    throw new NotFoundError({ resource: `blog with id ${blogId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (response.user.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.blog = response;
};
var verifyMutateReaction = async (convex, request) => {
  await verifyMutateBlog(convex, request);
  const { auth, params, blog } = request;
  assertRequired("auth", auth);
  assertHasStringKey(params, "reactionId");
  assertRequired("blog", blog);
  const { reactionId } = params;
  const reactionResponse = blog.reactions.find((reaction) => reaction.id == reactionId);
  if (reactionResponse == null) {
    throw new NotFoundError({ resource: `reaction with id ${reactionId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (reactionResponse.user.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.reaction = reactionResponse;
};
var verifyMutateTag = async (convex, request) => {
  await verifyMutateBlog(convex, request);
  const { auth, params, blog } = request;
  assertRequired("auth", auth);
  assertHasStringKey(params, "tagId");
  assertRequired("blog", blog);
  const { tagId } = params;
  const tagResponse = blog.tags.find((tag) => tag.id == tagId);
  if (tagResponse == null) {
    throw new NotFoundError({ resource: `tag with id ${tagId}` });
  }
  request.tag = tagResponse;
};
var verifyUpdateBlog = async (convex, validation, request) => {
  await verifyMutateBlog(convex, request);
  const update = request.body;
  const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
  if (validationDetails.length > 0) {
    throw new ValidationError({ details: validationDetails });
  }
};

// src/modules/util/comment.ts
var verifyMutateComment = async (convex, request) => {
  await verifyMutateBlog(convex, request);
  const { auth, params, blog } = request;
  assertRequired("auth", auth);
  assertHasStringKey(params, "commentId");
  assertRequired("blog", blog);
  const { commentId } = params;
  const comment = blog.comments.find((comment2) => comment2.id == commentId);
  if (comment == null) {
    throw new NotFoundError({ resource: `comment with id ${commentId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (comment.user.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.comment = comment;
};
var verifyMutateCommentReaction = async (convex, request) => {
  await verifyMutateBlog(convex, request);
  const { auth, params, comment } = request;
  assertRequired("auth", auth);
  assertHasStringKey(params, "reactionId");
  assertRequired("comment", comment);
  const { reactionId } = params;
  const reactionResponse = comment.reactions.find((reaction) => reaction.id == reactionId);
  if (reactionResponse == null) {
    throw new NotFoundError({ resource: `reaction with id ${reactionId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (reactionResponse.user.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.reaction = reactionResponse;
};
var verifyUpdateComment = async (convex, validation, request) => {
  await verifyMutateComment(convex, request);
  const update = request.body;
  const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
  if (validationDetails.length > 0) {
    throw new ValidationError({ details: validationDetails });
  }
};

// src/modules/util/reply.ts
var verifyMutateCommentReply = async (convex, request) => {
  await verifyMutateComment(convex, request);
  const { auth, params, blog, comment } = request;
  assertRequired("auth", auth);
  assertHasStringKey(params, "replyId");
  assertRequired("blog", blog);
  assertRequired("comment", comment);
  const { replyId } = params;
  const reply = comment.replies.find((reply2) => reply2.id == replyId);
  if (reply == null) {
    throw new NotFoundError({ resource: `reply with id ${replyId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (reply.user.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.commentReply = reply;
};
var verifyMutateCommentReplyReaction = async (convex, request) => {
  await verifyMutateCommentReply(convex, request);
  const { auth, params, commentReply } = request;
  assertRequired("auth", auth);
  assertHasStringKey(params, "reactionId");
  assertRequired("commentReply", commentReply);
  const { reactionId } = params;
  const reactionResponse = commentReply.reactions.find((reaction) => reaction.id == reactionId);
  if (reactionResponse == null) {
    throw new NotFoundError({ resource: `reaction with id ${reactionId}` });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (reactionResponse.user.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.reaction = reactionResponse;
};

// src/modules/util/user.ts
var verifyUserId = async (convex, request) => {
  const { auth } = request;
  assertRequired("auth", auth);
  const { body } = request;
  assertHasStringKey(body, "userId");
  const { userId } = body;
  const userResponse = await convex.query(api.users.find, { id: userId });
  if (userResponse == null) {
    throw new ValidationError({
      details: [
        {
          path: "/userId",
          message: `userId '${userId}' is invalid`
        }
      ]
    });
  }
  if (auth.type === "api" || auth.user.role === "admin") {
    return;
  }
  if (userResponse.id !== auth.user.id) {
    throw new ForbiddenError();
  }
  request.userRequest = userResponse;
};

// src/modules/blogs/hooks/verify-create-blog.hook.ts
var verifyCreateBlogHook = (convex) => {
  return async (request, _) => {
    await verifyUserId(convex, request);
  };
};

// src/modules/blogs/hooks/verify-create-viewer.hook.ts
var verifyCreateViewerHook = (convex) => {
  return async (request, _) => {
    await verifyUserId(convex, request);
    await verifyMutateBlog(convex, request);
  };
};

// src/modules/blogs/hooks/verify-create-reaction.hook.ts
var verifyCreateReactionHook = (convex) => {
  return async (request, _) => {
    await verifyUserId(convex, request);
    await verifyMutateBlog(convex, request);
  };
};

// src/modules/blogs/hooks/verify-create-tag.hook.ts
var verifyCreateTagHook = (convex) => {
  return async (request, _) => {
    await verifyUserId(convex, request);
    await verifyMutateBlog(convex, request);
  };
};

// src/modules/blogs/hooks/verify-update-blog.hook.ts
var verifyUpdateBlogHook = (convex, validation) => {
  return async (request, _) => {
    await verifyUpdateBlog(convex, validation, request);
  };
};

// src/modules/blogs/hooks/verify-update-reaction.hook.ts
var verifyUpdateReactionHook = (convex, validation) => {
  return async (request, _) => {
    await verifyMutateReaction(convex, request);
    const update = request.body;
    const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};

// src/modules/blogs/hooks/verify-update-tag.hook.ts
var verifyUpdateTagHook = (convex, validation) => {
  return async (request, _) => {
    await verifyMutateTag(convex, request);
    const update = request.body;
    const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};

// src/modules/blogs/hooks/verify-delete-blog.hook.ts
var verifyDeleteBlogHook = (convex) => {
  return async (request, _) => {
    await verifyMutateBlog(convex, request);
  };
};

// src/modules/blogs/hooks/verify-delete-reaction.hook.ts
var verifyDeleteReactionHook = (convex) => {
  return async (request, _) => {
    await verifyMutateReaction(convex, request);
  };
};

// src/modules/blogs/hooks/verify-delete-tag.hook.ts
var verifyDeleteTagHook = (convex) => {
  return async (request, _) => {
    await verifyMutateTag(convex, request);
  };
};

// src/modules/blogs/blogs.routes.ts
import { container as container4 } from "tsyringe";
import { Type as Type52 } from "@sinclair/typebox";
var blogsRoutes = async (fastify) => {
  const validation = container4.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;
  fastify.post(
    "/blogs",
    {
      schema: {
        description: "Create a blog",
        tags: ["Blogs"],
        body: CreateBlogSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateBlogHook(convex)]
    },
    async (request, reply) => {
      const { body, userRequest } = request;
      assertRequired("userRequest", userRequest);
      const command = new CreateBlogCommand({ create: body, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.get(
    "/blogs/:blogId",
    {
      schema: {
        description: "Get a blog",
        tags: ["Blogs"],
        params: GetBlogParamsSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate]
    },
    async (request, reply) => {
      const { params } = request;
      const query = new GetBlogQuery({ params });
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    }
  );
  fastify.get(
    "/blogs",
    {
      schema: {
        description: "Get blogs",
        tags: ["Blogs"],
        querystring: QuerySchema,
        response: {
          200: PaginatedBlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate]
    },
    async (request, reply) => {
      const query = new GetBlogsQuery({ query: request.query });
      const response = await mediator.send(query);
      return reply.status(200).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId",
    {
      schema: {
        description: "Update a blog",
        tags: ["Blogs"],
        params: UpdateBlogParamsSchema,
        body: UpdateBlogSchema2,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateBlogHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog } = request;
      assertRequired("blog", blog);
      const command = new UpdateBlogCommand({ params, update: body, existing: blog });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId",
    {
      schema: {
        description: "Delete a blog",
        tags: ["Blogs"],
        params: DeleteBlogParamsSchema,
        response: {
          204: Type52.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteBlogHook(convex)]
    },
    async (request, reply) => {
      const { params, blog } = request;
      assertRequired("blog", blog);
      const command = new DeleteBlogCommand({ params, existing: blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
  fastify.post(
    "/blogs/:blogId/viewers",
    {
      schema: {
        description: "Create a viewer",
        tags: ["Blogs", "Viewers"],
        params: CreateViewerParamsSchema,
        body: CreateViewerSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateViewerHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("userRequest", userRequest);
      const command = new CreateViewerCommand({ params, create: body, existing: blog, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.post(
    "/blogs/:blogId/reactions",
    {
      schema: {
        description: "Create a reaction",
        tags: ["Blogs", "Reactions"],
        params: CreateReactionParamsSchema,
        body: CreateReactionSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateReactionHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("userRequest", userRequest);
      const command = new CreateReactionCommand({ params, create: body, existing: blog, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId/reactions/:reactionId",
    {
      schema: {
        description: "Update reaction",
        tags: ["Blogs", "Reactions"],
        params: UpdateReactionParamsSchema,
        body: UpdateReactionSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateReactionHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog, reaction } = request;
      assertRequired("blog", blog);
      assertRequired("reaction", reaction);
      const command = new UpdateReactionCommand({ params, update: body, existing: reaction, blog });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId/reactions/:reactionId",
    {
      schema: {
        description: "Delete a reaction",
        tags: ["Blogs", "Reactions"],
        params: DeleteReactionParamsSchema,
        response: {
          204: Type52.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteReactionHook(convex)]
    },
    async (request, reply) => {
      const { params, blog, reaction } = request;
      assertRequired("blog", blog);
      assertRequired("reaction", reaction);
      const command = new DeleteReactionCommand({ params, existing: reaction, blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
  fastify.post(
    "/blogs/:blogId/tags",
    {
      schema: {
        description: "Create a tag",
        tags: ["Blogs", "Tags"],
        params: CreateTagParamsSchema,
        body: CreateTagSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateTagHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog } = request;
      assertRequired("blog", blog);
      const command = new CreateTagCommand({ params, create: body, existing: blog });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId/tags/:tagId",
    {
      schema: {
        description: "Update a tag",
        tags: ["Blogs", "Tags"],
        params: UpdateTagParamsSchema,
        body: UpdateTagSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateTagHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog, tag } = request;
      assertRequired("blog", blog);
      assertRequired("tag", tag);
      const command = new UpdateTagCommand({ params, update: body, existing: tag, blog });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId/tags/:tagId",
    {
      schema: {
        description: "Delete a tag",
        tags: ["Blogs", "Tags"],
        params: DeleteTagParamsSchema,
        response: {
          204: Type52.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteTagHook(convex)]
    },
    async (request, reply) => {
      const { params, blog, tag } = request;
      assertRequired("blog", blog);
      assertRequired("tag", tag);
      const command = new DeleteTagCommand({ params, existing: tag, blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
};

// src/modules/comments/hooks/verify-create-comment.hook.ts
var verifyCreateCommentHook = (convex) => {
  return async (request, _) => {
    await verifyMutateBlog(convex, request);
    await verifyUserId(convex, request);
  };
};

// src/modules/comments/hooks/verify-create-comment-reaction.hook.ts
var verifyCreateCommentReactionHook = (convex) => {
  return async (request, _) => {
    await verifyMutateBlog(convex, request);
    await verifyUserId(convex, request);
  };
};

// src/modules/comments/hooks/verify-create-comment-viewer.hook.ts
var verifyCreateCommentViewerHook = (convex) => {
  return async (request, _) => {
    await verifyMutateBlog(convex, request);
    await verifyUserId(convex, request);
  };
};

// src/modules/comments/hooks/verify-delete-comment.hook.ts
var verifyDeleteCommentHook = (convex) => {
  return async (request, _) => {
    await verifyMutateComment(convex, request);
  };
};

// src/modules/comments/hooks/verify-delete-comment-reaction.hook.ts
var verifyDeleteCommentReactionHook = (convex) => {
  return async (request, _) => {
    await verifyMutateCommentReaction(convex, request);
  };
};

// src/modules/comments/hooks/verify-update-comment.hook.ts
var verifyUpdateCommentHook = (convex, validation) => {
  return async (request, _) => {
    await verifyUpdateComment(convex, validation, request);
  };
};

// src/modules/comments/hooks/verify-update-comment-reaction.hook.ts
var verifyUpdateCommentReactionHook = (convex, validation) => {
  return async (request, _) => {
    await verifyMutateCommentReaction(convex, request);
    const update = request.body;
    const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};

// src/modules/comments/comments.routes.ts
import { container as container5 } from "tsyringe";
import { Type as Type53 } from "@sinclair/typebox";
var commentsRoutes = async (fastify) => {
  const validation = container5.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;
  fastify.post(
    "/blogs/:blogId/comments",
    {
      schema: {
        description: "Create a comment",
        tags: ["Blogs", "Comments"],
        params: CreateCommentParamsSchema,
        body: CreateCommentSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateCommentHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("userRequest", userRequest);
      const command = new CreateCommentCommand({ params, create: body, existing: blog, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId/comments/:commentId",
    {
      schema: {
        description: "Update comment",
        tags: ["Blogs", "Comments"],
        params: UpdateCommentParamsSchema,
        body: UpdateCommentSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateCommentHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog, comment } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      const command = new UpdateCommentCommand({ params, update: body, existing: comment, blog });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId/comments/:commentId",
    {
      schema: {
        description: "Delete a comment",
        tags: ["Blogs", "Comments"],
        params: DeleteCommentParamsSchema,
        response: {
          204: Type53.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteCommentHook(convex)]
    },
    async (request, reply) => {
      const { params, blog, comment } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      const command = new DeleteCommentCommand({ params, existing: comment, blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
  fastify.post(
    "/blogs/:blogId/comments/:commentId/viewers",
    {
      schema: {
        description: "Create a viewer",
        tags: ["Blogs", "Comments", "Viewers"],
        params: CreateCommentViewerParamsSchema,
        body: CreateCommentViewerSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateCommentViewerHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("userRequest", userRequest);
      const command = new CreateCommentViewerCommand({ params, create: body, blog, comment, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.post(
    "/blogs/:blogId/comments/:commentId/reactions",
    {
      schema: {
        description: "Create a reaction",
        tags: ["Blogs", "Comments", "Reactions"],
        params: CreateCommentReactionParamsSchema,
        body: CreateCommentReactionSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateCommentReactionHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("userRequest", userRequest);
      const command = new CreateCommentReactionCommand({ params, create: body, blog, comment, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId/comments/:commentId/reactions/:reactionId",
    {
      schema: {
        description: "Update reaction",
        tags: ["Blogs", "Comments", "Reactions"],
        params: UpdateCommentReactionParamsSchema,
        body: UpdateCommentReactionSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateCommentReactionHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, reaction } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("reaction", reaction);
      const command = new UpdateCommentReactionCommand({ params, update: body, existing: reaction, blog, comment });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId/comments/:commentId/reactions/:reactionId",
    {
      schema: {
        description: "Delete a reaction",
        tags: ["Blogs", "Comments", "Reactions"],
        params: DeleteCommentReactionParamsSchema,
        response: {
          204: Type53.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteCommentReactionHook(convex)]
    },
    async (request, reply) => {
      const { params, blog, comment, reaction } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("reaction", reaction);
      const command = new DeleteCommentReactionCommand({ params, existing: reaction, blog, comment });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
};

// src/modules/replies/hooks/verify-create-comment-reply.hook.ts
var verifyCreateCommentReplyHook = (convex) => {
  return async (request, _) => {
    await verifyMutateComment(convex, request);
    await verifyUserId(convex, request);
  };
};

// src/modules/replies/hooks/verify-create-comment-reply-reaction.hook.ts
var verifyCreateCommentReplyReactionHook = (convex) => {
  return async (request, _) => {
    await verifyMutateComment(convex, request);
    await verifyUserId(convex, request);
  };
};

// src/modules/replies/hooks/verify-create-comment-reply-viewer.hook.ts
var verifyCreateCommentReplyViewerHook = (convex) => {
  return async (request, _) => {
    await verifyMutateComment(convex, request);
    await verifyUserId(convex, request);
  };
};

// src/modules/replies/hooks/verify-delete-comment-reply.hook.ts
var verifyDeleteCommentReplyHook = (convex) => {
  return async (request, _) => {
    await verifyMutateCommentReply(convex, request);
  };
};

// src/modules/replies/hooks/verify-delete-comment-reply-reaction.hook.ts
var verifyDeleteCommentReplyReactionHook = (convex) => {
  return async (request, _) => {
    await verifyMutateCommentReply(convex, request);
  };
};

// src/modules/replies/hooks/verify-update-comment-reply.hook.ts
var verifyUpdateCommentReplyHook = (convex, validation) => {
  return async (request, _) => {
    await verifyMutateCommentReply(convex, request);
    const update = request.body;
    const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};

// src/modules/replies/hooks/verify-update-comment-reply-reaction.hook.ts
var verifyUpdateCommentReplyReactionHook = (convex, validation) => {
  return async (request, _) => {
    await verifyMutateCommentReplyReaction(convex, request);
    const update = request.body;
    const validationDetails = await validation.validator().notEmpty({ value: update }).validate();
    if (validationDetails.length > 0) {
      throw new ValidationError({ details: validationDetails });
    }
  };
};

// src/modules/replies/replies.routes.ts
import { container as container6 } from "tsyringe";
import { Type as Type54 } from "@sinclair/typebox";
var repliesRoutes = async (fastify) => {
  const validation = container6.resolve(AsyncValidation);
  const { authenticate, convex, mediator } = fastify;
  fastify.post(
    "/blogs/:blogId/comments/:commentId/replies",
    {
      schema: {
        description: "Create a comment reply",
        tags: ["Blogs", "Comments", "Replies"],
        params: CreateCommentReplyParamsSchema,
        body: CreateCommentReplySchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateCommentReplyHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("userRequest", userRequest);
      const command = new CreateCommentReplyCommand({ params, create: body, blog, comment, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId/comments/:commentId/replies/:replyId",
    {
      schema: {
        description: "Update a comment reply",
        tags: ["Blogs", "Comments", "Replies"],
        params: UpdateCommentReplyParamsSchema,
        body: UpdateCommentReplySchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateCommentReplyHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("commentReply", commentReply);
      const command = new UpdateCommentReplyCommand({ params, update: body, existing: commentReply, comment, blog });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId/comments/:commentId/replies/:replyId",
    {
      schema: {
        description: "Delete a comment reply",
        tags: ["Blogs", "Comments", "Replies"],
        params: DeleteCommentReplyParamsSchema,
        response: {
          204: Type54.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteCommentReplyHook(convex)]
    },
    async (request, reply) => {
      const { params, blog, comment, commentReply } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("commentReply", commentReply);
      const command = new DeleteCommentReplyCommand({ params, existing: commentReply, comment, blog });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
  fastify.post(
    "/blogs/:blogId/comments/:commentId/replies/:replyId/viewers",
    {
      schema: {
        description: "Create a viewer",
        tags: ["Blogs", "Comments", "Replies", "Viewers"],
        params: CreateCommentReplyViewerParamsSchema,
        body: CreateCommentReplyViewerSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateCommentReplyViewerHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("commentReply", commentReply);
      assertRequired("userRequest", userRequest);
      const command = new CreateCommentReplyViewerCommand({ params, create: body, blog, comment, reply: commentReply, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.post(
    "/blogs/:blogId/comments/:commentId/replies/:replyId/reactions",
    {
      schema: {
        description: "Create a reaction",
        tags: ["Blogs", "Comments", "Replies", "Reactions"],
        params: CreateCommentReplyReactionParamsSchema,
        body: CreateCommentReplyReactionSchema,
        response: {
          201: BlogDataSchema,
          400: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyCreateCommentReplyReactionHook(convex)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply, userRequest } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("commentReply", commentReply);
      assertRequired("userRequest", userRequest);
      const command = new CreateCommentReplyReactionCommand({ params, create: body, blog, comment, reply: commentReply, user: userRequest });
      const response = await mediator.send(command);
      return reply.status(201).send(response);
    }
  );
  fastify.patch(
    "/blogs/:blogId/comments/:commentId/replies/:replyId/:reactionId",
    {
      schema: {
        description: "Update reaction",
        tags: ["Blogs", "Comments", "Replies", "Reactions"],
        params: UpdateCommentReplyReactionParamsSchema,
        body: UpdateCommentReplyReactionSchema,
        response: {
          200: BlogDataSchema,
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyUpdateCommentReplyReactionHook(convex, validation)]
    },
    async (request, reply) => {
      const { params, body, blog, comment, commentReply, reaction } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("commentReply", commentReply);
      assertRequired("reaction", reaction);
      const command = new UpdateCommentReplyReactionCommand({ params, update: body, existing: reaction, blog, comment, reply: commentReply });
      const response = await mediator.send(command);
      return reply.status(200).send(response);
    }
  );
  fastify.delete(
    "/blogs/:blogId/comments/:commentId/replies/:replyId/reactions/:reactionId",
    {
      schema: {
        description: "Delete a reaction",
        tags: ["Blogs", "Comments", "Replies", "Reactions"],
        params: DeleteCommentReplyReactionParamsSchema,
        response: {
          204: Type54.Null(),
          400: AppErrorSchema,
          404: AppErrorSchema,
          500: AppErrorSchema
        }
      },
      preHandler: [authenticate, verifyDeleteCommentReplyReactionHook(convex)]
    },
    async (request, reply) => {
      const { params, blog, comment, commentReply, reaction } = request;
      assertRequired("blog", blog);
      assertRequired("comment", comment);
      assertRequired("commentReply", commentReply);
      assertRequired("reaction", reaction);
      const command = new DeleteCommentReplyReactionCommand({ params, existing: reaction, blog, comment, reply: commentReply });
      await mediator.send(command);
      return reply.status(204).send(null);
    }
  );
};

// src/plugins/routes.ts
var routesPlugin2 = fp7(async (fastify) => {
  const prefix = "/blog-api";
  await fastify.register(blogsRoutes, { prefix });
  await fastify.register(commentsRoutes, { prefix });
  await fastify.register(repliesRoutes, { prefix });
});

// src/app/index.ts
async function buildApp() {
  const app = await bootstrap({
    routePrefix: "/blog-api",
    docs: {
      title: "Blog Service",
      description: "Documentation of the Blog Service",
      version: "1.0.0"
    }
  });
  await app.register(routesPlugin2);
  return app;
}

// src/api/index.ts
async function handler(req, res) {
  const app = await buildApp();
  await serverless(app, req, res);
}
export {
  handler as default
};
