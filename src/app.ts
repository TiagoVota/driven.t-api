import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB, connectRedis, disconnectRedis } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  ticketsRouter,
  modalitiesRouter,
  paymentsRouter,
  roomsRouter,
  hotelsRouter,
  githubRouter,
  eventDayRouter,
} from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/tickets', ticketsRouter)
  .use('/modalities', modalitiesRouter)
  .use('/payments', paymentsRouter)
  .use('/rooms', roomsRouter)
  .use('/hotels', hotelsRouter)
  .use('/oauth', githubRouter)
  .use('/eventday', eventDayRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  connectRedis();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
  await disconnectRedis();
}

export default app;
