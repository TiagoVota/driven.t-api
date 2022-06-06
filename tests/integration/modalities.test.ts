import supertest from 'supertest';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { createModalities, createUser, seedEvent } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
  await seedEvent();
  await createModalities();
});

const server = supertest(app);

describe('GET /modalities', () => {
  it('should return status 200 and return all available modalities', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const response = await server.get('/modalities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
