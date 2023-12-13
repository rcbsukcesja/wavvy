import { nightTime } from './constants';
import { isSummer } from './isSummer';

export const isNight = (date: Date): boolean => {
  const hour = date.getHours();
  if (isSummer(date)) {
    return hour >= nightTime.summer.night || hour < nightTime.summer.day;
  }

  return hour >= nightTime.winter.night || hour < nightTime.winter.day;
};
