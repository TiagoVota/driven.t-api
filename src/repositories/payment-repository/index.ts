import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByTicketId(ticketId: number) {
  const payment = await prisma.payment.findUnique({
    where: {
      ticketId,
    },
  });

  return payment;
}

async function create(data: Prisma.PaymentUncheckedCreateInput) {
  return prisma.payment.create({
    data,
  });
}

const paymentRepository = {
  findByTicketId,
  create,
};

export default paymentRepository;
