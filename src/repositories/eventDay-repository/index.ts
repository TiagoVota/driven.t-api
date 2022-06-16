import { prisma } from '@/config';

async function findEventDays() {
  const eventDays = await prisma.eventDay.findMany({
    orderBy: [
      {
        date: 'asc',
      },
    ],
    include: {
      Location: {
        include: {
          Activity: {
            orderBy: [{ startAt: 'asc' }],
          },
        },
      },
    },
  });
  return eventDays;
}

const eventDayRepository = {
  findEventDays,
};

export default eventDayRepository;
