import faker from '@faker-js/faker';

import { prisma } from '@/config';

import { Location } from '@prisma/client';

export async function createLocation(params: Partial<Location>) {
  const location = await prisma.location.create({
    data: {
      name: params.name || faker.lorem.words(3),
      eventDayId: params.eventDayId,
    },
  });

  return location;
}
