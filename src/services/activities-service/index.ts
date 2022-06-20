import activityRepository, { ActivityWithLocation, UserDayActivities } from '@/repositories/activity-repository';

import {
  notFoundActivityError,
  conflictUserActivityError,
  conflictTimeActivityError,
  registerActivityError,
} from './errors';

export interface RegisterActivityParams {
  userId: number;
  activityId: number;
}

export async function registerUserActivity(params: RegisterActivityParams) {
  const { userId, activityId } = params;

  const activity = await findActivityOrFail(activityId);
  const userActivities = await activityRepository.findUserDayActivities(userId, activity.Location.eventDayId);
  validateUserActivityOrFail(userActivities, activityId);
  validateActivitiesTimeOrFail(activity, userActivities);

  const updatedActivity = await registerActivityOrFail(userId, activityId);

  return updatedActivity;
}

async function findActivityOrFail(activityId: number) {
  const activity = await activityRepository.findById(activityId);
  if (!activity) throw notFoundActivityError(activityId);

  return activity;
}

function validateUserActivityOrFail(userActivities: UserDayActivities, activityId: number) {
  const userAlreadyRegistered = userActivities.some((userActivity) => userActivity.activityId === activityId);
  if (userAlreadyRegistered) throw conflictUserActivityError(activityId);
}

function validateActivitiesTimeOrFail(activity: ActivityWithLocation, userActivities: UserDayActivities) {
  const activityStart = Number(activity.startAt);
  const activityEnd = activityStart + Number(activity.duration);

  const haveConflictActivityTime = userActivities.some((userActivity) => {
    const actualActivity = userActivity.Activity;
    const actualStart = Number(actualActivity.startAt);
    const actualEnd = actualStart + Number(actualActivity.duration);

    const chosenStartsInsideActual = actualStart <= activityStart && activityStart < actualEnd;
    const chosenEndsInActual = actualStart < activityEnd && activityEnd <= actualEnd;

    return chosenStartsInsideActual || chosenEndsInActual;
  });

  if (haveConflictActivityTime) throw conflictTimeActivityError();
}

async function registerActivityOrFail(userId: number, activityId: number) {
  const updatedActivity = await activityRepository.registerUser(activityId, userId);
  if (!updatedActivity) throw registerActivityError(activityId);

  return updatedActivity;
}

const activityService = {
  registerUserActivity,
};

export * from './errors';
export default activityService;
