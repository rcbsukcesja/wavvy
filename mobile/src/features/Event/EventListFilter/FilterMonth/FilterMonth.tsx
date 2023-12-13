import { TouchableOpacity } from 'react-native';
import { Text } from 'src/components/text/Text.component';
import { useCombinedStore } from 'src/store';
import { MONTHS_PL } from 'src/theme/utils/date';

export function FilterMonth() {
  const selectedMonth = useCombinedStore(state => state.selectedMonth);
  const setPickerVisible = useCombinedStore(state => state.setPickerState);

  const monthUppercase = MONTHS_PL[selectedMonth].toUpperCase();

  const handleOpenPicker = () => {
    setPickerVisible({ visible: true, type: 'month' });
  };

  return (
    <TouchableOpacity onPress={handleOpenPicker}>
      <Text size="5xl" type="primaryRegular" letterSpacing="wide" color="onBackground">
        {monthUppercase}
      </Text>
    </TouchableOpacity>
  );
}
