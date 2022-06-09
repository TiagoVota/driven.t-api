import roomRepository from '@/repositories/room-repository';

import { noFoundRoomError } from './errors';

async function findRoomByUserIdOrFail(userId: number) {
  const room = await roomRepository.findByUserId(userId);
  if (!room) throw noFoundRoomError(userId);

  return room;
}

async function findRoomOccupation(roomId: number) {
  const roomUsers = await roomRepository.findUserInRoom(roomId);
  const occupation = roomUsers.length;

  return occupation;
}

const roomService = {
  findRoomByUserIdOrFail,
  findRoomOccupation,
};

export * from './errors';
export default roomService;
