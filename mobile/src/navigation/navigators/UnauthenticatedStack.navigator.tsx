import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from 'src/screens/Login.screen';

import { LOGIN_SCREEN_NAME, UnauthenticatedStackParams } from '../types';

const Stack = createNativeStackNavigator<UnauthenticatedStackParams>();

export function UnauthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LOGIN_SCREEN_NAME}
        component={LoginScreen}
        options={{ headerShown: false, presentation: 'transparentModal' }}
      />
    </Stack.Navigator>
  );
}
