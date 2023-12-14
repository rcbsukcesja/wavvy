import { ThemeStrategyDescription } from '@/theme/types';

import { ThemePreferenceStrategyOptions } from '../types';

export const ManualPreferenceStrategy = (
  state: ThemeStrategyDescription & { strategy: 'MANUAL' },
): ThemePreferenceStrategyOptions => {
  const subscribe: ThemePreferenceStrategyOptions['subscribe'] = () => {};
  const unsubscribe = () => undefined;
  return { subscribe, unsubscribe, initialValue: state.theme };
};
