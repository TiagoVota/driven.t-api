import eventDayRepository from '@/repositories/eventDay-repository';
import activityRepository, { UserActivities } from '@/repositories/activity-repository';

import { notFoundEventDaysError } from './errors';

export async function getEventDays(userId: number) {
  const eventDays = await eventDayRepository.findEventDays();
  if (!eventDays) {
    throw notFoundEventDaysError();
  }
  const formatEventDays = dateToDays(eventDays);

  const userActivities = await activityRepository.findUserActivities(userId);

  return {
    days: formatEventDays,
    userActivities: formatUserActivities(userActivities),
  };
}

function formatUserActivities(userActivities: UserActivities) {
  return userActivities.map((userActivity) => userActivity.Activity);
}

function dateToDays(eventDays: EventDay[]) {
  const options: object = { weekday: 'long', month: 'numeric', day: 'numeric' };
  const days = [];

  for (let i = 0; i < eventDays.length; i++) {
    const formatDateToDays = eventDays[i].date.toLocaleDateString('pt-BR', options);
    const day = {
      id: eventDays[i].id,
      day: (formatDateToDays.charAt(0).toUpperCase() + formatDateToDays.slice(1)).replace('-feira', ''),
      location: eventDays[i].Location,
    };
    days.push(day);
  }
  return days;
}

export interface EventDay {
  id: number;
  date: Date;
  Location: object[];
}

const eventDayService = {
  getEventDays,
};

export default eventDayService;
