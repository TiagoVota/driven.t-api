import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByUserId(userId: number) {
  const room = await prisma.room.findFirst({
    where: {
      RoomsUsers: {
        some: {
          userId,
        },
      },
    },
    include: {
      Hotel: true,
    },
  });

  return room;
}

async function findUserInRoom(roomId: number) {
  const users = await prisma.roomsUsers.findMany({
    where: {
      roomId,
    },
    select: {
      User: true,
    },
  });

  return users;
}

const roomRepository = {
  findByUserId,
  findUserInRoom,
};

export default roomRepository;
