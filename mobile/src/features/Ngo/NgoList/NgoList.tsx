import { FlashList } from '@shopify/flash-list';
import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNgos } from 'src/API';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import FallbackMessage from 'src/components/fallback/FallbackMessage';
import { LineDivider } from 'src/components/line-divider/LineDivider';
import { SkeletonLoader } from 'src/components/skeleton/Skeleton';
import { Text } from 'src/components/text/Text.component';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { NgoCard } from '../NgoCard.tsx/NgoCard';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    errorWrapper: {
      gap: theme.spacing.layout.vertical.xl,
    },
  });

  return styles;
};

export function NgoList() {
  const searchedNgoPhrase = useCombinedStore(state => state.searchedNgoPhrase);
  const { data, isLoading, error, refetch } = useNgos({ sort: 'asc', search: searchedNgoPhrase, size: 999 });
  const styles = useThemedStyles(themedStyles);

  const separator = useCallback(() => <View style={{ height: 24 }} />, []);

  useEffect(() => {
    refetch();
  }, [searchedNgoPhrase]);

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
          renderItem={({ item }) => <NgoCard key={item.id} ngo={item} />}
          ItemSeparatorComponent={separator}
          estimatedItemSize={400}
        />
      ) : (
        <FallbackMessage />
      )}
    </>
  );
}
