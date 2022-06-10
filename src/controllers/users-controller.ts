import httpStatus from 'http-status';
import { Request, Response } from 'express';

import { AuthenticatedRequest } from '@/middlewares';

import userService from '@/services/users-service';

export async function usersPost(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.createUser({ email, password });
  res.status(httpStatus.CREATED).json({
    id: user.id,
    email: user.email,
  });
}

export async function getRoomBooking(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  const room = await userService.getUserRoomInfo(userId);

  res.status(httpStatus.OK).send(room);
}
