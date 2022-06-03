import { Router } from 'express';
import { createTicket, findTicketPrice, getTicketByUserId } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.get('/:userId', getTicketByUserId);
ticketsRouter.post('/', createTicket);
ticketsRouter.post('/price', findTicketPrice);

export { ticketsRouter };
