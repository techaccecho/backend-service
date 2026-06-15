import { type Infer } from 'convex/values';
export declare const AttributeEntitySchema: import("convex/values").VObject<{
    id: string;
    name: string;
    value: string;
    createdAt: number;
    updatedAt: number | null;
}, {
    id: import("convex/values").VString<string, "required">;
    name: import("convex/values").VString<string, "required">;
    value: import("convex/values").VString<string, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">;
export type AttributeEntity = Infer<typeof AttributeEntitySchema>;
export declare const AttachmentEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    type: "media/image";
    updatedAt: number | null;
    url: string | null;
    content: string | null;
}, {
    id: import("convex/values").VString<string, "required">;
    type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
    url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">;
export type AttachmentEntity = Infer<typeof AttachmentEntitySchema>;
export declare const UserEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    updatedAt: number | null;
    authId: string;
    email: string;
    alias: string | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    bio: string | null;
    preferences: {
        id: string;
        name: string;
        value: string;
        createdAt: number;
        updatedAt: number | null;
    }[];
    role: "user" | "admin";
    isLocked: boolean;
    avatar: {
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    } | null;
    lastActivityAt: number;
}, {
    id: import("convex/values").VString<string, "required">;
    authId: import("convex/values").VString<string, "required">;
    email: import("convex/values").VString<string, "required">;
    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    dateOfBirth: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    bio: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    preferences: import("convex/values").VArray<{
        id: string;
        name: string;
        value: string;
        createdAt: number;
        updatedAt: number | null;
    }[], import("convex/values").VObject<{
        id: string;
        name: string;
        value: string;
        createdAt: number;
        updatedAt: number | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        name: import("convex/values").VString<string, "required">;
        value: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">, "required">;
    role: import("convex/values").VUnion<"user" | "admin", [import("convex/values").VLiteral<"user", "required">, import("convex/values").VLiteral<"admin", "required">], "required", never>;
    isLocked: import("convex/values").VBoolean<boolean, "required">;
    avatar: import("convex/values").VUnion<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    } | null, [import("convex/values").VObject<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
        url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, import("convex/values").VNull<null, "required">], "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    lastActivityAt: import("convex/values").VFloat64<number, "required">;
}, "required", "id" | "createdAt" | "updatedAt" | "authId" | "email" | "alias" | "firstName" | "lastName" | "dateOfBirth" | "bio" | "preferences" | "role" | "isLocked" | "avatar" | "lastActivityAt" | "avatar.id" | "avatar.createdAt" | "avatar.type" | "avatar.updatedAt" | "avatar.url" | "avatar.content">;
export type UserEntity = Infer<typeof UserEntitySchema>;
export declare const UserPreviewEntitySchema: import("convex/values").VObject<{
    id: string;
    email: string;
    alias: string | null;
    firstName: string | null;
    lastName: string | null;
}, {
    id: import("convex/values").VString<string, "required">;
    email: import("convex/values").VString<string, "required">;
    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
export type UserPreviewEntity = Infer<typeof UserPreviewEntitySchema>;
export declare const EngagementEntitySchema: import("convex/values").VObject<{
    updatedAt: number | null;
    views: number;
    comments: number;
    attachments: number;
    reactions: number;
}, {
    views: import("convex/values").VFloat64<number, "required">;
    comments: import("convex/values").VFloat64<number, "required">;
    attachments: import("convex/values").VFloat64<number, "required">;
    reactions: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
export type EngagementEntity = Infer<typeof EngagementEntitySchema>;
export declare const ReactionEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    updatedAt: number | null;
    user: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    code: string;
}, {
    id: import("convex/values").VString<string, "required">;
    user: import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
    code: import("convex/values").VString<string, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">;
export type ReactionEntity = Infer<typeof ReactionEntitySchema>;
export declare const CommentParentEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    content: string;
}, {
    id: import("convex/values").VString<string, "required">;
    content: import("convex/values").VString<string, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
}, "required", "id" | "createdAt" | "content">;
export type CommentParentEntity = Infer<typeof CommentParentEntitySchema>;
export declare const ReplyEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    updatedAt: number | null;
    content: string;
    user: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    attachments: {
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }[];
    reactions: {
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }[];
    viewers: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }[];
    engagement: {
        updatedAt: number | null;
        views: number;
        comments: number;
        attachments: number;
        reactions: number;
    };
}, {
    id: import("convex/values").VString<string, "required">;
    user: import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
    content: import("convex/values").VString<string, "required">;
    attachments: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
        url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
    viewers: import("convex/values").VArray<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }[], import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
    reactions: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }, {
        id: import("convex/values").VString<string, "required">;
        user: import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
        code: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
    engagement: import("convex/values").VObject<{
        updatedAt: number | null;
        views: number;
        comments: number;
        attachments: number;
        reactions: number;
    }, {
        views: import("convex/values").VFloat64<number, "required">;
        comments: import("convex/values").VFloat64<number, "required">;
        attachments: import("convex/values").VFloat64<number, "required">;
        reactions: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions">;
export type ReplyEntity = Infer<typeof ReplyEntitySchema>;
export declare const CommentEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    updatedAt: number | null;
    content: string;
    user: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    attachments: {
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }[];
    reactions: {
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }[];
    viewers: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }[];
    engagement: {
        updatedAt: number | null;
        views: number;
        comments: number;
        attachments: number;
        reactions: number;
    };
    replies: {
        id: string;
        createdAt: number;
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
    }[];
}, {
    id: import("convex/values").VString<string, "required">;
    user: import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
    content: import("convex/values").VString<string, "required">;
    replies: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
    }, {
        id: import("convex/values").VString<string, "required">;
        user: import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
        content: import("convex/values").VString<string, "required">;
        attachments: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
            url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
        viewers: import("convex/values").VArray<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[], import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
        reactions: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            code: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
        engagement: import("convex/values").VObject<{
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        }, {
            views: import("convex/values").VFloat64<number, "required">;
            comments: import("convex/values").VFloat64<number, "required">;
            attachments: import("convex/values").VFloat64<number, "required">;
            reactions: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions">, "required">;
    attachments: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
        url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
    viewers: import("convex/values").VArray<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }[], import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
    reactions: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }, {
        id: import("convex/values").VString<string, "required">;
        user: import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
        code: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
    engagement: import("convex/values").VObject<{
        updatedAt: number | null;
        views: number;
        comments: number;
        attachments: number;
        reactions: number;
    }, {
        views: import("convex/values").VFloat64<number, "required">;
        comments: import("convex/values").VFloat64<number, "required">;
        attachments: import("convex/values").VFloat64<number, "required">;
        reactions: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "replies">;
export type CommentEntity = Infer<typeof CommentEntitySchema>;
export declare const BlogEntitySchema: import("convex/values").VObject<{
    id: string;
    createdAt: number;
    type: "post" | "topic";
    updatedAt: number | null;
    content: string;
    user: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    isLocked: boolean;
    lastActivityAt: number;
    comments: {
        id: string;
        createdAt: number;
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
        replies: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
        }[];
    }[];
    attachments: {
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }[];
    reactions: {
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }[];
    viewers: {
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }[];
    engagement: {
        updatedAt: number | null;
        views: number;
        comments: number;
        attachments: number;
        reactions: number;
    };
    tags: {
        id: string;
        name: string;
        value: string;
        createdAt: number;
        updatedAt: number | null;
    }[];
    title: string;
    priority: number;
    isDraft: boolean;
    isPinned: boolean;
}, {
    id: import("convex/values").VString<string, "required">;
    user: import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
    type: import("convex/values").VUnion<"post" | "topic", [import("convex/values").VLiteral<"post", "required">, import("convex/values").VLiteral<"topic", "required">], "required", never>;
    tags: import("convex/values").VArray<{
        id: string;
        name: string;
        value: string;
        createdAt: number;
        updatedAt: number | null;
    }[], import("convex/values").VObject<{
        id: string;
        name: string;
        value: string;
        createdAt: number;
        updatedAt: number | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        name: import("convex/values").VString<string, "required">;
        value: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">, "required">;
    title: import("convex/values").VString<string, "required">;
    content: import("convex/values").VString<string, "required">;
    priority: import("convex/values").VFloat64<number, "required">;
    isDraft: import("convex/values").VBoolean<boolean, "required">;
    isPinned: import("convex/values").VBoolean<boolean, "required">;
    isLocked: import("convex/values").VBoolean<boolean, "required">;
    comments: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
        replies: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
        }[];
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
        replies: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
        }[];
    }, {
        id: import("convex/values").VString<string, "required">;
        user: import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
        content: import("convex/values").VString<string, "required">;
        replies: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            content: import("convex/values").VString<string, "required">;
            attachments: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
                url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
            viewers: import("convex/values").VArray<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[], import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
            reactions: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }, {
                id: import("convex/values").VString<string, "required">;
                user: import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                code: import("convex/values").VString<string, "required">;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
            engagement: import("convex/values").VObject<{
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            }, {
                views: import("convex/values").VFloat64<number, "required">;
                comments: import("convex/values").VFloat64<number, "required">;
                attachments: import("convex/values").VFloat64<number, "required">;
                reactions: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions">, "required">;
        attachments: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
            url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
        viewers: import("convex/values").VArray<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[], import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
        reactions: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            code: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
        engagement: import("convex/values").VObject<{
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        }, {
            views: import("convex/values").VFloat64<number, "required">;
            comments: import("convex/values").VFloat64<number, "required">;
            attachments: import("convex/values").VFloat64<number, "required">;
            reactions: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "replies">, "required">;
    attachments: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        type: "media/image";
        updatedAt: number | null;
        url: string | null;
        content: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
        url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
    viewers: import("convex/values").VArray<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }[], import("convex/values").VObject<{
        id: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
    }, {
        id: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
    reactions: import("convex/values").VArray<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }[], import("convex/values").VObject<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        code: string;
    }, {
        id: import("convex/values").VString<string, "required">;
        user: import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
        code: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
    engagement: import("convex/values").VObject<{
        updatedAt: number | null;
        views: number;
        comments: number;
        attachments: number;
        reactions: number;
    }, {
        views: import("convex/values").VFloat64<number, "required">;
        comments: import("convex/values").VFloat64<number, "required">;
        attachments: import("convex/values").VFloat64<number, "required">;
        reactions: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    lastActivityAt: import("convex/values").VFloat64<number, "required">;
}, "required", "id" | "createdAt" | "type" | "updatedAt" | "content" | "user" | "isLocked" | "lastActivityAt" | "comments" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "tags" | "title" | "priority" | "isDraft" | "isPinned">;
export type BlogEntity = Infer<typeof BlogEntitySchema>;
export declare const ApiConfigEntitySchema: import("convex/values").VObject<{
    auth: {
        jkwsUri: string;
        audience: string;
        issuer: string;
    };
}, {
    auth: import("convex/values").VObject<{
        jkwsUri: string;
        audience: string;
        issuer: string;
    }, {
        jkwsUri: import("convex/values").VString<string, "required">;
        audience: import("convex/values").VString<string, "required">;
        issuer: import("convex/values").VString<string, "required">;
    }, "required", "jkwsUri" | "audience" | "issuer">;
}, "required", "auth" | "auth.jkwsUri" | "auth.audience" | "auth.issuer">;
export type ApiConfigEntity = Infer<typeof ApiConfigEntitySchema>;
export declare const ApiFeatureEntitySchema: import("convex/values").VObject<{
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number | null;
    enabled: boolean;
}, {
    id: import("convex/values").VString<string, "required">;
    name: import("convex/values").VString<string, "required">;
    enabled: import("convex/values").VBoolean<boolean, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "name" | "createdAt" | "updatedAt" | "enabled">;
export type ApiFeatureEntity = Infer<typeof ApiFeatureEntitySchema>;
export declare const ApiSubscriberEntitySchema: import("convex/values").VObject<{
    id: string;
    name: string;
    value: string;
    createdAt: number;
    type: "api-key";
    updatedAt: number | null;
    lastActivityAt: number;
}, {
    id: import("convex/values").VString<string, "required">;
    name: import("convex/values").VString<string, "required">;
    type: import("convex/values").VUnion<"api-key", [import("convex/values").VLiteral<"api-key", "required">], "required", never>;
    value: import("convex/values").VString<string, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    lastActivityAt: import("convex/values").VFloat64<number, "required">;
}, "required", "id" | "name" | "value" | "createdAt" | "type" | "updatedAt" | "lastActivityAt">;
export type ApiSubscriberEntity = Infer<typeof ApiSubscriberEntitySchema>;
export declare const ApiEntitySchema: import("convex/values").VObject<{
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number | null;
    config: {
        auth: {
            jkwsUri: string;
            audience: string;
            issuer: string;
        };
    };
    features: {
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number | null;
        enabled: boolean;
    }[];
    subscribers: {
        id: string;
        name: string;
        value: string;
        createdAt: number;
        type: "api-key";
        updatedAt: number | null;
        lastActivityAt: number;
    }[];
}, {
    id: import("convex/values").VString<string, "required">;
    name: import("convex/values").VString<string, "required">;
    config: import("convex/values").VObject<{
        auth: {
            jkwsUri: string;
            audience: string;
            issuer: string;
        };
    }, {
        auth: import("convex/values").VObject<{
            jkwsUri: string;
            audience: string;
            issuer: string;
        }, {
            jkwsUri: import("convex/values").VString<string, "required">;
            audience: import("convex/values").VString<string, "required">;
            issuer: import("convex/values").VString<string, "required">;
        }, "required", "jkwsUri" | "audience" | "issuer">;
    }, "required", "auth" | "auth.jkwsUri" | "auth.audience" | "auth.issuer">;
    features: import("convex/values").VArray<{
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number | null;
        enabled: boolean;
    }[], import("convex/values").VObject<{
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number | null;
        enabled: boolean;
    }, {
        id: import("convex/values").VString<string, "required">;
        name: import("convex/values").VString<string, "required">;
        enabled: import("convex/values").VBoolean<boolean, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "name" | "createdAt" | "updatedAt" | "enabled">, "required">;
    subscribers: import("convex/values").VArray<{
        id: string;
        name: string;
        value: string;
        createdAt: number;
        type: "api-key";
        updatedAt: number | null;
        lastActivityAt: number;
    }[], import("convex/values").VObject<{
        id: string;
        name: string;
        value: string;
        createdAt: number;
        type: "api-key";
        updatedAt: number | null;
        lastActivityAt: number;
    }, {
        id: import("convex/values").VString<string, "required">;
        name: import("convex/values").VString<string, "required">;
        type: import("convex/values").VUnion<"api-key", [import("convex/values").VLiteral<"api-key", "required">], "required", never>;
        value: import("convex/values").VString<string, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastActivityAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "id" | "name" | "value" | "createdAt" | "type" | "updatedAt" | "lastActivityAt">, "required">;
    createdAt: import("convex/values").VFloat64<number, "required">;
    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
}, "required", "id" | "name" | "createdAt" | "updatedAt" | "config" | "features" | "subscribers" | "config.auth" | "config.auth.jkwsUri" | "config.auth.audience" | "config.auth.issuer">;
export type ApiEntity = Infer<typeof BlogEntitySchema>;
declare const _default: import("convex/server").SchemaDefinition<{
    users: import("convex/server").TableDefinition<import("convex/values").VObject<{
        id: string;
        createdAt: number;
        updatedAt: number | null;
        authId: string;
        email: string;
        alias: string | null;
        firstName: string | null;
        lastName: string | null;
        dateOfBirth: string | null;
        bio: string | null;
        preferences: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[];
        role: "user" | "admin";
        isLocked: boolean;
        avatar: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        } | null;
        lastActivityAt: number;
    }, {
        id: import("convex/values").VString<string, "required">;
        authId: import("convex/values").VString<string, "required">;
        email: import("convex/values").VString<string, "required">;
        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        dateOfBirth: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        bio: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        preferences: import("convex/values").VArray<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[], import("convex/values").VObject<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            value: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">, "required">;
        role: import("convex/values").VUnion<"user" | "admin", [import("convex/values").VLiteral<"user", "required">, import("convex/values").VLiteral<"admin", "required">], "required", never>;
        isLocked: import("convex/values").VBoolean<boolean, "required">;
        avatar: import("convex/values").VUnion<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        } | null, [import("convex/values").VObject<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
            url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, import("convex/values").VNull<null, "required">], "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastActivityAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "id" | "createdAt" | "updatedAt" | "authId" | "email" | "alias" | "firstName" | "lastName" | "dateOfBirth" | "bio" | "preferences" | "role" | "isLocked" | "avatar" | "lastActivityAt" | "avatar.id" | "avatar.createdAt" | "avatar.type" | "avatar.updatedAt" | "avatar.url" | "avatar.content">, {
        by_public_id: ["id", "_creationTime"];
        by_email: ["email", "_creationTime"];
        by_auth_id: ["authId", "_creationTime"];
        by_alias: ["alias", "_creationTime"];
    }, {}, {}>;
    blogs: import("convex/server").TableDefinition<import("convex/values").VObject<{
        id: string;
        createdAt: number;
        type: "post" | "topic";
        updatedAt: number | null;
        content: string;
        user: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        isLocked: boolean;
        lastActivityAt: number;
        comments: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }[];
        attachments: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[];
        reactions: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[];
        viewers: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[];
        engagement: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        };
        tags: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[];
        title: string;
        priority: number;
        isDraft: boolean;
        isPinned: boolean;
    }, {
        id: import("convex/values").VString<string, "required">;
        user: import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
        type: import("convex/values").VUnion<"post" | "topic", [import("convex/values").VLiteral<"post", "required">, import("convex/values").VLiteral<"topic", "required">], "required", never>;
        tags: import("convex/values").VArray<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[], import("convex/values").VObject<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            value: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">, "required">;
        title: import("convex/values").VString<string, "required">;
        content: import("convex/values").VString<string, "required">;
        priority: import("convex/values").VFloat64<number, "required">;
        isDraft: import("convex/values").VBoolean<boolean, "required">;
        isPinned: import("convex/values").VBoolean<boolean, "required">;
        isLocked: import("convex/values").VBoolean<boolean, "required">;
        comments: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            content: import("convex/values").VString<string, "required">;
            replies: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }, {
                id: import("convex/values").VString<string, "required">;
                user: import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                content: import("convex/values").VString<string, "required">;
                attachments: import("convex/values").VArray<{
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[], import("convex/values").VObject<{
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
                    url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    createdAt: import("convex/values").VFloat64<number, "required">;
                    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
                viewers: import("convex/values").VArray<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[], import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
                reactions: import("convex/values").VArray<{
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[], import("convex/values").VObject<{
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    user: import("convex/values").VObject<{
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    }, {
                        id: import("convex/values").VString<string, "required">;
                        email: import("convex/values").VString<string, "required">;
                        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                    code: import("convex/values").VString<string, "required">;
                    createdAt: import("convex/values").VFloat64<number, "required">;
                    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
                engagement: import("convex/values").VObject<{
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                }, {
                    views: import("convex/values").VFloat64<number, "required">;
                    comments: import("convex/values").VFloat64<number, "required">;
                    attachments: import("convex/values").VFloat64<number, "required">;
                    reactions: import("convex/values").VFloat64<number, "required">;
                    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions">, "required">;
            attachments: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
                url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
            viewers: import("convex/values").VArray<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[], import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
            reactions: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }, {
                id: import("convex/values").VString<string, "required">;
                user: import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                code: import("convex/values").VString<string, "required">;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
            engagement: import("convex/values").VObject<{
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            }, {
                views: import("convex/values").VFloat64<number, "required">;
                comments: import("convex/values").VFloat64<number, "required">;
                attachments: import("convex/values").VFloat64<number, "required">;
                reactions: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "replies">, "required">;
        attachments: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
            url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
        viewers: import("convex/values").VArray<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[], import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
        reactions: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[], import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            code: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
        engagement: import("convex/values").VObject<{
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        }, {
            views: import("convex/values").VFloat64<number, "required">;
            comments: import("convex/values").VFloat64<number, "required">;
            attachments: import("convex/values").VFloat64<number, "required">;
            reactions: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        lastActivityAt: import("convex/values").VFloat64<number, "required">;
    }, "required", "id" | "createdAt" | "type" | "updatedAt" | "content" | "user" | "isLocked" | "lastActivityAt" | "comments" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "tags" | "title" | "priority" | "isDraft" | "isPinned">, {
        by_public_id: ["id", "_creationTime"];
        by_type: ["type", "_creationTime"];
        by_last_activity: ["lastActivityAt", "_creationTime"];
    }, {}, {}>;
    apis: import("convex/server").TableDefinition<import("convex/values").VObject<{
        id: string;
        name: string;
        createdAt: number;
        updatedAt: number | null;
        config: {
            auth: {
                jkwsUri: string;
                audience: string;
                issuer: string;
            };
        };
        features: {
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }[];
        subscribers: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }[];
    }, {
        id: import("convex/values").VString<string, "required">;
        name: import("convex/values").VString<string, "required">;
        config: import("convex/values").VObject<{
            auth: {
                jkwsUri: string;
                audience: string;
                issuer: string;
            };
        }, {
            auth: import("convex/values").VObject<{
                jkwsUri: string;
                audience: string;
                issuer: string;
            }, {
                jkwsUri: import("convex/values").VString<string, "required">;
                audience: import("convex/values").VString<string, "required">;
                issuer: import("convex/values").VString<string, "required">;
            }, "required", "jkwsUri" | "audience" | "issuer">;
        }, "required", "auth" | "auth.jkwsUri" | "auth.audience" | "auth.issuer">;
        features: import("convex/values").VArray<{
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }[], import("convex/values").VObject<{
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            enabled: import("convex/values").VBoolean<boolean, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "name" | "createdAt" | "updatedAt" | "enabled">, "required">;
        subscribers: import("convex/values").VArray<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }[], import("convex/values").VObject<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"api-key", [import("convex/values").VLiteral<"api-key", "required">], "required", never>;
            value: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastActivityAt: import("convex/values").VFloat64<number, "required">;
        }, "required", "id" | "name" | "value" | "createdAt" | "type" | "updatedAt" | "lastActivityAt">, "required">;
        createdAt: import("convex/values").VFloat64<number, "required">;
        updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
    }, "required", "id" | "name" | "createdAt" | "updatedAt" | "config" | "features" | "subscribers" | "config.auth" | "config.auth.jkwsUri" | "config.auth.audience" | "config.auth.issuer">, {
        by_public_id: ["id", "_creationTime"];
        by_name: ["name", "_creationTime"];
    }, {}, {}>;
}, true>;
export default _default;
export declare const IdSchema: import("convex/values").VObject<{
    id: string;
}, {
    id: import("convex/values").VString<string, "required">;
}, "required", "id">;
export type IdArgs = Infer<typeof IdSchema>;
export declare const BlogIdSchema: import("convex/values").VObject<{
    id: import("convex/values").GenericId<"blogs">;
}, {
    id: import("convex/values").VId<import("convex/values").GenericId<"blogs">, "required">;
}, "required", "id">;
export type BlogIdArgs = Infer<typeof BlogIdSchema>;
export type CreateBlogArgs = Infer<typeof BlogEntitySchema>;
export declare const UpdateBlogSchema: import("convex/values").VObject<{
    id: import("convex/values").GenericId<"blogs">;
    updates: {
        type?: "post" | "topic" | undefined;
        updatedAt?: number | undefined;
        content?: string | undefined;
        isLocked?: boolean | undefined;
        lastActivityAt?: number | undefined;
        comments?: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }[] | undefined;
        attachments?: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[] | undefined;
        reactions?: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[] | undefined;
        viewers?: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[] | undefined;
        engagement?: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        } | undefined;
        tags?: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[] | undefined;
        title?: string | undefined;
        priority?: number | undefined;
        isDraft?: boolean | undefined;
        isPinned?: boolean | undefined;
    };
}, {
    id: import("convex/values").VId<import("convex/values").GenericId<"blogs">, "required">;
    updates: import("convex/values").VObject<{
        type?: "post" | "topic" | undefined;
        updatedAt?: number | undefined;
        content?: string | undefined;
        isLocked?: boolean | undefined;
        lastActivityAt?: number | undefined;
        comments?: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }[] | undefined;
        attachments?: {
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[] | undefined;
        reactions?: {
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[] | undefined;
        viewers?: {
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[] | undefined;
        engagement?: {
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        } | undefined;
        tags?: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[] | undefined;
        title?: string | undefined;
        priority?: number | undefined;
        isDraft?: boolean | undefined;
        isPinned?: boolean | undefined;
    }, {
        type: import("convex/values").VUnion<"post" | "topic" | undefined, [import("convex/values").VLiteral<"post", "required">, import("convex/values").VLiteral<"topic", "required">], "optional", never>;
        tags: import("convex/values").VArray<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            value: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">, "optional">;
        title: import("convex/values").VString<string | undefined, "optional">;
        content: import("convex/values").VString<string | undefined, "optional">;
        priority: import("convex/values").VFloat64<number | undefined, "optional">;
        isDraft: import("convex/values").VBoolean<boolean | undefined, "optional">;
        isPinned: import("convex/values").VBoolean<boolean | undefined, "optional">;
        isLocked: import("convex/values").VBoolean<boolean | undefined, "optional">;
        comments: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            content: string;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            attachments: {
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[];
            reactions: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[];
            viewers: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[];
            engagement: {
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            };
            replies: {
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[];
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            content: import("convex/values").VString<string, "required">;
            replies: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                content: string;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                attachments: {
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[];
                reactions: {
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[];
                viewers: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[];
                engagement: {
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                };
            }, {
                id: import("convex/values").VString<string, "required">;
                user: import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                content: import("convex/values").VString<string, "required">;
                attachments: import("convex/values").VArray<{
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }[], import("convex/values").VObject<{
                    id: string;
                    createdAt: number;
                    type: "media/image";
                    updatedAt: number | null;
                    url: string | null;
                    content: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
                    url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    createdAt: import("convex/values").VFloat64<number, "required">;
                    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
                viewers: import("convex/values").VArray<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }[], import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
                reactions: import("convex/values").VArray<{
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }[], import("convex/values").VObject<{
                    id: string;
                    createdAt: number;
                    updatedAt: number | null;
                    user: {
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    };
                    code: string;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    user: import("convex/values").VObject<{
                        id: string;
                        email: string;
                        alias: string | null;
                        firstName: string | null;
                        lastName: string | null;
                    }, {
                        id: import("convex/values").VString<string, "required">;
                        email: import("convex/values").VString<string, "required">;
                        alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                        firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                        lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                    code: import("convex/values").VString<string, "required">;
                    createdAt: import("convex/values").VFloat64<number, "required">;
                    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
                engagement: import("convex/values").VObject<{
                    updatedAt: number | null;
                    views: number;
                    comments: number;
                    attachments: number;
                    reactions: number;
                }, {
                    views: import("convex/values").VFloat64<number, "required">;
                    comments: import("convex/values").VFloat64<number, "required">;
                    attachments: import("convex/values").VFloat64<number, "required">;
                    reactions: import("convex/values").VFloat64<number, "required">;
                    updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions">, "required">;
            attachments: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                type: "media/image";
                updatedAt: number | null;
                url: string | null;
                content: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
                url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "required">;
            viewers: import("convex/values").VArray<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }[], import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "required">;
            reactions: import("convex/values").VArray<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }[], import("convex/values").VObject<{
                id: string;
                createdAt: number;
                updatedAt: number | null;
                user: {
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                };
                code: string;
            }, {
                id: import("convex/values").VString<string, "required">;
                user: import("convex/values").VObject<{
                    id: string;
                    email: string;
                    alias: string | null;
                    firstName: string | null;
                    lastName: string | null;
                }, {
                    id: import("convex/values").VString<string, "required">;
                    email: import("convex/values").VString<string, "required">;
                    alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                    lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
                code: import("convex/values").VString<string, "required">;
                createdAt: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "required">;
            engagement: import("convex/values").VObject<{
                updatedAt: number | null;
                views: number;
                comments: number;
                attachments: number;
                reactions: number;
            }, {
                views: import("convex/values").VFloat64<number, "required">;
                comments: import("convex/values").VFloat64<number, "required">;
                attachments: import("convex/values").VFloat64<number, "required">;
                reactions: import("convex/values").VFloat64<number, "required">;
                updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "content" | "user" | "attachments" | "reactions" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "replies">, "optional">;
        reactions: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            createdAt: number;
            updatedAt: number | null;
            user: {
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            };
            code: string;
        }, {
            id: import("convex/values").VString<string, "required">;
            user: import("convex/values").VObject<{
                id: string;
                email: string;
                alias: string | null;
                firstName: string | null;
                lastName: string | null;
            }, {
                id: import("convex/values").VString<string, "required">;
                email: import("convex/values").VString<string, "required">;
                alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
                lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            }, "required", "id" | "email" | "alias" | "firstName" | "lastName">;
            code: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "updatedAt" | "user" | "code" | "user.id" | "user.email" | "user.alias" | "user.firstName" | "user.lastName">, "optional">;
        attachments: import("convex/values").VArray<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            createdAt: number;
            type: "media/image";
            updatedAt: number | null;
            url: string | null;
            content: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"media/image", [import("convex/values").VLiteral<"media/image", "required">], "required", never>;
            url: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            content: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "createdAt" | "type" | "updatedAt" | "url" | "content">, "optional">;
        viewers: import("convex/values").VArray<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            email: string;
            alias: string | null;
            firstName: string | null;
            lastName: string | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            email: import("convex/values").VString<string, "required">;
            alias: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            firstName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastName: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "email" | "alias" | "firstName" | "lastName">, "optional">;
        engagement: import("convex/values").VObject<{
            updatedAt: number | null;
            views: number;
            comments: number;
            attachments: number;
            reactions: number;
        } | undefined, {
            views: import("convex/values").VFloat64<number, "required">;
            comments: import("convex/values").VFloat64<number, "required">;
            attachments: import("convex/values").VFloat64<number, "required">;
            reactions: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "optional", "updatedAt" | "views" | "comments" | "attachments" | "reactions">;
        updatedAt: import("convex/values").VFloat64<number | undefined, "optional">;
        lastActivityAt: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "type" | "updatedAt" | "content" | "isLocked" | "lastActivityAt" | "comments" | "attachments" | "reactions" | "viewers" | "engagement" | "engagement.updatedAt" | "engagement.views" | "engagement.comments" | "engagement.attachments" | "engagement.reactions" | "tags" | "title" | "priority" | "isDraft" | "isPinned">;
}, "required", "id" | "updates" | "updates.type" | "updates.updatedAt" | "updates.content" | "updates.isLocked" | "updates.lastActivityAt" | "updates.comments" | "updates.attachments" | "updates.reactions" | "updates.viewers" | "updates.engagement" | "updates.engagement.updatedAt" | "updates.engagement.views" | "updates.engagement.comments" | "updates.engagement.attachments" | "updates.engagement.reactions" | "updates.tags" | "updates.title" | "updates.priority" | "updates.isDraft" | "updates.isPinned">;
export type UpdateBlogArgs = Infer<typeof UpdateBlogSchema>;
export declare const UserIdSchema: import("convex/values").VObject<{
    id: import("convex/values").GenericId<"users">;
}, {
    id: import("convex/values").VId<import("convex/values").GenericId<"users">, "required">;
}, "required", "id">;
export type UserIdArgs = Infer<typeof UserIdSchema>;
export declare const EmailSchema: import("convex/values").VObject<{
    email: string;
}, {
    email: import("convex/values").VString<string, "required">;
}, "required", "email">;
export type EmailArgs = Infer<typeof EmailSchema>;
export declare const AuthIdSchema: import("convex/values").VObject<{
    authId: string;
}, {
    authId: import("convex/values").VString<string, "required">;
}, "required", "authId">;
export type AuthIdArgs = Infer<typeof AuthIdSchema>;
export declare const AliasSchema: import("convex/values").VObject<{
    alias: string;
}, {
    alias: import("convex/values").VString<string, "required">;
}, "required", "alias">;
export type AliasArgs = Infer<typeof AliasSchema>;
export type CreateUserArgs = Infer<typeof UserEntitySchema>;
export declare const UpdateUserSchema: import("convex/values").VObject<{
    id: import("convex/values").GenericId<"users">;
    updates: {
        updatedAt?: number | undefined;
        authId?: string | undefined;
        email?: string | undefined;
        alias?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        dateOfBirth?: string | null | undefined;
        bio?: string | null | undefined;
        preferences?: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[] | undefined;
        role?: "user" | "admin" | undefined;
        isLocked?: boolean | undefined;
        lastActivityAt?: number | undefined;
    };
}, {
    id: import("convex/values").VId<import("convex/values").GenericId<"users">, "required">;
    updates: import("convex/values").VObject<{
        updatedAt?: number | undefined;
        authId?: string | undefined;
        email?: string | undefined;
        alias?: string | null | undefined;
        firstName?: string | null | undefined;
        lastName?: string | null | undefined;
        dateOfBirth?: string | null | undefined;
        bio?: string | null | undefined;
        preferences?: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[] | undefined;
        role?: "user" | "admin" | undefined;
        isLocked?: boolean | undefined;
        lastActivityAt?: number | undefined;
    }, {
        authId: import("convex/values").VString<string | undefined, "optional">;
        email: import("convex/values").VString<string | undefined, "optional">;
        alias: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "optional", never>;
        firstName: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "optional", never>;
        lastName: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "optional", never>;
        dateOfBirth: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "optional", never>;
        bio: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "optional", never>;
        preferences: import("convex/values").VArray<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            updatedAt: number | null;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            value: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "name" | "value" | "createdAt" | "updatedAt">, "optional">;
        role: import("convex/values").VUnion<"user" | "admin" | undefined, [import("convex/values").VLiteral<"user", "required">, import("convex/values").VLiteral<"admin", "required">], "optional", never>;
        isLocked: import("convex/values").VBoolean<boolean | undefined, "optional">;
        updatedAt: import("convex/values").VFloat64<number | undefined, "optional">;
        lastActivityAt: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "updatedAt" | "authId" | "email" | "alias" | "firstName" | "lastName" | "dateOfBirth" | "bio" | "preferences" | "role" | "isLocked" | "lastActivityAt">;
}, "required", "id" | "updates" | "updates.updatedAt" | "updates.isLocked" | "updates.lastActivityAt" | "updates.authId" | "updates.email" | "updates.alias" | "updates.firstName" | "updates.lastName" | "updates.dateOfBirth" | "updates.bio" | "updates.preferences" | "updates.role">;
export type UpdateUserArgs = Infer<typeof UpdateUserSchema>;
export declare const BlogTypeSchema: import("convex/values").VObject<{
    type: "post" | "topic";
    paginationOpts: {
        id?: number;
        endCursor?: string | null;
        maximumRowsRead?: number;
        maximumBytesRead?: number;
        numItems: number;
        cursor: string | null;
    };
}, {
    type: import("convex/values").VUnion<"post" | "topic", [import("convex/values").VLiteral<"post", "required">, import("convex/values").VLiteral<"topic", "required">], "required", never>;
    paginationOpts: import("convex/values").VObject<{
        id?: number;
        endCursor?: string | null;
        maximumRowsRead?: number;
        maximumBytesRead?: number;
        numItems: number;
        cursor: string | null;
    }, {
        numItems: import("convex/values").VFloat64<number, "required">;
        cursor: import("convex/values").VUnion<string | null, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        endCursor: import("convex/values").VUnion<string | null | undefined, [import("convex/values").VString<string, "required">, import("convex/values").VNull<null, "required">], "optional", never>;
        id: import("convex/values").VFloat64<number | undefined, "optional">;
        maximumRowsRead: import("convex/values").VFloat64<number | undefined, "optional">;
        maximumBytesRead: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "id" | "numItems" | "cursor" | "endCursor" | "maximumRowsRead" | "maximumBytesRead">;
}, "required", "type" | "paginationOpts" | "paginationOpts.id" | "paginationOpts.numItems" | "paginationOpts.cursor" | "paginationOpts.endCursor" | "paginationOpts.maximumRowsRead" | "paginationOpts.maximumBytesRead">;
export type BlogTypeArgs = Infer<typeof BlogTypeSchema>;
export declare const ApiIdSchema: import("convex/values").VObject<{
    id: import("convex/values").GenericId<"apis">;
}, {
    id: import("convex/values").VId<import("convex/values").GenericId<"apis">, "required">;
}, "required", "id">;
export type ApiIdArgs = Infer<typeof ApiIdSchema>;
export declare const ApiNameSchema: import("convex/values").VObject<{
    name: string;
}, {
    name: import("convex/values").VString<string, "required">;
}, "required", "name">;
export type ApiNameArgs = Infer<typeof ApiNameSchema>;
export type CreateApiArgs = Infer<typeof ApiEntitySchema>;
export declare const UpdateApiSchema: import("convex/values").VObject<{
    id: import("convex/values").GenericId<"apis">;
    updates: {
        name?: string | undefined;
        updatedAt?: number | undefined;
        lastActivityAt?: number | undefined;
        config?: {
            auth: {
                jkwsUri: string;
                audience: string;
                issuer: string;
            };
        } | undefined;
        features?: {
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }[] | undefined;
        subscribers?: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }[] | undefined;
    };
}, {
    id: import("convex/values").VId<import("convex/values").GenericId<"apis">, "required">;
    updates: import("convex/values").VObject<{
        name?: string | undefined;
        updatedAt?: number | undefined;
        lastActivityAt?: number | undefined;
        config?: {
            auth: {
                jkwsUri: string;
                audience: string;
                issuer: string;
            };
        } | undefined;
        features?: {
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }[] | undefined;
        subscribers?: {
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }[] | undefined;
    }, {
        name: import("convex/values").VString<string | undefined, "optional">;
        config: import("convex/values").VObject<{
            auth: {
                jkwsUri: string;
                audience: string;
                issuer: string;
            };
        } | undefined, {
            auth: import("convex/values").VObject<{
                jkwsUri: string;
                audience: string;
                issuer: string;
            }, {
                jkwsUri: import("convex/values").VString<string, "required">;
                audience: import("convex/values").VString<string, "required">;
                issuer: import("convex/values").VString<string, "required">;
            }, "required", "jkwsUri" | "audience" | "issuer">;
        }, "optional", "auth" | "auth.jkwsUri" | "auth.audience" | "auth.issuer">;
        features: import("convex/values").VArray<{
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            name: string;
            createdAt: number;
            updatedAt: number | null;
            enabled: boolean;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            enabled: import("convex/values").VBoolean<boolean, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
        }, "required", "id" | "name" | "createdAt" | "updatedAt" | "enabled">, "optional">;
        subscribers: import("convex/values").VArray<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }[] | undefined, import("convex/values").VObject<{
            id: string;
            name: string;
            value: string;
            createdAt: number;
            type: "api-key";
            updatedAt: number | null;
            lastActivityAt: number;
        }, {
            id: import("convex/values").VString<string, "required">;
            name: import("convex/values").VString<string, "required">;
            type: import("convex/values").VUnion<"api-key", [import("convex/values").VLiteral<"api-key", "required">], "required", never>;
            value: import("convex/values").VString<string, "required">;
            createdAt: import("convex/values").VFloat64<number, "required">;
            updatedAt: import("convex/values").VUnion<number | null, [import("convex/values").VFloat64<number, "required">, import("convex/values").VNull<null, "required">], "required", never>;
            lastActivityAt: import("convex/values").VFloat64<number, "required">;
        }, "required", "id" | "name" | "value" | "createdAt" | "type" | "updatedAt" | "lastActivityAt">, "optional">;
        updatedAt: import("convex/values").VFloat64<number | undefined, "optional">;
        lastActivityAt: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "name" | "updatedAt" | "lastActivityAt" | "config" | "features" | "subscribers" | "config.auth" | "config.auth.jkwsUri" | "config.auth.audience" | "config.auth.issuer">;
}, "required", "id" | "updates" | "updates.updatedAt" | "updates.lastActivityAt" | "updates.name" | "updates.config" | "updates.features" | "updates.subscribers" | "updates.config.auth" | "updates.config.auth.jkwsUri" | "updates.config.auth.audience" | "updates.config.auth.issuer">;
export type UpdateApiArgs = Infer<typeof UpdateApiSchema>;
//# sourceMappingURL=schema.d.ts.map