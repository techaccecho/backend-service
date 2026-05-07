// import type { ConvexHttpClient } from 'convex/browser';
// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import { api } from '../../../convex/_generated/api';
// import { UsersService } from './users.service';

import { describe, it } from 'vitest';

describe('UsersService', () => {
  //let service: UsersService;
  // Create a mock version of the Convex client
  //   const mockConvex = {
  //     query: vi.fn(),
  //     mutation: vi.fn(),
  //   } as unknown as ConvexHttpClient;

  //   beforeEach(() => {
  //     vi.clearAllMocks();
  //     service = new UsersService(mockConvex);
  //   });

  it('should fetch a user by ID', async () => {
    // const mockUser = { _id: '123', email: 'test@example.com' };
    // mockConvex.query.mockResolvedValue(mockUser);
    // const result = await service.findById('123');
    // expect(mockConvex.query).toHaveBeenCalledWith(api.users.getById, {
    //   userId: '123',
    // });
    // expect(result).toEqual(mockUser);
  });
});
