import { prisma } from '@/config';
import faker from '@faker-js/faker';

export async function createHotel() {
  const hotel = await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.internet.url(),
    },
  });

  return hotel;
}
