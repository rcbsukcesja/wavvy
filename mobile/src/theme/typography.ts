import { moderateScale } from './metrics';

export const fontTypes = {
  primaryBold: 'Poppins-Bold',
  primaryRegular: 'Poppins-Regular',
  primaryLight: 'Poppins-Light',
} as const;

export const fontSizes = {
  sm: moderateScale(14),
  md: moderateScale(16),
  md2: moderateScale(18),
  lg: moderateScale(20),
  xl: moderateScale(24),
  xxl: moderateScale(32),
  xxxl: moderateScale(36),
  '4xl': moderateScale(42),
  '5xl': moderateScale(48),
} as const;

export const iconSizes = {
  md: moderateScale(24),
  lg: moderateScale(32),
  xl: moderateScale(48),
} as const;
