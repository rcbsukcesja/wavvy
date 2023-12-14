import { MaterialIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { Text } from '../text/Text.component';

interface HeaderProps {
  title: string;
}

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.colors.surface.background,
      height: Dimensions.get('window').height * 0.1,
      paddingTop: theme.spacing.layout.vertical.xl + theme.spacing.layout.vertical.xl,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      gap: theme.spacing.layout.horizontal.md,
    },
    goBackContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    fontBold: {
      fontFamily: theme.fontTypes.primaryBold,
      fontSize: theme.fontSizes.xxl,
    },
  });

  return styles;
};

function Header({ title }: HeaderProps) {
  const styles = useThemedStyles(themedStyles);
  const { colors, fontSizes } = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons name="waves" size={fontSizes.xxl} color={colors.main.primary} />
      <Text size="xl" letterSpacing="wide" type="primaryRegular">
        {title}
      </Text>
    </SafeAreaView>
  );
}

export const HeaderMemoized = memo(Header);
