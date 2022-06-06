import { Router } from 'express';
import { findPaymentByTicketId } from '@/controllers/payment-controller';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, findPaymentByTicketId);

export { paymentRouter };
