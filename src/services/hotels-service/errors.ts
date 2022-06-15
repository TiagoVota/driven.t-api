import { ApplicationError } from '@/protocols';

export function notFoundHotelsError(): ApplicationError {
  return {
    name: 'NotFoundHotelsError',
    message: 'No hotels were found',
  };
}
