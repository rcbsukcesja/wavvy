import { ThemeMode, ThemePreferenceStrategyOptions } from '../types';
import { isNight } from './isNight';
import { msTillDay } from './msTillDay';
import { msTillNight } from './msTillNight';

export const TimeOfTheDayPreferenceStrategy = (): ThemePreferenceStrategyOptions => {
  const initialDate = new Date();
  const value: ThemeMode = isNight(initialDate) ? 'DARK' : 'LIGHT';
  let timer: ReturnType<typeof setTimeout> | null = null;
  const subscribe: ThemePreferenceStrategyOptions['subscribe'] = callback => {
    (function toddListener() {
      const now = new Date();
      timer = setTimeout(
        () => {
          callback(isNight(now) ? 'LIGHT' : 'DARK');
          toddListener();
        },
        isNight(now) ? msTillDay(now) : msTillNight(now),
      );
    })();
  };

  const unsubscribe = () => {
    if (timer || timer === 0) {
      clearTimeout(timer);
    }
  };

  return { subscribe, unsubscribe, initialValue: value };
};
