import { prisma } from '@/config';

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
