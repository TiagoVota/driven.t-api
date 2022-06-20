import faker from '@faker-js/faker';

import { prisma } from '@/config';

import { Activity } from '@prisma/client';
import { createEventDay } from './eventDays-factory';
import { createLocation } from './locations-factory';

export function createActivityBody(params: Partial<Activity>) {
  return {
    name: params.name || faker.lorem.words(3),
    startAt: params.startAt || faker.datatype.number({ min: 8, max: 12, precision: 0.5 }),
    duration: params.duration || faker.datatype.number({ min: 1, max: 2, precision: 0.5 }),
    capacity: params.capacity || faker.datatype.number({ min: 31, max: 100 }),
    occupation: params.occupation || faker.datatype.number({ max: 30 }),
    locationId: params.locationId,
  };
}

export async function createActivity(params: Partial<Activity>) {
  const activity = await prisma.activity.create({
    data: createActivityBody(params),
  });

  return activity;
}

export async function seedActivity(params: Partial<Activity>) {
  const eventDay = await createEventDay();
  const location = await createLocation({ eventDayId: eventDay.id });
  const activity = await createActivity({ ...params, locationId: location.id });

  return { eventDay, location, activity };
}
