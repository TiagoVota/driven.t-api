import { prisma } from '@/config';

async function findEventDays() {
  const eventDays = await prisma.eventDay.findMany({
    orderBy: [
      {
        date: 'asc',
      },
    ],
  });
  return eventDays;
}

const eventDayRepository = {
  findEventDays,
};

export default eventDayRepository;
