import { Appearance } from 'react-native';

export const summerTime = {
  start: { day: 1, month: 5 },
  end: { day: 1, month: 9 },
};

export const nightTime = {
  summer: { night: 20, day: 6 },
  winter: { night: 18, day: 8 },
};

export const SYSTEM_THEME = Appearance.getColorScheme();
