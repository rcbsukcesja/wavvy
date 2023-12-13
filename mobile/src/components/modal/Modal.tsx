import { AntDesign } from '@expo/vector-icons';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      position: 'relative',
    },
    modalContent: {
      backgroundColor: 'white',
      paddingTop: theme.spacing.layout.vertical.xxl + theme.spacing.layout.vertical.xl,
      paddingBottom: theme.spacing.layout.vertical.xl,
      paddingHorizontal: theme.spacing.layout.horizontal.xxl,
      borderRadius: theme.borderRadius.md,
      width: '80%',
      gap: theme.spacing.layout.vertical.xl,
    },
    closeButton: {
      alignItems: 'center',
      position: 'absolute',
      top: theme.spacing.layout.vertical.xl,
      right: theme.spacing.layout.horizontal.xl,
    },
  });
  return styles;
};

export function CustomModal({ visible, onClose, children }) {
  const styles = useThemedStyles(themedStyles);
  const { fontSizes, colors } = useTheme();

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {children}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={fontSizes.xxxl} color={colors.main.primaryVariant} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
