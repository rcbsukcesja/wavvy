import { FlashList } from '@shopify/flash-list';
import { useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { useQuery } from 'react-query';
import { getNgosQuery } from 'src/API';
import { SkeletonLoader } from 'src/components/Skeleton';
import { useCombinedStore } from 'src/store';

import { NgoBusinessCard } from '../NgoBusinessCard/NgoBusinessCard';
import { LegalStatus, Ngo } from '../types';

export function NgoBusinessCardsList() {
  const selectedLegalStatus = useCombinedStore(state => state.selectedLegalStatus);

  const businessCards = useQuery({
    queryFn: async () => {
      const { data } = await getNgosQuery;

      return data;
    },
  });

  const filterNgoByLegalStatus = useCallback(
    (ngoArray: Ngo[], legalStatus: LegalStatus | 'all') =>
      ngoArray.filter(ngo => ngo.legalStatus === legalStatus || legalStatus === 'all'),
    [],
  );

  const filteredNgo = useMemo(
    () => (businessCards.data ? filterNgoByLegalStatus(businessCards.data, selectedLegalStatus) : []),
    [businessCards.data, filterNgoByLegalStatus, selectedLegalStatus],
  );

  if (businessCards.isLoading) {
    return <SkeletonLoader />;
  }

  if (businessCards.isError) {
    return <Text>Wystąpił błąd z pobieraniem danych</Text>;
  }

  if (businessCards.data) {
    return (
      <FlashList
        data={filteredNgo}
        renderItem={({ item }) => <NgoBusinessCard {...item} />}
        estimatedItemSize={200}
        horizontal
        contentContainerStyle={{ paddingVertical: 24, paddingLeft: 12 }}
      />
    );
  }
}
