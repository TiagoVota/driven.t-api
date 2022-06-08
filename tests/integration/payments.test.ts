import supertest from 'supertest';
import httpStatus from 'http-status';

import app, { init } from '@/app';

import { createModalities, createPaymentBody, createTicket, createUser, findModality, seedEvent } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
  await seedEvent();
  await createModalities();
});

const server = supertest(app);

describe('POST /payments', () => {
  it('should create a payment and return confirmation', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const modality = await findModality();
    await createTicket(user.id, modality.id);
    const paymentBody = createPaymentBody();

    const response = await server.post('/payments').set('Authorization', `Bearer ${token}`).send(paymentBody);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.isPayed).toBe(true);
  });
});

describe('GET /payments', () => {
  it('should find a payment and return 200', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const modality = await findModality();
    await createTicket(user.id, modality.id);
    const paymentBody = createPaymentBody();

    const createdPayment = await server.post('/payments').set('Authorization', `Bearer ${token}`).send(paymentBody);
    const response = await server.get('/payments').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.id).toEqual(createdPayment.body.id);
  });
});
