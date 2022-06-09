import { getRoomsByHotelId } from '@/controllers/rooms-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const roomsRouter = Router();

roomsRouter.get('/:hotelId', authenticateToken, getRoomsByHotelId);

export { roomsRouter };
