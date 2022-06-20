import { ApplicationError } from '@/protocols';

export function notFoundActivityError(activityId: number): ApplicationError {
  return {
    name: 'NotFoundActivityError',
    message: `Not found activity with id '${activityId}'!`,
  };
}
