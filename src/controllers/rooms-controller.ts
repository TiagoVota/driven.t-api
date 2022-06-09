import { Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';

import roomService from '@/services/rooms-service';

export async function getRoomBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  const room = await roomService.getUserRoomInfo(userId);

  res.status(httpStatus.OK).send(room);
}
