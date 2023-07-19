import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LOGIN_SCREEN_NAME, LoginScreen, LoginScreenParams } from 'src/screens/Login.screen';

export type UnauthenticatedStackParams = {
  [LOGIN_SCREEN_NAME]: LoginScreenParams;
};

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
