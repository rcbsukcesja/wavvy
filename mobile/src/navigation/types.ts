import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompanyDTO } from 'src/features/Company/types';
import { EventDTO } from 'src/features/Event/types';
import { NgoDTO } from 'src/features/Ngo/types';

export type UnauthenticatedStackParamKeys = keyof UnauthenticatedStackParams;

export type UnauthenticatedStackScreenNavigationProps<ScreenNameType extends UnauthenticatedStackParamKeys> =
  NativeStackNavigationProp<UnauthenticatedStackParams, ScreenNameType>;

export interface UnauthenticatedStackScreenProps<ScreenNameType extends UnauthenticatedStackParamKeys> {
  route: RouteProp<UnauthenticatedStackParams, ScreenNameType>;
  navigation: UnauthenticatedStackScreenNavigationProps<ScreenNameType>;
}

export type AuthenticatedStackParamKeys = keyof AuthenticatedStackParams;

export type AuthenticatedStackScreenNavigationProps<ScreenNameType extends AuthenticatedStackParamKeys> =
  NativeStackNavigationProp<AuthenticatedStackParams, ScreenNameType>;

export interface AuthenticatedStackScreenProps<ScreenNameType extends keyof AuthenticatedStackParams> {
  route: RouteProp<AuthenticatedStackParams, ScreenNameType>;
  navigation: AuthenticatedStackScreenNavigationProps<ScreenNameType>;
}

export const HOME_SCREEN_NAME = 'Home';
export const BUSINESS_CARDS_SCREEN_NAME = 'BusinessCards';
export const EVENT_DETAILS_SCREEN_NAME = 'EventDetails';
export const EVENT_LIST_SCREEN_NAME = 'Events';
export const NGO_DETAILS_SCREEN_NAME = 'NgoDetails';
export const NGO_LIST_SCREEN_NAME = 'NgoList';
export const COMPANY_DETAILS_SCREEN_NAME = 'CompanyDetails';
export const COMPANY_LIST_SCREEN_NAME = 'CompanyList';
export const SETTINGS_SCREEN_NAME = 'Settings';
export const TERMS_AND_CONDITIONS_SCREEN_NAME = 'TermsAndConditions';
export const LOGIN_SCREEN_NAME = 'Login';

export type UnauthenticatedStackParams = {
  [LOGIN_SCREEN_NAME]: LoginScreenParams;
};

export type AuthenticatedStackParams = {
  [HOME_SCREEN_NAME]: EventListScreenParams;
  [EVENT_LIST_SCREEN_NAME]: EventListScreenParams;
  [BUSINESS_CARDS_SCREEN_NAME]: BusinessCardsScreenParams;
  [EVENT_DETAILS_SCREEN_NAME]: EventDetailsScreenParams;
  [NGO_DETAILS_SCREEN_NAME]: NgoDetailsScreenParams;
  [COMPANY_DETAILS_SCREEN_NAME]: CompanyDetailsScreenParams;
  [NGO_LIST_SCREEN_NAME]: NgoListScreenParams;
  [COMPANY_LIST_SCREEN_NAME]: CompanyListScreenParams;
  [SETTINGS_SCREEN_NAME]: SettingsScreenParams;
  [TERMS_AND_CONDITIONS_SCREEN_NAME]: TermsAndConditionsScreenParams;
};

export type EventListScreenParams = undefined;
export type NgoListScreenParams = undefined;
export type CompanyListScreenParams = undefined;
export type BusinessCardsScreenParams = undefined;
export type SettingsScreenParams = undefined;
export type EventDetailsScreenParams = {
  event: EventDTO;
};
export type NgoDetailsScreenParams = {
  ngo: NgoDTO;
};
export type CompanyDetailsScreenParams = {
  company: CompanyDTO;
};
export type TermsAndConditionsScreenParams = undefined;
export type LoginScreenParams = undefined;
