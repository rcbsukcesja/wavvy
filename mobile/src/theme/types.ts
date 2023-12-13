import { backdrop } from './backdrop';
import { borderRadius } from './borderRadius';
import { DARK_COLORS, LIGHT_COLORS } from './colors';
import { COMMON_COLORS } from './colorsConfig';
import { shadows } from './shadows';
import { spacing } from './spacing';
import { fontSizes, fontTypes, iconSizes } from './typography';

export type CommonColors = typeof COMMON_COLORS;

export type LightColors = typeof LIGHT_COLORS;

export type TextColors = typeof LIGHT_COLORS.text | typeof DARK_COLORS.text;

export type SurfaceColors = typeof LIGHT_COLORS.surface | typeof DARK_COLORS.surface;

export type StateMainColors = typeof LIGHT_COLORS.state.main | typeof DARK_COLORS.state.main;

export type StateTextColors = typeof LIGHT_COLORS.state.text | typeof DARK_COLORS.state.text;

export type MainColors = typeof LIGHT_COLORS.main | typeof DARK_COLORS.main;

export type DarkColors = typeof DARK_COLORS;

export type Spacing = typeof spacing;

export type LetterSpacing = typeof spacing.letter;

export type LayoutSpacing = typeof spacing.layout;

export type LineSpacing = typeof spacing.line;

export type Shadows = typeof shadows;

export type FontSizes = typeof fontSizes;

export type FontTypes = typeof fontTypes;

export type BorderRadius = typeof borderRadius;

export type IconSizes = typeof iconSizes;

export type Backdrop = typeof backdrop;

export type ThemeMode = 'LIGHT' | 'DARK';

export type ThemeModeValue = {
  mode: 'SYSTEM' | 'TIME_OF_THE_DAY' | 'MANUAL';
  theme?: ThemeMode;
};

export interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface Theme {
  colors: LightColors | DarkColors;
  spacing: Spacing;
  shadows: Shadows;
  fontSizes: FontSizes;
  fontTypes: FontTypes;
  borderRadius: BorderRadius;
  iconSizes: IconSizes;
  backdrop: Backdrop;
}

export interface ThemeDispatchContextType {
  setSystemStrategy: () => void;
  setTimeOfTheDayStrategy: () => void;
  setManualStrategy: (theme: ThemeMode) => void;
}

export interface ThemePreferenceStrategyOptions {
  subscribe: (callback: (theme: ThemeMode) => void) => void;
  unsubscribe: () => void;
  initialValue: ThemeMode;
}

export type ThemeStrategyDescription =
  | { strategy: 'TIME_OF_THE_DAY' }
  | { strategy: 'SYSTEM' }
  | { strategy: 'MANUAL'; theme: ThemeMode };
