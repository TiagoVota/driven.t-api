import { ApplicationError } from '@/protocols';

export function notFoundActivityError(activityId: number): ApplicationError {
  return {
    name: 'NotFoundActivityError',
    message: `Not found activity with id '${activityId}'!`,
  };
}

export function conflictUserActivityError(activityId: number): ApplicationError {
  return {
    name: 'ConflictUserActivityError',
    message: `User already registered in activity with id '${activityId}'!`,
  };
}

export function conflictTimeActivityError(): ApplicationError {
  return {
    name: 'ConflictTimeActivityError',
    message: `User already has an activity in the meantime!`,
  };
}

export function filledActivityError(activityId: number): ApplicationError {
  return {
    name: 'FilledActivityError',
    message: `Activity with '${activityId}' is already filled!`,
  };
}

export function registerActivityError(activityId: number): ApplicationError {
  return {
    name: 'RegisterActivityError',
    message: `Error trying to register user in activity with id '${activityId}'`,
  };
}
