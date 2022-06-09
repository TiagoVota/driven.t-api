import roomRepository from '@/repositories/room-repository';

import { noFoundRoomError } from './errors';

export async function getUserRoomInfo(userId: number) {
  const room = await findRoomByUserIdOrFail(userId);

  const roomUsers = await roomRepository.findUserInRoom(room.id);
  const occupied = roomUsers.length;

  return { ...room, occupied };
}

async function findRoomByUserIdOrFail(userId: number) {
  const room = await roomRepository.findByUserId(userId);
  if (!room) throw noFoundRoomError(userId);

  return room;
}

const roomService = {
  getUserRoomInfo,
};

export * from './errors';
export default roomService;
