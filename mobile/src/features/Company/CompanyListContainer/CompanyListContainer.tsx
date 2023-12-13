import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Search } from 'src/components/search/Search';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { CompanyList } from '../CompanyList/CompanyList';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.background,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingBottom: theme.spacing.layout.vertical.xl,
      gap: theme.spacing.layout.vertical.xl,
    },
    optionsContainer: {
      height: theme.spacing.layout.vertical.xxxl + theme.spacing.layout.vertical.xxxl,
    },
    option: {
      paddingVertical: theme.spacing.layout.vertical.sm,
    },
  });

  return styles;
};

export function CompanyListContainer() {
  const setSearchedPhrase = useCombinedStore(state => state.setSearchedCompanyPhrase);
  const styles = useThemedStyles(themedStyles);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Search onSearch={setSearchedPhrase} placeholder="> Wyszukaj po nazwie lub zasobach..." />
      <CompanyList />
    </KeyboardAvoidingView>
  );
}
