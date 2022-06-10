import { prisma } from '@/config';

async function findByUserId(userId: number) {
  return prisma.roomsUsers.findUnique({
    where: {
      userId,
    },
  });
}

async function deleteById(id: number) {
  return prisma.roomsUsers.delete({
    where: {
      id,
    },
  });
}

async function getByRoomId(roomId: number) {
  return prisma.roomsUsers.findMany({
    where: {
      roomId,
    },
  });
}

async function reservateRoom(userId: number, roomId: number) {
  return prisma.roomsUsers.create({
    data: {
      userId,
      roomId,
    },
  });
}

const roomsUsersRepository = {
  findByUserId,
  deleteById,
  getByRoomId,
  reservateRoom,
};

export default roomsUsersRepository;
