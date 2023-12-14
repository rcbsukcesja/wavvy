import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { BaseButtonVariant } from './types';

interface BaseButtonProps {
  handleOnPress: () => void;
  handleOnPressIn: () => void;
  handleOnPressOut: () => void;
  children: JSX.Element | JSX.Element[];
  variant: BaseButtonVariant;
  backgroundColor: string;
  label: string;
  disabled?: boolean;
  extraStyle?: StyleProp<ViewStyle>;
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    primary: {
      width: '100%',
      height: theme.spacing.layout.vertical.xxl * 1.5,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.colors.main.primary,
      borderWidth: 1,
      ...theme.shadows['4'],
    },
    secondary: {
      width: '100%',
      height: theme.spacing.layout.vertical.xxl * 1.5,
      borderRadius: theme.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.colors.surface.border,
      borderWidth: 2,
      ...theme.shadows['4'],
    },

    disabled: {
      backgroundColor: theme.colors.state.main.disabled,
      borderColor: theme.colors.main.secondary,
      borderWidth: 2,
      shadowColor: 'transparent',
    },
  });

  return styles;
};

export function BaseButton({
  variant,
  handleOnPress,
  handleOnPressIn,
  handleOnPressOut,
  backgroundColor,
  label,
  children,
  disabled,
  extraStyle,
}: BaseButtonProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <Pressable
      style={[styles[variant], { backgroundColor }, disabled && styles.disabled, extraStyle]}
      onPress={handleOnPress}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      disabled={disabled}
      accessibilityLabel={`${label}-button`}>
      {children}
    </Pressable>
  );
}
