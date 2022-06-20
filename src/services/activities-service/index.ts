import activityRepository from '@/repositories/activity-repository';

import { notFoundActivityError } from './errors';

export interface RegisterActivityParams {
  userId: number;
  activityId: number;
}

export async function registerUserActivity(params: RegisterActivityParams) {
  const { userId, activityId } = params;

  const activity = await findActivityOrFail(activityId);

  return '';
}

async function findActivityOrFail(activityId: number) {
  const activity = await activityRepository.findById(activityId);
  if (!activity) throw notFoundActivityError(activityId);

  return activity;
}

const activityService = {
  registerUserActivity,
};

// export * from './errors';
export default activityService;
