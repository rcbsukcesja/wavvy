/* eslint-disable react/no-unstable-nested-components */
import { AntDesign, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions } from 'react-native';
import { HeaderMemoized } from 'src/components/header/Header';
import { CompanyListScreen } from 'src/screens/CompanyList.screen';
import { EventListScreen } from 'src/screens/EventList.screen';
import { NgoListScreen } from 'src/screens/NgoList.screen';
import { SettingsScreen } from 'src/screens/Settings.screen';
import { useTheme } from 'src/theme/hooks/useTheme';

import {
  AuthenticatedStackParams,
  COMPANY_LIST_SCREEN_NAME,
  EVENT_LIST_SCREEN_NAME,
  NGO_LIST_SCREEN_NAME,
  SETTINGS_SCREEN_NAME,
} from '../types';

const Tab = createBottomTabNavigator<AuthenticatedStackParams>();

export function TabNavigator() {
  const { colors, fontSizes, fontTypes, spacing } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Dimensions.get('window').height * 0.1,
          overflow: 'hidden',
          backgroundColor: '#fff',
        },
        tabBarActiveBackgroundColor: colors.main.primaryLight,
      }}>
      <Tab.Screen
        name={EVENT_LIST_SCREEN_NAME}
        component={EventListScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="event" color={colors.main.primarySecondVariant} size={fontSizes.xxl} />
          ),
          header: () => <HeaderMemoized title="Cześć" />,
          tabBarLabel: 'Wydarzenia',
          tabBarLabelStyle: {
            color: colors.main.primarySecondVariant,
            fontSize: fontSizes.sm,
            fontFamily: fontTypes.primaryBold,
            letterSpacing: spacing.letter.wide,
          },
        }}
      />
      <Tab.Screen
        name={NGO_LIST_SCREEN_NAME}
        component={NgoListScreen}
        options={{
          tabBarIcon: () => (
            <SimpleLineIcons name="organization" color={colors.main.primarySecondVariant} size={fontSizes.xxl} />
          ),
          header: () => <HeaderMemoized title="Organizacje NGO" />,
          tabBarLabel: 'Organizacje',
          tabBarLabelStyle: {
            color: colors.main.primarySecondVariant,
            fontSize: fontSizes.sm,
            fontFamily: fontTypes.primaryBold,
            letterSpacing: spacing.letter.wide,
          },
        }}
      />
      <Tab.Screen
        name={COMPANY_LIST_SCREEN_NAME}
        component={CompanyListScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="business-center" color={colors.main.primarySecondVariant} size={fontSizes.xxl} />
          ),
          header: () => <HeaderMemoized title="Lokalne biznesy" />,
          tabBarLabel: 'Lokalne MŚP',
          tabBarLabelStyle: {
            color: colors.main.primarySecondVariant,
            fontSize: fontSizes.sm,
            fontFamily: fontTypes.primaryBold,
            letterSpacing: spacing.letter.wide,
          },
        }}
      />
      <Tab.Screen
        name={SETTINGS_SCREEN_NAME}
        component={SettingsScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="settings" color={colors.main.primarySecondVariant} size={fontSizes.xxl} />
          ),
          header: () => <HeaderMemoized title="Ustawienia" />,
          tabBarLabel: 'Ustawienia',
          tabBarLabelStyle: {
            color: colors.main.primarySecondVariant,
            fontSize: fontSizes.sm,
            fontFamily: fontTypes.primaryBold,
            letterSpacing: spacing.letter.wide,
          },
        }}
      />
    </Tab.Navigator>
  );
}
