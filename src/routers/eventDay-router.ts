import { Router } from 'express';
import { getEventDays } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const eventDayRouter = Router();

eventDayRouter.get('/', authenticateToken, getEventDays);

export { eventDayRouter };
