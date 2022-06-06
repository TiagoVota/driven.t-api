import { prisma } from '@/config';

export async function createTicket(userId: number, modalityId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      userId,
      modalityId,
    },
  });

  return ticket;
}
