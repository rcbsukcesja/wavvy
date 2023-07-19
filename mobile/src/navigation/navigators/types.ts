import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthenticatedStackParams } from './AuthenticatedStack.navigator';
import { UnauthenticatedStackParams } from './UnauthenticatedStack.navigator';

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
