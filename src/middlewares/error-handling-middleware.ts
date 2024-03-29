import { ApplicationError } from '@/protocols';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export function handleApplicationErrors(
  err: ApplicationError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const badRequestErrorsNames = [
    'CannotEnrollBeforeStartDateError',
    'HotelDoesNotExistsError',
    'RoomDoesNotExistsError',
    'RegisterActivityError',
  ];
  if (badRequestErrorsNames.includes(err.name)) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  const conflictErrorsNames = [
    'ConflictError',
    'DuplicatedEmailError',
    'DuplicatedUserError',
    'DuplicatedPaymentError',
    'DuplicatedPaymentError',
    'UserAlreadyHasARoomError',
    'ConflictUserActivityError',
    'ConflictTimeActivityError',
    'FilledActivityError',
  ];
  if (conflictErrorsNames.includes(err.name)) {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  const unauthorizedErrorsNames = ['UnauthorizedError', 'InvalidCredentialsError', 'unavailableEmailError'];
  if (unauthorizedErrorsNames.includes(err.name)) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  const notFoundErrorsNames = [
    'NotFoundError',
    'NotFoundTicketError',
    'InvalidUserError',
    'InvalidTicketError',
    'NoFoundRoomError',
    'NotFoundActivityError',
  ];
  if (notFoundErrorsNames.includes(err.name)) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: 'InternalServerError',
    message: 'Internal Server Error',
  });
}
