import roomRepository from '@/repositories/room-repository';
import hotelRepository from '@/repositories/hotel-repository';
import roomsUsersRepository from '@/repositories/roomsUsers-repository';
import { Room } from '@prisma/client';
import { hotelDoesNotExistsError, noFoundRoomError, roomDoesNotExistsError } from './errors';
import { makeRoomTypeByCapacity } from './utils';

async function getByHotelId(hotelId: number) {
  if (isNaN(hotelId)) throw hotelDoesNotExistsError(hotelId);

  const hotel = await hotelRepository.find(hotelId);
  if (!hotel) throw hotelDoesNotExistsError(hotelId);

  const rooms = await roomRepository.getByHotelId(hotelId);

  return await getRoomAvailabilities(rooms);
}

async function reservateRoom(userId: number, roomId: number) {
  const room = await roomRepository.findById(roomId);
  if (!room) throw roomDoesNotExistsError(roomId);

  const userRoom = await roomRepository.findByUserId(userId);
  if (userRoom) await deleteUserRoomById(userId);

  await roomsUsersRepository.reservateRoom(userId, roomId);
  return;
}

async function checkIfUserHasARoom(userId: number) {
  const room = await roomsUsersRepository.findByUserId(userId);

  return room;
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

async function deleteUserRoomById(userId: number) {
  const selectedRoom = await roomsUsersRepository.findByUserId(userId);

  if (selectedRoom === null) return;

  const { id } = selectedRoom;
  await roomsUsersRepository.deleteById(id);
}

const roomService = {
  getByHotelId,
  reservateRoom,
  checkIfUserHasARoom,
  findRoomByUserIdOrFail,
  findRoomOccupation,
};

export * from './errors';
export default roomService;
