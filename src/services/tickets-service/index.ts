import { Ticket } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import { duplicatedUserError, invalidUserError, invalidTicketError } from './errors';
import userRepository from '@/repositories/user-repository';
import modalitiesRepository from '@/repositories/modalities-repository';

export type CreateTicketParams = Pick<Ticket, 'modalityId' | 'userId'>;

// CREATE TICKET

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

// FIND TICKET PRICE

export async function findTicketPriceByUserId(userId: number) {
  await checkIfUserExists(userId);
  await checkIfTicketExists(userId);
  const modality = await ticketRepository.findTicketModalityByUserId(userId);
  const price = await modalitiesRepository.findModalityPriceById(modality.modalityId);
  const ticketPrice = sumPrices(price.price, price.HotelOption.price);
  const ticket = {
    modality: modality.modalityId,
    price: ticketPrice,
  };
  return ticket;
}

async function checkIfTicketExists(userId: number) {
  const ticket = await ticketRepository.findUser(userId);
  if (!ticket) {
    throw invalidTicketError();
  }
}

function sumPrices(ticketPrice: number, hotelPrice: number) {
  const sum = ticketPrice + hotelPrice;
  return sum;
}

const ticketsService = {
  createTicket,
  findTicketPriceByUserId,
};

export default ticketsService;
