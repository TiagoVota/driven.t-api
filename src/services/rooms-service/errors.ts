import { ApplicationError } from '@/protocols';

export function noFoundRoomError(userId: number): ApplicationError {
  return {
    name: 'NoFoundRoomError',
    message: `There is no room from user with id '${userId}'!`,
  };
}
