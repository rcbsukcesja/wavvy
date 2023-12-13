/* eslint-disable react/no-unstable-nested-components */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from 'firebaseConfig';
import { useEffect, useState } from 'react';
import { CompanyDetailsScreen } from 'src/screens/CompanyDetails.screen';
import { CompanyListScreen } from 'src/screens/CompanyList.screen';
import { EventDetailsScreen } from 'src/screens/EventDetails.screen';
import { NgoDetailsScreen } from 'src/screens/NgoDetails.screen';
import { NgoListScreen } from 'src/screens/NgoList.screen';
import { SettingsScreen } from 'src/screens/Settings.screen';
import { TermsAndConditionsScreen } from 'src/screens/TermsAndConditions.screen';
import { useCombinedStore } from 'src/store';
import { getStorageItem, setStorageItem } from 'src/utils/storage';

import {
  AuthenticatedStackParams,
  COMPANY_DETAILS_SCREEN_NAME,
  COMPANY_LIST_SCREEN_NAME,
  EVENT_DETAILS_SCREEN_NAME,
  HOME_SCREEN_NAME,
  NGO_DETAILS_SCREEN_NAME,
  NGO_LIST_SCREEN_NAME,
  SETTINGS_SCREEN_NAME,
  TERMS_AND_CONDITIONS_SCREEN_NAME,
} from '../types';
import { TabNavigator } from './TabNav.navigatior';

const Stack = createNativeStackNavigator<AuthenticatedStackParams>();

SplashScreen.preventAutoHideAsync();

export function AuthenticatedStack() {
  const [appReady, setAppReady] = useState(false);
  const setAppTerms = useCombinedStore(state => state.setAppTerms);
  const appTerms = useCombinedStore(state => state.appTerms);
  const userId = useCombinedStore(state => state.userId);
  const isLogged = useCombinedStore(state => state.isLogged);

  useEffect(() => {
    if (!isLogged) return;
    const userDoc = doc(FIRESTORE_DB, 'Users', userId);

    getStorageItem<boolean>(`consent-${userId}`)
      .then(item => {
        if (!item) {
          const handleDB = async () => {
            const docSnapshot = await getDoc(userDoc);
            const docData = docSnapshot.data();
            setStorageItem(`consent-${userId}`, docData.consent);
            setAppTerms(docData.consent);

            setAppReady(true);
            SplashScreen.hideAsync();
          };

          handleDB();
        }

        setAppTerms(item);
        setAppReady(true);
        SplashScreen.hideAsync();
      })
      .catch(() => {
        setAppReady(true);
        SplashScreen.hideAsync();
      });
  }, [isLogged]);

  if (!appReady) return null;

  return (
    <Stack.Navigator initialRouteName={TERMS_AND_CONDITIONS_SCREEN_NAME}>
      {!appTerms ? (
        <Stack.Screen
          name={TERMS_AND_CONDITIONS_SCREEN_NAME}
          component={TermsAndConditionsScreen}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
      ) : (
        <Stack.Screen name={HOME_SCREEN_NAME} component={TabNavigator} options={{ headerShown: false }} />
      )}

      <Stack.Screen name={NGO_LIST_SCREEN_NAME} component={NgoListScreen} options={{ headerShown: false }} />
      <Stack.Screen name={COMPANY_LIST_SCREEN_NAME} component={CompanyListScreen} options={{ headerShown: false }} />
      <Stack.Screen name={SETTINGS_SCREEN_NAME} component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={EVENT_DETAILS_SCREEN_NAME} component={EventDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name={NGO_DETAILS_SCREEN_NAME} component={NgoDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name={COMPANY_DETAILS_SCREEN_NAME}
        component={CompanyDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
