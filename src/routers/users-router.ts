import { Router } from 'express';

import { activityInscriptionSchema, createUserSchema } from '@/schemas';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { getRoomBooking, usersPost, makeActivityRegister } from '@/controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), usersPost);

usersRouter.use(authenticateToken);
usersRouter.get('/room', getRoomBooking);
usersRouter.post('/activities/:activityId/register', validateParams(activityInscriptionSchema), makeActivityRegister);

export { usersRouter };
