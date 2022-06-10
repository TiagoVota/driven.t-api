import { prisma } from '@/config';

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

async function getByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

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

const roomRepository = {
  findByUserId,
  findUserInRoom,
  getByHotelId,
  findById,
};

export default roomRepository;
