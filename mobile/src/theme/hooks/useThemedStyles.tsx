import { useMemo } from 'react';
import { useTheme } from 'src/theme/hooks/useTheme';

import { StylesGenerator } from './types';

export const useThemedStyles = <T extends object>(styles: StylesGenerator<T>) => {
  const theme = useTheme();

  const themedStyles = useMemo(() => styles(theme), [styles, theme]);

  return themedStyles;
};
