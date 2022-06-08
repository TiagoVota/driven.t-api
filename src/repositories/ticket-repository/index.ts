import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.TicketUncheckedCreateInput) {
  return prisma.ticket.create({
    data,
  });
}

async function findByUserId(userId: number) {
  const ticket = prisma.ticket.findUnique({
    where: {
      userId,
    },
  });

  return ticket;
}

async function findUser(userId: number) {
  return prisma.ticket.findUnique({
    where: {
      userId: userId,
    },
  });
}

async function findTicketByUserId(userId: number) {
  return prisma.ticket.findUnique({
    where: {
      userId,
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
  findByUserId,
  findUser,
  findTicketByUserId,
  findTicketModalityByUserId,
};

export default ticketRepository;
