import { Router } from 'express';
import { createTicket, findTicketPrice, findTicketByUserId } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.post('/', createTicket);
ticketsRouter.get('/', findTicketPrice);
ticketsRouter.get('/user', authenticateToken, findTicketByUserId);

export { ticketsRouter };
