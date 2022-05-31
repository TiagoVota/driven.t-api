import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';

export async function createTicket(req: Request, res: Response) {
  const { userId, modalityId } = req.body;
  const ticketData = { userId, modalityId };
  await ticketsService.createTicket(ticketData);

  res.sendStatus(httpStatus.CREATED);
}
