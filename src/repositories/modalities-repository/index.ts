import { prisma } from '@/config';

async function getAll() {
  return prisma.modality.groupBy({
    by: ['id', 'name', 'price', 'hotelOptionId'],
  });
}

const modalitiesRepository = {
  getAll,
};

export default modalitiesRepository;
