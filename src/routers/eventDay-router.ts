import { Router } from 'express';
import { getEventDays } from '@/controllers';

const eventDayRouter = Router();

eventDayRouter.get('/', getEventDays);

export { eventDayRouter };
