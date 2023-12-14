import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { useToast } from 'native-base';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { GoogleIconColor } from 'src/assets/icons/GoogleIconColor';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import { SecondaryButton } from 'src/components/button/variants/SecondaryButton.component';
import { FormError } from 'src/components/form/FormError';
import { CustomModal } from 'src/components/modal/Modal';
import { Text } from 'src/components/text/Text.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'src/features/Auth/validation';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { useEmailAndPasswordAuth } from './hooks/useEmailAndPasswordAuth';
import { useGoogleAuth } from './hooks/useGoogleAuth';
import { SignInFormData } from './types';

WebBrowser.maybeCompleteAuthSession();

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    margined: { marginBottom: theme.spacing.layout.vertical.xl },
    title: {
      marginBottom: theme.spacing.layout.vertical.xxl,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.layout.horizontal.xs,
    },
    formControl: {},
    logoWrapper: {
      alignItems: 'center',
    },
    input: {
      height: theme.spacing.layout.horizontal.xl * 2.5,
      fontSize: theme.fontSizes.lg,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.layout.horizontal.xl,
      paddingVertical: theme.spacing.layout.vertical.md,
      borderWidth: 2,
      borderColor: theme.colors.main.secondary,
      fontFamily: theme.fontTypes.primaryRegular,
    },
    errorMessage: {
      marginLeft: theme.spacing.layout.horizontal.xl,
    },
    divider: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: theme.spacing.layout.vertical.xl,
    },
    line: {
      height: 1,
      width: '45%',
      backgroundColor: theme.colors.surface.border,
    },
  });

  return styles;
};

export function SignInForm() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const auth = useMemo(() => FIREBASE_AUTH, []);
  const toast = useToast();
  const {
    signInWithEmailAndPassword,
    isLoadingSignIn: isLoadingEmailAndpasswordSignIn,
    authReqState,
    resetPassword,
  } = useEmailAndPasswordAuth(auth);
  const { googlePromptAsync, isLoadingSignIn: isLoadingGoogleSignIn } = useGoogleAuth(auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const styles = useThemedStyles(themedStyles);
  const { fontSizes, colors } = useTheme();

  const onSubmit = ({ email, password }: { email: string; password: string }) => {
    signInWithEmailAndPassword({ email, password });
  };

  const signInWithGoogle = () => googlePromptAsync();

  const handleStartResetPassword = () => setIsVisibleModal(true);

  const handleCloseModal = () => setIsVisibleModal(false);

  const handleResetPassword = (email: string) =>
    resetPassword(email)
      .then(() =>
        toast.show({
          description: `Wysłano link resetujący hasło na email ${email}`,
        }),
      )
      .catch(() =>
        toast.show({
          description: 'Wystąpił błąd podczas resetowania hasła',
        }),
      )
      .finally(() => handleCloseModal());

  return (
    <>
      <View style={styles.title}>
        <Text size="xxl" type="primaryBold">
          Zaloguj się
        </Text>
        <View style={styles.logo}>
          <MaterialIcons name="waves" size={fontSizes.xxl} color={colors.main.primary} />
          <Text size="xl" letterSpacing="wide" type="primaryBold">
            Wavvy
          </Text>
        </View>
      </View>
      <View style={[styles.formControl, styles.margined]}>
        <Controller
          control={control}
          rules={{ pattern: EMAIL_PATTERN, required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="email"
              placeholder="Email"
              textContentType="emailAddress"
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
          name="email"
        />
        {errors.email && errors.email.type === 'required' ? (
          <View style={styles.errorMessage}>
            <FormError message="Pole wymagane" />
          </View>
        ) : null}
        {errors.email && errors.email.type === 'pattern' ? (
          <View style={styles.errorMessage}>
            <FormError message="Błędny email" />
          </View>
        ) : null}
      </View>
      <View style={[styles.formControl, styles.margined]}>
        <Controller
          control={control}
          rules={{ pattern: PASSWORD_PATTERN, required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="text"
              placeholder="Hasło"
              textContentType="password"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
          name="password"
        />
        {errors.password && errors.password.type === 'required' ? (
          <View style={styles.errorMessage}>
            <FormError message="Pole wymagane" />
          </View>
        ) : null}
        {errors.password && errors.password.type === 'pattern' ? (
          <View style={styles.errorMessage}>
            <FormError message="Hasło musi mieć conajmniej 8 znaków, zawierać wielką literę, małą literę, liczbę i znak specjalny" />
          </View>
        ) : null}
        <TouchableOpacity style={{ marginTop: 6, marginLeft: 4 }} onPress={handleStartResetPassword}>
          <Text color="onHoverPrimary" type="primaryBold">
            Resetuj hasło
          </Text>
        </TouchableOpacity>
      </View>
      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        label="Zaloguj"
        fontSize="lg"
        isLoading={isLoadingEmailAndpasswordSignIn}
        disabled={isLoadingEmailAndpasswordSignIn || isLoadingGoogleSignIn || authReqState === 'LOADING'}
      />
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text type="primaryBold">lub</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.margined}>
        <SecondaryButton
          fontSize="lg"
          label="Zaloguj przez Google"
          onPress={signInWithGoogle}
          icon={<GoogleIconColor height={24} width={24} />}
          isLoading={isLoadingGoogleSignIn}
          disabled={isLoadingEmailAndpasswordSignIn || isLoadingGoogleSignIn || authReqState === 'LOADING'}
        />
      </View>
      <CustomModal visible={isVisibleModal} onClose={handleCloseModal}>
        <Text>Na wpisany do formularza email zostanie wysłany link resetujący hasło. Czy kontynuować ?</Text>
        <PrimaryButton label="Tak" onPress={() => handleResetPassword(getValues().email)} />
      </CustomModal>
    </>
  );
}
