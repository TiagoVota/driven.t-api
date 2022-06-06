import { invalidUserError } from './errors';
import * as paymentRepository from '@/repositories/payment-repository';
import userRepository from '@/repositories/user-repository';

async function checkIfUserExists(userId: number) {
  const user = await userRepository.findById(userId);
  if (!user) {
    throw invalidUserError();
  }
  return;
}

export async function findByUserId(userId: number) {
  await checkIfUserExists(userId);
  const payment = paymentRepository.findByUserId(userId);

  return payment;
}
