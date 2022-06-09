import { prisma } from '@/config';

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
  findById,
};

export default roomsRepository;
