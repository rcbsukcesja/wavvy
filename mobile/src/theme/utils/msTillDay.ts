import { getDayHours } from './getDayHours';

export const msTillDay = (date: Date) => {
  const now = Date.now();
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
  const dayTime = new Date(year, month, day, getDayHours(date), 0, 0, 0);
  const millisTillDay = dayTime.getTime() - now;
  return millisTillDay;
};
