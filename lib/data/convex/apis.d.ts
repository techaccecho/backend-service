export declare const create: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<import("convex/values").GenericId<"apis">>>;
export declare const find: import("convex/server").RegisteredQuery<"public", {
    id: string;
}, Promise<{
    _id: import("convex/values").GenericId<"apis">;
    _creationTime: number;
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
} | null>>;
export declare const findByName: import("convex/server").RegisteredQuery<"public", {
    name: string;
}, Promise<{
    _id: import("convex/values").GenericId<"apis">;
    _creationTime: number;
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
    _id: import("convex/values").GenericId<"apis">;
    _creationTime: number;
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
}>>>;
export declare const update: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<{
    _id: import("convex/values").GenericId<"apis">;
    _creationTime: number;
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
} | null>>;
export declare const remove: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"apis">;
}, Promise<import("convex/values").GenericId<"apis">>>;
//# sourceMappingURL=apis.d.ts.map