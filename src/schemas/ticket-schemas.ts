import Joi from 'joi';
import { CreateTicketParams } from '@/services/tickets-service';

export const createTicketSchema = Joi.object<CreateTicketParams>({
  userId: Joi.number().required(),
  modalityId: Joi.number().required(),
});
