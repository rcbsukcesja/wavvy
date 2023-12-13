import { summerTime } from './constants';

export const isSummer = (date: Date) => {
  const [month, day] = [date.getMonth() + 1, date.getDate()];

  return (
    (month > summerTime.start.month || (month === summerTime.start.month && day >= summerTime.start.day)) &&
    (month < summerTime.end.month || (month === summerTime.end.month && day <= summerTime.end.day))
  );
};
