import { StyleSheet, View } from 'react-native';
import { BusinessCardsListWrapper } from 'src/features/BusinessCards/BusinessCardsListWrapper/BusinessCardsListWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const BUSINESS_CARDS_SCREEN_NAME = 'BusinessCards';

export type BusinessCardsScreenParams = undefined;

export function BusinessCardsScreen() {
  return (
    <View style={styles.container}>
      <BusinessCardsListWrapper />
    </View>
  );
}
