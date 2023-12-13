import { useContext } from 'react';
import { ThemeContext } from 'src/theme/ThemeProvider';

export const useTheme = () => useContext(ThemeContext);
