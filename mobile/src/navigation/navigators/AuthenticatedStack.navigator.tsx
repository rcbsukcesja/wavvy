/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderMemoized } from 'src/components/Header';
import {
  BUSINESS_CARDS_SCREEN_NAME,
  BusinessCardsScreen,
  BusinessCardsScreenParams,
} from 'src/screens/BusinessCards.screen';
import { EVENT_LIST_SCREEN_NAME, EventListScreen, EventListScreenParams } from 'src/screens/EventList.screen';
import { MAIN_MENU_SCREEN_NAME, MainMenuScreen, MainMenuScreenParams } from 'src/screens/MainMenu.screen';

export type AuthenticatedStackParams = {
  [MAIN_MENU_SCREEN_NAME]: MainMenuScreenParams;
  [EVENT_LIST_SCREEN_NAME]: EventListScreenParams;
  [BUSINESS_CARDS_SCREEN_NAME]: BusinessCardsScreenParams;
};

const Stack = createNativeStackNavigator<AuthenticatedStackParams>();

export function AuthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName={MAIN_MENU_SCREEN_NAME}>
      <Stack.Screen
        name={MAIN_MENU_SCREEN_NAME}
        component={MainMenuScreen}
        options={{ header: () => <HeaderMemoized title="Menu" isGoBackVisible={false} /> }}
      />
      <Stack.Screen
        name={EVENT_LIST_SCREEN_NAME}
        component={EventListScreen}
        options={{ header: () => <HeaderMemoized title="Wydarzenia" /> }}
      />
      <Stack.Screen
        name={BUSINESS_CARDS_SCREEN_NAME}
        component={BusinessCardsScreen}
        options={{ header: () => <HeaderMemoized title="NGO & lokalny biznes" /> }}
      />
    </Stack.Navigator>
  );
}
