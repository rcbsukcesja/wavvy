import { Button } from 'native-base';
import { useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, View } from 'react-native';
import { FormError } from 'src/components/Form/FormError';
import { InputFormControl } from 'src/components/Form/InputFormControl';
import { LoginFormContainer } from 'src/components/Form/LoginFormContainer';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from 'src/components/Form/validation';

import { SignInFormData } from './types';

const styles = StyleSheet.create({
  formControl: {},
  logoWrapper: {
    alignItems: 'center',
  },
});

export function SignInForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const handleLogin = useCombinedStore(state => state.handleLogin);

  const onSubmit = data => {
    console.log('ELO', data);
  };

  return (
    <LoginFormContainer>
      <View style={styles.formControl}>
        <InputFormControl
          type="emailAddress"
          validationPattern={EMAIL_PATTERN}
          required
          control={control}
          controlName="email"
          placeholder="Email"
          inputMode="email"
        />
        {errors.email && errors.email.type === 'required' ? <FormError message="Pole wymagane" /> : null}
        {errors.email && errors.email.type === 'pattern' ? <FormError message="Błędny email" /> : null}
      </View>
      <View style={styles.formControl}>
        <InputFormControl
          type="password"
          validationPattern={PASSWORD_PATTERN}
          required
          control={control}
          controlName="password"
          placeholder="Hasło"
          inputMode="text"
        />
        {errors.password && errors.password.type === 'required' ? <FormError message="Pole wymagane" /> : null}
        {errors.password && errors.password.type === 'pattern' ? (
          <FormError message="Hasło musi mieć conajmniej 8 znaków, zawierać wielką literę, małą literę, liczbę i znak specjalny" />
        ) : null}
      </View>
      <Button
        backgroundColor="violet.600"
        onPress={handleSubmit(onSubmit)}
        _text={{ fontFamily: 'Poppins-Bold' }}
        mt={4}>
        Zaloguj
      </Button>
    </LoginFormContainer>
  );
}
