import { useNavigation } from '@react-navigation/native';
import { Heading } from 'native-base';
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { MAIN_MENU_SCREEN_NAME } from 'src/screens/MainMenu.screen';

import { PressableIcon } from './PressableIcon';

interface HeaderProps {
  title?: string;
  isGoBackVisible?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 80,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  goBackContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  backLabel: {
    marginLeft: 12,
  },

  fontBold: {
    fontFamily: 'Poppins-Bold',
  },
});

function Header({ title, isGoBackVisible = true }: HeaderProps) {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      {title ? (
        <View>
          <Heading size="md" style={styles.fontBold}>
            {title}
          </Heading>
        </View>
      ) : null}
      {isGoBackVisible ? (
        <View style={styles.goBackContainer}>
          <PressableIcon
            name="chevron-with-circle-left"
            color="#424242"
            size={26}
            handleOnPress={() => navigate(MAIN_MENU_SCREEN_NAME)}
          />
        </View>
      ) : null}
    </View>
  );
}

export const HeaderMemoized = memo(Header);
