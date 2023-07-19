/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SignInForm } from 'src/features/Auth/SignInForm';

export const LOGIN_SCREEN_NAME = 'Login';

export type LoginScreenParams = undefined;

const image = require('src/assets/kolobrzeg.jpg');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    position: 'relative',
  },
  image: {
    flex: 0.5,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  filter: {
    flex: 1,
    backgroundColor: '#0479CB',
    opacity: 0.3,
  },
});

export function LoginScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.image}
        resizeMode="cover"
        resizeMethod="auto"
        imageStyle={{
          resizeMode: 'cover',
          alignSelf: 'flex-end',
        }}>
        <View style={styles.filter} />
      </ImageBackground>
      <SignInForm />
    </KeyboardAvoidingView>
  );
}
