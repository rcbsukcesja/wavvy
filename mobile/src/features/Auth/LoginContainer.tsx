import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'src/components/text/Text.component';
import { LoginFormContainer } from 'src/features/Auth/LoginFormContainer';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';

import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    switch: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    link: {
      marginLeft: theme.spacing.layout.horizontal.md,
    },
  });

  return styles;
};

export function LoginContainer() {
  const [activeForm, setActiveForm] = useState<'signIn' | 'signUp'>('signIn');
  const styles = useThemedStyles(themedStyles);

  const handleSwitchActiveForm = (currentActive: 'signIn' | 'signUp') =>
    currentActive === 'signIn' ? setActiveForm('signUp') : setActiveForm('signIn');

  return (
    <LoginFormContainer>
      <View style={styles.container}>
        {activeForm === 'signIn' ? <SignInForm /> : <SignUpForm />}
        {activeForm === 'signIn' ? (
          <View style={styles.switch}>
            <Text size="lg">Nie masz konta ?</Text>
            <TouchableOpacity style={styles.link} onPress={() => handleSwitchActiveForm(activeForm)}>
              <Text size="lg" type="primaryBold" color="onHoverPrimary">
                Zarejestruj się
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.switch}>
            <Text size="lg">Masz konto ?</Text>
            <TouchableOpacity style={styles.link} onPress={() => handleSwitchActiveForm(activeForm)}>
              <Text size="lg" type="primaryBold" color="onHoverPrimary">
                Zaloguj się
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LoginFormContainer>
  );
}
