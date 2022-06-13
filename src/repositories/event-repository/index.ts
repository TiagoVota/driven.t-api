import { prisma, redis } from '@/config';

import { Event } from '@prisma/client';

async function findFirst() {
  const cashedEvent = await redis.get('event');
  if (cashedEvent) return JSON.parse(cashedEvent) as Event;

  const event = await prisma.event.findFirst();
  await redis.set('event', JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
