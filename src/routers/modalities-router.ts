import { getAllModalities } from '@/controllers/modalities-controller';
import { Router } from 'express';

const modalitiesRouter = Router();

modalitiesRouter.get('/', getAllModalities);

export { modalitiesRouter };
