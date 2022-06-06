import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';

import paymentService, { CreditCardBody } from '@/services/payments-service';

export async function makePayment(req: AuthenticatedRequest, res: Response) {
  const creditCardData = req.body as CreditCardBody;
  const userId = req.userId;

  const payment = await paymentService.createPayment({
    creditCardData,
    userId,
  });

  const paymentReturnInfo = {
    id: payment.id,
    isPayed: payment.isPayed,
    totalPrice: payment.totalPrice,
  };

  res.status(httpStatus.CREATED).send(paymentReturnInfo);
}

export async function findPaymentByUserId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const payment = await paymentService.findPaymentByUserId(userId);
  return res.status(httpStatus.OK).send(payment);
}
