import { Router } from 'express';
import { createTicket, findTicketPrice, getTicketByUserId } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTicketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter.get('/:userId', getTicketByUserId);
ticketsRouter.post('/', validateBody(createTicketSchema), authenticateToken, createTicket);
ticketsRouter.post('/price', authenticateToken, findTicketPrice);

export { ticketsRouter };
