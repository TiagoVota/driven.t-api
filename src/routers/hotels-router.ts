import { Router } from 'express';
import { getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotels);

export { hotelsRouter };
