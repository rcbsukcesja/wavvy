import { nightTime } from './constants';
import { isSummer } from './isSummer';

export const getNightHours = (date: Date) => (isSummer(date) ? nightTime.summer.night : nightTime.winter.night);
