import roomRepository from '@/repositories/room-repository';
import hotelRepository from '@/repositories/hotel-repository';
import roomsUsersRepository from '@/repositories/rooms-users-repository';
import { Room } from '@prisma/client';
import { hotelDoesNotExistsError, noFoundRoomError } from './errors';
import { makeRoomTypeByCapacity } from './utils';

async function getByHotelId(hotelId: number) {
  if (isNaN(hotelId)) throw hotelDoesNotExistsError(hotelId);

  const hotel = await hotelRepository.find(hotelId);
  if (!hotel) throw hotelDoesNotExistsError(hotelId);

  const rooms = await roomRepository.getByHotelId(hotelId);

  return await getRoomAvailabilities(rooms);
}

async function getRoomAvailabilities(rooms: Room[]) {
  const roomsWithAvailability = [];
  for (let i = 0; i < rooms.length; i++) {
    const usersOnRoom = await roomsUsersRepository.getByRoomId(rooms[i].id);
    const availableSlots = rooms[i].capacity - usersOnRoom.length;
    roomsWithAvailability.push({ ...rooms[i], availableSlots });
  }

  return roomsWithAvailability;
}

async function findRoomByUserIdOrFail(userId: number) {
  const room = await roomRepository.findByUserId(userId);
  if (!room) throw noFoundRoomError(userId);
  delete Object.assign(room, { ['hotel']: room['Hotel'] })['Hotel'];

  const roomType = makeRoomTypeByCapacity(room.capacity);
  return { ...room, roomType };
}

async function findRoomOccupation(roomId: number) {
  const roomUsers = await roomRepository.findUserInRoom(roomId);
  const occupation = roomUsers.length;

  return occupation;
}

const roomService = {
  getByHotelId,
  findRoomByUserIdOrFail,
  findRoomOccupation,
};

export * from './errors';
export default roomService;
