import { prisma } from '@/config';

// await redis.del('hotels');

async function getByRoomId(roomId: number) {
  return prisma.roomsUsers.findMany({
    where: {
      roomId,
    },
  });
}

const roomsUsersRepository = {
  getByRoomId,
};

export default roomsUsersRepository;
