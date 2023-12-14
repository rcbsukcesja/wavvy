import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { Text } from '../text/Text.component';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: theme.spacing.layout.vertical.xl,
    },
  });

  return styles;
};

export default function FallbackMessage() {
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <Text size="xl" type="primaryBold">
        Brak wyników spełniających obecne kryteria filtrowania.
      </Text>
    </View>
  );
}
