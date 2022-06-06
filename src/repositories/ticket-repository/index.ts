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

async function findByUserId(userId: number) {
  return prisma.ticket.findUnique({
    where: {
      userId: userId,
    },
    include: {
      Modality: true,
    },
  });
}

async function findTicketModalityByUserId(userId: number) {
  return prisma.ticket.findUnique({
    where: {
      userId,
    },
    select: {
      modalityId: true,
    },
  });
}

const ticketRepository = {
  create,
  findUser,
  findTicketModalityByUserId,
  findByUserId,
};

export default ticketRepository;
