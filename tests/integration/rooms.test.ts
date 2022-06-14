import { prisma } from '@/config';
import supertest from 'supertest';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { createHotel, createRoomByHotelId, createUser, seedEvent } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
  await seedEvent();
});

const server = supertest(app);

describe('GET /rooms/hotelId', () => {
  it('should return status 200 and return a list with 3 rooms in that hotel', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotel = await createHotel();
    for (let i = 0; i < 3; i++) {
      await createRoomByHotelId(hotel.id);
    }
    const response = await server.get(`/rooms/${hotel.id}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(3);
  });

  it('should return status 400 given a invalid hotel id', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createHotel();
    const response = await server.get(`/rooms/${0}`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return status 400 given a hotel id that is not a number', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createHotel();
    const response = await server.get(`/rooms/hotel`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
});
describe('GET /rooms', () => {
  it('should return status 200 and return the user room if he has any', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotel = await createHotel();
    const room = await createRoomByHotelId(hotel.id);
    await server.post(`/rooms`).set('Authorization', `Bearer ${token}`).send({ roomId: room.id });

    const response = await server.get(`/rooms`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.userId).toEqual(user.id);
    expect(response.body.roomId).toEqual(room.id);
  });

  it('should return status 200 and return a empty body if user does not have a room', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotel = await createHotel();
    await createRoomByHotelId(hotel.id);

    const response = await server.get(`/rooms`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.id).toBeUndefined();
  });
});

describe('POST /rooms', () => {
  it('should return status 201 persist data on RoomUsers table', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotel = await createHotel();
    const room = await createRoomByHotelId(hotel.id);

    const response = await server.post(`/rooms`).set('Authorization', `Bearer ${token}`).send({ roomId: room.id });

    const reservation = await prisma.roomsUsers.findUnique({
      where: {
        userId: user.id,
      },
    });

    expect(response.status).toBe(httpStatus.CREATED);
    expect(reservation).toBeTruthy();
    expect(reservation.userId).toEqual(user.id);
    expect(reservation.roomId).toEqual(room.id);
  });

  it('should return status 400 given invalid roomId', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotel = await createHotel();
    const room = await createRoomByHotelId(hotel.id);

    const response = await server
      .post(`/rooms`)
      .set('Authorization', `Bearer ${token}`)
      .send({ roomId: room.id + 1000 });

    const reservation = await prisma.roomsUsers.findUnique({
      where: {
        userId: user.id,
      },
    });

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(reservation).toBeNull();
  });
});
