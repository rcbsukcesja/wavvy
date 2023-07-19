import { StyleSheet, View } from 'react-native';

import { EventList } from '../EventList/EventList';
import { EventListFilter } from '../EventListFilter/EventListFilter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function EventListWrapper() {
  return (
    <View style={styles.container}>
      <EventListFilter />
      <EventList />
    </View>
  );
}
