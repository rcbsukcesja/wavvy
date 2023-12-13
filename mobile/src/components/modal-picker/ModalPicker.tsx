import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { CustomModal } from '../modal/Modal';
import { Text } from '../text/Text.component';

type Option = {
  label: string;
  value: number;
};

type ModalPickerProps = {
  visible: boolean;
  data: Option[];
  onClose: () => void;
  onSelect: (value: number) => void;
  selectedValue: number;
};

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    optionsContainer: {
      height: theme.spacing.layout.vertical.xxxl + theme.spacing.layout.vertical.xxxl,
    },
    option: {
      paddingVertical: theme.spacing.layout.vertical.sm,
    },
  });

  return styles;
};

export function ModalPicker({ data, onClose, onSelect, selectedValue, visible }: ModalPickerProps) {
  const styles = useThemedStyles(themedStyles);
  return (
    <CustomModal visible={visible} onClose={onClose}>
      <ScrollView style={styles.optionsContainer}>
        {data.map(element => (
          <TouchableOpacity key={element.label} style={styles.option} onPress={() => onSelect(element.value)}>
            <Text
              size="xl"
              letterSpacing="wide"
              type="primaryBold"
              color={selectedValue === element.value ? 'onHoverPrimary' : 'onBackground'}>
              {element.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CustomModal>
  );
}
