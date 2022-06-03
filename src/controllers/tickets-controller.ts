import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '@/services/tickets-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function createTicket(req: Request, res: Response) {
  const { userId, modalityId } = req.body;
  const ticketData = { userId, modalityId };
  await ticketsService.createTicket(ticketData);

  res.sendStatus(httpStatus.CREATED);
}

export async function findTicketPrice(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const ticket = await ticketsService.findTicketPriceByUserId(userId);
  return res.status(httpStatus.OK).send(ticket);
}

export async function getTicketByUserId(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const ticket = await ticketsService.getTicketByUserId(+userId);

  return res.status(httpStatus.OK).send(ticket);
}
