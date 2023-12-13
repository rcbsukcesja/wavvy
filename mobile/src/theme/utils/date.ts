import { endOfMonth, format, startOfMonth } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export function getFirstAndLastDayOfMonth(year: number, month: number) {
  const timeZone = 'Europe/Warsaw';

  const firstDay = startOfMonth(new Date(year, month, 1));
  const lastDay = endOfMonth(new Date(year, month, 1));

  const firstDayInTimeZone = utcToZonedTime(firstDay, timeZone);
  const lastDayInTimeZone = utcToZonedTime(lastDay, timeZone);

  return {
    firstDay: format(firstDayInTimeZone, 'yyyy-MM-dd'),
    lastDay: format(lastDayInTimeZone, 'yyyy-MM-dd'),
  };
}

export const monthPickerOptions = [
  { label: 'Styczeń', value: 0 },
  { label: 'Luty', value: 1 },
  { label: 'Marzec', value: 2 },
  { label: 'Kwiecień', value: 3 },
  { label: 'Maj', value: 4 },
  { label: 'Czerwiec', value: 5 },
  { label: 'Lipiec', value: 6 },
  { label: 'Sierpień', value: 7 },
  { label: 'Wrzesień', value: 8 },
  { label: 'Październik', value: 9 },
  { label: 'Listopad', value: 10 },
  { label: 'Grudzień', value: 11 },
];

export const MONTHS_PL = {
  0: 'Styczeń',
  1: 'Luty',
  2: 'Marzec',
  3: 'Kwiecień',
  4: 'Maj',
  5: 'Czerwiec',
  6: 'Lipiec',
  7: 'Sierpień',
  8: 'Wrzesień',
  9: 'Październik',
  10: 'Listopad',
  11: 'Grudzień',
};

export const currentYear = new Date().getFullYear();
export const currentMonth = new Date().getMonth();

export const yearPickerOptions = [
  { label: (currentYear - 1).toString(), value: currentYear - 1 },
  { label: currentYear.toString(), value: currentYear },
  { label: (currentYear + 1).toString(), value: currentYear + 1 },
];
