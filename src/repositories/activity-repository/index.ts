import { prisma } from '@/config';
import { filledActivityError } from '@/services';
import { Location } from '@prisma/client';

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never;

export type ActivityWithLocation = UnboxPromise<ReturnType<typeof findById>>;

async function findById(id: number) {
  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
    include: {
      Location: true,
    },
  });

  return activity;
}

export type UserActivities = UnboxPromise<ReturnType<typeof findUserActivities>>;

async function findUserActivities(userId: number) {
  const userActivity = await prisma.activitiesUsers.findMany({
    where: {
      userId,
    },
    include: {
      Activity: {
        include: {
          Location: true,
        },
      },
    },
  });

  return userActivity;
}

export type UserDayActivities = UnboxPromise<ReturnType<typeof findUserDayActivities>>;

async function findUserDayActivities(userId: number, eventDayId: number) {
  const userActivity = await prisma.activitiesUsers.findMany({
    where: {
      userId,
      Activity: {
        Location: {
          eventDayId,
        },
      },
    },
    include: {
      Activity: true,
    },
  });

  return userActivity;
}

async function registerUser(id: number, userId: number) {
  const updatedActivity = await prisma.$transaction(async () => {
    const activity = await updateOccupation(id);

    const isCapacityFilled = activity.capacity < activity.occupation;
    if (isCapacityFilled) throw filledActivityError(id);

    await createUserActivity(id, userId);

    return activity;
  });

  return updatedActivity;
}

async function updateOccupation(id: number) {
  const activity = await prisma.activity.update({
    data: {
      occupation: {
        increment: 1,
      },
    },
    where: {
      id,
    },
  });

  return activity;
}

async function createUserActivity(id: number, userId: number) {
  const userActivity = await prisma.activitiesUsers.create({
    data: {
      activityId: id,
      userId: userId,
    },
  });

  return userActivity;
}

const activityRepository = {
  findById,
  findUserActivities,
  findUserDayActivities,
  registerUser,
};

export default activityRepository;
