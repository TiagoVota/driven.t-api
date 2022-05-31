import { Ticket } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import { duplicatedUserError } from './errors';

export type CreateTicketParams = Pick<Ticket, 'modalityId' | 'userId'>;

export async function createTicket(CreateTicketParams: CreateTicketParams) {
  await checkIfUserAlreadyHasATicket(CreateTicketParams.userId);

  return await ticketRepository.create(CreateTicketParams);
}

async function checkIfUserAlreadyHasATicket(userId: number) {
  const user = await ticketRepository.findUser(userId);
  if (user) {
    throw duplicatedUserError();
  }
}

const ticketsService = {
  createTicket,
};

export default ticketsService;
