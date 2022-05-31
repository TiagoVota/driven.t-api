import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data,
  });
}

async function findUser(userId: number) {
  return prisma.ticket.findUnique({
    where: {
      userId: userId,
    },
  });
}

const ticketRepository = {
  create,
  findUser,
};

export default ticketRepository;
