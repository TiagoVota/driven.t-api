import { jest } from '@jest/globals';

import { generateId } from '../factories';
import { cleanMocks } from '../helpers';

import { noFoundRoomError } from '@/services';
import userService from '@/services/users-service';

import roomRepository from '@/repositories/room-repository';

const sut = userService;

describe('User Service - getUserRoomInfo', () => {
  beforeEach(() => {
    cleanMocks();
  });

  it('should throw not found error for no found user room', async () => {
    const invalidUserId = generateId(false);

    jest.spyOn(roomRepository, 'findByUserId').mockResolvedValueOnce(null);

    const result = sut.getUserRoomInfo(invalidUserId);
    await expect(result).rejects.toEqual(noFoundRoomError(invalidUserId));
  });
});
