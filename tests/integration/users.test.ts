import app, { init } from '@/app';
import { prisma } from '@/config';
import { duplicatedEmailError } from '@/services/users-service';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEvent, createUser, findUserActivity, findUserById, seedActivity, seedEvent } from '../factories';
import { createRoomsUser } from '../factories/roomsUsers-factory';
import { cleanDb, cleanRedis, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
  await cleanRedis();
});

const server = supertest(app);

describe('POST /users', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/users');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/users').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(6),
    });

    it('should respond with status 400 when there is no event', async () => {
      const body = generateValidBody();

      const response = await server.post('/users').send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when current event did not started yet', async () => {
      const event = await createEvent({ startsAt: dayjs().add(1, 'day').toDate() });
      const body = generateValidBody();

      const response = await server.post('/users').send(body).query({ eventId: event.id });

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when event started', () => {
      beforeAll(async () => {
        await seedEvent();
      });

      it('should respond with status 409 when there is an user with given email', async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post('/users').send(body);

        expect(response.status).toBe(httpStatus.CONFLICT);
        expect(response.body.message).toEqual(duplicatedEmailError().message);
      });

      it('should respond with status 201 and create user when given email is unique', async () => {
        const body = generateValidBody();

        const response = await server.post('/users').send(body);

        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({
          id: expect.any(Number),
          email: body.email,
        });
      });

      it('should not return user password on body', async () => {
        const body = generateValidBody();

        const response = await server.post('/users').send(body);

        expect(response.body).not.toHaveProperty('password');
      });

      it('should save user on db', async () => {
        const body = generateValidBody();

        const response = await server.post('/users').send(body);

        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });
        expect(user).toEqual(
          expect.objectContaining({
            id: response.body.id,
            email: body.email,
          }),
        );
      });
    });
  });
});

describe('GET /users/room', () => {
  it("should respond with status 200 and show user's room info", async () => {
    const userRoom = await createRoomsUser();
    const user = await findUserById(userRoom.userId);
    const token = await generateValidToken(user);

    const response = await server.get('/users/room').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('hotel');
    expect(response.body).toHaveProperty('roomType');
    expect(response.body.capacity).toBeGreaterThanOrEqual(response.body.occupation);
  });
});

describe('POST /users/activities/:activityId/register', () => {
  it('should return status 201 and insert user activity', async () => {
    const { activity } = await seedActivity({});
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server
      .post(`/users/activities/${activity.id}/register`)
      .set('Authorization', `Bearer ${token}`)
      .send({});

    const userActivity = await findUserActivity(user.id, activity.id);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(userActivity).not.toBeNull();
    expect(response.body.capacity).toBeGreaterThanOrEqual(response.body.occupation);
    expect(response.body.occupation).toEqual(activity.occupation + 1);
  });
});
