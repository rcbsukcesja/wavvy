/* eslint-disable global-require */
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NativeBaseProvider } from 'native-base';
import { useCallback } from 'react';
import { useCombinedStore } from 'src/store';

import { AuthenticatedStack } from './AuthenticatedStack.navigator';
import { UnauthenticatedStack } from './UnauthenticatedStack.navigator';

function AuthNavigator() {
  const isLogged = useCombinedStore(state => state.isLogged);

  return isLogged ? <AuthenticatedStack /> : <UnauthenticatedStack />;
}

export function RootStack() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('src/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Light': require('src/assets/fonts/Poppins-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <NativeBaseProvider>
        <AuthNavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
