import { ThemeStrategyDescription } from './types';
import { ManualPreferenceStrategy } from './utils/ManualPreferenceStrategy';
import { SystemPreferenceStrategy } from './utils/SystemPreferenceStrategy';
import { TimeOfTheDayPreferenceStrategy } from './utils/TimeOfTheDayPreferenceStrategy';

export function getThemePreferenceStrategy(theme: ThemeStrategyDescription) {
  switch (theme.strategy) {
    case 'TIME_OF_THE_DAY':
      return TimeOfTheDayPreferenceStrategy();
    case 'SYSTEM':
      return SystemPreferenceStrategy();
    case 'MANUAL':
      return ManualPreferenceStrategy(theme);
    default:
      return SystemPreferenceStrategy();
  }
}
