import { StyleSheet, View } from 'react-native';
import { COMMON_COLORS } from 'src/theme/colorsConfig';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';

const createStyles = () => {
  const styles = StyleSheet.create({
    line: {
      borderBottomColor: COMMON_COLORS.alto,
      borderBottomWidth: 2,
    },
  });

  return styles;
};

export function LineDivider() {
  const styles = useThemedStyles(createStyles);

  return <View style={styles.line} />;
}
