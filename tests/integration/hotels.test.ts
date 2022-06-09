import supertest from 'supertest';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { createRoomsUser } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
  await createRoomsUser();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('should return the Hotels with capacity and occupation values 200 (OK)', async () => {
    const response = await server.get('/hotels');
    expect(response.status).toBe(httpStatus.OK);
  });
});
