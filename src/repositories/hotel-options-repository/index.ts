import { prisma } from '@/config';

async function getAll() {
  return prisma.hotelOption.findMany({
    orderBy: {
      id: 'asc',
    },
  });
}

const hotelOptionsRepository = {
  getAll,
};

export default hotelOptionsRepository;
