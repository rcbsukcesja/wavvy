import { createContext, useMemo, useState } from 'react';
import { getStorageItem, setStorageItem } from 'src/utils/storage';

import { backdrop } from './backdrop';
import { borderRadius } from './borderRadius';
import { colors } from './colors';
import { useThemeStrategy } from './hooks/useThemeStrategy';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { Theme, ThemeDispatchContextType, ThemeMode, ThemeProviderProps, ThemeStrategyDescription } from './types';
import { fontSizes, fontTypes, iconSizes } from './typography';

const defaultTheme: Theme = {
  colors: colors.LIGHT_COLORS,
  shadows,
  spacing,
  fontSizes,
  fontTypes,
  borderRadius,
  iconSizes,
  backdrop,
};

export const ThemeContext = createContext(defaultTheme);
export const ThemeDispatchContext = createContext<ThemeDispatchContextType | Record<string, never>>({});

const getSavedOrDefaultStrategy = () => {
  const storageValue = getStorageItem<ThemeStrategyDescription>('themeMode');
  return storageValue ?? { strategy: 'SYSTEM' };
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [strategy, setStrategy] = useState(() => getSavedOrDefaultStrategy());
  const { themeMode } = useThemeStrategy(strategy);

  const theme = useMemo(
    () => ({
      colors: themeMode === 'LIGHT' ? colors.LIGHT_COLORS : colors.DARK_COLORS,
      spacing,
      shadows,
      fontSizes,
      fontTypes,
      borderRadius,
      iconSizes,
      backdrop,
    }),
    [themeMode],
  );

  const themeDispatchValue = useMemo(
    () => ({
      setSystemStrategy: () => {
        const strategyDescription = { strategy: 'SYSTEM' } as const;
        setStorageItem('themeMode', strategyDescription);
        setStrategy(strategyDescription);
      },
      setTimeOfTheDayStrategy: () => {
        const strategyDescription = { strategy: 'TIME_OF_THE_DAY' } as const;
        setStorageItem('themeMode', strategyDescription);
        setStrategy(strategyDescription);
      },
      setManualStrategy: (themeModeValue: ThemeMode) => {
        const strategyDescription = { strategy: 'MANUAL', theme: themeModeValue } as const;
        setStorageItem('themeMode', strategyDescription);
        setStrategy(strategyDescription);
      },
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeDispatchContext.Provider value={themeDispatchValue}>{children}</ThemeDispatchContext.Provider>
    </ThemeContext.Provider>
  );
}
