import { Request, Response } from 'express';
import httpStatus from 'http-status';
import hotelsService from '@/services/hotels-service';

export async function getHotels(req: Request, res: Response) {
  const hotels = await hotelsService.getHotels();
  return res.status(httpStatus.OK).send(hotels);
}
