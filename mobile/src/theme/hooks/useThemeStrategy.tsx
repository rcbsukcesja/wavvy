import { useEffect, useMemo, useState } from 'react';
import { getThemePreferenceStrategy } from 'src/theme/ThemePreferenceStrategy';
import { ThemeMode, ThemeStrategyDescription } from 'src/theme/types';

export const useThemeStrategy = (strategy: ThemeStrategyDescription) => {
  const strategyImplementation = useMemo(() => getThemePreferenceStrategy(strategy), [strategy]);
  const [themeMode, setThemeMode] = useState(strategyImplementation.initialValue);

  useEffect(() => {
    setThemeMode(strategyImplementation.initialValue);
  }, [strategyImplementation]);

  useEffect(() => {
    strategyImplementation.subscribe((theme: ThemeMode) => setThemeMode(theme));
    return () => {
      strategyImplementation.unsubscribe();
    };
  }, [strategyImplementation]);

  return { themeMode };
};
