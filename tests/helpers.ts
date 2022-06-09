import { jest } from '@jest/globals';
import * as jwt from 'jsonwebtoken';

import { prisma } from '@/config';

import { createUser, createSession } from './factories';

import { User } from '@prisma/client';

export async function cleanDb() {
  await prisma.address.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.modality.deleteMany({});
  await prisma.hotelOption.deleteMany({});
  await prisma.roomsUsers.deleteMany({});
  await prisma.room.deleteMany({});
  await prisma.hotel.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}

export function cleanMocks() {
  jest.clearAllMocks();
  jest.resetAllMocks();
}
