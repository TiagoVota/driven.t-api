import { Request, Response } from 'express';
import httpStatus from 'http-status';
import modalitiesService from '@/services/modalities-service';
import { AuthenticatedRequest } from '@/middlewares';

export async function getAllModalities(req: AuthenticatedRequest, res: Response) {
  const modalities = await modalitiesService.getAll();

  res.status(httpStatus.OK).send(modalities);
}
