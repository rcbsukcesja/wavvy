import { Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { MainColors, Theme } from 'src/theme/types';

interface BottomSheetProps {
  children: React.ReactNode;
  borderColor?: keyof MainColors;
}

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FAFAFA',
      paddingVertical: theme.spacing.layout.vertical.xl,
      paddingHorizontal: theme.spacing.layout.horizontal.xxl,
      borderTopLeftRadius: 48,
      borderTopRightRadius: 48,
      height: Dimensions.get('window').height * 0.66,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderTopWidth: 3,
      gap: theme.spacing.layout.vertical.md,
    },
  });

  return styles;
};

export function BottomSheet({ children, borderColor = 'accent' }: BottomSheetProps) {
  const styles = useThemedStyles(themedStyles);
  const { colors } = useTheme();

  return <View style={[styles.container, { borderTopColor: colors.main[borderColor] }]}>{children}</View>;
}
