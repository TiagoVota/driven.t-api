import { Response } from 'express';
import httpStatus from 'http-status';
import roomsService from '@/services/rooms-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const rooms = await roomsService.getByHotelId(+hotelId);

  res.status(httpStatus.OK).send(rooms);
}

export async function reservateRoom(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { roomId } = req.body;
  await roomsService.reservateRoom(+userId, +roomId);

  res.sendStatus(httpStatus.CREATED);
}

export async function checkIfUserHasARoom(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  const room = await roomsService.checkIfUserHasARoom(+userId);

  res.status(httpStatus.OK).send(room);
}
