import { useContext } from 'react';
import { ThemeDispatchContext } from 'src/theme/ThemeProvider';

export const useSwitchThemeMode = () => {
  const { setSystemStrategy, setManualStrategy, setTimeOfTheDayStrategy } = useContext(ThemeDispatchContext);

  return { setSystemStrategy, setManualStrategy, setTimeOfTheDayStrategy };
};
