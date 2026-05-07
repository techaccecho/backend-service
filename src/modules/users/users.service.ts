import type { ConvexHttpClient } from 'convex/browser';
import type { PaginationOptions } from 'convex/server';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';

export class UsersService {
  constructor(private convex: ConvexHttpClient) {}

  async findById(userId: Id<'users'>) {
    const user = await this.convex.query(api.users.getById, { userId });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  }

  async getUsers(options: PaginationOptions) {
    // Convex returns a { page, isDone, continueCursor } object
    return await this.convex.query(api.users.list, {
      paginationOpts: options,
    });
  }
}
