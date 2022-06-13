import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { Event } from '@prisma/client';
import { prisma, redis } from '@/config';

export async function createEvent(params: Partial<Event> = {}): Promise<Event> {
  await redis.del('event');

  const event = await prisma.event.create({
    data: {
      title: params.title || faker.lorem.sentence(),
      backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
      logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
      startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate(),
      endsAt: params.endsAt || dayjs().add(5, 'days').toDate(),
    },
  });

  return event;
}

export async function seedEvent() {
  await prisma.event.deleteMany({});
  await redis.del('event');
  await createEvent();
}
