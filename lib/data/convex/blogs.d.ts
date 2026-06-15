export declare const create: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<import("convex/values").GenericId<"blogs">>>;
export declare const find: import("convex/server").RegisteredQuery<"public", {
    id: string;
}, Promise<{
    _id: import("convex/values").GenericId<"blogs">;
    _creationTime: number;
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
    _id: import("convex/values").GenericId<"blogs">;
    _creationTime: number;
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
}>>>;
export declare const listByType: import("convex/server").RegisteredQuery<"public", {
    type: "post" | "topic";
    paginationOpts: {
        id?: number;
        endCursor?: string | null;
        maximumRowsRead?: number;
        maximumBytesRead?: number;
        numItems: number;
        cursor: string | null;
    };
}, Promise<import("convex/server").PaginationResult<{
    _id: import("convex/values").GenericId<"blogs">;
    _creationTime: number;
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
}>>>;
export declare const update: import("convex/server").RegisteredMutation<"public", {
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
}, Promise<{
    _id: import("convex/values").GenericId<"blogs">;
    _creationTime: number;
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
} | null>>;
export declare const remove: import("convex/server").RegisteredMutation<"public", {
    id: import("convex/values").GenericId<"blogs">;
}, Promise<import("convex/values").GenericId<"blogs">>>;
//# sourceMappingURL=blogs.d.ts.map