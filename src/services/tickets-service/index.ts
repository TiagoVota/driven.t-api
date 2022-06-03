import { Ticket } from '@prisma/client';

import ticketRepository from '@/repositories/ticket-repository';
import userRepository from '@/repositories/user-repository';
import paymentRepository from '@/repositories/payment-repository';
import modalitiesRepository from '@/repositories/modalities-repository';

import { duplicatedUserError, invalidUserError, invalidTicketError } from './errors';

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
  const ticketInfo = await checkIfTicketExists(userId);
  const isPayed = await checkIfTicketIsPayed(ticketInfo.id);
  const modality = await ticketRepository.findTicketModalityByUserId(userId);
  const ticket = await modalitiesRepository.findModalityPriceById(modality.modalityId);
  const ticketPrice = sumPrices(ticket.price, ticket.HotelOption?.price);
  const ticketName = getTicketName(ticket);
  const ticketData = {
    id: ticketInfo.id,
    isPayed,
    name: ticketName,
    price: ticketPrice,
  };
  return ticketData;
}

async function checkIfTicketExists(userId: number) {
  const ticket = await ticketRepository.findUser(userId);
  if (!ticket) {
    throw invalidTicketError();
  }
  return ticket;
}

async function checkIfTicketIsPayed(ticketId: number) {
  const payment = await paymentRepository.findByTicketId(ticketId);

  return Boolean(payment?.isPayed);
}

function sumPrices(ticketPrice: number, hotelPrice: number) {
  const sum = Boolean(hotelPrice) ? ticketPrice + hotelPrice : ticketPrice;
  return sum;
}

function getTicketName(ticket: any) {
  let name = ticket.name;
  if (ticket.name === 'Online' || ticket.HotelOption === undefined) {
    return name;
  }
  ticket.HotelOption.isWanted ? (name += ' + Com Hotel') : (name += ' + Sem Hotel');
  return name;
}

async function getTicketByUserId(userId: number) {
  const ticket = await ticketRepository.findTicketByUserId(userId);
  if (!ticket) {
    throw invalidTicketError();
  }

  return ticket;
}

const ticketsService = {
  createTicket,
  findTicketPriceByUserId,
  getTicketByUserId,
};

export * from './errors';
export default ticketsService;
