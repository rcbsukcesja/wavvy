import { Box, Select } from 'native-base';
import { useCombinedStore } from 'src/store';

import { SELECT_CATEGORY_OPTIONS, SELECT_MONTH_OPTIONS } from './utils';

export function EventListFilter() {
  const setSelectedMonth = useCombinedStore(state => state.setSelectedMonth);
  const selectedMonth = useCombinedStore(state => state.selectedMonth);
  const setSelectedCategory = useCombinedStore(state => state.setSelectedCategory);
  const selectedCategory = useCombinedStore(state => state.selectedCategory);

  return (
    <Box maxW="300" mx={4} mt={2} flexDirection="row">
      <Select
        selectedValue={selectedMonth}
        maxWidth="100"
        minWidth="100"
        accessibilityLabel="Wybierz miesiąc"
        placeholder="Wybierz miesiąc"
        _selectedItem={{
          bg: 'blue.100',
        }}
        fontFamily="Poppins-Regular"
        mt={1}
        mr={4}
        py={1}
        borderWidth={0}
        onValueChange={itemValue => setSelectedMonth(itemValue)}>
        {SELECT_MONTH_OPTIONS.map(option => (
          <Select.Item label={option.label} value={option.value} key={option.value} />
        ))}
      </Select>
      <Select
        selectedValue={selectedCategory}
        maxWidth="100"
        minWidth="120"
        accessibilityLabel="Wybierz kategorię"
        placeholder="Wybierz kategorię"
        _selectedItem={{
          bg: 'blue.100',
        }}
        mt={1}
        py={1}
        fontFamily="Poppins-Regular"
        borderWidth={0}
        onValueChange={itemValue => setSelectedCategory(itemValue)}>
        {SELECT_CATEGORY_OPTIONS.map(option => (
          <Select.Item label={option.label} value={option.value} key={option.value} />
        ))}
      </Select>
    </Box>
  );
}
