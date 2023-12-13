import { TouchableOpacity } from 'react-native';
import { Text } from 'src/components/text/Text.component';
import { useCombinedStore } from 'src/store';

export function FilterYear() {
  const selectedYear = useCombinedStore(state => state.selectedYear);
  const setPickerVisible = useCombinedStore(state => state.setPickerState);

  const handleOpenPicker = () => {
    setPickerVisible({ visible: true, type: 'year' });
  };
  return (
    <TouchableOpacity onPress={handleOpenPicker}>
      <Text size="4xl" type="primaryBold" letterSpacing="wide" color="onBackground">
        {selectedYear}
      </Text>
    </TouchableOpacity>
  );
}
