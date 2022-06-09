import { prisma } from '@/config';
import { createUser } from './users-factory';
import { createRoom } from './rooms-factory';

export async function createRoomsUser() {
  const user = await createUser();
  const room = await createRoom();
  const roomsUser = await prisma.roomsUsers.create({
    data: {
      userId: user.id,
      roomId: room.id,
    },
  });

  return roomsUser;
}
