import { prisma, redis } from '@/config';

async function findByUserId(userId: number) {
  return prisma.roomsUsers.findUnique({
    where: {
      userId,
    },
  });
}

async function deleteById(id: number) {
  await redis.del('hotels');
  return prisma.roomsUsers.delete({
    where: {
      id,
    },
  });
}

const roomsUsersRepository = {
  findByUserId,
  deleteById,
};

export default roomsUsersRepository;
