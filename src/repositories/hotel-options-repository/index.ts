import { prisma } from '@/config';

async function getAll() {
  return prisma.hotelOption.findMany({});
}

const hotelOptionsRepository = {
  getAll,
};

export default hotelOptionsRepository;
