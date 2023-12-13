import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { ScrollView, useToast } from 'native-base';
import { useCallback, useMemo } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { DangerButton } from 'src/components/button/variants/DangerButton.component copy';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import { LineDivider } from 'src/components/line-divider/LineDivider';
import { CustomModal } from 'src/components/modal/Modal';
import { Text } from 'src/components/text/Text.component';
import { useAuth } from 'src/features/Auth/hooks/useAuth';
import { useEmailAndPasswordAuth } from 'src/features/Auth/hooks/useEmailAndPasswordAuth';
import { useCombinedStore } from 'src/store';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface.surface,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.layout.horizontal.xl,
      gap: theme.spacing.layout.vertical.xl,
    },
    account: {
      gap: theme.spacing.layout.vertical.xl,
      paddingTop: theme.spacing.layout.horizontal.xl,
    },
    terms: {
      gap: theme.spacing.layout.vertical.lg,
    },
    term: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    termLink: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.layout.horizontal.lg,
    },
  });

  return styles;
};

export function SettingsScreen() {
  const appTerms = useCombinedStore(state => state.appTerms);
  const { modalMessage, modalParam, modalType, modalVisible } = useCombinedStore(state => state.modal);
  const setModalState = useCombinedStore(state => state.setModalState);
  const userEmail = useCombinedStore(state => state.userEmail);
  const { setUserLogout } = useAuth();
  const auth = useMemo(() => FIREBASE_AUTH, []);
  const { resetPassword, deleteAccount } = useEmailAndPasswordAuth(auth);
  const toast = useToast();

  useFocusEffect(
    useCallback(
      () => () => {
        // Czyszczenie stanu modala przy opuszczaniu ekranu Settings
        setModalState({ message: '', visible: false, type: 'default', param: '' });
      },
      [],
    ),
  );

  // TODO : podpiac linki do regulaminow

  const styles = useThemedStyles(createStyles);
  const { colors, fontSizes } = useTheme();

  const handleOpenResetPassword = () =>
    setModalState({
      message: 'Czy na pewno chcesz zresetować hasło ?',
      type: 'resetPassword',
      param: '',
      visible: true,
    });

  const handleLogout = () => {
    setModalState({ message: '', visible: false, type: 'default', param: '' });

    setUserLogout();
    toast.show({
      description: 'Pomyślnie wylogowano',
    });
  };

  const handleOpenDeleteAccount = () =>
    setModalState({
      message: 'Czy na pewno chcesz usunąć konto ?',
      type: 'deleteAccount',
      param: '',
      visible: true,
    });

  const handleDeleteAccount = () =>
    deleteAccount()
      .then(() =>
        toast.show({
          description: 'Pomyślnie usunięto konto',
        }),
      )
      .catch(() =>
        toast.show({
          description: 'Wystąpił błąd podczas usuwania konta',
        }),
      );

  const modalActionDictionary = useMemo(
    () => ({
      resetPassword: (
        <PrimaryButton
          onPress={() =>
            resetPassword(userEmail)
              .then(() => {
                setUserLogout();
                toast.show({
                  description: 'Wysłano link resetujący hasło na Twój email',
                });
              })
              .catch(() =>
                toast.show({
                  description: 'Wystąpił błąd podczas resetowania hasła',
                }),
              )
          }
          label="Zresetuj hasło"
        />
      ),
      deleteAccount: <PrimaryButton onPress={() => handleDeleteAccount()} label="Usuń konto" />,
      default: null,
    }),
    [modalParam],
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.terms}>
          <Text size="xl" type="primaryBold">
            Zgody
          </Text>
          <View style={styles.term}>
            <TouchableOpacity style={styles.termLink}>
              <Text size="lg" color="onHoverPrimary" type="primaryBold">
                Regulamin aplikacji
              </Text>
              <AntDesign name="link" color={colors.main.primary} size={fontSizes.md2} />
            </TouchableOpacity>
            <Switch
              trackColor={{ false: colors.main.secondaryVariant, true: colors.main.secondaryVariant }}
              thumbColor={appTerms ? colors.main.secondary : colors.main.secondary}
              ios_backgroundColor={colors.main.primaryLight}
              value={appTerms}
              disabled
            />
          </View>
          <LineDivider />
          <View style={styles.term}>
            <TouchableOpacity style={styles.termLink}>
              <Text size="lg" color="onHoverPrimary" type="primaryBold">
                Polityka prywatności
              </Text>
              <AntDesign name="link" color={colors.main.primary} size={fontSizes.md2} />
            </TouchableOpacity>
            <Switch
              trackColor={{ false: colors.main.secondaryVariant, true: colors.main.secondaryVariant }}
              thumbColor={appTerms ? colors.main.secondary : colors.main.secondary}
              ios_backgroundColor={colors.main.primaryLight}
              value={appTerms}
              disabled
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.account}>
        <Text size="xl" type="primaryBold">
          Konta
        </Text>
        <PrimaryButton label="Reset hasła" onPress={handleOpenResetPassword} />
        <DangerButton label="Usuń konto" onPress={handleOpenDeleteAccount} />
        <LineDivider />
      </View>
      <PrimaryButton label="Wyloguj" onPress={handleLogout} />
      <CustomModal
        visible={modalVisible && (modalType === 'deleteAccount' || modalType === 'resetPassword')}
        onClose={() => setModalState({ message: '', visible: false, type: 'default', param: '' })}>
        <Text size="lg">{modalMessage}</Text>
        {modalActionDictionary[modalType]}
      </CustomModal>
    </View>
  );
}
