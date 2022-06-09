import roomsRepository from '@/repositories/rooms-repository';
import roomsUsersRepository from '@/repositories/rooms-users-repository';
import { Room } from '@prisma/client';

async function getByHotelId(hotelId: number) {
  //check if hotel with that Id exists, if not throw error

  const rooms = await roomsRepository.getByHotelId(hotelId);

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

const roomsService = {
  getByHotelId,
};

export default roomsService;
