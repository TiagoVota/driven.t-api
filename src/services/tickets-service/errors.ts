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

export function invalidTicketError(): ApplicationError {
  return {
    name: 'InvalidTicketError',
    message: 'Ticket does not exist',
  };
}

export function notFoundTicketError(userId: number): ApplicationError {
  return {
    name: 'NotFoundTicketError',
    message: `Not found ticket from user with '${userId}' id`,
  };
}
