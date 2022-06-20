import { createRoomsUser, createRoom } from '../factories';
import { cleanMocks, cleanDb } from '../helpers';

import usersRoomRepository from '@/repositories/roomsUsers-repository';
import usersRoomService from '@/services/rooms-service';

import { init } from '@/app';

describe('you must book a room for a user who already has a room', () => {
  beforeEach(async () => {
    await init();
    await cleanDb();
    await createRoomsUser();
    cleanMocks();
  });

  it('return 200 on the room change', async () => {
    const initialUserRoom = await createRoomsUser();
    const { userId } = initialUserRoom;

    const newRoom = await createRoom();
    await usersRoomService.reservateRoom(userId, newRoom.id);

    const newUserRoom = await usersRoomRepository.findByUserId(userId);

    expect(initialUserRoom.userId).toEqual(newUserRoom.userId);
    expect(initialUserRoom.roomId).not.toEqual(newUserRoom.roomId);
  });
});
