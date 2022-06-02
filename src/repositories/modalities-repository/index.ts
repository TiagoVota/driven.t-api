import { prisma } from '@/config';

async function getAll() {
  return prisma.modality.groupBy({
    by: ['id', 'name', 'price', 'hotelOptionId'],
    orderBy: {
      hotelOptionId: 'asc',
    },
  });
}

async function findModalityPriceById(modalityId: number) {
  return prisma.modality.findUnique({
    where: {
      id: modalityId,
    },
    select: {
      price: true,
      name: true,
      HotelOption: {
        select: {
          price: true,
          isWanted: true,
        },
      },
    },
  });
}

const modalitiesRepository = {
  getAll,
  findModalityPriceById,
};

export default modalitiesRepository;
