import { prisma } from '@/config';

async function findById(id: number) {
  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
  });

  return activity;
}

const activityRepository = {
  findById,
};

export default activityRepository;
