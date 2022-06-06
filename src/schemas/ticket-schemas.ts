import Joi from 'joi';
import { CreateTicketParams } from '@/services/tickets-service';

export const createTicketSchema = Joi.object<CreateTicketParams>({
  modalityId: Joi.number().required(),
});
