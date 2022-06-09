import { Router } from 'express';

import { authenticateToken } from '@/middlewares';
import { getRoomBooking } from '@/controllers';

const roomsRouter = Router();

roomsRouter.all('/*', authenticateToken).get('/user', getRoomBooking);

export { roomsRouter };
