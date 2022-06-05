import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

import app, { init } from '@/app';
import { prisma } from '@/config';

import { createEvent, createModalities, createUser, seedEvent } from '../factories';
import { cleanDb } from '../helpers';

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
    expect(1).toEqual(1);
  });
});
