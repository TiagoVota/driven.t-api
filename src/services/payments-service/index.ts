import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

import { duplicatedPaymentError } from './errors';

import { Payment } from '@prisma/client';
import { notFoundTicketError } from '../tickets-service';

// CONFIRM PAYMENT
export async function createPayment(params: CreditCardParams): Promise<Payment> {
  const { creditCardData, userId } = params;

  const ticket = await findTicketOrFail(userId);

  await validateUniquePaymentOrFail(ticket.id);

  const payment = paymentRepository.create({
    ticketId: ticket.id,
    isPayed: true,
    totalPrice: creditCardData.totalPrice,
  });

  return payment;
}

async function findTicketOrFail(userId: number) {
  const ticket = await ticketRepository.findByUserId(userId);
  if (!ticket) throw notFoundTicketError(userId);

  return ticket;
}

async function validateUniquePaymentOrFail(ticketId: number) {
  const payment = await paymentRepository.findByTicketId(ticketId);
  if (payment) throw duplicatedPaymentError(ticketId);

  return payment;
}

export interface CreditCardParams {
  creditCardData: CreditCardBody;
  userId: number;
}
export interface CreditCardBody {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
  totalPrice: number;
}

const paymentService = {
  createPayment,
};

export * from './errors';
export default paymentService;
