import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import { useEvents } from 'src/API';
import { PrimaryButton } from 'src/components/button/variants/PrimaryButton.component';
import FallbackMessage from 'src/components/fallback/FallbackMessage';
import { LineDivider } from 'src/components/line-divider/LineDivider';
import { SkeletonLoader } from 'src/components/skeleton/Skeleton';
import { Text } from 'src/components/text/Text.component';
import { EventCard } from 'src/features/Event/EventCard/EventCard';
import { EventDTO } from 'src/features/Event/types';
import { useCombinedStore } from 'src/store';
import { useThemedStyles } from 'src/theme/hooks/useThemedStyles';
import { Theme } from 'src/theme/types';
import { getFirstAndLastDayOfMonth } from 'src/theme/utils/date';

const themedStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
    },
    errorWrapper: {
      gap: theme.spacing.layout.vertical.xl,
    },
  });

  return styles;
};

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export function EventList() {
  const selectedMonth = useCombinedStore(state => state.selectedMonth);
  const selectedYear = useCombinedStore(state => state.selectedYear);
  const styles = useThemedStyles(themedStyles);
  const selectedDate = useMemo(
    () => getFirstAndLastDayOfMonth(+selectedYear, +selectedMonth),
    [selectedMonth, selectedYear],
  );
  const searchedEventPhrase = useCombinedStore(state => state.searchedEventPhrase);

  const {
    data,
    isLoading: isLoadingEvents,
    error: errorEvents,
    refetch: refetchEvents,
  } = useEvents({
    search: searchedEventPhrase,
    startDate: selectedDate.firstDay,
    endDate: selectedDate.lastDay,
    size: 999,
  });

  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  const sortAndFilterEvents = useCallback((eventList: EventDTO[], monthNumber: number, year: number) => {
    const filteredEvents = eventList.filter(event => {
      const eventMonth = new Date(event.startTime).getMonth();
      const eventYear = new Date(event.startTime).getFullYear();

      return eventMonth === monthNumber && eventYear === year;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      const dateA = new Date(a.startTime).valueOf();
      const dateB = new Date(b.startTime).valueOf();

      return dateA - dateB;
    });

    return sortedEvents;
  }, []);

  const sortedAndFilteredEvents = useMemo(
    () => (data ? sortAndFilterEvents(data?.content, selectedMonth, selectedYear) : []),
    [data, sortAndFilterEvents, selectedMonth, selectedYear],
  );

  useEffect(() => {
    refetchEvents();
  }, [searchedEventPhrase, selectedDate]);

  if (isLoadingEvents) {
    return <SkeletonLoader />;
  }

  if (errorEvents) {
    return (
      <View style={styles.errorWrapper}>
        <Text>Wystąpił błąd z pobieraniem danych</Text>
        <LineDivider />
        <PrimaryButton onPress={refetchEvents} label="Spróbuj ponownie pobrać" />
      </View>
    );
  }

  if (!sortedAndFilteredEvents.length) {
    return <FallbackMessage />;
  }

  return (
    <AnimatedPagerView
      style={styles.pagerView}
      initialPage={0}
      onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: true,
        },
      )}>
      {sortedAndFilteredEvents.length &&
        sortedAndFilteredEvents.map(event => (
          <EventCard key={event.id} event={event} scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} />
        ))}
    </AnimatedPagerView>
  );
}
