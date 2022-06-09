import { prisma } from '@/config';
import faker from '@faker-js/faker';
import { createHotel } from './hotels-factory';

export async function createRoom() {
  const hotel = await createHotel();
  const room = await prisma.room.create({
    data: {
      name: '101',
      capacity: faker.datatype.number({
        min: 1,
        max: 3,
      }),
      hotelId: hotel.id,
    },
  });

  return room;
}
