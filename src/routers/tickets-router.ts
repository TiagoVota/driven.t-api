import { Router } from 'express';
import { createTicket, findTicketPrice } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.post('/', createTicket);
ticketsRouter.post('/price', findTicketPrice);

export { ticketsRouter };
