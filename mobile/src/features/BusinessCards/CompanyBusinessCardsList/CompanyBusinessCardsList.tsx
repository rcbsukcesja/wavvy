import { FlashList } from '@shopify/flash-list';
import { useMemo } from 'react';
import { Text } from 'react-native';
import { useQuery } from 'react-query';
import { getCompaniesQuery } from 'src/API';
import { SkeletonLoader } from 'src/components/Skeleton';
import { useCombinedStore } from 'src/store';

import { CompanyBusinessCard } from '../CompanyBusinessCard/CompanyBusinessCard';

export function CompanyBusinessCardsList() {
  const selectedBusinessArea = useCombinedStore(state => state.selectedBusinessArea);

  const businessCards = useQuery({
    queryFn: async () => {
      const { data } = await getCompaniesQuery;

      return data;
    },
    refetchOnWindowFocus: 'always',
  });

  const filteredCompanies = useMemo(
    () =>
      selectedBusinessArea === 'all'
        ? businessCards.data
        : businessCards.data.filter(company =>
            company.businessAreas.some(area => area.name.includes(selectedBusinessArea)),
          ),
    [businessCards.data, selectedBusinessArea],
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
        data={filteredCompanies}
        renderItem={({ item }) => <CompanyBusinessCard {...item} />}
        estimatedItemSize={200}
        horizontal
        contentContainerStyle={{ paddingVertical: 24, paddingLeft: 12 }}
      />
    );
  }
}
