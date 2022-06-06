import supertest from 'supertest';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { createModalities, createUser, findModality, seedEvent, createTicket } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
  await seedEvent();
  await createModalities();
});

const server = supertest(app);

describe('POST /tickets', () => {
  it('should create a ticket and return status 201 (CREATED)', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const modality = await findModality();
    const body = { modalityId: modality.id };
    const response = await server.post('/tickets').set('Authorization', `Bearer ${token}`).send(body);

    expect(response.status).toBe(httpStatus.CREATED);
  });

  it('should return status 409 (CONFLICT) if the user already has a ticket', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const modality = await findModality();
    await createTicket(user.id, modality.id);
    const body = { modalityId: modality.id };
    const response = await server.post('/tickets').set('Authorization', `Bearer ${token}`).send(body);
    expect(response.status).toBe(httpStatus.CONFLICT);
  });
});

describe('POST /tickets/price', () => {
  it('should return status 404 (NOT_FOUND) if ticket does not exist', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const response = await server.post('/tickets/price').set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should find the price of the ticket selected by the user and return status 200 (OK)', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const modality = await findModality();
    const ticket = await createTicket(user.id, modality.id);
    const response = await server.post('/tickets/price').set('Authorization', `Bearer ${token}`);
    expect(response.body).toEqual({
      price: expect.any(Number),
      name: expect.any(String),
      isPayed: false,
      id: ticket.id,
    });
  });
});
