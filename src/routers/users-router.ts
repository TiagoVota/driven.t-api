import { Router } from 'express';

import { createUserSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';
import { getRoomBooking, usersPost } from '@/controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);

usersRouter.use(authenticateToken);
usersRouter.get('/room', getRoomBooking);

export { usersRouter };
