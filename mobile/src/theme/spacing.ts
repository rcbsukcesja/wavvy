import { horizontalScale, verticalScale } from './metrics';

// TODO : prawdopodbnie wartości będą do podmiany po ustalebiu z pocztą

export const spacing = {
  layout: {
    vertical: {
      xs: verticalScale(4),
      sm: verticalScale(8),
      md: verticalScale(12),
      lg: verticalScale(16),
      xl: verticalScale(32),
      xxl: verticalScale(64),
      xxxl: verticalScale(128),
    },
    horizontal: {
      xs: horizontalScale(4),
      sm: horizontalScale(8),
      md: horizontalScale(12),
      lg: horizontalScale(16),
      xl: horizontalScale(32),
      xxl: horizontalScale(64),
      xxxl: verticalScale(128),
    },
  } as const,
  letter: {
    tight: -1,
    normal: 0,
    wide: 1,
    extra_wide: 2,
  } as const,
  line: {
    sm: verticalScale(1.25),
    md: verticalScale(1.5),
    lg: verticalScale(1.75),
  } as const,
  textOffset: horizontalScale(8),
} as const;
