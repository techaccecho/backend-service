export declare const create: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<import("convex/values").GenericId<"users">>>;
export declare const find: import("convex/server").RegisteredQuery<"public", {
    id: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
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
} | null>>;
export declare const findByEmail: import("convex/server").RegisteredQuery<"public", {
    email: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
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
} | null>>;
export declare const findByAuthId: import("convex/server").RegisteredQuery<"public", {
    authId: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
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
} | null>>;
export declare const findByAlias: import("convex/server").RegisteredQuery<"public", {
    alias: string;
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
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
} | null>>;
export declare const list: import("convex/server").RegisteredQuery<"public", {
    paginationOpts: {
        id?: number;
        endCursor?: string | null;
        maximumRowsRead?: number;
        maximumBytesRead?: number;
        numItems: number;
        cursor: string | null;
    };
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
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
}>>>;
export declare const update: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<{
    _id: import("convex/values").GenericId<"users">;
    _creationTime: number;
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
} | null>>;
export declare const remove: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"users">;
}, Promise<import("convex/values").GenericId<"users">>>;
//# sourceMappingURL=users.d.ts.map