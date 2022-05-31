import { Ticket } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import { duplicatedUserError, invalidUserError } from './errors';
import userRepository from '@/repositories/user-repository';

export type CreateTicketParams = Pick<Ticket, 'modalityId' | 'userId'>;

export async function createTicket(CreateTicketParams: CreateTicketParams) {
  await checkIfUserExists(CreateTicketParams.userId);
  await checkIfUserAlreadyHasATicket(CreateTicketParams.userId);

  return await ticketRepository.create(CreateTicketParams);
}

async function checkIfUserExists(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw invalidUserError();
  }
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
