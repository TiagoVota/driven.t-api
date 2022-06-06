import { Request, Response } from 'express';
import httpStatus from 'http-status';
import * as paymentService from '@/services/payment-service';

export async function findPaymentByTicketId(req: Request, res: Response) {
  const userId = res.locals.userId;
  const payment = await paymentService.findByUserId(userId);
  return res.status(httpStatus.OK).send(payment);
}
