import { Button } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { useCombinedStore } from 'src/store';

import { BusinessCardsFilter } from '../BusinessCardsFilter/BusinessCardsFilter';
import { CompanyBusinessCardsList } from '../CompanyBusinessCardsList/CompanyBusinessCardsList';
import { NgoBusinessCardsList } from '../NgoBusinessCardsList/NgoBusinessCardsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
});

export function BusinessCardsListWrapper() {
  const visibleState = useCombinedStore(state => state.visibleBusinessCardType);
  const setIsVisibleState = useCombinedStore(state => state.setVisibleBusinessCardType);

  return (
    <View style={styles.container}>
      <View style={styles.actionsWrapper}>
        <BusinessCardsFilter />
        <Button
          _text={{ fontFamily: 'Poppins-Bold' }}
          mr={2}
          onPress={() => setIsVisibleState('ngo')}
          backgroundColor="violet.600">
          NGOs
        </Button>
        <Button
          onPress={() => setIsVisibleState('company')}
          backgroundColor="amber.600"
          _text={{ fontFamily: 'Poppins-Bold' }}>
          Lokalny biznes
        </Button>
      </View>

      {visibleState === 'ngo' ? <NgoBusinessCardsList /> : <CompanyBusinessCardsList />}
    </View>
  );
}
