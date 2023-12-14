import { StyleSheet, View } from 'react-native';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { FilterMonth } from './FilterMonth/FilterMonth';
import { FilterYear } from './FilterYear/FilterYear';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: theme.spacing.layout.vertical.lg,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  });

  return styles;
};

export function EventListFilter() {
  const setSelectedMonth = useCombinedStore(state => state.setSelectedMonth);
  const selectedMonth = useCombinedStore(state => state.selectedMonth);
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <View>
        <FilterMonth />
      </View>
      <View>
        <FilterYear />
      </View>
    </View>
  );
}
