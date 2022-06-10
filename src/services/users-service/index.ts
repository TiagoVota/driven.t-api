import bcrypt from 'bcrypt';

import { User } from '@prisma/client';

import eventsService from '../events-service';
import roomService from '../rooms-service';

import userRepository from '@/repositories/user-repository';

import { cannotEnrollBeforeStartDateError } from '@/errors';
import { duplicatedEmailError } from './errors';

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

export async function getUserRoomInfo(userId: number) {
  const room = await roomService.findRoomByUserIdOrFail(userId);

  const occupation = await roomService.findRoomOccupation(room.id);

  return { ...room, occupation };
}

const userService = {
  createUser,
  getUserRoomInfo,
};

export * from './errors';
export default userService;
