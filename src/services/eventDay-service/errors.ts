import { ApplicationError } from '@/protocols';

export function notFoundEventDaysError(): ApplicationError {
  return {
    name: 'NotFoundEventDaysError',
    message: 'No eventDays were found',
  };
}
