import { jest } from '@jest/globals';

import { createPaymentBody, generateId } from '../factories';
import { cleanMocks } from '../helpers';

import paymentService from '@/services/payments-service';
import { notFoundTicketError, duplicatedPaymentError } from '@/services';

import paymentRepository from '@/repositories/payment-repository';
import ticketRepository from '@/repositories/ticket-repository';

import { Payment, Ticket } from '@prisma/client';

const sut = paymentService;

describe('Payment Service - create', () => {
  beforeEach(() => {
    cleanMocks();
  });

  it('should return not found error for no found user ticket', async () => {
    const invalidUserId = generateId(false);
    const validBody = createPaymentBody();
    const invalidCreatePaymentData = {
      userId: invalidUserId,
      creditCardData: validBody,
    };

    jest.spyOn(ticketRepository, 'findByUserId').mockResolvedValueOnce(null);

    const result = sut.createPayment(invalidCreatePaymentData);
    await expect(result).rejects.toEqual(notFoundTicketError(invalidUserId));
  });

  it('should return conflict error for ticket payment already realized', async () => {
    const userId = generateId();
    const validBody = createPaymentBody();
    const validCreatePaymentData = {
      userId,
      creditCardData: validBody,
    };
    const ticketId = generateId();
    const ticket = { id: ticketId, userId, modalityId: generateId() } as Ticket;
    const payment = {
      id: generateId(),
      ticketId,
      isPayed: true,
      totalPrice: 100,
    } as Payment;

    jest.spyOn(ticketRepository, 'findByUserId').mockResolvedValueOnce(ticket);
    jest.spyOn(paymentRepository, 'findByTicketId').mockResolvedValueOnce(payment);

    const result = sut.createPayment(validCreatePaymentData);
    await expect(result).rejects.toEqual(duplicatedPaymentError(ticketId));
  });
});
