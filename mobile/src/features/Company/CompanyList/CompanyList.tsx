import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCompanies } from 'src/API';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import FallbackMessage from 'src/components/fallback/FallbackMessage';
import { LineDivider } from 'src/components/line-divider/LineDivider';
import { SkeletonLoader } from 'src/components/skeleton/Skeleton';
import { Text } from 'src/components/text/Text.component';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { CompanyCard } from '../CompanyCard/CompanyCard';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    errorWrapper: {
      gap: theme.spacing.layout.vertical.xl,
    },
  });

  return styles;
};

export function CompanyList() {
  const searchedCompanyPhrase = useCombinedStore(state => state.searchedCompanyPhrase);
  const { data, isLoading, error, refetch } = useCompanies({
    sort: 'asc',
    search: searchedCompanyPhrase,
    size: 999,
  });
  const separator = useCallback(() => <View style={{ height: 24 }} />, []);
  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    refetch();
  }, [searchedCompanyPhrase]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <View style={styles.errorWrapper}>
        <Text>Wystąpił błąd z pobieraniem danych</Text>
        <LineDivider />
        <PrimaryButton onPress={refetch} label="Spróbuj ponownie pobrać" />
      </View>
    );
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data.content.length ? (
        <FlashList
          data={data.content}
          renderItem={({ item }) => <CompanyCard key={item.id} company={item} />}
          ItemSeparatorComponent={separator}
          estimatedItemSize={400}
        />
      ) : (
        <FallbackMessage />
      )}
    </>
  );
}
