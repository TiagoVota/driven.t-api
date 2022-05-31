import { Router } from 'express';
import { createTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.post('/', createTicket);

export { ticketsRouter };
