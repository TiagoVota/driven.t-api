import { Router } from 'express';

import { creditCardInfoSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { makePayment, findPaymentByUserId } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);

paymentsRouter.post('/', validateBody(creditCardInfoSchema), makePayment);
paymentsRouter.get('/', findPaymentByUserId);

export { paymentsRouter };
