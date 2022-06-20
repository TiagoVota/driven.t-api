import { Response } from 'express';
import httpStatus from 'http-status';

import eventDayService from '@/services/eventDay-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getEventDays(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  const eventDays = await eventDayService.getEventDays(+userId);

  return res.status(httpStatus.OK).send(eventDays);
}
