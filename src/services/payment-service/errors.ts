import { ApplicationError } from '@/protocols';

export function duplicatedUserError(): ApplicationError {
  return {
    name: 'DuplicatedUserError',
    message: 'There is already a payment associated with this ticket',
  };
}

export function invalidUserError(): ApplicationError {
  return {
    name: 'InvalidUserError',
    message: 'User does not exist',
  };
}
