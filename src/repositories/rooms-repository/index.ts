import { prisma } from '@/config';

async function getByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

async function findById(id: number) {
  return prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      RoomsUsers: true,
    },
  });
}

const roomsRepository = {
  getByHotelId,
  findById,
};

export default roomsRepository;
