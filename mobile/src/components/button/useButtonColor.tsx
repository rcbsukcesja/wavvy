import { useTheme } from 'src/theme/hooks/useTheme';
import { TextColors } from 'src/theme/types';

import { ButtonVariant } from './types';

interface UseButtonColorsValue {
  textColor: keyof TextColors;
  backgroundColor: string;
}

export const useButtonColor = (variant: ButtonVariant, pressed: boolean, disabled: boolean) => {
  const { colors } = useTheme();

  if (disabled) {
    return { textColor: 'onDisabledButton', backgroundColor: colors.state.main.disabled } as UseButtonColorsValue;
  }

  const colorMappings = {
    primary: {
      textColor: 'onPrimary',
      backgroundColor: pressed ? colors.main.primaryVariant : colors.main.primary,
    },
    secondary: {
      textColor: pressed ? 'onPrimary' : 'onBackground',
      backgroundColor: pressed ? colors.main.secondaryVariant : colors.surface.background,
    },
    menu: {
      textColor: pressed ? 'onPrimary' : 'onBackground',
      backgroundColor: pressed ? colors.main.primaryVariant : colors.surface.background,
    },
    tab: {
      textColor: pressed ? 'onHoverPrimary' : 'onSurface',
      backgroundColor: colors.surface.surface,
    },
  };

  const { textColor, backgroundColor } = colorMappings[variant];

  return { textColor, backgroundColor } as UseButtonColorsValue;
};
