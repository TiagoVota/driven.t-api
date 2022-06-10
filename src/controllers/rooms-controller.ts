import { Response } from 'express';
import httpStatus from 'http-status';
import roomsService from '@/services/rooms-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getRoomsByHotelId(req: AuthenticatedRequest, res: Response) {
  const { hotelId } = req.params;
  const rooms = await roomsService.getByHotelId(+hotelId);

  res.status(httpStatus.OK).send(rooms);
}
