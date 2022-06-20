import { jest } from '@jest/globals';

import { generateId, createActivityBody } from '../factories';
import { cleanMocks } from '../helpers';

import activityService, {
  notFoundActivityError,
  conflictUserActivityError,
  conflictTimeActivityError,
  registerActivityError,
} from '@/services/activities-service';

import activityRepository, { ActivityWithLocation, UserDayActivities } from '@/repositories/activity-repository';
import { Prisma } from '@prisma/client';

const sut = activityService;

describe('Activity Service - register user activity', () => {
  beforeEach(() => {
    cleanMocks();
  });

  it('should throw not found error for not found activity', async () => {
    const userId = generateId();
    const invalidActivityId = generateId(false);

    jest.spyOn(activityRepository, 'findById').mockResolvedValueOnce(null);

    const result = sut.registerUserActivity({
      userId,
      activityId: invalidActivityId,
    });
    await expect(result).rejects.toEqual(notFoundActivityError(invalidActivityId));
    expect(1).toEqual(1);
  });

  it('should throw conflict error for user already registered in activity', async () => {
    const userId = generateId();
    const activityId = generateId();
    const locationId = generateId();
    const eventDayId = generateId();
    const activity = createActivityBody({ locationId });

    const userActivities = [
      {
        id: activityId,
        userId,
        activityId,
        Activity: activity,
      },
    ] as UserDayActivities;

    jest.spyOn(activityRepository, 'findById').mockResolvedValueOnce({
      id: activityId,
      ...activity,
      Location: {
        eventDayId,
      },
    } as ActivityWithLocation);
    jest.spyOn(activityRepository, 'findUserDayActivities').mockResolvedValueOnce(userActivities);

    const result = sut.registerUserActivity({ userId, activityId });
    await expect(result).rejects.toEqual(conflictUserActivityError(activityId));
  });

  it('should throw conflict error for conflict time in activity', async () => {
    const userId = generateId();
    const activityId = generateId();
    const locationId = generateId();
    const eventDayId = generateId();
    const conflictStart = new Prisma.Decimal(9.0);
    const activity = createActivityBody({
      locationId,
      startAt: conflictStart,
    });

    const userActivities = [
      {
        id: activityId + 1,
        userId,
        activityId: activityId + 1,
        Activity: activity,
      },
    ] as UserDayActivities;

    jest.spyOn(activityRepository, 'findById').mockResolvedValueOnce({
      id: activityId,
      ...activity,
      Location: {
        eventDayId,
      },
    } as ActivityWithLocation);
    jest.spyOn(activityRepository, 'findUserDayActivities').mockResolvedValueOnce(userActivities);

    const result = sut.registerUserActivity({ userId, activityId });
    await expect(result).rejects.toEqual(conflictTimeActivityError());
  });

  it('should throw bad request error for no activity done', async () => {
    const userId = generateId();
    const activityId = generateId();
    const locationId = generateId();
    const eventDayId = generateId();
    const activity = createActivityBody({ locationId });

    const userActivities = [
      {
        id: activityId + 1,
        userId,
        activityId: activityId + 1,
        Activity: activity,
      },
    ] as UserDayActivities;

    jest.spyOn(activityRepository, 'findById').mockResolvedValueOnce({
      id: activityId,
      ...activity,
      startAt: new Prisma.Decimal(Number(activity.startAt) + 2 * Number(activity.duration)),
      Location: {
        eventDayId,
      },
    } as ActivityWithLocation);
    jest.spyOn(activityRepository, 'findUserDayActivities').mockResolvedValueOnce(userActivities);
    jest.spyOn(activityRepository, 'registerUser').mockResolvedValueOnce(null);

    const result = sut.registerUserActivity({ userId, activityId });
    await expect(result).rejects.toEqual(registerActivityError(activityId));
  });
});
