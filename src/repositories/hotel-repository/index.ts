import { prisma } from '@/config';

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

const hotelsRepository = {
  getHotels,
};

export default hotelsRepository;
