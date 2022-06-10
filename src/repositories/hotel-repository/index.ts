import { prisma } from '@/config';

async function find(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });
}

async function getHotels() {
  return prisma.hotel.findMany({
    include: {
      Room: {
        include: {
          RoomsUsers: true,
        },
      },
    },
  });
}

const hotelRepository = {
  find,
  getHotels,
};

export default hotelRepository;
