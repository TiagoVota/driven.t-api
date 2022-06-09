import { ApplicationError } from '@/protocols';

export function hotelDoesNotExistsError(hotelId: number): ApplicationError {
  return {
    name: 'HotelDoesNotExistsError',
    message: `There is not a hotel with the id '${hotelId}'!`,
  };
}
