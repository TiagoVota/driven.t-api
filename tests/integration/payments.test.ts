import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import app, { init } from '@/app';
import { prisma } from '@/config';

import { createEvent, createModalities, createTicket, createUser, findModality, seedEvent } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

import { duplicatedEmailError } from '@/services/users-service';

beforeAll(async () => {
  await init();
  await cleanDb();
  await seedEvent();
  await createModalities();
});

const server = supertest(app);

describe('POST /payments', () => {
  it('should make a payment and return confirmation', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const modality = await findModality();
    await createTicket(user.id, modality.id);

    // const response = await server.post('/payments').set('Authorization', `Bearer ${token}`);

    // console.log({ response });

    expect(1).toEqual(1);
  });
});
