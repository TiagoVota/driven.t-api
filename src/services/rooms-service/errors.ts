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

export function userAlreadyHasARoomError(userId: number): ApplicationError {
  return {
    name: 'UserAlreadyHasARoomError',
    message: `The user ${userId} already has a room!`,
  };
}

export function roomDoesNotExistsError(roomId: number): ApplicationError {
  return {
    name: 'RoomDoesNotExistsError',
    message: `There is not a room with id ${roomId}!`,
  };
}
