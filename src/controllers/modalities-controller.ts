import { Request, Response } from 'express';
import httpStatus from 'http-status';
import modalitiesService from '@/services/modalities-service';

export async function getAllModalities(req: Request, res: Response) {
  const modalities = await modalitiesService.getAll();

  res.status(httpStatus.OK).send(modalities);
}
