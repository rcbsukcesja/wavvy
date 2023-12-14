import { Appearance, NativeEventSubscription } from 'react-native';

import { ThemeMode, ThemePreferenceStrategyOptions } from '../types';
import { SYSTEM_THEME } from './constants';

export const SystemPreferenceStrategy = (): ThemePreferenceStrategyOptions => {
  const value: ThemeMode = SYSTEM_THEME === 'light' ? 'LIGHT' : 'DARK';
  let subscription: NativeEventSubscription | null = null;

  const subscribe: ThemePreferenceStrategyOptions['subscribe'] = callback => {
    subscription = Appearance.addChangeListener(event => {
      callback(event.colorScheme === 'light' ? 'LIGHT' : 'DARK');
    });
  };

  const unsubscribe = () => {
    subscription?.remove();
  };

  return { subscribe, unsubscribe, initialValue: value };
};
