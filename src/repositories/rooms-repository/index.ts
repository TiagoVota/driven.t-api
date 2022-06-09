import { prisma } from '@/config';

async function getByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
  });
}

const roomsRepository = {
  getByHotelId,
};

export default roomsRepository;
