import { prisma } from '@/config';

export async function createEventDay(date?: Date) {
  const eventDay = await prisma.eventDay.create({
    data: {
      date: date || new Date(),
    },
  });

  return eventDay;
}
