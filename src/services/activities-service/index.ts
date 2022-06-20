import activityRepository from '@/repositories/activity-repository';

// import { duplicatedPaymentError } from './errors';

export async function registerUserActivity(params: RegisterActivityParams) {
  const { userId, activityId } = params;

  return '';
}

export interface RegisterActivityParams {
  userId: number;
  activityId: number;
}

const activityService = {
  registerUserActivity,
};

// export * from './errors';
export default activityService;
