// eslint-disable-next-line import/no-extraneous-dependencies
import * as Linking from 'expo-linking';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import { ModalPicker } from 'src/components/modal-picker/ModalPicker';
import { CustomModal } from 'src/components/modal/Modal';
import { Search } from 'src/components/search/Search';
import { Text } from 'src/components/text/Text.component';
import { EventList } from 'src/features/Event/EventList/EventList';
import { EventListFilter } from 'src/features/Event/EventListFilter/EventListFilter';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';
import { monthPickerOptions, yearPickerOptions } from 'src/theme/utils/date';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.background,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingBottom: theme.spacing.layout.vertical.xl,
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

export function EventListContainer() {
  const styles = useThemedStyles(themedStyles);
  const { modalMessage, modalParam, modalVisible, modalType } = useCombinedStore(state => state.modal);
  const setModalState = useCombinedStore(state => state.setModalState);
  const pickerVisble = useCombinedStore(state => state.pickerVisible);
  const setPickerVisible = useCombinedStore(state => state.setPickerState);
  const setSelectedMonth = useCombinedStore(state => state.setSelectedMonth);
  const setSelectedYear = useCombinedStore(state => state.setSelectedYear);
  const selectedMonth = useCombinedStore(state => state.selectedMonth);
  const selectedYear = useCombinedStore(state => state.selectedYear);
  const pickerType = useCombinedStore(state => state.pickerType);
  const setSearchedPhrase = useCombinedStore(state => state.setSearchedEventPhrase);

  const handleLinkMailboxOpen = () => {
    Linking.openURL(`mailto:${modalParam}`);
    setModalState({ message: '', visible: false, type: 'default', param: '' });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Search onSearch={setSearchedPhrase} placeholder="> Wyszukaj po nazwie lub tagu..." />
      <EventListFilter />
      <EventList />
      <CustomModal
        visible={modalVisible && modalType === 'voluntaary'}
        onClose={() => setModalState({ message: '', visible: false, type: 'default', param: '' })}>
        <Text size="lg">{modalMessage}</Text>
        <PrimaryButton onPress={handleLinkMailboxOpen} label="Wyślij zgłoszenie" />
      </CustomModal>
      <ModalPicker
        data={monthPickerOptions}
        visible={pickerVisble && pickerType === 'month'}
        onClose={() => setPickerVisible({ visible: false, type: 'idle' })}
        onSelect={value => {
          setSelectedMonth(value);
          setPickerVisible({ visible: false, type: 'idle' });
        }}
        selectedValue={selectedMonth}
      />
      <ModalPicker
        data={yearPickerOptions}
        visible={pickerVisble && pickerType === 'year'}
        onClose={() => setPickerVisible({ visible: false, type: 'idle' })}
        onSelect={value => {
          setSelectedYear(value);
          setPickerVisible({ visible: false, type: 'idle' });
        }}
        selectedValue={selectedYear}
      />
    </KeyboardAvoidingView>
  );
}
