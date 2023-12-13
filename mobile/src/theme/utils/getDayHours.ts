import { nightTime } from './constants';
import { isSummer } from './isSummer';

export const getDayHours = (date: Date) => (isSummer(date) ? nightTime.summer.day : nightTime.winter.day);
