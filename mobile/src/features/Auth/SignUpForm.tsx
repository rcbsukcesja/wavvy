import { MaterialIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from 'firebaseConfig';
import { useToast } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';
import { GoogleIconColor } from 'src/assets/icons/GoogleIconColor';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import { SecondaryButton } from 'src/components/button/variants/SecondaryButton.component';
import { FormError } from 'src/components/form/FormError';
import { Text } from 'src/components/text/Text.component';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'src/features/Auth/validation';
import { useTheme } from 'src/theme/hooks/useTheme';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { useGoogleAuth } from './hooks/useGoogleAuth';
import { SignUpFormData } from './types';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    margined: { marginBottom: theme.spacing.layout.vertical.md },
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
      marginVertical: theme.spacing.layout.vertical.lg,
    },
    line: {
      height: 1,
      width: '45%',
      backgroundColor: theme.colors.surface.border,
    },
  });

  return styles;
};

export function SignUpForm() {
  const [isLoadingSignUp, setIsLoading] = useState(false);
  const toast = useToast();

  const auth = FIREBASE_AUTH;

  const { googlePromptAsync, isLoadingSignIn: isLoadingGoogleSignIn, authReqState } = useGoogleAuth(auth);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const styles = useThemedStyles(themedStyles);
  const { fontSizes, colors } = useTheme();

  const signUp = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      toast.show({
        description: 'Konto utworzone pomyślnie. Zaloguj się.',
      });
    } catch (err) {
      toast.show({
        description: 'Wystąpił błąd podczas tworzenia konta',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = () => googlePromptAsync();

  const onSubmit = ({ email, password, confirmPassword }: SignUpFormData) => {
    if (password !== confirmPassword) return toast.show({ description: 'Hasła nie są jednakowe' });

    return signUp({ email, password });
  };

  return (
    <>
      <View style={styles.title}>
        <Text size="xxl" type="primaryBold">
          Zarejestruj się
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
      </View>
      <View style={[styles.formControl, styles.margined]}>
        <Controller
          control={control}
          rules={{
            pattern: PASSWORD_PATTERN,
            required: true,
            // eslint-disable-next-line consistent-return
            validate: value => {
              if (watch('password') !== value) {
                return 'Hasła nie są zgodne';
              }
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              inputMode="text"
              placeholder="Powtórz hasło"
              textContentType="password"
              secureTextEntry
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
          name="confirmPassword"
        />
        {errors.confirmPassword && errors.confirmPassword.type === 'required' ? (
          <View style={styles.errorMessage}>
            <FormError message="Pole wymagane" />
          </View>
        ) : null}
      </View>
      <PrimaryButton
        onPress={handleSubmit(onSubmit)}
        label="Zarejestruj"
        isLoading={isLoadingSignUp}
        disabled={isLoadingSignUp || isLoadingGoogleSignIn || authReqState === 'LOADING'}
      />
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text type="primaryBold">lub</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.margined}>
        <SecondaryButton
          fontSize="lg"
          label="Zarejestruj przez Google"
          onPress={signInWithGoogle}
          icon={<GoogleIconColor height={24} width={24} />}
          isLoading={isLoadingGoogleSignIn}
          disabled={isLoadingSignUp || isLoadingGoogleSignIn || authReqState === 'LOADING'}
        />
      </View>
    </>
  );
}
