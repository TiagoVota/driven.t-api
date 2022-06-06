import { prisma } from '@/config';

export function findByUserId(userId: number) {
  return prisma.payment.findUnique({
    where: {
      ticketId: userId,
    },
  });
}
