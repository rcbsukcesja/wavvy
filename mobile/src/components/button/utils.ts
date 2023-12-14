export const getButtonTextColor = (
  onSurface: 'onPrimary' | 'onSurface' | 'onBackground' | 'onSecondary',
  disabled: boolean,
) => {
  if (disabled) return 'onDisabledButton';
  return onSurface;
};
