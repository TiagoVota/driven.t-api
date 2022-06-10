import { getRoomsByHotelId, reservateRoom } from '@/controllers/rooms-controller';
import { authenticateToken, validateBody } from '@/middlewares';
import { roomSchema } from '@/schemas/rooms-schemas';
import { Router } from 'express';

const roomsRouter = Router();

roomsRouter.get('/:hotelId', authenticateToken, getRoomsByHotelId);
roomsRouter.post('/', validateBody(roomSchema), authenticateToken, reservateRoom);

export { roomsRouter };
