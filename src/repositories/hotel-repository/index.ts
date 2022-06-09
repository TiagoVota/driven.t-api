import { prisma } from '@/config';

async function find(hotelId: number) {
  return prisma.hotel.findUnique({
    where: {
      id: hotelId,
    },
  });
}

const hotelRepository = {
  find,
};

export default hotelRepository;
