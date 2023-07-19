import { Select } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { useCombinedStore } from 'src/store';

import { LegalStatus } from '../types';
import { COMPANY_SELECT_OPTIONS, NGO_SELECT_OPTIONS } from './mocks';

const styles = StyleSheet.create({
  actionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
});

export function BusinessCardsFilter() {
  const visibleState = useCombinedStore(state => state.visibleBusinessCardType);
  const selectedBusinessArea = useCombinedStore(state => state.selectedBusinessArea);
  const setSelectedBusinessArea = useCombinedStore(state => state.setSelectedBusinessArea);
  const selectedLegalStatus = useCombinedStore(state => state.selectedLegalStatus);
  const setSelectedLegalStatus = useCombinedStore(state => state.setSelectedLegalStatus);

  return (
    <View style={styles.actionsWrapper}>
      {visibleState === 'ngo' ? (
        <Select
          selectedValue={selectedLegalStatus}
          maxWidth="100"
          minWidth="100"
          accessibilityLabel="Wybierz obszar biznesowy"
          placeholder="Wybierz obszar biznesowy"
          _selectedItem={{
            bg: 'violet.100',
          }}
          mt={1}
          mr={4}
          py={1}
          px={1}
          fontFamily="Poppins-Regular"
          borderWidth={0}
          onValueChange={(itemValue: LegalStatus | 'all') => setSelectedLegalStatus(itemValue)}>
          {NGO_SELECT_OPTIONS.map(option => (
            <Select.Item label={option.label} value={option.value} key={option.value} />
          ))}
        </Select>
      ) : (
        <Select
          selectedValue={selectedBusinessArea}
          maxWidth="100"
          minWidth="100"
          accessibilityLabel="Wybierz obszar biznesowy"
          placeholder="Wybierz obszar biznesowy"
          _selectedItem={{
            bg: 'violet.100',
          }}
          mt={1}
          mr={4}
          py={1}
          px={1}
          fontFamily="Poppins-Regular"
          borderWidth={0}
          onValueChange={itemValue => setSelectedBusinessArea(itemValue)}>
          {COMPANY_SELECT_OPTIONS.map(option => (
            <Select.Item fontFamily="Poppins-Regular" label={option.label} value={option.value} key={option.value} />
          ))}
        </Select>
      )}
    </View>
  );
}
