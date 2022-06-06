import { Router } from 'express';
import { createTicket, findTicketPrice, findTicketByUserId } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.post('/', createTicket);
ticketsRouter.post('/price', findTicketPrice);
ticketsRouter.get('/', authenticateToken, findTicketByUserId);

export { ticketsRouter };
