import { getNightHours } from './getNightHours';

export const msTillNight = (date: Date) => {
  const now = Date.now();
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
  const nightDate = new Date(year, month, day, getNightHours(date), 0, 0, 0);
  const millisTillNight = nightDate.getTime() - now;
  return millisTillNight;
};
