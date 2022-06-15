import { Request, Response } from 'express';
import httpStatus from 'http-status';
import eventDayService from '@/services/eventDay-service';

export async function getEventDays(req: Request, res: Response) {
  const eventDays = await eventDayService.getEventDays();
  return res.status(httpStatus.OK).send(eventDays);
}
