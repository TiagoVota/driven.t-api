import { ApplicationError } from '@/protocols';

export function hotelDoesNotExistsError(hotelId: number): ApplicationError {
  return {
    name: 'HotelDoesNotExistsError',
    message: `There is not a hotel with the id '${hotelId}'!`,
  };
}

export function noFoundRoomError(userId: number): ApplicationError {
  return {
    name: 'NoFoundRoomError',
    message: `There is no room from user with id '${userId}'!`,
  };
}
