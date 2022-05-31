import { ApplicationError } from '@/protocols';

export function duplicatedUserError(): ApplicationError {
  return {
    name: 'DuplicatedUserError',
    message: 'There is already a ticket associated with this user',
  };
}

export function invalidUserError(): ApplicationError {
  return {
    name: 'InvalidUserError',
    message: 'User does not exist',
  };
}
